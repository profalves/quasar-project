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
            <h4>Totais Gerais</h4>
            
            
            <table class="q-table responsive">
              <thead>
                <tr>
                  <th class="text-center">Custo Total</th>
                  <th class="text-center">Venda Total</th>
                  <th class="text-center">Lucro</th>
                  <th class="text-center">ML Média</th>
                  <th class="text-center">Total Vendido</th>
                  <th class="text-center">Qtde Vendida</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td data-th="Custo Total" class="text-center">{{lucro.totalCusto | formatMoney}}</td>
                  <td data-th="Venda Total" class="text-center">{{lucro.totalVendas | formatMoney}}</td>
                  <td data-th="Lucro" class="text-center">{{lucro.lucroRS | formatMoney}}</td>
                  <td data-th="ML Média" class="text-center">{{lucro.mlMedia | formatPerc}}</td>
                  <td data-th="Total Vendido" class="text-center">{{lucro.totalItensVendidos | formatMoney}}</td>
                  <td data-th="Qtde Vendida" class="text-center">{{lucro.qtdVendida}}</td>
                </tr>
              </tbody>
            </table>
            
        </center>
         
        <br><br>
          
        <q-data-table
          :data="itens"
          :config="config"
          :columns="colunas"
          style="background-color:white;"
        >
        </q-data-table>



        <!-- Configurações -->
        <q-collapsible
          label="Opções"
          icon="settings"
          style="background-color:white;
                 margin-bottom:20px;"
          class="shadow-2"
        >

          <q-field
            icon="widgets"
            label="Recursos"
            :label-width="4"
          >
            <div class="column group" style="margin: -5px -7px">
              <q-checkbox v-model="config.refresh" label="Atualizar tabela (refresh)" />
              <q-checkbox v-model="config.columnPicker" label="Selecionar colunas" />
              <q-checkbox v-model="pagination" label="Paginação" />
              <q-checkbox v-model="config.responsive" label="Responsiva" />
              <q-checkbox v-model="config.noHeader" label="Sem Cabeçário" />
            </div>
          </q-field>

          <q-field
            icon="format_line_spacing"
            label="Altura das linhas"
            :label-width="4"
          >
            <q-slider v-model="rowHeight" :min="50" :max="200" label-always :label-value="`${rowHeight}px` "/>
          </q-field>

          <q-field
            icon="content_paste"
            label="Tamanho"
            :label-width="4"
          >
            <div class="row no-wrap items-center">
              <div class="col-auto" style="margin-top: 10px">
                <q-select
                  v-model="bodyHeightProp"
                  float-label="Style"
                  :options="[
                    {label: 'Auto', value: 'auto'},
                    {label: 'Altura', value: 'height'},
                    {label: 'Altura Min', value: 'minHeight'},
                    {label: 'Altura Max', value: 'maxHeight'}
                  ]"
                />
              </div>
              <q-slider class="col" v-model="bodyHeight" :min="100" :max="700" label-always :disable="bodyHeightProp === 'auto'" :label-value="`${bodyHeight}px`" />
            </div>
          </q-field>
        </q-collapsible>
        
        <br><br><br><br>
        
        </div> 
    </div>
  </div>
</template>

<script>
import { FulfillingBouncingCircleSpinner } from 'epic-spinners'    
import { Loading, Toast, clone } from 'quasar'
import axios from 'axios'
    
function numberToReal(numero) {
  numero = numero.toFixed(2).split('.');
  numero[0] = "R$ " + numero[0].split(/(?=(?:...)*$)/).join('.');
  return numero.join(',');
}
    
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
      dataInicial: '',
      dataFinal: '',
      vendedor: '',
      opened: true,
      itens: [],
      opcoes: 'todas',
      visivel: false,

      //lista
      config: {
        title: '',
        refresh: (localStorage.getItem('refresh') === 'true'),
        noHeader: (localStorage.getItem('noHeader') === 'true'),
        columnPicker: (localStorage.getItem('columnPicker') === 'true'),
        bodyStyle: {
          maxHeight: '500px'
        },
        rowHeight: localStorage.getItem('rowHeight') + 'px',
        responsive: (localStorage.getItem('responsive') === 'true'),
        pagination: {
          rowsPerPage: 15,
          options: [5, 10, 15, 30, 50, 100]
        },
        messages: {
          noData: '<i class="material-icons">warning</i> Não há dados para exibir.',
          noDataAfterFiltering: '<i class="material-icons">warning</i> Sem resultados. Por favor, redefina suas buscas.'
        },
        // (optional) Override default labels. Useful for I18n.
        labels: {
          columns: 'Colunas',
          allCols: 'Todas',
          rows: 'Linhas',
          selected: {
            singular: 'item selecionado.',
            plural: 'itens selecionados.'
          },
          clear: 'limpar seleção',
          search: 'Buscar',
          all: 'Todos'
        }
      },
      colunas: [
        {
          label: 'Cód. Barras',
          field: 'codBarra',
          sort: true,
          filter: true,
          type: 'number',
          width: '100px'
        },
        {
          label: 'Nome',
          field: 'nomeProduto',
          width: '150px',
          sort: true,
          filter: true,
          type: 'string',
          /* sort (a, b) {
            return (new Date(a)) - (new Date(b))
          },
          format (value) {
            return new Date(value).toLocaleString()
          }*/
        },
        {
          label: 'Qtd.',
          field: 'qtd',
          sort: true,
          filter: true,
          type: 'number',
          width: '80px'
        },
        {
          label: 'Preço',
          field: 'venda',
          filter: true,
          sort: true,
          type: 'number',
          width: '80px',
          format (value) {
            let x = numberToReal(value);
            return x
          }
        },
        {
          label: 'total',
          field: 'totalItem',
          filter: true,
          sort: true,
          type: 'number',
          width: '80px',
          format (value) {
            let x = numberToReal(value);
            return x
          }
        },


      ],
      pagination: (localStorage.getItem('pagination') === 'true'),
      rowHeight: parseInt(localStorage.getItem('rowHeight')),
      bodyHeightProp: localStorage.getItem('bodyHeightProp'),
      bodyHeight: parseInt(localStorage.getItem('bodyHeight')),

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

    }

  },
  watch: {
    pagination (value) {
        if (!value) {
          this.oldPagination = clone(this.config.pagination)
          this.config.pagination = false
          return
        }
        this.config.pagination = this.oldPagination
    },
    rowHeight (value) {
        this.config.rowHeight = value + 'px'
    },
    bodyHeight (value) {
        let style = {}
        if (this.bodyHeightProp !== 'auto') {
          style[this.bodyHeightProp] = value + 'px'
        }
        this.config.bodyStyle = style
    },
    bodyHeightProp (value) {
        let style = {}
        if (value !== 'auto') {
          style[value] = this.bodyHeight + 'px'
        }
        this.config.bodyStyle = style
    }
  },
  methods:{
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
      axios.get(API + 'relatório/obterFluxoCaixa?' +
              'dataInicial=' + this.dataInicial +
              '&dataFinal=' + this.dataFinal + 
              opcoes + caixa + operador + forma)
      .then((res)=>{
          console.log(res.data)
          this.fluxoCaixa = res.data
          if(this.fluxoCaixa.value){
              Toast.create.negative(this.fluxoCaixa.value)
              return
          }
          this.itens = '' //relatorios
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
