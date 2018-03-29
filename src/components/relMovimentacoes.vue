<template>
  <div>
    
    <h5>Movimentações</h5>
    <!-- Botão flutuante -->
    <q-fixed-position class="over" corner="bottom-left" :offset="[18, 18]">
        <q-btn 
           round
           color="primary" 
           @click="goBack">
           <q-icon name="chevron_left" />
        </q-btn>
    </q-fixed-position>
    <q-fixed-position class="over" corner="bottom-right" :offset="[18, 25]" v-if="visivel">
        <q-btn color="primary"
               @click="pdf"
               rounded
               >
               imprimir
        </q-btn> 
    </q-fixed-position>

    <div id="lista">
      <q-collapsible :opened="filtroColap" 
                     icon="filter_list" 
                     label="Filtros"
                     >
        <div class="row">
            <div class="col">
                <q-select
                  v-model="tipoMov"
                  float-label="Tipo Movimentação"
                  :options="listaMovs"
                />
            </div>
            <div class="col-xs-12 col-md-6" v-if="tipoMov === 2">
                <q-select
                  v-model="tipoSai"
                  float-label="Tipo Saída"
                  :options="[
                    {
                        label:'SAIDA MANUAL',
                        value:'SAIDA MANUAL'
                    },
                    {
                        label:'TRANSFERENCIA',
                        value:'TRANSFERENCIA'
                    },
                    {
                        label:'OUTRAS SAIDAS',
                        value:'OUTRAS SAIDAS'
                    }
                  ]"
                  filter
                  clearable
                />
            </div>
            <div class="col-xs-12 col-md-6" 
                 v-if="tipoMov === 6"
                 style="margin-top: 10px">
                <q-radio  v-model="excluido"
                          val=false
                          label="Ver pedidos cancelados"
                          style="margin-left: 15px"
                          />
                <q-radio  v-model="excluido"
                          val=true
                          label="Ver notas canceladas"
                          style="margin-left: 15px"
                          />
            </div>
        </div>
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
        
        
        
        <q-btn color="primary"
               @click="getMD"
               rounded
               style="margin-bottom: 20px"
               >
               Visualizar</q-btn>  
        
      </q-collapsible>
   
    <!--movimentações-->
    <div v-if="visivel">
         
        <center>
            <h4>Totais Gerais</h4>
            
            {{ relMovs.periodo }}<br>
            
            <table class="q-table">
              <thead>
                <tr>
                  <th class="text-center">Custo</th>
                  <th class="text-center">Venda</th>
                  <th class="text-center">Lucro</th>
                  <th class="text-center">Percentual</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="text-center">{{relMovs.totalCusto | formatMoney}}</td>
                  <td class="text-center">{{relMovs.totalVenda | formatMoney}}</td>
                  <td class="text-center">{{relMovs.lucroRS | formatMoney}}</td>
                  <td class="text-center">{{relMovs.percLucro | formatPerc}}</td>
                </tr>
              </tbody>
            </table>
            
        </center><br>
          
        <q-data-table
          :data="pedidos"
          :config="config"
          :columns="colunas"
          @selection="selection"
          style="background-color:white;"
        >
        </q-data-table>
        <center><q-pagination v-model="page" :max="maxPages" @change="getMD"/></center>



        <!-- itens -->
        <q-collapsible
          label="itens"
          icon="local_mall"
          style="background-color:white;
                 margin-bottom:20px;"
          class="shadow-2"
          :opened="itensCollap"
        >
            <q-data-table
              :data="itens"
              :config="config2"
              :columns="colunas2"
              style="background-color:white;"
            >
            </q-data-table>
          
        </q-collapsible>
      
        <q-card v-if="tipoMov === 6">
          <q-card-title>
            Motivo do cancelamento:
          </q-card-title>
          <q-card-separator />
          <q-card-main>
            {{obs}}
          </q-card-main>
        </q-card>
        
        <br><br><br><br>
        
    </div>
    <div id="printable" v-show="false">
         
        <center>
            <h4>Totais Gerais</h4>
            
            {{ relMovs.periodo }}<br>
            
            <table class="q-table">
              <thead>
                <tr>
                  <th class="text-center">Custo</th>
                  <th class="text-center">Venda</th>
                  <th class="text-center">Lucro</th>
                  <th class="text-center">Percentual</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="text-center">{{relMovs.totalCusto | formatMoney}}</td>
                  <td class="text-center">{{relMovs.totalVenda | formatMoney}}</td>
                  <td class="text-center">{{relMovs.lucroRS | formatMoney}}</td>
                  <td class="text-center">{{relMovs.percLucro | formatPerc}}</td>
                </tr>
              </tbody>
            </table>
            
        </center><br>
      
        <div v-for="(item, index) in pedidos" :key="index">
          <div class="row">
            <div class="col-auto text-center">
              <strong>Nº Nota:</strong> {{item.numeroCupom}}
            </div>
            <div class="col-auto text-center">
              <strong>Total Custo:</strong> {{item.totalCusto | formatMoney}}
            </div>
            <div class="col-auto text-center">
              <strong>Total Venda:</strong> {{item.totalVenda | formatMoney}}
            </div>
            <div class="col-auto text-center">
              <strong>Qtd.:</strong> {{item.totalQtde}}
            </div>
            <div class="col-auto text-center">
              <strong>Total:</strong> {{item.total | formatMoney}}
            </div>
          </div>
          
        
        
          <table border="1" style="width:100%; border-collapse: collapse;">
            <thead>
              <tr>
                <th class="text-left">Cód. Barras</th>
                <th class="text-left">Produto</th>
                <th class="text-left">Custo</th>
                <th class="text-left">Venda</th>
                <th class="text-left">Quantidade</th>
                <th class="text-left">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in pedidos[index].itens">
                <td class="text-left" style="padding: 5px;">{{item.codBarra}}</td>
                <td class="text-left" style="padding: 5px;">{{item.nomeProduto}}</td>
                <td class="text-right" style="padding: 5px;">{{item.custo | formatMoney}}</td>
                <td class="text-right" style="padding: 5px;">{{item.venda | formatMoney}}</td>
                <td class="text-right" style="padding: 5px;">{{item.qtd}}</td>
                <td class="text-right" style="padding: 5px;">{{item.totalItem | formatMoney}}</td>
              </tr>
            </tbody>
          </table>
          
          <q-card v-if="tipoMov === 6">
            <q-card-title>
              Motivo do cancelamento:
            </q-card-title>
            <q-card-separator />
            <q-card-main>
              {{obs}}
            </q-card-main>
          </q-card>

          <hr>
          
        </div>
        
        <br><br><br><br>
        
    </div>
    
    </div>
  </div>
</template>

<script>
import { FulfillingBouncingCircleSpinner } from 'epic-spinners'    
import { Loading, Toast, clone, date } from 'quasar'
import axios from 'axios'
  
let dt = date
const hoje = new Date()
var moment = require('moment');
require("moment/min/locales.min");
moment.locale('pt-br');
    
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
      tipoMovs: [],
      relMovs: '',
      clientes: [],
      pedidos: [],
      itens: [],
      itensCollap: false,
      Produtos: [], 
      dataInicial: moment(dt.startOfDate(hoje, 'month')).format('YYYY-MM-DDTHH:mm:SS'),
      dataFinal: moment(dt.endOfDate(hoje, 'month')).format('YYYY-MM-DDTHH:mm:SS'),
      tipoMov: 1,
      tipoSai: '',
      excluido: false,
      cliente: '',
      produto: '',
      codTipo: '',
      composicao: '',
      filtroColap: true,
      text: '',
      visivel: false,
      obs: '',
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
        selection: 'single',
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
          label: 'N. Nota',
          field: 'numeroCupom',
          filter: true,
          sort: true,
          type: 'number',
          width: '100px'
        },
        {
          label: 'Total Custo',
          field: 'totalCusto',
          sort: true,
          filter: true,
          type: 'number',
          width: '80px',
          format (value) {
            let x = numberToReal(value);
            return x
          }
        },
        {
          label: 'Total Venda',
          field: 'totalVenda',
          sort: true,
          filter: true,
          type: 'number',
          width: '80px',
          format (value) {
            let x = numberToReal(value);
            return x
          }
        },
        {
          label: 'Qtd.',
          field: 'totalQtde',
          sort: true,
          filter: true,
          type: 'number',
          width: '60px'
        },
        {
          label: 'Total',
          field: 'total',
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
      config2: {
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
          rowsPerPage: 5,
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
      colunas2: [
        {
          label: 'Codigo',
          field: 'codigoProduto',
          filter: true,
          sort: true,
          type: 'number',
          width: '90px'
        },
        {
          label: 'Cod Barras',
          field: 'codBarra',
          filter: true,
          sort: true,
          type: 'number',
          width: '90px'
        },
        {
          label: 'Produto',
          field: 'nomeProduto',
          filter: true,
          sort: true,
          type: 'string',
          width: '100px'
        },
        {
          label: 'Custo',
          field: 'custo',
          sort: true,
          filter: true,
          type: 'number',
          width: '80px',
          format (value) {
            let x = numberToReal(value);
            return x
          }
        },
        {
          label: 'Valor',
          field: 'venda',
          sort: true,
          filter: true,
          type: 'number',
          width: '80px',
          format (value) {
            let x = numberToReal(value);
            return x
          }
        },
        {
          label: 'Qtd.',
          field: 'qtd',
          sort: true,
          filter: true,
          type: 'number',
          width: '60px'
        },
        {
          label: 'Total',
          field: 'totalItem',
          sort: true,
          filter: true,
          type: 'number',
          width: '80px',
          format (value) {
            let x = numberToReal(value);
            return x
          }
        },
        {
          label: 'Nº Nota',
          field: 'numeroCupom',
          sort: true,
          filter: true,
          type: 'number',
          width: '90px'
        },

      ],
      pagination: (localStorage.getItem('pagination') === 'true'),
      rowHeight: parseInt(localStorage.getItem('rowHeight')),
      bodyHeightProp: localStorage.getItem('bodyHeightProp'),
      bodyHeight: parseInt(localStorage.getItem('bodyHeight')),

      //datatime
      dias: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
      meses: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],

      //tabela
      misc: 'highlight', //[{value: 'bordered'},{value: 'highlight'}]
      separator: 'cell', // none, horizontal, vertical, cell
      stripe: 'odd', // none, odd, even
      type: 'none', // flipped, responsive
      gutter: 'none', // compact, loose
      
      //pagination
      page: 1,
      minPages: 1,
      maxPages: ''

    }
  },
  computed: {
    listaClientes(){
        let a = this.clientes
        let lista = []

        lista = a.map(row => ({
            label: row.nome, 
            value: row.codigo
        }))

        //console.log(lista)
        return lista
    },
    listaMovs(){
        let a = this.tipoMovs
        let lista = []

        lista = a.map(row => ({
            label: row.nome, 
            value: row.codigo
        }))

        //console.log(lista)
        return lista
    },
    listaProdutos(){
        let a = this.Produtos
        let lista = []

        lista = a.map(row => ({
            label: row.nome, 
            value: row.codigo
        }))

        //console.log(lista)
        return lista
    },
    listaVendedores(){
          let a = this.vendedores
          let lista = []
          
          lista = a.map(row => ({
              label: row.nome, 
              value: row.codigoIdentificacao
          }))
          
          //console.log(lista)
          return lista
    
      },
    computedClasses(){
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
  filters:{
      formatPerc: function (value) {
        if(!value){return '0,00 %'}
            function numberToReal(numero) {
                numero = numero.toFixed(2).split('.');
                numero[0] = numero[0].split(/(?=(?:...)*$)/).join('.');
                return numero.join(',') + ' %';
            }
            let x = numberToReal(value);
            return x
      }
  },
  methods:{
      goBack(){
        window.history.go(-1)
      },
      getMD(){
        if(this.dataInicial === ''){
            Toast.create.negative('Selecione um período antes')
            return
        }
        
        let tipoSai = ''
        if(this.tipoSai !== ''){
            tipoSai = '&tipoSaida=' + this.tipoSai
        }
        let c = ''
        if(this.cliente !== ''){
            c = '&codCliente=' + this.cliente
        }  
        let p = ''
        if(this.produto !== ''){
            p = '&codProduto=' + this.produto
        }
        let excluido = ''
        if(this.excluido){
            excluido = '&excluido=' + this.excluido
        }
        
        Loading.show({
          spinner: FulfillingBouncingCircleSpinner,
          spinnerSize: 140,
          message: 'Aguardando Dados...'
        })
        axios.get(API + 'relatorio/obterRptMovDiversas?' +
                'dataInicial=' + this.dataInicial +
                '&dataFinal=' + this.dataFinal + 
                '&CodTipoMovimentacao=' + this.tipoMov +
                tipoSai + c + p + excluido +
                '&pagina=' + this.page)
        .then((res)=>{
            Loading.hide()
            console.log(res.data)
            this.relMovs = res.data
            this.pedidos = this.relMovs.pedidos
            this.maxPages = Math.ceil(parseInt(this.relMovs.qtdRegistros) / 20)
            this.visivel = true
            this.obs = ''
            this.filtroColap = false
        })
        .catch((e)=>{
            console.log(e.response)
            console.log('erro')
            Loading.hide()
            this.filtroColap = false
        })
      },
      listarClientes(){
          Loading.show({
              spinner: FulfillingBouncingCircleSpinner,
              spinnerSize: 140,
              message: 'Aguardando Dados...'
          })
          axios.get(API + 'pessoa/obterpessoa?todos=true')
          .then((res)=>{
            Loading.hide()
            this.clientes = res.data
          })
          .catch((e)=>{
            Loading.hide()
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
      listarMovs(){
          Loading.show({
              spinner: FulfillingBouncingCircleSpinner,
              spinnerSize: 140,
              message: 'Aguardando Dados...'
          })
          axios.get(API + 'vendascab/obterVendasCabOP')
          .then((res)=>{
            Loading.hide()
            this.tipoMovs = res.data
            //console.log(res.data)
          })
          .catch((e)=>{
            Loading.hide()
            console.log(e)
          })
      },
      collapse(){
        if(this.filtroColap === true){
            this.filtroColap = false
        }
        else{
            this.filtroColap = true
        }
      },
      selection (number, rows) {
          console.log(number)
          console.log(rows)
          if(rows.length > 0){
            this.itens = rows[0].data.itens
            this.obs = rows[0].data.obs
            this.itensCollap = true
          }
          else {
            this.itens = []
            this.itensCollap = false
          }
          
      },
      pdf(){
        var printContents = document.getElementById('printable').innerHTML
        var w = window.open();
        self.focus();
        w.document.open();
        w.document.write('<'+'html'+'><'+'body'+'>');
        w.document.write('<center><h3>Movimentações por Período</h3></center>');
        w.document.write(printContents);
        w.document.write('<'+'/body'+'><'+'/html'+'>');
        w.document.close();
        w.print();
        w.close();
      },
  },
  created(){
      let t = this
      t.listarClientes()
      t.listarVendedores()
      t.todosProdutos()
      t.listarMovs()
  }
}
</script>

<style>
  #itens {
    font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }

  #itens td, #itens th {
    border: 1px solid #ddd;
    padding: 8px;
  }

  #itens tr:nth-child(even){background-color: #f2f2f2;}

  #itens tr:hover {background-color: #ddd;}

  #itens th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #4CAF50;
    color: white;
  }
  
  .over{
      z-index: 5;
  }
</style>
