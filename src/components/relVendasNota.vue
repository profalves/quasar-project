<template>
  <div>
    
    <h5>Vendas por Período de Notas</h5>
    <!-- Botão flutuante -->
    <q-fixed-position class="over" corner="bottom-left" :offset="[18, 18]">
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
            <div class="col">
                <q-select
                  v-model="cliente"
                  float-label="Clientes"
                  :options="listaClientes"
                  filter
                />
            </div>
            <div class="col-xs-12 col-md-6">
                <q-select
                  v-model="produto"
                  float-label="Produto"
                  :options="listaProdutos"
                  filter
                  clearable
                />
            </div>
        </div>
        <div class="row">
            <div class="col" v-if="visivel">
                <q-select
                  v-model="vendedor"
                  float-label="Vendedor"
                  :options="listaVendedores"
                  filter
                />
            </div>
            <div class="col-xs-12 col-md-6">
                <q-checkbox v-model="ocultarCanceladas" 
                            label="Ocultar vendas canceladas"
                            style="margin: 30px 0 0 10px" />
            </div>
            
        </div><br>
        
        <div class="row">
            <div class="col label">
              Número do Cupom  
            </div>
        </div>
        
        <div class="row">
            <div class="col">
              <q-field>
                <q-input
                  type="number"
                  v-model="nCupomDe"
                  float-label="De:"
                />
              </q-field>    
            </div>
            <div class="col">
              <q-field>
                <q-input
                  type="number"
                  v-model="nCupomAte"
                  float-label="Até:"
                />
              </q-field>    
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
        
        <br>
        
        <q-btn color="primary"
               @click="getNotas"
               rounded
               style="margin-bottom: 20px"
               >
               Visualizar</q-btn>  
        
      </q-collapsible>
    </div>
      
  <q-infinite-scroll :handler="loadMore" v-if="notas.length>0">
      
    <q-list v-for="item in showingData" 
            :key="item.cab.codigo"
            style="background-color: white;">
      <q-list-header>Nota Fiscal</q-list-header>
      <q-item>
        <q-item-main>
          <q-item-tile label>{{item.cab.nomePessoaDestina}}</q-item-tile>
          <q-item-tile sublabel>{{item.cab.numeroDocPessoaDestina}}</q-item-tile>
        </q-item-main>
        <q-item-side right>
          <q-item-tile>Data: {{item.cab.dataVenda | formatDate}}</q-item-tile>
        </q-item-side>
      </q-item>
      <q-item>
        <q-item-main>
          <q-item-tile label>Numero da Nota:</q-item-tile>
          <q-item-tile sublabel>{{item.cab.numeroNotaE}}</q-item-tile>
        </q-item-main>
      </q-item>
      <q-item-separator />
      <q-list-header>Produtos</q-list-header>
      <q-item>
        <q-collapsible>
           
           <div id="table">
            <table class="q-table" :class="computedClasses">
              <thead>
                <tr>                  
                  <th class="text-left">Codigo</th>
                  <th class="text-left">Nome</th>
                  <th class="text-left">Qtd.</th>
                  <th class="text-left">Preço</th>
                  <th class="text-left">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="produto in item.det">
                  <td class="text-left">{{produto.codBarra}}</td>
                  <td class="text-left">{{produto.nomeProduto}}</td>
                  <td class="text-right">{{produto.qtd}}</td>
                  <td class="text-right">{{produto.venda | formatMoney}}</td>
                  <td class="text-right">{{produto.totalItem | formatMoney}}</td>
                </tr>
              </tbody>
            </table>
           </div>
               
        </q-collapsible>
      </q-item>
      <q-item-separator />
      <q-list-header>Forma de Pagamento</q-list-header>
      <q-item v-for="forma in item.formasPgto" :key="item.formasPgto.codigo">
        <q-item-main>
          <q-item-tile label>{{forma.forma_Pgto}}</q-item-tile>
        </q-item-main>
        <q-item-side right>
          <q-item-tile>{{forma.valor | formatMoney}}</q-item-tile>
        </q-item-side>
      </q-item>
    </q-list>
      
      <div slot="message"
           v-if="notas.length>0 && notas.length !== showingData.length"
           class="row justify-center" 
           style="margin: 50px;">
        <q-spinner-dots :size="40" />
      </div>
  </q-infinite-scroll>
       
    <br><br><br><br>
        
  </div>
</template>

<script>
import { FulfillingBouncingCircleSpinner } from 'epic-spinners'    
import { Loading, Toast, date } from 'quasar'
import axios from 'axios'
import localforage from 'localforage'
  
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
          notas: [],
          clientes: [],
          Produtos: [], 
          vendedores: [],
          dataInicial: moment(dt.startOfDate(hoje, 'month')).format('YYYY-MM-DDTHH:mm:SS'),
          dataFinal: moment(dt.endOfDate(hoje, 'month')).format('YYYY-MM-DDTHH:mm:SS'),
          nCupomDe: '',
          nCupomAte: '',
          cliente: '',
          vendedor: '',
          produto: '',
          ocultarCanceladas: false,
          opened: true,
          permissoes: '',
          visivel: true,
          actualMaxPosition: 5,
          
          styles: [
            '',
            'bordered',
            'horizontal-separator',
            'vertical-separator',
            'cell-separator',
            'striped-odd',
            'striped-even',
            'highlight',
            'compact',
            'loose',
            'flipped'
          ],
          misc: [],
          separator: 'cell', //none, horizontal, vertical, cell
          stripe: 'odd', //none, odd, even
          type: 'none', //none, flipped, responsive
          gutter: 'none', //none, compact, loose
          
          //datatime
          dias: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
          meses: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],

      }
  },
  computed: {
      computedClasses () {
          let classes = []
          if (this.misc.includes('bordered')) {
            classes.push('bordered')
          }
          if (this.misc.includes('highlight')) {
            classes.push('highlight')
          }
          if (this.separator !== 'none') {
            classes.push(this.separator + '-separator')
          }
          if (this.stripe !== 'none') {
            classes.push('striped-' + this.stripe)
          }
          if (this.type !== 'none') {
            classes.push(this.type)
          }
          if (this.gutter !== 'none') {
            classes.push(this.gutter)
          }
          return classes
      },
      listaClientes(){
          let a = this.clientes
          let lista = []
          
          lista = a.map(row => ({
              label: row.nome, 
              value: row.codigo
          }))
          
          return lista
      },
      listaProdutos(){
          let a = this.Produtos
          let lista = []

          lista = a.map(row => ({
              label: row.nome, 
              value: row.codigo
          }))
          
          return lista
      },
      listaVendedores(){
          let a = this.vendedores
          let lista = []
          
          lista = a.map(row => ({
              label: row.nome, 
              value: row.codigoIdentificacao
          }))
          
          return lista
    
      },
      showingData () {
        return this.notas.slice(0, this.actualMaxPosition)
      }
  },
  filters:{
      notNull: function (value) {
        if(value === null) {
            return 'Não tem'
        }
        else {
            return value
        }
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
      getNotas(){
        if(this.dataInicial === ''){
            Toast.create.negative('Selecione um período antes')
            return
        }
        
        let c = ''
        if(this.cliente !== ''){
            c = '&CodCliente=' + this.cliente
        }
        let p = ''
        if(this.produto !== ''){
            p = '&CodProduto=' + this.produto
        }
        let v = ''
        if(this.vendedor !== ''){
            v = '&CodVendedor=' + this.vendedor
        }
        let NumeroCupomDe = ''
        if(this.nCupomDe !== ''){
            NumeroCupomDe = '&NumeroCupomDe=' + this.nCupomDe
        }
        let NumeroCupomAte = ''
        if(this.nCupomAte !== ''){
            NumeroCupomAte = '&NumeroCupomDe=' + this.nCupomAte
        }
        
        
        Loading.show({
          spinner: FulfillingBouncingCircleSpinner,
          spinnerSize: 140,
          message: 'Aguardando Dados...'
        })
        axios.get(API + 'relatorio/obterRptPorNota?' +
                'dataInicial=' + this.dataInicial +
                '&dataFinal=' + this.dataFinal +
                c + p + v +
                NumeroCupomDe +
                NumeroCupomAte +
                /* [Fiscal]
                '&tipoNota= ' +
                '&CodUsuario=' + 
                '&fiscal=false' + 
                '&tipoNotaE=false' + 
                '&NumeroNotaE=false' + 
                */
                '&ocultarExcluidos=' + this.ocultarCanceladas)
        .then((res)=>{
            //console.log(res.data)
            this.notas = res.data
            this.opened = false
            Loading.hide()
        })
        .catch((e)=>{
            Loading.hide()
            console.log(e.response)
            let error = e.response.data
            console.log(error)
            for(var i=0; error.length; i++){
                Toast.create.negative(error[i].value)
            }
            
        })
      },
      listarClientes(){
          axios.get(API + 'pessoa/obterpessoa?todos=true')
          .then((res)=>{
            this.clientes = res.data
          })
          .catch((e)=>{
            console.log(e)
          })
      },
      todosProdutos(){
          Loading.show({
              spinner: FulfillingBouncingCircleSpinner,
              spinnerSize: 140,
              message: 'Aguardando Dados...'
          })
          axios.get(API + 'produto/obterproduto')
          .then((res)=>{
              Loading.hide()
              //console.log(res.data)
              this.Produtos = res.data 
          })
          .catch((e)=>{
            Loading.hide()
            console.log(e.response)
          })
          
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
      collapse(){
        if(this.opened === true){
            this.opened = false
        }
        else{
            this.opened = true
        }
      },
      obterPermissoes(){
        localforage.getItem('usuario')
        .then((value) => {
            if(value){
                //console.log(value)
                this.permissoes = value
                if(this.permissoes.funcao === "VENDEDOR"){
                    this.vendedor = parseInt(localStorage.getItem('codIdUser'))
                    this.visivel = false
                }
            }
            else{
                console.log(value)
                console.log('Não foi possivel obter as permissões')
            }

        })
        .catch((err) => {
                console.log(err)
                console.log('fail')
        }) 
      }
  },
  mounted(){
      let t = this
      t.listarClientes()
      t.listarVendedores()
      t.todosProdutos()
      t.obterPermissoes()
  }
}
</script>

<style>
    .over{
        z-index: 5;
    }
    .label{
        color: #878B8F;
    }
</style>
