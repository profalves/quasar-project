<template>
  <div>
    
    <h5>Vendas por Forma de Pagamento</h5>
    <!-- Botão flutuante -->
    <q-fixed-position class="over" corner="bottom-left" :offset="[18, 18]">
        <q-btn 
           round
           color="primary" 
           @click="goBack">
           <q-icon name="chevron_left" />
        </q-btn>
    </q-fixed-position>
    <q-fixed-position class="over" corner="bottom-right" :offset="[18, 18]" v-if="visivel">
        <q-btn 
           rounded
           color="primary" 
           @click="pdf">
           imprimir
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
                  v-model="forma"
                  float-label="Forma Pgto"
                  :options="listaFormas"
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
        
        
        
        <q-btn color="primary"
               @click="getVendas"
               rounded
               style="margin-bottom: 20px"
               >
               Visualizar</q-btn>  
        
      </q-collapsible>
      
   
    <!--periodo-->
      <div v-if="visivel">
        
        <center>
           
            <h5>{{totalizadores.vendedor}}</h5>

            <strong>Qtd. Notas:</strong> {{totalizadores.qtdNotas}}<br> 
            <strong>Qtd. Clientes:</strong> {{totalizadores.qtdClientes}}<br>
            <strong>Total Vendas:</strong> {{totalizadores.venda | formatMoney}}<br>
            <strong>Comissão:</strong> {{totalizadores.valorComissao | formatMoney}}<br>
            
            <hr width="60%" />

            <table class="q-table">
              <thead>
                <tr>
                  <th class="text-left">Forma</th>
                  <th class="text-center">Total</th>
                  <th class="text-right">Percentual</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="forma in totalizadores.formasPgto">
                  <td class="text-left">{{forma.formaPgto}}</td>
                  <td class="text-right">{{forma.valorPgto | formatMoney}}</td>
                  <td class="text-right">{{forma.percentual| formatPerc}}</td>
                </tr>
              </tbody>
            </table>

        </center>
        <br> 
        
          
        <q-data-table
          :data="vendas"
          :config="config"
          :columns="colunas"
          @selection="selection"
          style="background-color:white;"
        >
        </q-data-table>
        
        <!-- itens -->
        <q-collapsible
          label="Itens"
          icon="local_mall"
          style="background-color:white;"
          class="shadow-2"
          :opened="open"
        >
          
            <table class="q-table">
              <thead>
                <tr>
                  <th class="text-left">Forma</th>
                  <th class="text-center">Total</th>
                  <th class="text-right">Percentual</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="forma in formasVendedor">
                  <td class="text-left">{{forma.formaPgto}}</td>
                  <td class="text-right">{{forma.valorPgto | formatMoney}}</td>
                  <td class="text-right">{{forma.percentual| formatPerc}}</td>
                </tr>
              </tbody>
            </table>

          
        </q-collapsible>
        
        <br><br><br><br>
        
      </div>  
      <div id="printable" v-show=false>
        
        <center>
           
            <h5>{{totalizadores.vendedor}}</h5>

            <strong>Qtd. Notas:</strong> {{totalizadores.qtdNotas}}<br> 
            <strong>Qtd. Clientes:</strong> {{totalizadores.qtdClientes}}<br>
            <strong>Total Vendas:</strong> {{totalizadores.venda | formatMoney}}<br>
            <strong>Comissão:</strong> {{totalizadores.valorComissao | formatMoney}}<br>
            
            <hr width="60%" />

            <table class="q-table">
              <thead>
                <tr>
                  <th class="text-left">Forma</th>
                  <th class="text-center">Total</th>
                  <th class="text-right">Percentual</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="forma in totalizadores.formasPgto">
                  <td class="text-left">{{forma.formaPgto}}</td>
                  <td class="text-right">{{forma.valorPgto | formatMoney}}</td>
                  <td class="text-right">{{forma.percentual | formatPerc}}</td>
                </tr>
              </tbody>
            </table>
          
        </center>
          
            <hr>
          
        <table border="1"
               style="border-collapse: collapse;
                      width: 100%;">
          <thead>
            <tr>
              <th class="text-left">Vendedor</th>
              <th class="text-center">Qtd. Clientes</th>
              <th class="text-center">Qtd. Notas</th>
              <th class="text-right">Total</th>
              <th class="text-right">Forma</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(venda, index) in vendas">
              <td class="text-left">{{venda.vendedor}}</td>
              <td class="text-left">{{venda.qtdClientes}}</td>
              <td class="text-left">{{venda.qtdNotas}}</td>
              <td class="text-right">{{venda.venda | formatMoney}}</td>
              <td v-for="forma in vendas[index].formasPgto" :key="forma.$id">
                <div>Forma: {{forma.formaPgto}}</div>
                <div>Total: {{forma.valorPgto | formatMoney}}</div>
                <div>Percentual: {{forma.percentual | formatPerc}}</div>
                <br>
              </td>
            </tr>
          </tbody>
        </table>
        
      </div>  
    </div>
  </div>
</template>

<script>
    
import { Loading, Toast, clone, date } from 'quasar'
import axios from 'axios'
import { FulfillingBouncingCircleSpinner } from 'epic-spinners'
  
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
          vendas: [],
          totalizadores: '',
          formas: [],
          formasVendedor: [],
          dataInicial: moment(dt.startOfDate(hoje, 'month')).format('YYYY-MM-DDTHH:mm:SS'),
          dataFinal: moment(dt.endOfDate(hoje, 'month')).format('YYYY-MM-DDTHH:mm:SS'),
          forma: '',
          opened: true,
          visivel: false,
          open: false,
          
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
              label: 'Vendedor',
              field: 'vendedor',
              filter: true,
              sort: true,
              type: 'string',
              width: '120px'
            },
            {
              label: 'qtd. Clientes',
              field: 'qtdClientes',
              sort: true,
              filter: true,
              type: 'number',
              width: '100px'
            },
            {
              label: 'qtd. Notas',
              field: 'qtdNotas',
              sort: true,
              filter: true,
              type: 'number',
              width: '100px'
            },
            {
              label: 'Total',
              field: 'venda',
              width: '150px',
              sort: true,
              filter: true,
              type: 'number',
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
        
          //pagination
          page: 1,
          minPages: 1,
          maxPages: ''

      }
  },
  computed: {
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
      getVendas(){
        if(this.dataInicial === ''){
          Toast.create.negative('Selecione um período antes')
          return
        }
        
        let f = ''
        if(this.forma !== ''){
          f = '&CodFormaPgto=' + this.forma
        }
          
        Loading.show({
          spinner: FulfillingBouncingCircleSpinner,
          spinnerSize: 140,
          message: 'Aguardando Dados...'
        })
        axios.get(API + 'relatorio/obterRptPorFormaPgto?' +
                'dataInicial=' + this.dataInicial +
                '&dataFinal=' + this.dataFinal + f +
                '&pagina=' + this.page)
        .then((res)=>{
            console.log(res)
            this.vendas = res.data
            this.totalizadores = this.vendas.shift()
            this.opened = false
            this.visivel = true
            Loading.hide()
        })
        .catch((e)=>{
            console.log(e.response)
            Loading.hide()
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
      collapse(){
        if(this.opened === true){
            this.opened = false
        }
        else{
            this.opened = true
        }
      },
      selection(number, rows){
          console.log(`selected ${number}: ${rows}`)
          //console.log(rows)
          if(rows.length > 0){
            this.open = true
            this.formasVendedor = rows[0].data.formasPgto
          }
          else {
            this.open = false
          }
          
      },
      pdf(){
          var printContents = document.getElementById('printable').innerHTML
          var w = window.open();
          self.focus();
          w.document.open();
          w.document.write('<'+'html'+'><'+'body'+'>');
          w.document.write('<center><h2>Vendas por Forma de Pagamento</h2></center>');
          w.document.write(printContents);
          w.document.write('<'+'/body'+'><'+'/html'+'>');
          w.document.close();
          w.print();
          w.close();
          }
  },
  created(){
      let t = this
      t.listarFormas()
  }
}
</script>

<style>
    .over{
        z-index: 5;
    }
</style>
