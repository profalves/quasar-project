<template>
<div id="clientes">
   
  <!-- Botão ADD -->
  <q-fixed-position class="fixo" corner="bottom-right" :offset="[18, 18]">
    <q-btn 
       round
       color="primary" 
       @click="novo">
       <q-icon name="add" />
        <q-tooltip>
            Novo
        </q-tooltip>
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
    
  <!-- Botão options -->
  <!--<q-fixed-position class="fixo" corner="top-right" :offset="[18, 18]">
    <q-fab color="primary" icon="menu" direction="left">
      <q-fab-action color="purple" 
                    @click="$router.push('/nivers')" 
                    icon="cake">
          <q-tooltip>
            Aniversariantes
          </q-tooltip>
      </q-fab-action>
      <q-fab-action color="secondary" 
                    @click="" 
                    icon="fa-whatsapp">
          <q-tooltip>
            Enviar para Lista de Transmissão
          </q-tooltip>
      </q-fab-action>
      <q-fab-action color="info" 
                    @click="sync" 
                    icon="sync">
          <q-tooltip>
            Sincronizar
          </q-tooltip>
      </q-fab-action>
    </q-fab>
  </q-fixed-position>-->
  
  <q-fixed-position class="fixo" corner="top-right" :offset="[18, 18]">
    
      <q-btn color="purple"
             round small
             @click="$router.push('/nivers')" 
             icon="cake">
          <q-tooltip>
            Aniversariantes
          </q-tooltip>
      </q-btn>
      <q-btn color="secondary"
             round small
             @click="" 
             icon="fa-whatsapp">
          <q-tooltip>
            Enviar para Lista de Transmissão
          </q-tooltip>
      </q-btn>
      <q-btn color="info"
             round small
             @click="sync" 
             icon="sync">
          <q-tooltip>
            Sincronizar
          </q-tooltip>
      </q-btn>
    
  </q-fixed-position>
  
  <div class="row" style="margin-bottom: 20px">
        <div class="col">
            <h5>Buscar Pessoa</h5>
        </div>
  </div>

  <div class="row">
    <div class="col-xs-6 col-md-3">
     <q-radio v-model="tipoCod" 
              val="cpf"
              label="CPF"
              style="margin-left:20px" 
              @focus="setBusca" />
    </div>
    <div class="col-xs-6 col-md-3">
     <q-radio v-model="tipoCod" 
              val="cnpj" 
              label="CNPJ" 
              style="margin-left:20px"  
              @focus="setBusca" />
    </div>
    <div class="col-xs-6 col-md-3">
     <q-radio v-model="tipoCod" 
              val="telefone" 
              label="Telefone"
              style="margin-left:20px"  
              @focus="setBusca" />
    </div>
    <div class="col-xs-6 col-md-3">
     <q-radio v-model="tipoCod" 
              val="nome"
              label="Nome" 
              style="margin-left:20px" 
              @focus="search = ''" />
    </div>
  </div>
    
    <!--
    <q-checkbox v-model="autocomplete" 
                label="Permitir autocompletar a pesquisa"
                v-if="tipoCod === 'nome'"
                style="margin-left: 10px"
                />
    -->
    <q-search  
             v-model="search" 
             color="none" 
             style="margin-left: 10px"
             placeholder="Procurar..."
             @keyup.enter="obterPessoa"
             v-if="autocomplete"
             >
        <q-autocomplete
          :max-results="maxResults"
          :static-data="{field: 'label', list: listaItens}"
          @selected="obterPessoa"
        />

    </q-search>
    
     <q-search
             v-model="search" 
             color="none" 
             style="margin-left: 10px"
             placeholder="Procurar..."
             @keyup.enter="obterPessoa"
             v-else
             >
    </q-search>
    
    <div v-for="(pessoa, index) in pessoa">
        <q-card no-border>
          <q-card-title>
            {{ pessoa.nome }}
            <span slot="subtitle">
              <div v-if="pessoa.pj">CNPJ: {{ pessoa.cnpj }}</div>
              <div v-else>CPF: {{ pessoa.cpf }}</div>
            </span>
            <q-icon slot="right" name="more_vert">
              <q-popover ref="popover">
                <q-list link class="no-border">
                  <q-item @click="excluir(pessoa)">
                    <q-item-main label="Excluir item" />
                  </q-item>
                  <q-item @click="abrir(pessoa)">
                    <q-item-main label="Abrir Cadastro" />
                  </q-item>
                  <q-item @click="fechar(index)">
                    <q-item-main label="Fechar" />
                  </q-item>
                </q-list>
              </q-popover>
            </q-icon>
          </q-card-title>
          <q-card-main>
            <div>
                <div v-if="`${pessoa.endereco}`">{{pessoa.endereco}} {{pessoa.numero}}</div>
                <div class="row">
                    <div class="col">{{pessoa.bairro}}</div>
                </div>
                <div class="row">
                    <div class="col-auto right" v-show="`${pessoa.cidade}`">{{pessoa.cidade}} - </div>
                    <div class="col-auto">{{pessoa.uf}}</div>
                </div>
                <div>
                    <div class="col">Tipo: {{pessoa.tipo}}</div>    
                </div>
                   
            </div>
          </q-card-main>
          <q-card-separator />
          <q-card-actions center>
            <q-btn flat round
                   color="primary" 
                   icon="phone" 
                   @click="telefones(pessoa)" />
            <q-btn flat round
                   color="positive" 
                   icon="fa-whatsapp"
                   @click="whatsapp(pessoa)" />
            <q-btn flat round
                   color="negative"
                   icon="fa-envelope" 
                   @click="endElet(pessoa)" />
            <q-btn flat round
                   @click="sms (pessoa)">SMS
            </q-btn>
          </q-card-actions>
        </q-card>
        
    </div>
    
    <q-modal minimized ref="telModal">
      <div class="layout-padding">
          <q-list link no-border>
              <q-list-header>Ligar para Telefone de {{pessoaNome}}</q-list-header>
              <q-item v-for="(fone, index) in fones" :key="index">
                  <a :href='`tel:${fone.numero}`'>{{fone.numero}}</a>
              </q-item>
              <q-item-separator />
          </q-list>
          <br>
          <q-btn color="primary" @click="$refs.telModal.close()">Fechar</q-btn>
      </div>
    </q-modal>
    
    <q-modal minimized ref="smsModal">
      <div class="layout-padding">
          <q-list link no-border>
              <q-list-header>Enviar SMS para {{pessoaNome}}</q-list-header>
              <q-item v-for="(fone, index) in fones" :key="index">
                  <a :href='`sms:${fone.numero}`'>{{fone.numero}}</a>
              </q-item>
              <q-item-separator />
          </q-list>
          <br>
          <q-btn color="primary" @click="$refs.smsModal.close()">Fechar</q-btn>
      </div>
    </q-modal>
    
    <q-modal minimized ref="emailModal">
      <div class="layout-padding">
          <q-list link no-border>
              <q-list-header>Enviar Email para {{pessoaNome}}</q-list-header>
              <q-item v-for="(email, index) in emails" :key="index">
                  <a :href='`mailto:${email.endereco}`'>{{email.endereco}}</a>
              </q-item>
              <q-item-separator />
          </q-list>
          <br>
          <q-btn color="primary" @click="$refs.emailModal.close()">Fechar</q-btn>
      </div>
    </q-modal>
    
    <br><br><br><br><br>
    
</div>
</template>

<script>
import { Alert, Dialog, Toast, Loading, clone, openURL } from 'quasar'
import axios from 'axios'
import { AtomSpinner } from 'epic-spinners'
import localforage from 'localforage'

const API = localStorage.getItem('wsAtual')
  
//debug
//const API = localStorage.getItem('wsAtual')

export default { 
  data () {
    return {
      tipoCod: 'nome',
      search: '',
      autocomplete: (localStorage.getItem('autocomplete') === 'true'),
      pessoas: [],
      pessoa: '',
      pessoaNome: '',
      fones: [],
      emails: [],
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
      row: '',
      maxResults: parseInt(localStorage.getItem('maxResults')),
      
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
  computed:{
    /*colorsClasses() {
      let classes
      if(this.pessoa.qtd<0){
        classes = 'text-negative'
      }
      else if(this.pessoa.qtd>0){
        classes = 'text-primary'
      }
      
      return classes
    },*/
    listaItens(){
      let a = this.pessoas
      let lista = []
      
      lista = a.map(row => ({
          label: row.nome, 
          value: row.codigo
      }))
      //console.log(lista)
      return lista
    },
  },
  methods: {
    goBack(){
        window.history.back()
    },
    setBusca(){
      this.search = ''
      this.autocomplete = false
    },
    listarPessoas(){
      Loading.show({
          spinner: AtomSpinner,
          spinnerSize: 140,
          message: 'Aguardando Dados...'
      })
      axios.get(API + 'pessoa/obterpessoa?todos=true')
      .then((res)=>{
          this.pessoas = res.data
          Loading.hide()
      })
      .catch((e)=>{
        console.log(e)
        Loading.hide()
      })  
    },
    obterPessoa(){
      if(localStorage.getItem('loadPessoas') !== 'true'){
          localforage.getItem('Pessoas').then((value) => {
            if(value){
              if(this.search === ''){
                this.pessoa = value
                console.log(this.pessoa)
              }
              else if(this.tipoCod === 'cpf' && this.search !== ''){
                this.pessoa = value.filter(row => row.cpf.indexOf(this.search) >= 0);
              }
              else if(this.tipoCod === 'cnpj' && this.search !== ''){
                this.pessoa = value.filter(row => { 
                  const cnpj = row.cnpj || ''
                  return cnpj.indexOf(this.search) >= 0
                })
                console.log(this.pessoa)
              }
              else if(this.tipoCod === 'telefone' && this.search !== ''){
                this.pessoa = value.filter(row => {
                  if(row.telefones.length > 0){
                    return row.telefones.filter(el => el.numero.indexOf(this.search) >=0)
                  }
                
                });
                console.log(this.pessoa)
              }
              else if(this.autocomplete && this.search !== ''){
                this.pessoa = value.filter(row => row.nome.indexOf(this.search) >= 0);
                console.log(this.pessoa)
              }
              else {
                this.pessoa = value.filter(row => row.nome.toLowerCase().indexOf(this.search) >= 0);
                console.log(this.pessoa)
              }
                
            }
          })
          return
      }
      
      let URL
      if(this.search === ''){
        URL = API + 'pessoa/obterpessoa?todos=true'
      }
      else if(this.tipoCod === 'cpf' && this.search !== ''){
        URL = API + 'pessoa/obterpessoa?cpf=' + this.search
      }
      else if(this.tipoCod === 'cnpj' && this.search !== ''){
        URL = API + 'pessoa/obterpessoa?cnpj=' + this.search
      }
      else if(this.tipoCod === 'telefone' && this.search !== ''){
        URL = API + 'pessoa/obterpessoa?telefone=' + this.search
      }
      else {
          URL = API + 'pessoa/obterpessoa?nome=' + this.search
      }
      
      Loading.show({
          spinner: AtomSpinner,
          spinnerSize: 140,
          message: 'Aguardando Dados...'
      })
      axios.get(URL)
      .then((res)=>{
          console.log(res)
          this.pessoa = res.data
          if(res.data.length === 0){
            Toast.create('Nenhum resultado encontrado com ' + '"' + this.search + '"')
          }
          Loading.hide()
      })
      .catch((e)=>{
        console.log(e)
        Loading.hide()
      })  
    },
    limpar (){
      this.search = ''
      this.pessoa = []
    },
    abrir (pessoa) {
      localStorage.setItem('codPessoa', pessoa.codigo)
      localStorage.setItem('cadMode', 'edit')
      this.$router.push({ path: '/cadcliente' }) 
    },
    fechar(index) {
      this.pessoa.splice(index,1)
      this.search = ''
        
    },
    excluir (pessoa) {
      Dialog.create({
          title: 'Excluir',
          message: 'Tem certeza que deseja excluir ' + pessoa.nome + ' registro(s)?',
          buttons: [
            {
              label: 'Não! Cancela',
              color: 'negative',
              raised: true,
              style: 'margin-top: 20px',
              handler () {
                  Toast.create('Exclusão cancelada...')
              }
            },
            {
              label: 'Sim! Pode excluir',
              color: 'positive',
              raised: true,
              style: 'margin-top: 20px',
              handler: () => {
                  let cliente = pessoa
                  Loading.show({
                      spinner: AtomSpinner,
                      spinnerSize: 140,
                      message: 'Enviando Dados...'
                  })
                  axios.post(API + 'pessoa/excluirPessoa?codPessoa=' + cliente.codigo)
                  .then((res)=>{
                      Toast.create(cliente.nome + ' foi excluido com sucesso')
                      //console.log(res)
                      Loading.hide()
                      this.limpar()
                      this.listarPessoas()
                  })
                  .catch((e)=>{
                    console.log(e)
                    return
                  }) 
                   
              }
            }
          ]
      })
    },
    whatsapp (pessoa) {
      this.row = pessoa.telefones
      let row = pessoa.telefones
      console.log('row', row.telefones);
        
      if(row.length < 1){
        Toast.create('Não há numeros salvos para este cadastro')
      }
      for (let i=0; i < row.length; i++) {
          if(row[i].movel === true){
            let w = row[i].numero
            Dialog.create({
              title: 'Enviar mensagem via Whatsapp para ' + w,
              message: 'Digite a sua mensagem aqui abaixo e clique em enviar.',
              form: {
                msg: {
                  type: 'textarea',
                  label: 'Mensagem',
                  model: ''
                }
              },
              buttons: [
                {
                  label: 'Cancelar',
                  color: 'negative',
                },
                {
                  label: 'Enviar',
                  color: 'positive',
                  handler: (data) => {
                    console.log(data)
                    console.log('telefone:', w)
                    openURL('https://api.whatsapp.com/send?phone=' + 55 + w + '&text=' + data.msg)
                  }
                }
              ]
            })  
          }
          else{
           Toast.create('Não há celulares definidos para este cadastro')
          }
            

      }
    },
    telefones (pessoa){
        if(pessoa.telefones.length < 1){
            Toast.create('Não há numeros salvos para este cadastro')
            return
        }
        this.$refs.telModal.open()
        this.pessoaNome = pessoa.nome
        this.fones = pessoa.telefones
        //console.log('telefones: ', row);
    },
    sms (pessoa){
        if(pessoa.telefones.length < 1){
            Toast.create('Não há numeros salvos para este cadastro')
            return
        }
        this.$refs.smsModal.open()
        this.pessoaNome = pessoa.nome
        this.row = pessoa.telefones
        let row = pessoa.telefones
        this.fones = row
        //console.log('telefones: ', row);
    },
    endElet (pessoa){
        if(pessoa.endEletronico.length < 1){
            Toast.create('Não há emails salvos para este cadastro')
            return
        }
        this.$refs.emailModal.open()
        this.pessoaNome = pessoa.nome
        this.row = pessoa.endEletronico
        let row = pessoa.endEletronico
        this.emails = row
        //console.log('emails: ', row);
    },
    refresh (done){
      this.listarPessoas()
      done()
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
    novo (){
      localStorage.setItem('cadMode', 'save')
      this.$router.push('/cadcliente')
    },
    sync(){
      Loading.show({
          spinner: AtomSpinner,
          spinnerSize: 140,
          message: 'Sincronizando Dados...'
      })
      axios.get(API + 'pessoa/obterpessoa?todos=true')
      .then((res)=>{
          //console.log(res.data)
          localforage.setItem('Pessoas', res.data).then((value) => {
            this.pessoas = (value)
            Toast.create('Dados sincronizados com sucesso')
          }).catch((err) => {
            console.log(err);
          });
          Loading.hide()
      })
      .catch((e)=>{
        console.log(e)
        Loading.hide()
      })
      
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
    if(localStorage.getItem('loadPessoas') === 'true'){
        this.listarPessoas()
        return
    }
      
    localforage.getItem('Pessoas').then((value) => {
        if(value){
            console.log('localforage get')
            console.log(value)
            this.pessoas = value;
        }
        else{
            console.log('localforage fail')
            this.listarPessoas()
        }
        
    }).catch((err) => {
        console.log(err)
        console.log('fail')
    }) 
    
  },
  
  
}
</script>

<style lang="stylus">
.my-label
  padding 5px
  border-radius 3px
  display inline-block
.over
  z-index 5
  position fixed
.right 
  padding-right 3px
</style>