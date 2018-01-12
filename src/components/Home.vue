<template>
<div id="home">
    
  <div class="row">
     
    <div class="col-6">
        <router-link to="/clientes">
            <q-card color="primary" class="col-sm-6">
              <q-card-title></q-card-title>
              <q-card-main>
                <center id="card">
                    <i class="fa fa-user fa-5x center"></i><br>
                    <p>Pessoas</p>
                </center>
              </q-card-main>
            </q-card>

        </router-link>
    </div>    
    
    <div class="col-6">
        <router-link to="/produtos">
            <q-card color="secondary" class="col-sm-6">
              <q-card-title></q-card-title>
              <q-card-main>
                <center id="card">
                    <i class="fa fa-shopping-basket fa-5x center"></i><br>
                    <p>Produtos</p>
                </center>
              </q-card-main>
            </q-card>

        </router-link>
    </div>    

    
    <div class="col-6">
        <router-link to="/contas">
            <q-card color="warning" class="col-sm-6">
              <q-card-title></q-card-title>
              <q-card-main>
                <center id="card">
                    <i class="fa fa-money fa-5x center"></i><br>
                    <p>Contas</p>
                </center>
              </q-card-main>
            </q-card>

        </router-link>
    </div>    
    
    <div class="col-6">
        <router-link to="/cadnotas">
            <q-card color="info" class="col-sm-6">
              <q-card-title></q-card-title>
              <q-card-main>
                <center id="card">
                    <i class="fa fa-file-text-o fa-5x center"></i><br>
                    <p>NF de Entrada</p>
                </center>
              </q-card-main>
            </q-card>

        </router-link>
    </div>    
    
    <div class="col">
        <router-link to="/relatorios">
            <q-card color="positive" class="col-sm-6">
              <q-card-title></q-card-title>
              <q-card-main>
                <center id="card">
                    <i class="fa fa-line-chart fa-5x center"></i><br>
                    <p>Relatórios</p>
                </center>
              </q-card-main>
            </q-card>

        </router-link>
    </div>    
    
    <div class="col">
        <router-link to="/usuarios">
            <q-card color="tertiary" class="col-sm-6">
              <q-card-title></q-card-title>
              <q-card-main>
                <center id="card">
                    <i class="fa fa-users fa-5x center"></i><br>
                    <p>Usuários</p>
                </center>
              </q-card-main>
            </q-card>

        </router-link>
    </div>    
    
  </div>  
</div>
    
</template>

<script>
import { Loading } from 'quasar'
import axios from 'axios'
import { AtomSpinner } from 'epic-spinners'
import iziToast from 'izitoast'
    
iziToast.settings({
    timeout: 10000,
    resetOnHover: true,
    icon: 'material-icons',
    transitionIn: 'flipInX',
    transitionOut: 'flipOutX',
    onOpening: function(){
        console.log('toast abriu!');
    },
    onClosing: function(data){
        console.log(data);
        console.log("toast fechou!");
    }
});

import VueNotifications from 'vue-notifications'

import moment from 'moment'
//var moment = require('moment');
require("moment/min/locales.min");
moment.locale('pt-br');
    

const API = localStorage.getItem('wsAtual')
  
//debug
//const API = localStorage.getItem('wsAtual')

function expression(statement) { // ESLint ignore ERROR 'use strict'
 'use strict'
 return statement;
}

export default {
  name: 'principal',
  data () {
    return {
        niverHoje: '',
        visualizar: '',
        
    }
  },
  notifications: {
    showSuccessMsg: {
      type: VueNotifications.types.success,
      title: '',
      message: ''
    },
    showInfoMsg: {
      type: VueNotifications.types.info,
      title: 'Hey you',
      message: 'Here is some info for you'
    },
    showWarnMsg: {
      type: VueNotifications.types.warn,
      title: 'Wow, man',
      message: 'That\'s the kind of warning'
    },
    showErrorMsg: {
      type: VueNotifications.types.error,
      title: 'Wow-wow',
      message: 'That\'s the error'
    }
  },
  watch:{
    visualizar(value){
        return console.log(value)
        
    }
  },
  methods:{
    verificarUser(){
        if(!localStorage.getItem('codUser')){
          this.$router.push('/login')
        }
    },
    vibrarNotif(){
        let permissao = localStorage.getItem('boasVindas')
        if(permissao === 'false'){
            return;
        }
        
        let options = {
          body: 'Seja bem vindo! ' + localStorage.getItem('nameUser'),
          vibrate: [200, 100, 200]
        }
        let n = new Notification('Retaguarda Web - 7Virtual', options)
        
        expression(n.vibrate) // ESLint ignore line
        //navigator.vibrate([100,30,100,30,100,200,200,30,200,30,200,200,100,30,100,30,100]) // Vibrate 'SOS' in Morse.
    },
    niverNotif(){
        let permissao = localStorage.getItem('aniversarios')
        if(permissao === 'false'){
            return;
        }
        
        let podeMostrar = sessionStorage.getItem('today')
        let negado = moment().format('DD-MM-YYYY')
        console.log('Não será visualizado notificações de aniversariantes de ', negado);
        
        if(podeMostrar === negado){
            return;
         
        }
        
        Loading.show({
          spinner: AtomSpinner,
          spinnerSize: 140,
          message: 'Aguardando Dados...'
        })
        axios.get(API + 'pessoa/obteraniversariante')
        .then((res)=>{
            console.log('niver: ',res.data)
            this.niverHoje = res.data
            
            for(let i=0; i<this.niverHoje.length; i++){
                
                let options = {
                  body: 'Parabéns! ' + this.niverHoje[i].nome,
                  renotify: false,
                  vibrate: [200, 100, 200]
                }
                let n = new Notification('Aniversariando Hoje!', options)
                
                expression(n.vibrate)
                
                this.showSuccessMsg({
                  type: VueNotifications.types.success,
                  timeout: 10000,
                  title: 'Parabéns a ' + this.niverHoje[i].nome,
                  //message: '...',
                  buttons: [
                    ['<button><b>Visualizar</b></button>', function (instance, toast) {
                        instance.hide(toast)
                        //this.$router.push('/nivers')
                        
                    }, true],
                    ['<button>Não Mostrar Mais</button>', function (instance, toast) {
                        console.info('Não mostrar mais')
                        sessionStorage.setItem('today', moment().format('DD-MM-YYYY'))
                        iziToast.destroy();

                    }]
                  ]
                  
                })
                
            }
            
            Loading.hide()
        })
        .catch((e)=>{
            console.log(e.response)
            Loading.hide()
        })
         
        //navigator.vibrate([100,30,100,30,100,200,200,30,200,30,200,200,100,30,100,30,100]) // Vibrate 'SOS' in Morse.
    },
    
  },
  created(){
    let t = this
    
    t.verificarUser()
    t.vibrarNotif()
    t.niverNotif()
    localStorage.setItem('tela', 'principal')
    Notification.requestPermission()
    
  }
}
</script>

<style scoped>
    .card {
        margin: 0 10px;
    }
    
</style>

