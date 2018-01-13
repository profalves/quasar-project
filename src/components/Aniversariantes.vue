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
      
    <div v-if="visivel">
      
        <div class="row">
            <div class="col">
                <q-field
                  icon="search"
                >
                  <q-input v-model="filtroNome" float-label="Pesquisar pelo Nome"/>
                </q-field>
            </div>
            <div class="col">
                <q-field
                  icon="search"
                >
                  <q-input v-model="filtroData" float-label="Pesquisar pela Data"/>
                </q-field>
            </div>
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
                          <q-fab-action color="lime" @click="" icon="mail" />
                          <q-fab-action color="info" @click="" icon="phone" />
                          <q-fab-action color="secondary" @click="" icon="fa-whatsapp" />
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
      
  </div>
</template>

<script>
import { Dialog, Loading } from 'quasar'
import axios from 'axios'
import { AtomSpinner } from 'epic-spinners'
var moment = require('moment');
require("moment/min/locales.min");
moment.locale('pt-br');
    
const API = localStorage.getItem('wsAtual')
  
//debug
//const API = 'http://192.168.0.200:29755/'

export default {
  data () {
    return {
      caixa: [],
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
            return this.caixa.filter(niver => niver.nome.toLowerCase().indexOf(this.filtroNome)>=0)
        }
        if(this.filtroData){
            return this.caixa.filter(niver => niver.dataNasc.indexOf(this.filtroData)>=0)
        }
        
        return this.caixa
        

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
          spinner: AtomSpinner,
          spinnerSize: 140,
          message: 'Aguardando Dados...'
      })
      axios.get(API + 'pessoa/obteraniversariante?mes=' + this.mes)
      .then((res)=>{
        this.visivel = true
        this.caixa = res.data
        Loading.hide()
      })
      .catch((e)=>{
        console.log(e.response)
        Loading.hide()
      })
    },
    getHoje(){
      Loading.show({
          spinner: AtomSpinner,
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
            this.caixa = res.data
        }
        Loading.hide()
      })
      .catch((e)=>{
        console.log(e.response)
        Loading.hide()
      })
    },
    msgEmail(item){},
    fone(item){},
    whats(item){},
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
    
</style>
