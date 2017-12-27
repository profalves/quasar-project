<template>
  <div>
    
    <h5>Vendas por Cliente</h5>
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
                  v-model="vendedor"
                  float-label="Vendedor"
                  :options="listaVendedores"
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
        <center>
           <h5>{{totalizadores.vendedor}}</h5>
           
           <strong>Qtd. Notas:</strong> {{totalizadores.qtdNotas}}<br> 
           <strong>Qtd. Clientes:</strong> {{totalizadores.qtdClientes}}<br>
           <strong>Total Vendas:</strong> {{totalizadores.totalVenda | formatMoney}}<br>
           <strong>Comissão:</strong> {{totalizadores.comissaoVendedor | formatMoney}}<br>
        </center>
        <br> 
        
          
        <q-data-table
          :data="vendas"
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
          vendedores: [],
          dataInicial: '',
          dataFinal: '',
          vendedor: '',
          opened: true,
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
              label: 'Vendedor',
              field: 'vendedor',
              filter: true,
              sort: true,
              type: 'string',
              width: '120px'
            },
            {
              label: 'Cliente',
              field: 'cliente',
              filter: true,
              sort: true,
              type: 'string',
              width: '200px'
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
              field: 'totalVenda',
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
      listaVendedores(){
          let a = this.vendedores
          let lista = []
          
          lista = a.map(row => ({
              label: row.nome, 
              value: row.codigoIdentificacao
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
        
        let v = ''
        if(this.vendedor !== ''){
            v = '&codVendedor=' + this.vendedor
        }
          
        Loading.show({message: 'Aguardando Dados...'})
        axios.get(API + 'relatorio/obterRptPorCliente?' +
                'dataInicial=' + this.dataInicial +
                '&dataFinal=' + this.dataFinal + v)
        .then((res)=>{
            //console.log(res.data)
            this.vendas = res.data
            this.totalizadores = this.vendas.shift()
            this.opened = false
            Loading.hide()
        })
        .catch((e)=>{
            console.log(e.response)
            Loading.hide()
        })
      },
      listarVendedores(){
          Loading.show({message: 'Aguardando Dados...'})
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
      }
  },
  created(){
      let t = this
      t.listarVendedores()
  }
}
</script>

<style>
    .over{
        z-index: 5;
    }
</style>
