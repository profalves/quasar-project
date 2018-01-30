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

    <div id="lista">
      <q-collapsible :opened="filtroColap" 
                     icon="filter_list" 
                     label="Filtros"
                     @open="collapse"
                     @close="collapse"
                     @click="collapse"
                     >
        <div class="row">
            <div class="col">
                <q-select
                  v-model="tipoMov"
                  float-label="Tipo Movimentação"
                  :options="listaMovs"
                />
            </div>
            <div class="col-xs-12 col-md-6">
                <q-select
                  v-if="tipoMov === 2"
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



        <!-- itens -->
        <q-collapsible
          label="Itens"
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
        
        <br><br><br><br>
        
    </div>
    
    </div>
  </div>
</template>

<script>
import { AtomSpinner } from 'epic-spinners'    
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
          tipoMovs: [],
          relMovs: '',
          clientes: [],
          pedidos: [],
          itens: [],
          itensCollap: false,
          Produtos: [], 
          dataInicial: '',
          dataFinal: '',
          tipoMov: 1,
          tipoSai: '',
          cliente: '',
          produto: '',
          codTipo: '',
          composicao: '',
          filtroColap: true,
          text: '',
          visivel: false,
          
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
              rowsPerPage: 5,
              options: [5, 10, 15, 30, 50, 100]
            },
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
              field: 'totalQtde',
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
              label: 'nota.',
              field: 'numeroCupom',
              sort: true,
              filter: true,
              type: 'number',
              width: '60px'
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
      listaProdutos: function () {
          let a = this.Produtos
          let lista = []

          lista = a.map(row => ({
              label: row.nome, 
              value: row.codigo
          }))
          
          //console.log(lista)
          return lista
      },
      listaVendedores: function () {
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
        
        Loading.show({
          spinner: AtomSpinner,
          spinnerSize: 140,
          message: 'Aguardando Dados...'
        })
        axios.get(API + 'relatorio/obterRptMovDiversas?' +
                'dataInicial=' + this.dataInicial +
                '&dataFinal=' + this.dataFinal + 
                '&CodTipoMovimentacao=' + this.tipoMov +
                tipoSai + c + p)
        .then((res)=>{
            Loading.hide()
            console.log(res.data)
            this.relMovs = res.data
            this.pedidos = this.relMovs.pedidos
            this.visivel = true
        })
        .catch((e)=>{
            console.log(e.response)
            console.log('erro')
            Loading.hide()
            let error = e.response.data
            Toast.create.negative(error)
            if(e.data[0].value) { Toast.create.negative('Erro: ' + e.data[0].value) }
            
            this.filtroColap = true
        })
      },
      listarClientes(){
          Loading.show({
              spinner: AtomSpinner,
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
              spinner: AtomSpinner,
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
              spinner: AtomSpinner,
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
              spinner: AtomSpinner,
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
            this.itensCollap = true
          }
          else {
            this.itens = []
            this.itensCollap = false
          }
          
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
    .over{
        z-index: 5;
    }
</style>
