<template>
  <div>
    
    <h5>Fluxo de Caixa</h5>
    <!-- Botão flutuante -->
    <q-fixed-position class="fixo" corner="bottom-left" :offset="[18, 18]">
        <q-btn 
           round
           color="primary" 
           @click="goBack">
           <q-icon name="chevron_left" />
        </q-btn>
    </q-fixed-position>

    <div id="lista">
        <q-collapsible :opened="opened" 
                       icon="filter_list" 
                       label="Filtros"
                       >
          
          <div class="row">
            <div class="col-md-6 col-xs-12">
              <q-radio v-model="opcoes" val="todas" label="Mostrar tudo" /><br>
              <q-radio v-model="opcoes" val="venda" label="Somente vendas" /><br>
              <q-radio v-model="opcoes" val="recebimento" label="Somente recebimentos" />
            </div>
            <div class="col">
              <q-radio v-model="opcoes" val="sangria" label="Somente sangrias" /><br>
              <q-radio v-model="opcoes" val="suprimento" label="Somente suprimentos" /><br>
            </div>  
          </div>
          
          <div class="row">
              <div class="col">
                  <q-select
                    filter
                    float-label="Op. Caixa"
                    v-model="idCaixa"
                    :options="listaVendedores"
                    filter
                    filter-placeholder="Procurar..."
                  />
                  
              </div>
              <div class="col-md-6">
                  <q-select
                    v-model="periodo"
                    float-label="Período"
                    :options="listaCaixas"
                    filter
                    filter-placeholder="Procurar..."
                  />
              </div>
          </div>
          
          <div class="row">
             <div class="col">
              <q-datetime v-model="dataInicial"
                          type="date" 
                          float-label="Data inicial" 
                          color="black"
                          format="DD/MM/YYYY"
                          ok-label="OK" 
                          clear-label="Limpar" 
                          cancel-label="Cancelar"
                          :day-names="dias"
                          :month-names="meses"
              />  
              
             </div>
             <div class="col">
              <q-datetime v-model="dataFinal"
                          type="date" 
                          float-label="Data Final" 
                          color="black"
                          format="DD/MM/YYYY"
                          ok-label="OK" 
                          clear-label="Limpar" 
                          cancel-label="Cancelar"
                          :day-names="dias"
                          :month-names="meses"
              />  
              
             </div>
            
          </div>

          <q-select v-model="forma"
                    float-label="Forma de Pagamento"
                    :options="listaFormas"
                    filter
                    filter-placeholder="Procurar..."
                  />
          
          <q-btn color="primary"
                 @click="getFluxo"
                 rounded
                 style="margin-bottom: 20px"
                 >
                 Visualizar</q-btn>  

        </q-collapsible>
        
        
         
        <br>
        
        <div v-if="visivel">
         
        <center>
          <h4>Fluxo de Caixa</h4>
          
          <strong v-if="fluxoCaixa.periodo !== null">Período:</strong> {{fluxoCaixa.periodo}} <br>
          <strong>Forma de Pagamento:</strong> {{fluxoCaixa.formaPgto}} <br>
          <strong>Total:</strong> {{fluxoCaixa.total | formatMoney}} <br><br>
            
          <q-infinite-scroll :handler="loadMore">  
          
            <table class="q-table responsive">
              <thead>
                <tr>
                  <th class="text-left">Tipo Op.</th>
                  <th class="text-left">N. Nota</th>
                  <th class="text-left">Cliente</th>
                  <th class="text-left">Data/Hora</th>
                  <th class="text-left">Valor</th>
                  <th class="text-left">Saldo</th>
                </tr>
              </thead>
              
              <tbody>
                <tr v-for="fluxo in showingData">
                  <td data-th="Tipo Op." class="text-left">{{fluxo.tipoOP}}</td>
                  <td data-th="N. Nota" class="text-left">{{fluxo.nCupom}}</td>
                  <td data-th="Cliente" class="text-left">{{fluxo.cliente}}</td>
                  <td data-th="Data/Hora" class="text-left">{{fluxo.dataHora | date}}</td>
                  <td data-th="Valor" class="text-right">{{fluxo.valor | formatMoney}}</td>
                  <td data-th="Saldo" class="text-right">{{fluxo.saldo | formatMoney}}</td>
                </tr>
              </tbody>
                
                
            </table>
            
            <div slot="message" class="row justify-center" style="margin-bottom: 50px;">
              <q-spinner-dots :size="40" />
            </div>
          </q-infinite-scroll>
            
        </center>
         
        
        <br><br><br><br>
        
        </div> 
    </div>
  </div>
</template>

<script>
import { FulfillingBouncingCircleSpinner } from 'epic-spinners'    
import { Loading, Toast, date } from 'quasar'
import axios from 'axios'
  
let dt = date
const hoje = new Date()
var moment = require('moment');
require("moment/min/locales.min");
moment.locale('pt-br');
    
const API = localStorage.getItem('wsAtual')


//debug
//const API = 'http://192.168.0.200:29755/' 

export default {
  data () {
    return {
      canGoBack: window.history.length > 1,
      idCaixa: '',
      caixa: [],
      periodo: '',
      formas: [],
      forma: '',
      fluxoCaixa: [],
      vendedores: [],
      dataInicial: moment(dt.startOfDate(hoje, 'month')).format('YYYY-MM-DDTHH:mm:SS'),
      dataFinal: moment(dt.endOfDate(hoje, 'month')).format('YYYY-MM-DDTHH:mm:SS'),
      vendedor: '',
      opened: true,
      itens: [],
      opcoes: 'todas',
      visivel: false,
      actualMaxPosition: 5,

      //datatime
      dias: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
      meses: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],

    }
  },
  computed: {
    listaVendedores(){
        let a = this.vendedores
        let lista = []

        for (let i=0; i < a.length; i++) {
            let n = a[i].nome
            let c = a[i].codigoIdentificacao
            lista.push({label: n, value: c})    
        }
        //console.log(lista)
        return lista

    },
    listaCaixas(){
      let a = this.caixa
      let lista = []
      let di, df = ''

      for (let i in a){
          if(a[i].usuario){
              di = new Date(a[i].dataInicio).toLocaleString('pt-BR', {year: 'numeric',month: '2-digit',day: '2-digit'})
              if(a[i].dataFechamento !== null){
                df = new Date(a[i].dataFechamento).toLocaleString('pt-BR', {year: 'numeric',month: '2-digit',day: '2-digit'})
              }
              else {
                df = ''
              }
              let n = 'Inicio: ' + di + ' - Fechamento: ' + df
              let c = a[i].codigo
              lista.unshift({label: n, value: c})
          }
      }
      
      return lista
    },
    listaFormas(){
      let a = this.formas
      let lista = []

      lista = a.map(row => ({
          label: row.nome, 
          value: row.codigo
      }))

      return lista

    },
    showingData () {
      return this.fluxoCaixa.caixas.slice(0, this.actualMaxPosition)
    }

  },
  filters:{
    date: function(value){
      return moment(value).format('DD/MM/YY - HH:mm:SS')
    }
  },
  methods:{
    loadMore (index, done) {
      setTimeout(() => {
        this.actualMaxPosition += 5
        done()
      }, 2500)
    },
    goBack(){
      window.history.go(-1)
    },
    listarVendedores(){
      Loading.show({
          spinner: FulfillingBouncingCircleSpinner,
          spinnerSize: 140,
          message: 'Aguardando Dados...'
      })
      axios.get(API + 'usuario/obterUsuario')
      .then((res)=>{
        Loading.hide()
        this.vendedores = res.data
        //console.log(res.data)
      })
      .catch((e)=>{
        Loading.hide()
        console.log(e)
      })
    },
    listarFormas(){
      Loading.show({
          spinner: FulfillingBouncingCircleSpinner,
          spinnerSize: 140,
          message: 'Aguardando Dados...'
      })
      axios.get(API + 'conta/obterFormasPgto')
      .then((res)=>{
        Loading.hide()
        this.formas = res.data
        //console.log(res.data)
      })
      .catch((e)=>{
        Loading.hide()
        console.log(e)
      })
    },
    getCaixa(){
      Loading.show({
          spinner: FulfillingBouncingCircleSpinner,
          spinnerSize: 140,
          message: 'Aguardando Dados...'
      })
      axios.get(API + 'caixa/obterCaixaCab?aberto=true')
      .then((res)=>{
        Loading.hide()
        //console.log(res.data)
        this.caixa = res.data
      })
      .catch((e)=>{
        Loading.hide()
        console.log(e.response)
        Toast.create('Não há dados para exibir')
      })
    },
    getFluxo(){
      if(this.dataInicial === ''){
          Toast.create.negative('Selecione um período antes')
          return
      }
      
      let caixa = ''
      if(this.idCaixa !== ''){
        caixa = '&codigoCaixaPeriodo=' + this.idCaixa
      }
      
      let operador = ''
      if(this.vendedor !== ''){
        caixa = '&codigoUsuario=' + this.vendedor
      }
      
      let forma = ''
      if(this.forma !== ''){
        caixa = '&CodFormaPgto=' + this.forma
      }
      
      let opcoes = ''
      if(this.opcoes !== 'todas'){
        opcoes = '&' + this.opcoes + '=true'
      }
      
      Loading.show({
        spinner: FulfillingBouncingCircleSpinner,
        spinnerSize: 140,
        message: 'Aguardando Dados...'
      })
      axios.get(API + 'relatorio/obterFluxoCaixa?' +
              'dataInicial=' + this.dataInicial +
              '&dataFinal=' + this.dataFinal + 
              opcoes + caixa + operador + forma)
      .then((res)=>{
          console.log('Fluxo de Caixa:', res.data)
          this.fluxoCaixa = res.data
          if(this.fluxoCaixa.value){
              Toast.create.negative(this.fluxoCaixa.value)
              return
          }
          this.opened = false
          this.visivel = true
          Loading.hide()
      })
      .catch((e)=>{
          console.log(e)
          console.log(e.response)
          Loading.hide()
      })
    },
    collapse(){
      if(this.opened === true){
          this.opened = false
      }
      else{
          this.opened = true
      }
    },
  },
  created(){
    let t = this
    t.getCaixa()
    t.listarVendedores()
    t.listarFormas()
}
}
</script>
