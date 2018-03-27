<template>
  <div>
    
    <h5>Vendas Por Produtos</h5>
    <!-- Botão flutuante -->
    <q-fixed-position class="over" corner="bottom-left" :offset="[18, 18]">
        <q-btn 
           round
           color="primary" 
           @click="goBack">
           <q-icon name="chevron_left" />
        </q-btn>
    </q-fixed-position>
    <q-fixed-position class="over" corner="bottom-right" :offset="[18, 8]">
        <q-btn color="primary"
               @click="pdf"
               rounded
               style="margin-bottom: 20px"
               v-if="estoque.length > 0"
               >
               imprimir
        </q-btn>
    </q-fixed-position>

    <div id="lista">
      <q-collapsible :opened="opened" 
                     icon="filter_list" 
                     label="Filtros"
                     >
        <div class="row">
            <div class="col-xs-12 col-md-6" v-if="visivel">
                <q-select
                  v-model="vendedor"
                  float-label="Vendedor"
                  :options="listaVendedores"
                  filter
                />
            </div>
            <div class="col">
                <q-select
                    v-model="codTipo"
                    float-label="Tipo de Produto"
                    :options="[
                        {label: 'Mercadoria para Revenda', value: 1},
                        {label: 'Materia Prima', value: 2},
                        {label: 'Item do Sistema', value: 3},
                        {label: 'Mercadoria para Consumo', value: 4},
                        {label: 'Fabricação para Venda', value: 5},
                        {label: 'Venda Casada - Combo de Produtos', value: 6}
                    ]"
                />
            </div>
        </div>
        <div class="row">
            <div class="col">
                <q-select
                  v-model="familia"
                  float-label="Família"
                  :options="listaFamiliasProdutos"
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
        
        <q-select
          v-model="agrup"
          float-label="Agrupar"
          :options="[
                        {label: 'Ordem alfabetica', value: 'Ordem alfabetica'},
                        {label: 'Categoria', value: 'Categoria'},
                        {label: 'Marca', value: 'Marca'},
                        {label: 'Família', value: 'familia'},
                    ]"
        />
        
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
        
        <!--<q-checkbox v-model="composicao" label="Filtrar somente composições de produtos" />--><br><br>
        
        <q-btn color="primary"
               @click="getEstoque"
               rounded
               style="margin-bottom: 20px"
               >
               Visualizar</q-btn>  
        
      </q-collapsible>
   
    <!--periodo-->
      
         
          
        <div v-if="estoque.length > 0">
        
        <q-data-table
          :data="itens"
          :config="config"
          :columns="colunas"
          style="background-color:white;"
        >
        </q-data-table>
        <center><q-pagination v-model="page" :max="maxPages" @change="getEstoque"/></center>
        
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
              <!--<q-checkbox v-model="pagination" label="Paginação" />-->
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
        
        
        <q-card style="background-color:white">
          <q-card-title>
            Formas de Pagamento:
          </q-card-title>
          <q-card-separator />
          <q-card-main>
              
            <table class="q-table">
              <thead>
                <tr>
                  <th class="text-left">Pagamento</th>
                  <th class="text-left">Valor Pago</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in formas">
                  <td class="text-left">{{ item.forma_Pgto }}</td>
                  <td class="text-left">{{ item.valor | formatMoney }}</td>
                </tr>
              </tbody>
            </table> 
              
          </q-card-main>
        </q-card>
        <br><br><br><br>
          
        
        </div>
        
        {{msg}}
      
        <div id="printable" v-show="false">
          <center><h2>Vendas Por Produtos</h2></center>
          
          <table class="q-table" style="margin: 20px">
            <thead>
              <tr>
                <th class="text-left">Cód. Barras</th>
                <th class="text-left">Nome</th>
                <th class="text-left">Qtd.</th>
                <th class="text-left">Preço</th>
                <th class="text-left">Total</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="item in itens">
                <td class="text-left">{{item.codBarra}}</td>
                <td class="text-left">{{item.produto}}</td>
                <td class="text-right">{{item.qtd}}</td>
                <td class="text-right">{{item.valorVenda | formatMoney}}</td>
                <td class="text-right">{{item.totalItem | formatMoney}}</td>
              </tr>
            </tbody>
          </table>
          <hr>
          
          <q-card style="background-color:white; margin: 20px">
            <q-card-title>
              <h3>Formas de Pagamento:</h3>
            </q-card-title>
            <hr>
            <q-card-main>

              <table class="q-table">
                <thead>
                  <tr>
                    <th class="text-left">Pagamento</th>
                    <th class="text-left">Valor Pago</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in formas">
                    <td class="text-left">{{ item.forma_Pgto }}</td>
                    <td class="text-left">{{ item.valor | formatMoney }}</td>
                  </tr>
                </tbody>
              </table> 

            </q-card-main>
          </q-card>

        </div>
      
    </div>
  </div>
</template>

<script>    
import { Loading, Toast, clone, date } from 'quasar'
import axios from 'axios'
import localforage from 'localforage'
import { FulfillingBouncingCircleSpinner } from 'epic-spinners'
  
//datas
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
      estoque: [],
      familias: [],
      vendedores: [],
      dataInicial: moment(dt.startOfDate(hoje, 'month')).format('YYYY-MM-DDTHH:mm:SS'),
      dataFinal: moment(dt.endOfDate(hoje, 'month')).format('YYYY-MM-DDTHH:mm:SS'),
      agrup: 'Ordem alfabetica', // agrp: cat, marca, familia, ordem alfab.
      familia: '',
      vendedor: '',
      produto: '',
      codTipo: '',
      composicao: false,
      opened: true,
      Produtos: [],
      itens: [],
      formas: [],
      permissoes: {},
      visivel: true,
      msg: '',

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
          label: 'Código',
          field: 'codEmpresa',
          filter: true,
          sort: true,
          type: 'string',
          width: '60px'
        },
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
          field: 'produto',
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
          field: 'valorVenda',
          filter: true,
          sort: true,
          type: 'number',
          width: '80px',
          format (value) {
            function numberToReal(numero) {
                numero = numero.toFixed(2).split('.');
                numero[0] = "R$ " + numero[0].split(/(?=(?:...)*$)/).join('.');
                return numero.join(',');
            }
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
            function numberToReal(numero) {
                numero = numero.toFixed(2).split('.');
                numero[0] = "R$ " + numero[0].split(/(?=(?:...)*$)/).join('.');
                return numero.join(',');
            }
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
      
      //pagination
      page: 1,
      minPages: 1,
      maxPages: ''

    }
  },
  computed: {
    listaFamiliasProdutos() {
      let a = this.familias
      let lista = []

      lista = a.map(row => ({
          label: row.nome, 
          value: row.codigo
      }))

      //console.log(lista)
      return lista
    },
    listaProdutos() {
      let a = this.Produtos
      let lista = []

      lista = a.map(row => ({
          label: row.nome, 
          value: row.codigo
      }))

      //console.log(lista)
      return lista
    },
    listaVendedores() {
      let a = this.vendedores
      let lista = []

      lista = a.map(row => ({
        label: row.nome, 
        value: row.codigoIdentificacao
      }))
      
      //console.log(lista)
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
    getEstoque(){
      if(this.dataInicial === ''){
          Toast.create.negative('Selecione um período antes')
          return
      }
      let v = ''
      if(this.vendedor !== ''){
          v = '&codVendedor=' + this.vendedor
      }
      let tipo = ''
      if(this.codTipo !== ''){
          tipo = '&codcodTipo=' + this.codTipo
      }
      let fam = ''
      if(this.familia !== ''){
          fam = '&codFamilia=' + this.familia
      }
      let produto = ''
      if(this.produto !== ''){
          produto = '&codProduto=' + this.produto
      }

      Loading.show({
        spinner: FulfillingBouncingCircleSpinner,
        spinnerSize: 140,
        message: 'Aguardando Dados...'
      })
      axios.get(API + 'relatorio/obterVendasPorProduto?' +
              'dataInicial=' + this.dataInicial +
              '&dataFinal=' + this.dataFinal + 
              fam + v + tipo + produto +
              '&agrupamento=' + this.agrup +
              '&SomenteComposicoes=' + this.composicao +
              '&pagina=' + this.page)
      .then((res)=>{
        console.log(res)
        this.estoque = res.data
        this.itens = this.estoque[0].itens
        this.formas = this.estoque[0].formasPgto
        this.opened = false
        this.maxPages = Math.ceil(parseInt(this.estoque[0].qtdRegistros) / 20)
        console.log('maxPages', this.maxPages);
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
    listarFamilias(){
        Loading.show({
            spinner: FulfillingBouncingCircleSpinner,
            spinnerSize: 140,
            message: 'Aguardando Dados...'
        })
        axios.get(API + 'produto/obterProdutosFamilia')
        .then((res)=>{
          Loading.hide()
          this.familias = res.data
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
          }

      })
      .catch((err) => {
              console.log(err)
              console.log('fail')
      }) 
    },
    pdf(){
      var printContents = document.getElementById('printable').innerHTML
      var w = window.open();
      self.focus();
      w.document.open();
      w.document.write('<'+'html'+'><'+'body'+'>');
      w.document.write(printContents);
      w.document.write('<'+'/body'+'><'+'/html'+'>');
      w.document.close();
      w.print();
      w.close();
    },
  },
  mounted(){
    let t = this
    t.listarVendedores()
    t.listarFamilias()
    t.todosProdutos()
    t.obterPermissoes()
  }
}
</script>

<style>
  .over{
    z-index: 5
  }
</style>
