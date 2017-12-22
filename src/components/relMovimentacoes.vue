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
      <q-collapsible :opened="opened" 
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
                  :options="movs"
                />
            </div>
            <div class="col-xs-12 col-md-6">
                <q-select
                  v-if="tipoMov === 'saida manual'"
                  v-model="tipoSai"
                  float-label="Tipo Saída"
                  :options="[
                    {
                        label:'saida manual',
                        value:'saida manual'
                    },
                    {
                        label:'transferência',
                        value:'transferencia'
                    },
                    {
                        label:'outras saídas',
                        value:'outras saídas'
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
               @click="getEstoque"
               rounded
               style="margin-bottom: 20px"
               >
               Visualizar</q-btn>  
        
      </q-collapsible>
   
    <!--periodo-->
          
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
</template>

<script>
    
import { Loading, Toast, clone } from 'quasar'
import axios from 'axios'
    
const API = localStorage.getItem('wsAtual')
  
//debug
//const API = 'http://192.168.0.200:29755/' 

export default {
  data () {
      return {
          canGoBack: window.history.length > 1,
          movs: [
            {
                label:'venda finalizada',
                value:'venda finalizada'
            },
            {
                label:'saida manual',
                value:'saida manual'
            },
            {
                label:'orçamento',
                value:'orçamento'
            },
            {
                label:'venda em andamento',
                value:'venda em andamento'
            },
            {
                label:'venda cancelada',
                value:'venda cancelada'
            },
            {
                label:'Entrada manual',
                value:'Entrada manual'
            },
            {
                label:'NF entrada',
                value:'NF entrada'
            },
            {
                label:'devolução de mercadoria',
                value:'devolução de mercadoria'
            },
            {
                label:'pedido mobile',
                value:'pedido mobile'
            },
            {
                label:'lançamento de produção',
                value:'lançamento de produção'
            },
            {
                label:'remessa garantia',
                value:'remessa garantia'
            },
            {
                label:'inutilização da nota',
                value:'inutilização da nota'
            },
            {
                label:'nota denegada',
                value:'nota denegada'
            }     
          ],
          notas: [],
          clientes: [],
          categorias: [],
          marcas: [],
          Produtos: [], 
          vendedores: [],
          dataInicial: '',
          dataFinal: '',
          tipoMov: '',
          tipoSai: '',
          cliente: '',
          vendedor: '',
          produto: '',
          codTipo: '',
          composicao: '',
          opened: true,
          text: '',
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
      getNotas(){
        if(this.dataInicial === ''){
            Toast.create.negative('Selecione um período antes')
            return
        }
        
        Loading.show({message: 'Aguardando Dados...'})
        axios.get(API + 'relatorio/obterRptPorNota?' +
                'dataInicial=' + this.dataInicial +
                '&dataFinal=' + this.dataFinal +
                /*
                '&codCliente=' + 
                '&codVendedor= ' + 
                '&produto= ' + 
                '&tipoNota= ' +
                '&numerocupomde=' +
                '&numerocupomate=' +
                */
                '&ocultarExcluidos=false')
        .then((res)=>{
        console.log(res.data)
        this.notas = res.data
        Loading.hide()
        })
        .catch((e)=>{
        console.log(e.response)
        Loading.hide()
        })
      },
      listarClientes(){
          axios.get(API + 'pessoa/obterpessoa')
          .then((res)=>{
            this.clientes = res.data
          })
          .catch((e)=>{
            console.log(e)
          })
      },
      todosProdutos(){
          Loading.show({message: 'Aguardando Dados...'})
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
      t.listaClientes()
      t.listarVendedores()
      t.todosProdutos()
  }
}
</script>

<style>
    .over{
        z-index: 5;
    }
</style>
