<template>
<div id="clientes">
  <h5>Financeiro</h5>
  <!-- Botão ADD -->
    <q-fixed-position class="over" corner="bottom-right" :offset="[18, 18]">
        <q-btn 
           round
           color="primary" 
           @click="$router.push('/cadcontas')">
           <q-icon name="add" />
        </q-btn>
    </q-fixed-position>
  <div id="table">
    <div class="row">
        <div class="col">
            <q-field
            label="Tipo"
              >
                <q-select
                    v-model="tipo"
                    :options="tipos"
                />
            </q-field>
        </div>
        <div class="col-md-4 col-xs-5 offset-1">
            <q-field
                label="Despesas"
                v-if="subDesp"
              >
                <q-select
                    v-model="subtipo"
                    :options="[
                        { label: 'A pagar', value: 1},
                        { label: 'Pago', value: 2}
                    ]"
                />
            </q-field>
            <q-field
                label="Receitas"
                v-else
              >
                <q-select
                    v-model="subtipo"
                    :options="[
                        { label: 'A receber', value: 1},
                        { label: 'Pago', value: 2}
                    ]"
                />
            </q-field>
        </div>  
        <div class="col">
             
        </div> 
         
    </div>
    
    
    <q-data-table
      :data="table"
      :config="config"
      :columns="colunas"
      @refresh="refresh"
      @selection="selection"
      @rowclick="rowClick"
      style="background-color:white;"
    >
      <div slot="selection" scope="props">
        <q-btn flat color="primary" @click="changeMessage(props)">
          <q-icon name="edit" />
        </q-btn>
        <q-btn flat color="primary" @click="deleteRow(props)">
          <q-icon name="delete" />
        </q-btn>
      </div>
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
  </div>
</div>
</template>

<script>
import {clone} from 'quasar'
import table from '../data/db.json'
export default {
  
  
  data () {
    return {
      table,
      tipo: 'd',
      tipos: [
        {
          label: 'Despesas',
          value: 'd'
        },
        {
          label: 'Receitas',
          value: 'r'
        },

      ],
      subtipo: 1,
      subDesp: true,
      text: 'text',
      config: {
        title: '',
        refresh: false,
        noHeader: false,
        columnPicker: false,
        leftStickyColumns: 0,
        rightStickyColumns: 0,
        bodyStyle: {
          maxHeight: '500px'
        },
        rowHeight: '50px',
        responsive: false,
        pagination: {
          rowsPerPage: 5,
          options: [5, 10, 15, 30, 50, 100]
        },
        selection: 'multiple',
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
            plural: 'items selecionado.'
          },
          clear: 'limpar',
          search: 'Buscar',
          all: 'Todos'
        }
      },
      colunas: [
        {
          label: 'Data',
          field: 'created',
          width: '105px',
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
          label: 'Descrição',
          field: 'name',
          width: '100px',
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
          field: 'rotation_period',
          filter: 'true',
          sort: true,
          format (value) {
            if (value < 24) {
              return '<i class="material-icons text-negative">thumb_down</i> - Despesa'
            }
            return '<i class="material-icons text-positive">thumb_up</i> - Receita'
          },
          width: '100px'
        },
        */
        {
          label: 'Categoria',
          field: 'climate',
          filter: true,
          sort: true,
          type: 'string',
          width: '100px'
        },
        
        {
          label: 'SubCategoria',
          field: 'terrain',
          filter: true,
          sort: true,
          type: 'string',
          width: '120px'
        },
        {
          label: 'Total',
          field: 'diameter',
          sort: true,
          filter: true,
          type: 'string',
          width: '100px'
        }
      ],
      pagination: true,
      rowHeight: 50,
      bodyHeightProp: 'auto',
      bodyHeight: 500
    }
  },
  methods: {
    changeMessage (props) {
      props.rows.forEach(row => {
        row.data.message = 'Gogu'
      })
    },
    deleteRow (props) {
      props.rows.forEach(row => {
        this.table.splice(row.index, 1)
      })
    },
    refresh (done) {
      this.timeout = setTimeout(() => {
        done()
      }, 5000)
    },
    selection (number, rows) {
      console.log(`selected ${number}: ${rows}`)
    },
    rowClick (row) {
      console.log('clicked on a row', row)
    },
    
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
    },
    tipo (value) {
        if (value === 'r') {
            this.subDesp=false
        }
        else {
            this.subDesp=true
        }
    }
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