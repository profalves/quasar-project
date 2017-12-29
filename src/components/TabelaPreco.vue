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
      
      <div class="row">
        <div class="col">
            <h5>Cadastrar Nova Tabela de Preço</h5>
        </div>
      </div>
      
      <div class="row">
        <div class="col-xl-6">
          <q-list inset-separator style="background-color: white;">
            <!-- Cadastrar Tab -->
            <div class="layout-padding">
              <div class="row">
                <div class="col">
                  <q-field
                    icon="assignment"
                  >
                    <q-input v-model.trim="empresa" float-label="Nome da Tabela" clearable />
                  </q-field>   
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <q-field
                    icon="show_chart"
                    helper="Margem de Lucro"
                  >
                    <money v-model="ip"
                           v-bind="perc"
                           class="mdInput"
                    />
                  </q-field>   
                </div>
                <div class="col-md-6">
                  <q-field
                    icon="multiline_chart"
                    helper="Margem de Lucro Minima"
                  >
                    <money v-model="ip"
                           v-bind="money"
                           class="mdInput"
                    />
                  </q-field>   
                </div>    
              </div>
              <div class="row">
                <div class="col">
                  <q-field
                    icon="monetization_on"
                    helper="Desconto Máximo"
                  >
                    <money v-model="ip"
                           v-bind="perc"
                           class="mdInput"
                    />
                  </q-field>   
                </div> 
                <div class="col btn-plus" style="text-align:center">
                    <q-btn 
                       rounded
                       color="primary" 
                       @click="salvarBanco">
                       Adicionar
                    </q-btn>
                </div>
              </div>
              <br>
              Tabelas de Preços salvas: <br><br>

            <div class="row" id="config">    
                <table class="q-table" :class="computedClasses" style="width: 100%">
                  <thead>
                    <tr>
                      <th class="text-left">Cód.</th>
                      <th class="text-left">Nome</th>
                      <th class="text-left">Margem de Lucro</th>
                      <th class="text-left">ML Min.</th>
                      <th class="text-left">Desconto Máx</th>
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
            
            </div>

          </q-list>
      </div>
    </div>
    <br><br><br>
    
  </div>
</template>

<script>
import { Dialog, Toast, Loading } from 'quasar'
import axios from 'axios'
    
const API = localStorage.getItem('wsAtual')
  
//debug
//const API = 'http://192.168.0.200:29755/'   

export default {
  data () {
    return {
      //btn voltar
      canGoBack: window.history.length > 1,
      tabs: [],
            
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
        
      money: {
        decimal: ',',
        thousands: '.',
        prefix: 'R$ ',
        //suffix: ' #',
        precision: 2,
        masked: false /* doesn't work with directive */
      },
      perc: {
        decimal: ',',
        thousands: '.',
        //prefix: 'R$ ',
        suffix: ' %',
        precision: 2,
        masked: false /* doesn't work with directive */
      },
        
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
    goBack(){
      window.history.go(-1)
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
    listarTabs (){
        Loading.show({message: 'Aguardando dados...'})
        axios.get(API + 'produto/obterProdutosTbPrecoCab')
          .then((res)=>{
            Loading.hide()
            this.tabs = res.data
            //console.log(res)
          })
          .catch((e)=>{
            Loading.hide()
            console.log(e)
            Toast.create({
                html: 'Sem Conexão',
                timeout: 6000,
                bgColor: '#f44242',
                icon: 'mood_bad'
            })
          })
    },
    salvarBanco(){
        if(this.ip === ''){ 
            Toast.create.negative('Não pode salvar com as informações de Banco de dados vazias')
            return
        }
        if(this.edit === true){ //editar
            localStorage.setItem('Empresa' + this.filtro, this.empresa)
            localStorage.setItem('ip' + this.filtro, this.ip)
            if(this.porta > 0){
                localStorage.setItem('porta' + this.filtro, this.porta)
            }
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
    
    
  },
  mounted(){
    this.listarTabs()
    
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
