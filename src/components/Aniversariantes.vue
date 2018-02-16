<template>
  <div>
    <q-fixed-position class="fixo" corner="bottom-left" :offset="[18, 18]">
        <q-btn 
           round
           color="primary" 
           @click="goBack">
           <q-icon name="keyboard_arrow_left" />
        </q-btn>
    </q-fixed-position>
     
    <q-fixed-position class="fixo" corner="bottom-right" :offset="[18, 18]">
        <q-btn 
           rounded
           color="primary" 
           @click="getHoje">
           <q-icon name="cake" style="padding-right:5px"/>
            hoje
        </q-btn>
    </q-fixed-position>
      
    <h5>Lista de Aniversariantes</h5>
    
    <q-select
      float-label="Mês"
      v-model="mes"
      :options="meses"
      @change="getAniversariantes"
    />
    
    <!--<q-btn color="primary" @click="getAniversariantes">Obter</q-btn>-->
      
    <div v-if="visivel">
      
        <div class="row">
            <div class="col">
                <q-field
                  icon="search"
                >
                  <q-input v-model="filtroNome" float-label="Pesquisar pelo Nome"/>
                </q-field>
            </div>
            <!--<div class="col-xs-12 col-md-6">
                <q-field
                  icon="search"
                >
                  <q-input v-model="filtroData" float-label="Pesquisar pela Data"/>
                </q-field>
            </div>-->
        </div>
    
        <div id="table">
            <table class="q-table" :class="computedClasses" style="margin-left:1px">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Data</th>
                  <!--<th>Dia</th>-->
                  <th>Enviar</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in nivers">
                  <td data-th="Name">{{ item.nome }}</td>
                  <td data-th="Data">{{ item.dataNasc | formatNiver }}</td>
                  <!--<td data-th="Dia">{{ item.dataNasc | formatDay }}</td>-->
                  <td data-th="Enviar">
                      <q-fab color="primary" icon="keyboard_arrow_left" direction="left">
                          <q-fab-action color="lime" @click="msgEmail(item)" icon="mail" />
                          <q-fab-action color="info" @click="fone(item)" icon="phone" />
                          <q-fab-action color="secondary" @click="whats(item)" icon="fa-whatsapp" />
                          <q-btn
                            color="primary" 
                            rounded
                            @click="abrir(item)"
                            >
                            abrir
                          </q-btn>
                      </q-fab>
                  </td>

                </tr>
              </tbody>
            </table>
        </div>

    </div>
      
    <q-modal minimized ref="telModal">
          <div>
              <div v-if="fones.length === 0" class="layout-padding">
                  <q-item>Nenhum telefone cadastrado</q-item>

              </div>
              <q-list link no-border v-else>
                  <q-list-header>Ligar para Telefone de {{pessoa}}</q-list-header>
                  
                  <q-item v-for="(fone, index) in fones" :key="index">
                      <a :href='`tel:${fone.numero}`'>{{fone.numero}}</a>
                  </q-item>
                  <q-item-separator />
              </q-list>
              <br>
              <q-btn color="primary" @click="$refs.telModal.close()" id="btn-modal">Fechar</q-btn>
          </div>
      </q-modal>

    <q-modal minimized ref="emailModal">
          <div>
              <div v-if="emails.length === 0" class="layout-padding">
                  <q-item>Nenhum email cadastrado</q-item>

              </div>
              <q-list link no-border v-else>
                  <q-list-header>Enviar Email para {{pessoa}}</q-list-header>
                  <q-item v-for="(email, index) in emails" :key="index">
                      <a :href='`mailto:${email.endereco}`'>{{email.endereco}}</a>
                  </q-item>
                  <q-item-separator />
              </q-list>
              <br>
              <q-btn color="primary" @click="$refs.emailModal.close()" id="btn-modal">Fechar</q-btn>
          </div>
      </q-modal>
      
    <br><br><br><br>  
  </div>
</template>

<script>
import { Toast, Dialog, Loading, openURL } from 'quasar'
import axios from 'axios'
import { FulfillingBouncingCircleSpinner } from 'epic-spinners'
var moment = require('moment');
require("moment/min/locales.min");
moment.locale('pt-br');
    
const API = localStorage.getItem('wsAtual')
  
//debug
//const API = 'http://192.168.0.200:29755/'

export default {
  data () {
    return {
      pessoas: [],
      pessoa: '',
      meses: [
          { 
              label:'Janeiro', 
              value: 1
          },
          { 
              label:'Fevereiro', 
              value: 2
          },
          { 
              label:'Março', 
              value: 3
          },
          { 
              label:'Abril', 
              value: 4
          },
          { 
              label:'Maio', 
              value: 5
          },
          { 
              label:'Junho', 
              value: 6
          },
          { 
              label:'Julho', 
              value: 7
          },
          { 
              label:'Agosto', 
              value: 8
          },
          { 
              label:'Setembro', 
              value: 9
          },
          { 
              label:'Outubro', 
              value: 10
          },
          { 
              label:'Novembro', 
              value: 11
          },
          { 
              label:'Dezembro', 
              value: 12
          }
      ],
      mes: '',
      visivel: false,
      filtroNome: '',
      filtroData: '',
      fones: [],
      emails: [],
        
      //tabela
      misc: 'highlight', //[{value: 'bordered'},{value: 'highlight'}]
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
    nivers () {
        if(this.filtroNome){
            return this.pessoas.filter(niver => niver.nome.toLowerCase().indexOf(this.filtroNome)>=0)
        }
        if(this.filtroData){
            return this.pessoas.filter(niver => niver.dataNasc.indexOf(this.filtroData)>=0)
        }
        return this.pessoas
    }
  },
  filters:{
    formatNiver: function (value) {
        if(value === null) return null
        return moment(value).format("DD-MM")
    },
    formatDay: function (value) {
        if(value === null) return null
        return moment(value).format("dddd")
    }
  },
  methods: {
    goBack(){
        window.history.back()
    },
    getAniversariantes(){
      Loading.show({
          spinner: FulfillingBouncingCircleSpinner,
          spinnerSize: 140,
          message: 'Aguardando Dados...'
      })
      axios.get(API + 'pessoa/obteraniversariante?mes=' + this.mes)
      .then((res)=>{
        this.visivel = true
        this.pessoas = res.data
        Loading.hide()
      })
      .catch((e)=>{
        console.log(e.response)
        Loading.hide()
      })
    },
    getHoje(){
      Loading.show({
          spinner: FulfillingBouncingCircleSpinner,
          spinnerSize: 140,
          message: 'Aguardando Dados...'
      })
      axios.get(API + 'pessoa/obteraniversariante')
      .then((res)=>{
        if(typeof res.data === 'string'){
            Dialog.create({
              title: res.data,
              //message: res.data,
              buttons: [
                {
                  label: 'ok',
                  raised: true,
                  color: 'info'
                }
              ]
            })
        }else{
            this.visivel = true
            this.pessoas = res.data
        }
        Loading.hide()
      })
      .catch((e)=>{
        console.log(e.response)
        Loading.hide()
      })
    },
    msgEmail(item){
      this.$refs.emailModal.open()
      this.emails = item.endEletronico
      this.pessoa = item.nome
      //console.info(this.fones)
    },
    fone(item){
      this.$refs.telModal.open()
      this.fones = item.telefones
      this.pessoa = item.nome
      //console.info(this.fones)
    },
    whats(item){
      let row = item.telefones
      console.log('row', row);
      if(row.length < 1){
        Toast.create('Não há numeros salvos para este cadastro')
      }
      for(let i=0; i < row.length; i++){
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
                    //console.log(data)
                    //console.log('telefone:', w)
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
    abrir(item){
      let row = item
      localStorage.setItem('codPessoa', row.codigo)
      localStorage.setItem('cadMode', 'edit')
      localStorage.setItem('tela', 'nivers')
      this.$router.push({ path: '/cadcliente' }) 
    }
    
  },
  created(){
    if(localStorage.getItem('tela') === 'hoje'){
        this.getHoje()
    }
  }
  
}
</script>

<style scoped>
    @media (max-height: 540px) {
      #table {
        margin-top: 10px;
        max-width: 100%;
        max-height: 400px;
        line-height: 100%;
        overflow: scroll;
        }
    }
    @media (min-height: 550px ) {
      #table {
        margin-top: 10px;
        max-width: 100%;
        max-height: 420px;
        line-height: 100%;
        overflow: scroll;
        }
    }
    @media (min-height: 730px) {
      #table {
        margin-top: 10px;
        max-width: 100%;
        max-height: 590px;
        line-height: 100%;
        overflow: scroll;
        }
    }
    
    #table {
        margin-top: 10px;
        max-width: 100%;
        max-height: auto;
        line-height: 100%;
        overflow: scroll;
    }
    
    table {
        border-collapse: collapse;
        border: 1px solid #666;
        width: 100%;    
    }
    
    th {
        background-color: white;
    }
    
    #btn {
        margin: 0 0 5px 5px;
    }
    
    #btn-modal {
        margin: 0 0 15px 15px;
    }
    
</style>
