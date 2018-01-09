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

const API = localStorage.getItem('wsAtual')
  
//debug
//const API = localStorage.getItem('wsAtual')

export default {
  name: 'principal',
  data () {
    return {
        niverHoje: ''
    }
  },
  methods:{
    verificarUser(){
        if(!localStorage.getItem('codUser')){
          this.$router.push('/login')
        }
    },
    verificarSuporte(){
        var c = ( window.webkitNotifications !== undefined );
        console.log('c', c);
    if (!c){
        alert("Seu navegador não suporta notificações desktop. Por favor, use o Google Chrome!");
    }
        alert(c)
        return c
    },
    verificarPermissao(){
        if ( !this.verificarSuporte() ) return;

        switch ( window.webkitNotifications )
        {
            case 0: // PERMITIDO
            alert( "Permitido" );
            break;

            case 1: // NÃO PERMITIDO
            alert("Não permitido");
            break;

            case 2: // PERMISSÃO NEGADA
            alert( "Permissão negada" );
            break;
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

        function expression(statement) { 
         'use strict'
         return statement;
        }
        expression(n.vibrate) // ESLint ignore line
        //navigator.vibrate([100,30,100,30,100,200,200,30,200,30,200,200,100,30,100,30,100]) // Vibrate 'SOS' in Morse.
    },
    niverNotif(){
        let permissao = localStorage.getItem('aniversarios')
        if(permissao === 'false'){
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
            Loading.hide()
        })
        .catch((e)=>{
            console.log(e.response)
            Loading.hide()
        })
        
        let options = {
          body: 'Parabéns! ' + this.niverHoje,
          vibrate: [200, 100, 200]
        }
        let n = new Notification('Retaguarda Web - 7Virtual', options)

        function expression(statement) { 
         'use strict'
         return statement;
        }
        expression(n.vibrate) // ESLint ignore line
        //navigator.vibrate([100,30,100,30,100,200,200,30,200,30,200,200,100,30,100,30,100]) // Vibrate 'SOS' in Morse.
    },
    
  },
  created(){
    let t = this
    t.verificarUser()
    //t.verificarSuporte()
    t.vibrarNotif()
    t.niverNotif()
  }
}
</script>

<style scoped>
    .card {
        margin: 0 10px;
    }
    
</style>

