<template>
<div id="clientes">

  <!-- Botão ADD -->
  <q-fixed-position class="over" corner="bottom-right" :offset="[18, 18]">
    <q-btn 
       round
       color="primary" 
       @click="novo">
       <q-icon name="add" />
    </q-btn>
  </q-fixed-position>
    
  <!-- Botão niver -->
  <q-fixed-position class="over" corner="bottom-left" :offset="[18, 18]">
    <q-fab color="primary" icon="group" direction="right">
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
    </q-fab>
  </q-fixed-position>
  
  <div class="row">
        <div class="col">
            <h5>Buscar Pessoa</h5>
        </div>
    </div>

    <!--<q-toolbar slot="header" inverted color="tertiary">
       <q-radio v-model="tipoCod" 
                val="barras"
                label="Cód. Barras" 
                @focus="search = ''" />
       <q-radio v-model="tipoCod" 
                val="emp" 
                label="Cód. Emp" 
                style="margin-left:20px"  
                @focus="search = ''" />
       <q-radio v-model="tipoCod" 
                val="nome"
                label="Nome" 
                style="margin-left:20px" 
                @focus="search = ''" />
    </q-toolbar>-->

    <q-search  
             v-model="search" 
             color="none" 
             style="margin-left: 10px"
             placeholder="Procurar..."
             @keyup.enter="obterPessoa"
             @blur="obterPessoa"
             >
        <q-autocomplete
          :static-data="{field: 'label', list: listaItens}"
          @selected="obterPessoa"
        />

    </q-search>
    
    <div v-for="pessoa in pessoa">
        <q-card v-if="pessoa" no-border>
          <q-card-title>
            {{ pessoa.nome }}
            <span slot="subtitle">{{ pessoa.apelido }}</span>
            <q-icon slot="right" name="more_vert">
              <q-popover ref="popover">
                <q-list link class="no-border">
                  <q-item @click="excluir()">
                    <q-item-main label="Excluir item" />
                  </q-item>
                  <q-item @click="abrir()">
                    <q-item-main label="Abrir Cadastro" />
                  </q-item>
                  <q-item @click="limpar()">
                    <q-item-main label="Fechar" />
                  </q-item>
                </q-list>
              </q-popover>
            </q-icon>
          </q-card-title>
          <q-card-main>
            <!--<div class="row">
                <div class="col-xs-12 col-md-6" v-if="0===1"> <!--permissão ver custo--
                    <q-field
                      icon="monetization_on"
                    >
                     <p class="fields">
                        <strong>Custo: </strong>{{ pessoa.custo }} 
                     </p>

                    </q-field>
                </div>
                <div class="col">
                    <q-field
                      icon="store"

                    >
                     <p class="fields">
                        <strong>Estoque Atual: </strong><span :class="colorsClasses">{{ pessoa }}</span> 
                     </p>

                    </q-field>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12 col-md-6">
                    <q-field
                      icon="monetization_on"
                    >
                     <p class="fields">
                        <strong>Venda: </strong>{{ pessoa.valor | formatMoney }} 
                     </p>

                    </q-field>
                </div>
                <div class="col">
                    <q-field
                      icon="store"

                    >
                     <p class="fields">
                        <strong>Estoque Atual: </strong><span :class="colorsClasses">{{ pessoa.qtd }}</span> 
                     </p>

                    </q-field>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12 col-md-6">
                    <q-field
                      icon="fa-barcode"

                    >
                     <p class="fields">
                        <strong>Cód. Barras: </strong>{{ pessoa.codBarra }} 
                     </p>

                    </q-field>
                </div>
                <div class="col">
                    <q-field
                      icon="local_grocery_store"

                    >
                     <p class="fields">
                        <strong>Família: </strong>{{ pessoa.familia }} 
                     </p>

                    </q-field>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12 col-md-6">
                    <q-field
                      icon="fa-th-large"

                    >
                     <p class="fields">
                        <strong>Categoria: </strong>{{ pessoa.categoria }} 
                     </p>

                    </q-field>
                </div>
                <div class="col">
                    <q-field
                      icon="fa-truck"

                    >
                     <p class="fields">
                        <strong>Marca: </strong>{{ pessoa.marca }} 
                     </p>

                    </q-field>
                </div>
            </div>-->
          </q-card-main>
          <!--<q-card-separator />
          <q-card-actions center>
            <q-btn flat @click="abrir">Abrir</q-btn>
            <q-btn flat @click="limpar">Fechar</q-btn>
          </q-card-actions>-->
        </q-card>
    </div>
    
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
      search: '',  
      pessoas: [],
      pessoa: '',
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
    obterPessoa(){
      Loading.show({
          spinner: AtomSpinner,
          spinnerSize: 140,
          message: 'Aguardando Dados...'
      })
      axios.get(API + 'pessoa/obterpessoa?nome=' + this.search)
      .then((res)=>{
          //console.log(res.data)
          this.pessoa = res.data
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
                      Loading.show({
                          spinner: AtomSpinner,
                          spinnerSize: 140,
                          message: 'Enviando Dados...'
                      })
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
      this.row = props.rows[0].data.telefones
      let row = props.rows[0].data.telefones
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
    telefones (props){
        this.$refs.telModal.open()
        let nome = props.rows[0].data.nome
        this.pessoa = nome
        this.row = props.rows[0].data.telefones
        let row = props.rows[0].data.telefones
        this.fones = row
        //console.log('telefones: ', row);
    },
    endElet (props){
        this.$refs.emailModal.open()
        let nome = props.rows[0].data.nome
        this.pessoa = nome
        this.row = props.rows[0].data.endEletronico
        let row = props.rows[0].data.endEletronico
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
    
    localforage.getItem('Pessoas').then((value) => {
        if(value){
            console.log('get')
            console.log(value)
            this.pessoas = JSON.parse(value);
        }
        else{
            Toast.create('Não há pessoas aqui')
            //this.listarPessoas()
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
</style>