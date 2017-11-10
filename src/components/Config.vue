<template>
  <div>
      <q-list inset-separator>
        <q-collapsible icon="mail" label="Configuações Gerais" sublabel="Configurações essenciais do sistema">
          <div>
            {{config}}
          </div>
        </q-collapsible>
        <q-collapsible icon="view_list" label="Listas" sublabel="Configure globalmente a exibição das listas">
          <div>
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
                    {label: 'Nenhuma', value: 'none'},
                    {label: 'Singular', value: 'single'},
                    {label: 'Multipla', value: 'multiple'}
                  ]"
                />
              </q-field>

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
              <br>
      
              <!--Salvar-->
              <div class="row">
                <q-btn icon="done"
                       color="primary"
                       @click="salvarConfig"
                >Salvar</q-btn>
                
                <q-btn icon="refresh"
                       color="primary"
                       @click="resetConfig"
                       style="margin-left: 10px;"
                >Resetar</q-btn>

              </div><br>
              
              
          </div>
        </q-collapsible>
        <q-collapsible icon="drafts" label="Banco de Dados" sublabel="Configure o Banco de Dados a ser utilizado">
          <div>
            ip/ porta/ nome do banco
          </div>
        </q-collapsible>
      </q-list>
      
  </div>
</template>

<script>

//import { mapState } from 'vuex'
export default {
  data () {
    return {
      config: {
        refresh: (localStorage.getItem('refresh') === 'true'),
        noHeader: (localStorage.getItem('noHeader') === 'true'),
        columnPicker: (localStorage.getItem('columnPicker') === 'true'),
        responsive: (localStorage.getItem('responsive') === 'true'),
        selection: localStorage.getItem('selection')
      },
      pagination: true,
      rowHeight: parseInt(localStorage.getItem('rowHeight')),
      bodyHeightProp: localStorage.getItem('bodyHeightProp'),
      bodyHeight: parseInt(localStorage.getItem('bodyHeight'))
    }
  },
  methods: {
    salvarConfig(){
        localStorage.setItem('refresh', this.config.refresh)
        localStorage.setItem('noHeader', this.config.noHeader)
        localStorage.setItem('columnPicker', this.config.columnPicker)
        localStorage.setItem('responsive', this.config.responsive)
        localStorage.setItem('selection', this.config.selection)
        localStorage.setItem('pagination', this.pagination)
        localStorage.setItem('rowHeight', this.rowHeight)
        localStorage.setItem('bodyHeightProp', this.bodyHeightProp)
        localStorage.setItem('bodyHeight', this.bodyHeight)
        
        
    },
    resetConfig(){
        this.config.refresh = false
        this.config.noHeader = false
        this.config.columnPicker = false
        this.config.responsive = false
        this.config.selection = 'multiple'
        this.pagination = true
        this.rowHeight = 38
        this.bodyHeightProp = 'auto'
        this.bodyHeight = 200
        
        this.salvarConfig()
    
    }
  },
  created () {
    
  }
  /*computed: {
    outro() {
        return 'test new computed'    
    },

    ...mapState({
        // arrow functions can make the code very succinct!
        config: state => {
            const {
                title, 
                selection,
                refresh,
                noHeader,
                columnPicker,
                leftStickyColumns,
                rightStickyColumns,
                bodyStyle,
                rowHeight,
                responsive,
                pagination,
            } = state.config.lista
            return {
                title, 
                selection,
                refresh,
                noHeader,
                columnPicker,
                leftStickyColumns,
                rightStickyColumns,
                bodyStyle,
                rowHeight,
                responsive,
                pagination
            }
        },
        pagination: state => state.config.pagination,
        rowHeight: state => state.config.rowHeight,
        bodyHeightPropbodyHeight: state => state.config.bodyHeightPropbodyHeight,
        bodyHeight: state => state.config.bodyHeight,
        
    })
  },*/
}
</script>

<style>
</style>
