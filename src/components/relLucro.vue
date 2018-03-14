<template>
  <div>
    
    <h5>Lucro</h5>
    <!-- Botão flutuante -->
    <q-fixed-position class="over" corner="bottom-left" :offset="[18, 18]">
        <q-btn 
           round
           color="primary" 
           @click="goBack">
           <q-icon name="chevron_left" />
        </q-btn>
    </q-fixed-position>
    <q-fixed-position class="over" corner="bottom-right" :offset="[18, 24]">
        <q-btn 
           rounded
           color="primary" 
           @click="pdf"
           v-if="lucro"    
           >
           imprimir
        </q-btn>
    </q-fixed-position>

    <div id="lista">
        <q-collapsible :opened="opened" 
                     icon="filter_list" 
                     label="Filtros"
                     >
                     
            <q-radio v-model="ordem" val="PorReais" label="Ordenar por mais vendidos em reais" /><br>
            <q-radio v-model="ordem" val="PorQtd" label="Ordenar por quantidade vendida" /><br>
            <q-radio v-model="ordem" val="PorNome" label="Ordenar por nome" />
               
            <div class="row">
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
                <div class="col-md-6">
                    <q-select
                      v-model="familia"
                      float-label="Família"
                      :options="listaFamiliasProdutos"
                      filter
                    />
                </div>
            </div>
            <div class="row">

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
                   @click="getLucro"
                   rounded
                   style="margin-bottom: 20px"
                   >
                   Visualizar</q-btn>  

        </q-collapsible>
        
        
         
        <br>
        
      <div v-if="visivel">
         
        <center>
            <h4>Totais Gerais</h4>
            
            {{lucro.periodo}} <br>
            
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
        
      
      <div id="printable" v-show="false">
         
        <center>
            <h4>Totais Gerais</h4>
            
            {{lucro.periodo}} <br>
            
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
          
        <table border="1"
               style="border: 1px solid;
                      border-collapse: collapse;
                      width: 100%;">
          <thead>
            <tr>
              <th class="text-center">Cód. Barras</th>
              <th class="text-center">Nome Produto</th>
              <th class="text-center">Qtd.</th>
              <th class="text-center">Preço</th>
              <th class="text-center">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in lucro.vDet">
              <td class="text-center" style="padding: 5px;">{{item.codBarra}}</td>
              <td class="text-center" style="padding: 5px;">{{item.nomeProduto}}</td>
              <td class="text-center" style="padding: 5px;">{{item.qtd}}</td>
              <td class="text-center" style="padding: 5px;">{{item.venda | formatMoney}}</td>
              <td class="text-center" style="padding: 5px;">{{item.totalItem | formatMoney}}</td>
            </tr>
          </tbody>
        </table>
        
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
          lucro: '',
          familias: [],
          vendedores: [],
          dataInicial: moment(dt.startOfDate(hoje, 'month')).format('YYYY-MM-DDTHH:mm:SS'),
          dataFinal: moment(dt.endOfDate(hoje, 'month')).format('YYYY-MM-DDTHH:mm:SS'),
          agrup: '', // agrp: cat, marca, familia, ordem alfab.
          familia: '',
          vendedor: '',
          produto: '',
          codTipo: '',
          composicao: false,
          opened: true,
          Produtos: [],
          itens: [],
          formas: [],
          ordem: 'PorReais',
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
              label: 'Total',
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
      listaFamiliasProdutos: function () {
          let a = this.familias
          let lista = []
          
          lista = a.map(row => ({
              label: row.nome, 
              value: row.codigo
          }))
          
          //console.log(lista)
          return lista
      },
      listaProdutos: function () {
          let a = this.Produtos
          let lista = []

          for (let i=0; i < a.length; i++) {
              let n = a[i].nome
              let c = a[i].codigo
              lista.push({label: n, value: c})    
          }
          //console.log(lista)
          return lista
      },
      listaVendedores: function () {
          let a = this.vendedores
          let lista = []

          for (let i=0; i < a.length; i++) {
              let n = a[i].nome
              let c = a[i].codigoIdentificacao
              lista.push({label: n, value: c})    
          }
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
      getLucro(){
        if(this.dataInicial === ''){
            Toast.create.negative('Selecione um período antes')
            return
        }
        
        let tipo = ''
        if(this.codTipo !== ''){
            tipo = '&codTipo=' + this.codTipo
        }
        let fam = ''
        if(this.familia !== ''){
            fam = '&codFamilia=' + this.familia
        }
        
        Loading.show({
          spinner: FulfillingBouncingCircleSpinner,
          spinnerSize: 140,
          message: 'Aguardando Dados...'
        })
        axios.get(API + 'relatorio/obterRptProdutosPorML?' +
                'dataInicial=' + this.dataInicial +
                '&dataFinal=' + this.dataFinal + 
                fam + tipo +
                '&' + this.ordem + '=true')
        .then((res)=>{
            console.log(res.data)
            this.lucro = res.data
            if(this.lucro.value){
                Toast.create.negative(this.lucro.value)
                return
            }
            this.itens = this.lucro.vDet
            this.opened = false
            this.visivel = true
            Loading.hide()
        })
        .catch((e)=>{
            console.log(e.response)
            Loading.hide()
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
      collapse(){
        if(this.opened === true){
            this.opened = false
        }
        else{
            this.opened = true
        }
      },
      pdf(){
        var printContents = document.getElementById('printable').innerHTML
        var w = window.open();
        self.focus();
        w.document.open();
        w.document.write('<'+'html'+'><'+'body'+'>');
        w.document.write('<center><h2>Relatório de Lucro</h2></center>');
        w.document.write(printContents);
        w.document.write('<'+'/body'+'><'+'/html'+'>');
        w.document.close();
        w.print();
        w.close();
      },
    },
  created(){
      let t = this
      t.listarFamilias()
  }
}
</script>

<style>
    .over{
        z-index: 5
    }
</style>
