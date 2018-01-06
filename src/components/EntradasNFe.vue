<template>
<div id="entradasNFE">
  <q-window-resize-observable @resize="onResize" />
  <h5>Notas de Entrada</h5>
  <!-- Botão ADD -->
    <q-fixed-position class="over" corner="bottom-right" :offset="[18, 18]">
        <q-btn 
           round
           color="primary" 
           @click="novo">
           <q-icon name="add" />
        </q-btn>
    </q-fixed-position>
    <q-fixed-position class="over" corner="bottom-left" :offset="[18, 18]">
        <q-btn
        v-if="canGoBack"
        color="primary"
        push
        big
        @click="goBack"
        >
          <i class="material-icons">arrow_back</i>
          Voltar
        </q-btn>
    </q-fixed-position>
   
    <div class="row">
        
        <div class="col-xl-6">
            <q-field>
                <q-select float-label="Selecione o Fornecedor"
                          v-model="fornecedor"
                          :options="listaFornecedores"
                          @change="listarNotas"
                          filter
                />
            </q-field>
        </div>
        <q-checkbox v-model="checked" 
                    label="Exibir notas canceladas"
                    style="margin-bottom: 20px"
                    @change="listarNotas"
        />
         
    </div>
    
    <div id="lista">
    
    <q-data-table
      :data="notas"
      :config="config"
      :columns="colunas"
      @refresh="refresh"
      @selection="selection"
      @rowclick="rowClick"
      style="background-color:white;"
    >
      <template slot="selection" scope="props">
        <q-btn flat color="primary" @click="editar(props)" v-if="checked === true">
          recuperar nota
        </q-btn>
        <q-btn flat color="primary" @click="editar(props)" v-else>
          <q-icon name="edit" />
        </q-btn>
        <q-btn flat color="primary" @click="deleteRow(props)" v-if="checked !== true">
          <q-icon name="delete" />
        </q-btn>
        
      </template>
    </q-data-table>
    
    <q-collapsible 
      label="Itens"
      icon="local_mall"
      style="background-color:white;"
      class="shadow-2"
      :opened="open"
    >
        <q-checkbox v-model="config2.responsive" label="Exibição Vertical" v-if="visivel"/><br><br>
        <q-data-table
          :data="itensNota"
          :config="config2"
          :columns="colunas2"
          @refresh="refresh"
          style="background-color:white;"
        ></q-data-table>
    
    </q-collapsible>
    <br><br><br>
    
    
  </div>
</div>
</template>

<script>
import { Toast, Loading, clone } from 'quasar'
import axios from 'axios'
    
function numberToReal(numero) {
    //if(numero === 0) { return 0.00 }
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
      CadNotas: [],
      notas: [],
      nota: '',
      fornecedores: [],
      itensNota: [],
      fornecedor: '',
      tipo: '',
      codigo: '',
      open: false,
      visivel: false,
      checked: false,
        
        
      //config
      config: {
        title: '',
        refresh: (localStorage.getItem('refresh') === 'true'),
        noHeader: true,
        columnPicker: (localStorage.getItem('columnPicker') === 'true'),
        bodyStyle: {
          maxHeight: '500px'
        },
        rowHeight: localStorage.getItem('rowHeight') + 'px',
        responsive: (localStorage.getItem('responsive') === 'true'),
        pagination: {
          rowsPerPage: parseInt(localStorage.getItem('rowsPerPage')),
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
            singular: 'Nota Selecionada',
            plural: 'items selecionado.'
          },
          clear: 'limpar seleção',
          search: 'Buscar',
          all: 'Todos'
        }
      },
      config2: {
        title: '',
        refresh: false,
        noHeader: false,
        columnPicker: true,
        bodyStyle: {
          maxHeight: '500px'
        },
        rowHeight: localStorage.getItem('rowHeight') + 'px',
        responsive: (localStorage.getItem('responsive') === 'true'),
        pagination: {
          rowsPerPage: 10,
          options: [5, 10, 15, 30, 50, 100]
        },
        messages: {
          noData: '<i class="material-icons">warning</i> Não há itens para exibir.',
          noDataAfterFiltering: '<i class="material-icons">warning</i> Sem resultados. Por favor, redefina suas buscas.'
        },
        // (optional) Override default labels. Useful for I18n.
        labels: {
          columns: 'Colunas',
          allCols: 'Todas',
          rows: 'Linhas',
          selected: {
            singular: 'Nota Selecionada',
            plural: 'items selecionado.'
          },
          clear: 'limpar seleção',
          search: 'Buscar',
          all: 'Todos'
        }
      },
      colunas: [
        {
          label: 'Data Compra - Numero da Nota',
          field: 'campo',
          width: '300px',
          sort: true,
          filter: true,
          type: 'string',
          style: {'font-weight': 'bold',
                  'font-size': '14px'
                 },
          /* sort (a, b) {
            return (new Date(a)) - (new Date(b))
          },
          format (value) {
            return new Date(value).toLocaleString()
          }*/
        },
      ],
      colunas2: [
        {
          label: 'CodBarras',
          field: 'codBarra',
          width: '100px',
          sort: true,
          filter: true,
          type: 'number',
        },
        {
          label: 'Produto',
          field: 'produto',
          width: '300px',
          sort: true,
          filter: true,
          type: 'string',
        },
        {
          label: 'Qtd',
          field: 'qtdCom',
          width: '60px',
          sort: true,
          filter: true,
          type: 'number',
        },
        {
          label: 'Custo',
          field: 'custo',
          width: '80px',
          sort: true,
          filter: true,
          type: 'number',
          format (value) {
            let x = numberToReal(value);
            return x
          }
        },
        {
          label: 'Venda',
          field: 'venda',
          width: '80px',
          sort: true,
          filter: true,
          type: 'number',
          format (value) {
            let x = numberToReal(value);
            return x
          }
        },
        {
          label: 'Total Custo',
          field: 'totalCusto',
          width: '110px',
          sort: true,
          filter: true,
          type: 'number',
          format (value) {
            let x = numberToReal(value);
            return x
          }
        },
        {
          label: 'Total Venda',
          field: 'totalVenda',
          width: '110px',
          sort: true,
          filter: true,
          type: 'number',
          format (value) {
            let x = numberToReal(value);
            return x
          }
        },
        {
          label: 'IPI',
          field: 'ipi',
          width: '80px',
          sort: true,
          filter: true,
          type: 'number',
          format (value) {
            let x = numberToReal(value);
            return x
          }
        },
        {
          label: 'Desconto',
          field: 'desconto',
          width: '100px',
          sort: true,
          filter: true,
          type: 'number',
          format (value) {
            let x = numberToReal(value);
            return x
          }
        },
        {
          label: 'Encargos',
          field: 'encargos',
          width: '100px',
          sort: true,
          filter: true,
          type: 'number',
          format (value) {
            let x = numberToReal(value);
            return x
          }
        },
        {
          label: 'Frete',
          field: 'frete',
          width: '100px',
          sort: true,
          filter: true,
          type: 'number',
          format (value) {
            let x = numberToReal(value);
            return x
          }
        },
        {
          label: 'Outros',
          field: 'outros',
          width: '100px',
          sort: true,
          filter: true,
          type: 'number',
          format (value) {
            let x = numberToReal(value);
            return x
          }
        }
      ],
      pagination: (localStorage.getItem('pagination') === 'true'),
      oldPagination: {
          rowsPerPage: parseInt(localStorage.getItem('rowsPerPage')),
          options: [5, 10, 15, 30, 50, 100]
      },
      rowHeight: parseInt(localStorage.getItem('rowHeight')),
      bodyHeightProp: localStorage.getItem('bodyHeightProp'),
      bodyHeight: parseInt(localStorage.getItem('bodyHeight')),
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
        
      canGoBack: window.history.length > 1,
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
    listaFornecedores () {
      var a = this.fornecedores
      var lista = []
      
      for (let i=0; i < a.length; i++) {
          if(a[i].codTipo === 2){
              let n = a[i].nome
              let c = a[i].codigo
              lista.push({label: n, value: c})  
          }  
      }
      //console.log(lista)
      return lista
    
    }, 
    listaNotas () {
      var a = this.notas
      var lista = []
      
      for (let i=0; i < a.length; i++) {
          let l = a[i].campo
          let v = a[i].codigo
          lista.push({label: l, value: v})  
      }
      //console.log(lista)
      return lista
    
    }, 
  },
  methods: {
      
    listarNotas(){
      if(this.fornecedor === ''){ return }
      Loading.show({message: 'Aguardando Dados...'})
      axios.get(API + 'pedido/obterNumeroNota?codfornecedor=' + this.fornecedor + '&excluido=' + this.checked)
      .then((res)=>{
          //console.log(res.data)
          this.notas = res.data
          Loading.hide()
          if(this.notas.length === 0){
            Toast.create('Não há notas para exibir para este Fornecedor')
          }
      })
      .catch((e)=>{
        console.log(e)
        Loading.hide()
      }) 
    },
    listarFornecedores(){
      Loading.show({message: 'Aguardando Dados...'})
      axios.get(API + 'pessoa/obterfornecedores')
      .then((res)=>{
          //console.log(res.data)
          this.fornecedores = res.data
          Loading.hide()
      })
      .catch((e)=>{
        console.log(e)
        Loading.hide()
      }) 
    },
    listarItens(){
      Loading.show({message: 'Aguardando Dados...'})
      axios.get(API + 'pedido/obterPedidoNota?codigocab=' + this.codigo)
      .then((res)=>{
          //console.log(res.data)
          this.itensNota = res.data
          Loading.hide()
      })
      .catch((e)=>{
        console.log(e)
        Loading.hide()
      }) 
    },
    goBack(){
      window.history.go(-1)
    },
    editar (props) {
      //console.log(props.rows[0].data.codigo)
      let row = props.rows[0].data
      localStorage.setItem('codCab', row.codigo)
      localStorage.setItem('cadMode', 'edit')
      this.$router.push({ path: '/cadnotas' }) 
    },
    deleteRow (props) {
      console.log(props.rows[0].data.codigo)
      let nota = props.rows[0].data.codigo
      
      Loading.show({message: 'Aguardando Dados...'})
      axios.post(API + 'pedido/excluirPedido?codigoCab=' + nota)
      .then((res)=>{
          console.log(res.data)
          //this.CadNotas = res.data
          Loading.hide()
          this.listarNotas()
      })
      .catch((e)=>{
        console.log(e)
        Loading.hide()
      })
    },
    refresh (done) {
      this.timeout = setTimeout(() => {
        done()
      }, 5000)
    },
    selection (number, rows) {
      console.log(`selected ${number}: ${rows}`)
      if(rows.length > 0){
        this.open = true
        this.codigo = rows[0].data.codigo
        this.listarItens()
      }
      else {
        this.open = false
        this.itensNota = []
      }
          
    },
    rowClick (row) {
      console.log('clicked on a row', row)
    },
    novo(){
      localStorage.setItem('cadMode', 'save')
      this.$router.push('/cadnotas')
    },
    onResize (size) {
      //console.log(size)
      if(size.width < 430){
        this.visivel = true
      }
      else{
        this.visivel = false
      }
      
    }
    
  },
  beforeDestroy () {
    clearTimeout(this.timeout)
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
  created(){
    this.listarFornecedores()
    if (localStorage.getItem('pagination') === 'false') {
      this.oldPagination = clone(this.config.pagination)
      this.config.pagination = false
      return
    }
    this.config.pagination = this.oldPagination

  }
}
</script>

<style lang="stylus">
.my-label
  padding 5px
  border-radius 3px
  display inline-block
.over
  z-index 5
</style>