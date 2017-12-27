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
        <center v-if="visivel">
           
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



        <!-- Configurações -->
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
  </div>
</template>

<script>
    
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
          vendas: [],
          totalizadores: '',
          formas: [],
          formasVendedor: [],
          dataInicial: '',
          dataFinal: '',
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
          
        Loading.show({message: 'Aguardando Dados...'})
        axios.get(API + 'relatorio/obterRptPorFormaPgto?' +
                'dataInicial=' + this.dataInicial +
                '&dataFinal=' + this.dataFinal + f)
        .then((res)=>{
            //console.log(res.data)
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
          Loading.show({message: 'Aguardando Dados...'})
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
      selection (number, rows) {
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
