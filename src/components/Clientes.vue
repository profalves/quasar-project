<template>
<div id="clientes">
  <h5>Lista de Pessoas</h5>
  <!-- Botão ADD -->
    <q-fixed-position class="over" corner="bottom-right" :offset="[18, 18]">
        <q-btn 
           round
           color="primary" 
           @click="novo">
           <q-icon name="add" />
        </q-btn>
    </q-fixed-position>
  
  <div id="lista">
    <!--<div class="row">
        <q-field
            label="Tipo"
          >
            <q-select
                v-model="tipo"
                :options="tipos"
            />
        </q-field>   
    </div>-->
    
    
    <q-data-table
      ref="dtable"
      :data="pessoas"
      :config="config"
      :columns="colunas"
      @refresh="refresh"
      @selection="selection"
      @rowclick="rowClick"
      style="background-color:white;"
    >
      <template slot="selection" scope="props">
        
        <!--<q-btn flat color="primary" @click="whatsapp(props)">
          <q-icon class="fa fa-whatsapp fa-2x" />
        </q-btn>-->
        <q-btn flat color="primary" @click="editar(props)" v-if="visivel">
          <q-icon name="edit" />
        </q-btn>
        <q-btn flat color="primary" @click="deleteRow(props)">
          <q-icon name="delete" />
        </q-btn>
      </template>
    </q-data-table>
    
   
    
    <!-- Configurações -->
    <q-collapsible
      label="Opções"
      icon="settings"
      style="background-color:white;
             margin-bottom:100px;"
      class="shadow-2"
    >
        
      <!--<q-field
        icon="title"
        label="Nome da Tabela"
        :label-width="4"
      >
        <q-input v-model="config.title" />
      </q-field>-->

        
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
        icon="check box"
        label="Tipo de Seleção"
        :label-width="4"
      >
        <q-select
          v-model="config.selection"
          class="col-xs-12 col-sm"
          float-label="Seleção"
          :options="[
            {label: 'Nenhuma', value: false},
            {label: 'Singular', value: 'single'},
            {label: 'Multipla', value: 'multiple'}
          ]"
        />
      </q-field>

      <!--<q-field
        icon="place"
        label="Sticky Columns"
        :label-width="4"
      >
        <q-select
          v-model="config.leftStickyColumns"
          class="col-xs-12 col-sm"
          float-label="Left Sticky Columns"
          :options="[
            {label: 'None', value: 0},
            {label: '1', value: 1},
            {label: '2', value: 2}
          ]"
        />
        <br>
        <q-select
          v-model="config.rightStickyColumns"
          class="col-xs-12 col-sm"
          float-label="Right Sticky Columns"
          :options="[
            {label: 'None', value: 0},
            {label: '1', value: 1},
            {label: '2', value: 2}
          ]"
        />
      </q-field>-->

      <q-field
        icon="format_line_spacing"
        label="Altura das linhas"
        :label-width="4"
      >
        <q-slider v-model="rowHeight" :min="38" :max="200" label-always :label-value="`${rowHeight}px` "/>
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

    
  </div>
    
</div>
</template>

<script>
import { Alert, Dialog, Toast, Loading, clone, openURL } from 'quasar'
import axios from 'axios'
import { AtomSpinner } from 'epic-spinners'

const API = localStorage.getItem('wsAtual')
  
//debug
//const API = localStorage.getItem('wsAtual')

export default { 
  data () {
    return {
      pessoas: [],
      excluidos: [],
      tipo: 'c',
      tipos: [
        {
          label: 'Cliente',
          value: 'c'
        },
        {
          label: 'Fornecedor',
          value: 'f'
        },

      ],
      visivel: true,
      alert: false,
      
      //LISTA
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
          rowsPerPage: parseInt(localStorage.getItem('rowsPerPage')),
          options: [5, 10, 15, 30, 50, 100]
        },
        selection: localStorage.getItem('selection'),
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
          label: 'Cód.',
          field: 'codigo',
          filter: true,
          sort: true,
          type: 'number',
          width: '60px'
        },
        {
          label: 'Nome',
          field: 'nome',
          width: '150px',
          //classes: 'bg-orange-2',
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
        /*{
          label: 'Tipo',
          field: 'gender',
          //filter: 'true',
          format (value) {
            if (value === 'male') {
              return '<i class="material-icons">account_circle</i> - Cliente'
            }
            return '<i class="material-icons">business_center</i> - Fornecedor'
          },
          width: '100px'
        },*/
        
        {
          label: 'Telefone',
          field: 'telResid',
          sort: true,
          filter: true,
          type: 'number',
          width: '100px'
        },
        {
          label: 'Celular',
          field: 'celular1',
          sort: true,
          filter: true,
          type: 'number',
          width: '100px'
        },
        
        {
          label: 'Tipo',
          field: 'tipo',
          filter: true,
          sort: true,
          type: 'string',
          width: '120px'
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
      
    }
  },
  //components: { OrbitSpinner },
  methods: {
    listarPessoas(){
      Loading.show({
          spinner: AtomSpinner,
          spinnerSize: 140,
          message: 'Aguardando Dados...'
      })
      axios.get(API + 'pessoa/obterpessoa')
      .then((res)=>{
          //console.log(res.data)
          this.pessoas = res.data
          Loading.hide()
      })
      .catch((e)=>{
        console.log(e)
        Loading.hide()
      })  
    },
    editar (props) {
      console.log(props.rows[0].data.codigo)
      let row = props.rows[0].data
      localStorage.setItem('codPessoa', row.codigo)
      localStorage.setItem('cadMode', 'edit')
      this.$router.push({ path: '/cadcliente' }) 
    },
    deleteRow (props) {
      let row = props.rows
      console.log(row)
      this.excluidos = row
      Dialog.create({
          title: 'Excluir',
          message: 'Tem certeza que deseja excluir ' + this.excluidos.length + ' registro(s)?',
          buttons: [
            {
              label: 'Não! Cancela',
              color: 'negative',
              raised: true,
              style: 'margin-top: 20px',
              handler () {
                Toast.create('Cancelado...')
              }
            },
            {
              label: 'Sim! Pode excluir',
              color: 'positive',
              raised: true,
              style: 'margin-top: 20px',
              handler: () => {
                  let a = this.excluidos
                  let obj = {}

                  for (let i=0; i < a.length; i++) {
                      obj = a[i].data
                      obj.excluido = true
                      obj.cpf = 0
                      let cliente  = obj.nome
                      console.log(obj)
                      Loading.show({message: 'Aguardando Dados...'})
                      axios.post(API + 'pessoa/excluirPessoa?codPessoa=' + obj.codigo)
                          .then((res)=>{
                              Toast.create(cliente + ' foi excluido com sucesso')
                              console.log(res)
                              Loading.hide()
                              this.listarPessoas()
                          })
                          .catch((e)=>{
                            console.log(e)
                            return
                          })  
                      
                  }
              }
            }
          ]
      })
    },
    whatsapp (props) {
      let row = props.rows
      
      Dialog.create({
          title: 'Enviar mensagem via Whatsapp',
          message: 'Digite a sua mensagem aqui abaixo e clique em enviar.',
          form: {
            msg: {
              type: 'textarea',
              label: 'Mensagem',
              model: ''
            }
          },
          buttons: [
            'Cancel',
            {
              label: 'Ok',
              handler: (data) => {
                  let a = row
                  let obj = {}

                  for (let i=0; i < a.length; i++) {
                      obj = a[i].data
                      let numero  = obj.celular1
                      /*console.log(obj)
                      console.log(numero)
                      console.log(data.msg)*/
                      openURL('https://api.whatsapp.com/send?phone=' + 55 + numero + '&text=' + data.msg)
                      
                  }
              }
            }
          ]
      })
      /*Dialog.create({
          title: 'Excluir',
          message: 'Tem certeza que deseja excluir ' + this.excluidos.length + ' registro(s)?',
          buttons: [
            {
              label: 'Não! Cancela',
              color: 'negative',
              raised: true,
              style: 'margin-top: 20px',
              handler () {
                Toast.create('Cancelado...')
              }
            },
            {
              label: 'Sim! Pode excluir',
              color: 'positive',
              raised: true,
              style: 'margin-top: 20px',
              handler: () => {
                  let a = this.excluidos
                  let obj = {}

                  for (let i=0; i < a.length; i++) {
                      obj = a[i].data
                      obj.excluido = true
                      obj.cpf = 0
                      let cliente  = obj.nome
                      console.log(obj)
                      Loading.show({message: 'Aguardando Dados...'})
                      axios.post(API + 'pessoa/excluirPessoa?codPessoa=' + obj.codigo)
                          .then((res)=>{
                              Toast.create(cliente + ' foi excluido com sucesso')
                              console.log(res)
                              Loading.hide()
                              this.listarPessoas()
                          })
                          .catch((e)=>{
                            console.log(e)
                            return
                          })  
                      
                  }
              }
            }
          ]
      })*/
    },
    refresh (done) {
      this.timeout = setTimeout(() => {
        this.listarPessoas()
      }, 5000)
    },
    selection (number, rows) {
      console.log(rows)
      //console.log(rows.length)
      if(rows.length > 1){
        this.visivel = false
      }
      else{
        this.visivel = true
      }
      console.log(`selecionou ${number}: ${rows}`)
      
    },
    rowClick (row) {
      console.log('clicked on a row', row)
      localStorage.setItem('codPessoa', row.codigo)
      localStorage.setItem('cadMode', 'edit')
      if(!this.alert){
        Alert.create({
          enter: 'bounceInRight',
          leave: 'bounceOutRight',
          color: 'positive',
          icon: 'tag_faces',
          html: `Nome: ` + row.nome + `<br>` +
                `Tipo: ` + row.tipo,
          position: 'bottom-center',
          actions: [
            {
              label: 'Abrir',
              handler: () => {
                this.$router.push({ path: '/cadcliente' })
              }
            },
            {
              label: 'Fechar',
              handler: () => {
                this.alert = false
                return;
              }
            }
          ]
        })
      }
      this.alert = true
    },
    novo(){
      localStorage.setItem('cadMode', 'save')
      this.$router.push('/cadcliente')
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
    this.listarPessoas()
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