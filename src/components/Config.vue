<template>
  <div>
     
      <q-fixed-position class="fixo" corner="bottom-left" :offset="[18, 18]">
        <q-btn 
           round
           color="primary" 
           @click="goBack">
           <q-icon name="chevron_left" />
        </q-btn>
      </q-fixed-position>
      
      <q-fixed-position class="fixo" corner="bottom-right" :offset="[18, 18]">
        <q-btn 
           rounded
           color="primary" 
           @click="$router.push('test')">
           Testes
        </q-btn>
      </q-fixed-position>
      
      <div class="row">
        <div class="col-xl-6">
          <q-list inset-separator style="background-color: white; margin-bottom: 40px;">
            <!-- GRAFICOS -->
            <q-collapsible icon="settings" label="Configuações de Gráficos" sublabel="Configurações de exibição de gráficos no sistema">
              <div>
               <q-field label="Tipo de Gráfico a Exibir">
                <q-select
                      v-model="tipoGrafico"
                      class="col-xs-6 col-sm"
                      @change="alterarGrafico"
                      :options="[
                        {
                          label: 'Linha',
                          icon: 'show_chart',
                          value: 'line'
                        },
                        {
                          label: 'Barra',
                          icon: 'insert_chart',
                          value: 'bar'
                        },
                        {
                          label: 'Pizza',
                          icon: 'pie_chart',
                          value: 'pie'
                        },
                        {
                          label: 'Donut',
                          icon: 'donut_large',
                          value: 'donut'
                        },
                       ]"/>
                 </q-field>
                 <p class="caption">
                    Altura
                 </p>
                 <q-slider :label-value="`${height}px`" v-model="height" :min="10" :max="600" :step="10" label-always color="teal" @change="alterarTamGrafico" />
                 
              </div>
            </q-collapsible>
            <!-- LISTAS -->
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
            <!-- BANCOS -->
            <q-collapsible  icon="device_hub" 
                            label="Banco de Dados" 
                            sublabel="Configure a Empresa ao qual deseja conectar"
                            :opened="bdConfig"
                            >
              <p id="chip">
                <q-chip tag closable color="black" @close="close"><i>Para salvar um banco, o mesmo deve ser digitado e depois clicar no botão adicionar(+)</i></q-chip>
              </p>
              <div class="row">
                <div class="col">
                  <q-field
                    icon="domain"
                    helper="Nome da Empresa"
                  >
                    <q-input v-model.trim="empresa" clearable />
                  </q-field>   
                </div>
              </div>
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
              </div>
              <div class="row">
                <div class="col">
                  <q-field
                    icon="vpn_key"
                    helper="Senha do Banco de Dados"
                  >
                    <q-input v-model.trim="senhaBd" type="password" clearable />
                  </q-field>   
                </div> 
                <div class="col-2 btn-plus" style="text-align:center">
                    <q-btn 
                       rounded
                       color="primary" 
                       @click="salvarBanco">
                       <q-icon name="check" v-if="edit"/>
                       <q-icon name="add" v-else/>
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
                      <th class="text-left">Empresa</th>
                      <th class="text-left">Banco de Dados</th>
                      <th class="text-left">IP/Host</th>
                      <th class="text-left">Porta</th>
                      <th class="text-left">Editar</th>
                      <th class="text-left">Excluir</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in bancosDados">
                      <td class="text-left">{{ item.IdBanco }}</td>
                      <td class="text-left">{{ item.empresa }}</td>
                      <td class="text-left">{{ item.banco }}</td>
                      <td class="text-left">{{ item.ip }}</td>
                      <td class="text-left">{{ item.porta }}</td>
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
    </div>
    <br><br><br>
    
  </div>
</template>

<script>
import { Dialog, Toast } from 'quasar'

export default {
  data () {
    return {
      //btn voltar
      canGoBack: window.history.length > 1,
      
      //Gerais
      tipoGrafico: localStorage.getItem('tipoGrafico'),
      height: parseInt(localStorage.getItem('alturaGrafico')),
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
      empresa: '',
      ip: '',
      porta: '',
      banco: '',
      senhaBd: '',
      bancoID: '',
      bancosDados: [],
      filtro: '',
      indice: '',
      edit: false,
      bdConfig: false,
        
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
    },
    storageAvailable: function(type) {
        try {
            let x = '__storage_test__';
            localStorage.setItem(x, x);
            localStorage.removeItem(x);
            return true;
        }
        catch(e) {
            return e instanceof DOMException && (
                // everything except Firefox
                e.code === 22 ||
                // Firefox
                e.code === 1014 ||
                // test name field too, because code might not be present
                // everything except Firefox
                e.name === 'QuotaExceededError' ||
                // Firefox
                e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
                // acknowledge QuotaExceededError only if there's something already stored
                localStorage.length !== 0;
        }
    },
    localStorage(){
        let total = 0;
        for(let x in localStorage) {
            if(x !== 'length'){
                var quantidade = (localStorage[x].length * 2) / 1024;
                total += quantidade ;
                //console.log( x + " = " + quantidade .toFixed(2) + " KB");
            }
        }
        console.log( "Total armazenado no localStorage: " + total.toFixed(2) + " KB");
        return total.toFixed(2) + " KB"
    }
  },
  methods: {
    goBack(){
      window.history.go(-1)
    },
      
    //Gerais
    alterarGrafico(){
        localStorage.setItem('tipoGrafico', this.tipoGrafico)
    },
    alterarTamGrafico(){
        parseInt(localStorage.setItem('alturaGrafico', this.height))
    },
    resetGerais(){
        /* associar valores Default nos atributos de Gerais */
    
    },
    
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
        this.rowHeight = 45
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
                            banco: localStorage.getItem('banco' + i),
                            empresa: localStorage.getItem('Empresa' + i)
                        }
            if(lista.IdBanco!==null){
                this.bancosDados.push(lista)
            }
        }

    },
    salvarBanco(){
        if(this.ip === ''){ 
            Toast.create.negative('Não pode salvar com as informações de Banco de dados vazias')
            return
        }
        if(this.edit === true){ //editar
            localStorage.setItem('Empresa' + this.filtro, this.empresa)
            localStorage.setItem('ip' + this.filtro, this.ip)
            localStorage.setItem('porta' + this.filtro, this.porta)
            localStorage.setItem('banco' + this.filtro, this.banco)
            localStorage.setItem('senhaBD' + this.filtro, this.senhaBd)
            this.empresa = ''
            this.ip = ''
            this.porta = ''
            this.banco = ''
            this.senhaBd = ''
            this.edit = false
            Toast.create.positive({
                html: 'Configurações salvas com sucesso',
                icon: 'done'
            })
            this.bancosDados = []
            this.listarBancos()
        }
        else{ //novo
            var bancoCont = parseInt(localStorage.getItem('bancoCont'))
            if(isNaN(bancoCont)) {
                bancoCont = 0
            }
            var cont = bancoCont + 1
            localStorage.setItem('bancoCont', cont)
            localStorage.setItem('IdBanco' + localStorage.getItem('bancoCont'), cont)
            localStorage.setItem('Empresa' + localStorage.getItem('bancoCont'), this.empresa)
            localStorage.setItem('ip' + localStorage.getItem('bancoCont'), this.ip)
            if(this.porta > 0){
                localStorage.setItem('porta' + localStorage.getItem('bancoCont'), this.porta)
            }
            localStorage.setItem('banco' + localStorage.getItem('bancoCont'), this.banco)
            localStorage.setItem('senhaBD' + localStorage.getItem('bancoCont'), this.senhaBd)
            this.empresa = ''
            this.ip = ''
            this.porta = ''
            this.banco = ''
            this.senhaBd = ''
            Toast.create.positive({
                html: 'Configurações salvas com sucesso',
                icon: 'done'
            })
            this.bancosDados = []
            this.listarBancos()
            
            if(this.bancosDados.length === 1){
                let port = ''
                if(localStorage.getItem('porta1')){
                    port = ':' + localStorage.getItem('porta1')     
                }
                let DB = ''
                if(localStorage.getItem('banco1')){
                    DB = '/' + localStorage.getItem('banco1')     
                }
                let sv = localStorage.getItem('ip1')
                localStorage.setItem('wsAtual', 'http://' + sv + port + DB + '/' )

                //API = localStorage.getItem('wsAtual')
            }
        }
    },
    editar(item, index) {
        this.filtro = item.IdBanco
        this.edit = true
        this.empresa = localStorage.getItem('Empresa' + this.filtro)
        this.ip = localStorage.getItem('ip' + this.filtro)
        this.porta = localStorage.getItem('porta' + this.filtro)
        this.banco = localStorage.getItem('banco' + this.filtro)
        this.senhaBd = localStorage.getItem('senhaBD' + this.filtro)
        
    },
    excluir(item, index) {
        this.filtro = item.IdBanco
        this.indice = index
        
        if(this.indice !== -1) {
            this.bancosDados.splice(index,1)
        }
        
        localStorage.removeItem('Empresa' + this.filtro)
        localStorage.removeItem('IdBanco' + this.filtro)
        localStorage.removeItem('ip' + this.filtro)
        localStorage.removeItem('porta' + this.filtro)
        localStorage.removeItem('banco' + this.filtro)
        localStorage.removeItem('senhaBD' + this.filtro)
        
        this.bancosDados = []
        this.listarBancos()
    },
    close(){
        document.getElementById('chip').remove()
    }
    
  },
  created (){
    this.listarBancos()
    if(this.$route.query.bdConfig === true){
        this.bdConfig = true
        Dialog.create({
          title: 'Bem-vindo às Configurações',
          message: 'Você foi redirecionado para esta tela. Configure um banco de dados com as informações necessárias para a sua conexão.',
          buttons: [
            {
              label: 'Ok',
              color: 'info',
              raised: true
            }
          ]
        })
    }
  }
  
}
</script>

<style>
    #config {
        overflow: scroll;
    }
    .low{
        margin-bottom: 50px
    }
    .fixo{
        z-index: 
    }
</style>
