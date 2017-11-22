<template>
  <div>
      <q-list inset-separator>
        <q-collapsible icon="mail" label="Configuações Gerais" sublabel="Configurações essenciais do sistema">
          <div>
            Tela cheia <q-checkbox v-model="check" />
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
      
              <!--Salvar-->
              <div class="row">
                <q-btn icon="done"
                       color="primary"
                       @click="salvarConfig"
                       style="margin: 10px;"
                >Salvar</q-btn>
                
                <q-btn icon="refresh"
                       color="primary"
                       @click="alertReset"
                       style="margin: 10px;"
                >Resetar</q-btn>

              </div>
              
              
          </div>
        </q-collapsible>
        <q-collapsible icon="drafts" label="Banco de Dados" sublabel="Configure a Empresa ao qual deseja conectar">
          <div class="row">
            <div class="col-md-6">
              <q-field
                icon="pin_drop"
                helper="IP/Host"
              >
                <q-input v-model.trim="ip" clearable/>
              </q-field>   
            </div>
            <div class="col-md-6">
              <q-field
                icon="pin_drop"
                helper="Porta"
              >
                <q-input v-model.number="porta" 
                         type="number"
                         v-mask="['#####']"
                         clearable/>
              </q-field>   
            </div>    
          </div> 
          <div class="row">
            <div class="col">
              <q-field
                icon="featured_play_list"
                helper="Nome do Banco de Dados"
              >
                <q-input v-model.trim="banco" clearable />
              </q-field>   
            </div> 
            <div class="col-2 btn-plus" >
                <q-btn 
                   rounded
                   color="primary" 
                   @click="salvarBanco">
                   <q-icon name="add" />
                </q-btn>
            </div>
          </div>
          <br>
          Bancos de Dados salvos: <br><br>
            
        <div class="row" id="config">    
            <table class="q-table" :class="computedClasses" style="width: 100%">
              <thead>
                <tr>
                  <th class="text-left">ID</th>
                  <th class="text-left">Nome</th>
                  <th class="text-left">IP/Host</th>
                  <th class="text-left">Porta</th>
                  <th class="text-left">Editar</th>
                  <th class="text-left">Excluir</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in bancosDados">
                  <td class="text-left">{{ item.IdBanco }}</td>
                  <td class="text-left">{{ item.banco }}</td>
                  <td class="text-right">{{ item.ip }}</td>
                  <td class="text-right">{{ item.porta }}</td>
                  <td class="text-center">
                    <a @click="editar(item)" color="info"><i class="material-icons fa-2x" >mode_edit</i></a>   
                  </td>
                  <td class="text-center">
                    <i class="material-icons fa-2x mHover text-negative" @click="excluir(item, index)" color="negative">delete_forever</i> 
                  </td>
                </tr>
              </tbody>
            </table>
        </div>
        
        </q-collapsible>
      </q-list>
      
  </div>
</template>

<script>
import { Dialog, Toast } from 'quasar'
//import { mapState } from 'vuex'
export default {
  data () {
    return {
      //Gerais
      check: false,
      //config. das tabelas
      config: { 
        refresh: (localStorage.getItem('refresh') === 'true'),
        noHeader: (localStorage.getItem('noHeader') === 'true'),
        columnPicker: (localStorage.getItem('columnPicker') === 'true'),
        responsive: (localStorage.getItem('responsive') === 'true'),
        selection: localStorage.getItem('selection')
      },
      //ainda config. das tabelas
      pagination: (localStorage.getItem('pagination') === 'true'),
      rowHeight: parseInt(localStorage.getItem('rowHeight')),
      bodyHeightProp: localStorage.getItem('bodyHeightProp'),
      bodyHeight: parseInt(localStorage.getItem('bodyHeight')),
      
      // config. Banco de Dados
      ip: '',
      porta: '',
      banco: '',
      bancoID: '',
      bancosDados: [],
      filtro: '',
      indice: '',
      edit: false,
      //tabela
      misc: 'bordered', //[{value: 'bordered'},{value: 'highlight'}]
      separator: 'cell', // none, horizontal, vertical, cell
      stripe: 'odd', // none, odd, even
      type: 'none', // flipped, responsive
      gutter: 'none', // compact, loose
      
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
    }
  },
  methods: {
    //Listas
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
        Toast.create.positive({
            html: 'Configurações salvas com sucesso',
            icon: 'done'
        })    
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
    
    },
    alertReset(){
        let t = this
        Dialog.create({
          title: 'Tem certeza que deseja voltar para as configurações iniciais de listas?',
          message: 'Depois de confirmado, esta ação não poderá ser revertida...',
          buttons: [
            {
              label: 'Não',
              color: 'negative',
              raised: true,
              style: 'margin-top: 20px',
              handler () {
                Toast.create('NÃO RESETADO: As configurações de listas continuam as mesmas')
              }
            },
            {
              label: 'Sim',
              color: 'positive',
              raised: true,
              style: 'margin-top: 20px',
              handler () {
                t.resetConfig()
                Toast.create('configurações de listas retornaram para as configurações iniciais')
              }
            }
          ]
        })
    },
    
    //Bancos
    listarBancos (){
        var i
        for (i = 1; i <= localStorage.getItem('bancoCont'); i++) {
            var lista = { 
                            IdBanco : localStorage.getItem('IdBanco' + i),
                            ip : localStorage.getItem('ip' + i),
                            porta: localStorage.getItem('porta' + i),
                            banco: localStorage.getItem('banco' + i)
                        }
            if(lista.IdBanco!==null){
                this.bancosDados.push(lista)
            }
        }

    },
    salvarBanco(){
        if(this.edit === true){
            localStorage.setItem('ip' + this.filtro, this.ip)
            localStorage.setItem('porta' + this.filtro, this.porta)
            localStorage.setItem('banco' + this.filtro, this.banco)
            this.ip = ''
            this.porta = ''
            this.banco = ''
            Toast.create.positive({
                html: 'Configurações salvas com sucesso',
                icon: 'done'
            })
            this.bancosDados = []
            this.listarBancos()
        }
        else{
            var bancoCont = parseInt(localStorage.getItem('bancoCont'))
            if(isNaN(bancoCont)) {
                bancoCont = 0
            }
            var cont = bancoCont + 1
            localStorage.setItem('bancoCont', cont)
            localStorage.setItem('IdBanco' + localStorage.getItem('bancoCont'), cont)
            localStorage.setItem('ip' + localStorage.getItem('bancoCont'), this.ip)
            localStorage.setItem('porta' + localStorage.getItem('bancoCont'), this.porta)
            localStorage.setItem('banco' + localStorage.getItem('bancoCont'), this.banco)
            this.ip = ''
            this.porta = ''
            this.banco = ''
            Toast.create.positive({
                html: 'Configurações salvas com sucesso',
                icon: 'done'
            })
            this.bancosDados = []
            this.listarBancos()
        }
    },
    editar(item, index) {
        this.filtro = item.IdBanco
        this.edit = true
        this.ip = localStorage.getItem('ip' + this.filtro)
        this.porta = localStorage.getItem('porta' + this.filtro)
        this.banco = localStorage.getItem('banco' + this.filtro)
        
    },
    excluir(item, index) {
        this.filtro = item.IdBanco
        this.indice = index
        
        if(this.indice !== -1) {
            this.bancosDados.splice(index,1)
        }
        
        localStorage.removeItem('IdBanco' + this.filtro)
        localStorage.removeItem('ip' + this.filtro)
        localStorage.removeItem('porta' + this.filtro)
        localStorage.removeItem('banco' + this.filtro)
        
        this.bancosDados = []
        this.listarBancos()
    },
    
    
  },
  created (){
    this.listarBancos()
  }
  
}
</script>

<style>
    #config {
        overflow: scroll;
    }
    
</style>
