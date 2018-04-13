<template>
<div id="usuarios">
  <h5>Usuários</h5>
    <!-- Botão ADD -->
    <q-fixed-position class="over" corner="bottom-right" :offset="[18, 18]">
        <q-btn 
           round
           color="primary" 
           @click="novo">
           <q-icon name="add" />
        </q-btn>
    </q-fixed-position>
    
    <!-- Botão voltar -->
    <q-fixed-position class="fixo" corner="bottom-left" :offset="[18, 18]">
        <q-btn 
           round
           color="primary" 
           @click="goBack">
           <q-icon name="keyboard_arrow_left" />
        </q-btn>
    </q-fixed-position>
    
    <!-- Botão sync -->
    <q-fixed-position class="fixo" corner="bottom-left" :offset="[88, 18]">
        <q-btn 
           round
           color="primary" 
           @click="listarUsuarios">
           <q-icon name="sync" />
        </q-btn>
    </q-fixed-position>

    
  <div id="lista">
    
    <q-data-table
      :data="usuarios"
      :config="config"
      :columns="colunas"
      @refresh="refresh"
      @selection="selection"
      @rowclick=""
      style="background-color:white;"
    >
      <template slot="selection" scope="props">
        <q-btn flat color="primary" @click="editar(props)" v-if="visivel">
          <q-icon name="edit" />
        </q-btn>
        <q-btn flat color="primary" @click="deleteRow(props)">
          <q-icon name="delete" />
        </q-btn>
      </template>
    </q-data-table>
    
    <!-- Configurações --
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
      </q-field>--

        
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
      </q-field>--

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
    </q-collapsible>-->
    <br><br><br><br>
  </div>
</div>
</template>

<script>
import { Alert, Dialog, Toast, Loading, clone } from 'quasar'
import axios from 'axios'
import { FulfillingBouncingCircleSpinner } from 'epic-spinners'
import localforage from 'localforage'

const API = localStorage.getItem('wsAtual')
  
//debug
//const API = 'http://192.168.0.200:29755/'     
    

export default {
  
  name: 'usuarios',
  data () {
    return {
      usuarios: [],
      excluidos: [],
      alert: false,
      visivel: true,  
          
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
          label: 'Código',
          field: 'codigoIdentificacao',
          filter: true,
          sort: true,
          type: 'number',
          width: '100px'
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
        {
          label: 'Função',
          field: 'funcao',
          filter: true,
          sort: true,
          type: 'string',
          width: '120px'
        },
        {
          label: 'Empresa',
          field: 'codigoEmpresa',
          sort: true,
          filter: true,
          type: 'string',
          width: '100px'
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
  methods: {
    goBack(){
        window.history.back()
    },
    listarUsuarios(){
      Loading.show({
          spinner: FulfillingBouncingCircleSpinner,
          spinnerSize: 140,
          message: 'Aguardando Dados...'
      })
      axios.get(API + 'usuario/obterUsuario')
      .then((res)=>{
          console.log(res)
          this.usuarios = res.data
          localforage.setItem('Usuários', res.data)
          Loading.hide()
      })
      .catch((e)=>{
        console.log(e)
        Loading.hide()
      })  
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
                      console.log(obj)
                      Loading.show({message: 'Aguardando Dados...'})
                      axios.post(API + 'usuario/excluirUsuario?codUsuario=' + obj.codigo)
                          .then((res)=>{
                              //console.log(res)
                              Toast.create('Excluido com sucesso')
                              Loading.hide()
                              this.listarUsuarios()
                          })
                          .catch((e)=>{
                            console.log(e)
                            Loading.hide()
                            return
                          })  
                      
                  }
              }
            }
          ]
      })
    },
    refresh (done) {
      this.listarUsuarios()
      done()
    },
    editar (props) {
      console.log(props.rows[0].data.codigo)
      let row = props.rows[0].data
      localStorage.setItem('codUsuario', row.codigoIdentificacao)
      localStorage.setItem('cadMode', 'edit')
      this.$router.push({ path: '/cadUsuario' }) 
    },
    selection (number, rows) {
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
      localStorage.setItem('codUsuario', row.codigoIdentificacao)
      localStorage.setItem('cadMode', 'edit')
      
      if(!this.alert){
        Alert.create({
          enter: 'bounceInRight',
          leave: 'bounceOutRight',
          color: 'positive',
          icon: 'tag_faces',
          html: `Nome: ` + row.nome,
          position: 'bottom-center',
          actions: [
            {
              label: 'Abrir',
              handler: () => {
                this.$router.push({ path: '/cadUsuario' })
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
      this.$router.push('/cadUsuario')
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
  mounted(){
    if(localStorage.getItem('loadUsuarios') === 'true' || localStorage.getItem('tela') === 'cadUsuario'){
        this.listarUsuarios()
        localStorage.setItem('tela', 'Usuario')
    }
    else{
        localforage.getItem('Usuários').then((value) => {
            if(value){
                console.log('localforage get')
                console.log(value)
                this.usuarios = value;
            }
            else{
                console.log('localforage fail')
                this.listarUsuarios()
            }

        }).catch((err) => {
            console.log(err)
            console.log('fail')
        }) 
    }
    
    if (localStorage.getItem('pagination') === 'false') {
      this.oldPagination = clone(this.config.pagination)
      this.config.pagination = false
      return
    }
    this.config.pagination = this.oldPagination
  }
}
</script>

<style scoped>
.my-label{
  padding: 5px;
  border-radius: 3px;
  display: inline-block;
}
.over{
  z-index: 5;
}
</style>