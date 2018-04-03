<template>
  <div id="q-app"> <!-- Don't drop "q-app" class -->
  <q-window-resize-observable @resize="onResize" /> 
  <q-layout
    ref="layout"
    view="lHh Lpr fff"
    :left-class="{'bg-grey-2': true}"
  >      
    <q-toolbar slot="header" color="black" v-if="$route.path !== '/login' && !$route.query.config && !print">
      <q-btn flat @click="$refs.layout.toggleLeft()" v-if="visivel">
        <q-icon name="menu" />
      </q-btn>
      <q-btn id="btn-menu" @click="toggleMenu()" v-else>
        <q-icon name="menu" />
      </q-btn>
      <q-toolbar-title>
        7Virtual Gestor
        <div slot="subtitle">{{ Empresa }}</div>
      </q-toolbar-title>
      
      <q-btn flat @click="blockScreen" v-if="visivel">
        <q-icon name="block" />
      </q-btn>
      <q-btn flat @click="toggleFullscreen" v-if="visivel">
        <q-icon name="fullscreen" />
      </q-btn>
    </q-toolbar>
    <menuLeft slot="left" v-if="$route.path !== '/login' && !$route.query.config && visivel && !print"></menuLeft>
    <mobileLeft id="sidenav"
                class="sidenav"
                style="z-index: 6"
                v-if="$route.path !== '/login' && !$route.query.config && !visivel && !print"></mobileLeft>
    <!--
    <q-fixed-position class="fixo" corner="top-left" :offset="[5, 5]" v-if="open">
      <q-btn 
         flat
         @click="closeNav">
         <q-icon name="clear" class="fa-3x" />
      </q-btn>
    </q-fixed-position>
    -->
    <transition name="fade" mode="out-in">
      <router-view class="container"></router-view>    
    </transition>
  </q-layout>
  </div>
</template>
<script>
import { openURL, AppFullscreen, event, Toast, Dialog, Loading } from 'quasar'
import menuLeft from './components/menu.vue'
import mobileLeft from './components/side.vue'
import axios from 'axios'
    
//dev
let API = localStorage.getItem('wsAtual')
//debug
//const API = 'http://192.168.0.200:29755/'
  
export default {
  name: 'index',
  components: {
    openURL,
    menuLeft,
    mobileLeft
  },
  data () {
    return {
      open: false,
      visivel: true,
      Empresa: localStorage.getItem('nomeEmpresa'),
      route: '',
      print: (localStorage.getItem('print') === 'true'),
      width: ''
    }
  },
  methods: {
    launch (url) {
      openURL(url)
    },
    toggleFullscreen () {
      AppFullscreen.toggle()
    },
    onResize (size) {
      this.width = size.width
      console.log('width', this.width);
      if(size.width < 990 || size.height < 400){
        this.visivel = false
      }
      else{
        this.visivel = true
      } 
    },
    toggleMenu(){
      if(this.open){
        this.closeNav()
      }
      else{
        this.openNav()
      }
    },
    openNav() {
      this.open = true
      if(this.width<460){
        document.getElementById("sidenav").style.width = "80%";  
      }
      else{
        document.getElementById("sidenav").style.width = "50%";
      }
      
    },
    closeNav() {
      this.open = false
      document.getElementById("sidenav").style.width = "0";
    },
    blockScreen(){
      localStorage.setItem('blockScreen', true)
      
      Dialog.create({
        title: 'Login',
        message: 'Faça login para desbloquear a tela',
        noBackdropDismiss: true,
        noEscDismiss: true,
        form: {
          user: {
            type: 'text',
            label: 'Usuário',
            model: ''
          },
          pass: {
            type: 'password',
            label: 'Senha',
            model: ''
          }
        },
        buttons: [
          {
            label: 'Desbloquear',
            raised: true,
            color: 'primary',
            handler: (data) => {
              Loading.show()
              axios.get(API + 'usuario/obterUsuario?usuario='+ data.user + '&senha=' + data.pass)
              .then((res)=>{
                Loading.hide()
                console.log(res)
                localStorage.setItem('blockScreen', false)
                //return
              })
              .catch((e)=>{
                Loading.hide()
                this.blockScreen()
                Toast.create.negative({
                  html: e.response.data[0].value

                })
                console.log(e.response)
              })
              
            }
          }
        ]
      })  
    }
  },
  beforeUpdate(){
    if(document.getElementById("sidenav") === null) return
    if(this.$route.path !== this.route){
      this.route = this.$route.path
      this.closeNav()
      //console.log('route', this.route);
    }
    console.log('route', this.route);
  },
  mounted(){
    document.addEventListener('click', evt => {
      event.targetElement(evt)
      let a = evt.path.map(row => row.id)
      //console.log('a', a);
      let b = evt.path.map(row => row.className)
      //console.log('b', b);
      let side = a.indexOf('sidenav') > -1
      console.log('side', side)
      let menu = a.indexOf('btn-menu') > -1
      console.log('menu', menu)
      let link = b.filter(row => { 
                  const classes = row || ''
                  return classes.indexOf('q-item') >= 0
                })
      console.log('link', link.length)
      let c = b.filter(row => { 
                  const classes = row || ''
                  return classes.indexOf('q-collapsible') >= 0
                })
      //console.log('collapsible', c.length)
      console.log('open:', this.open)
      //console.log('sidenav:', document.getElementById("sidenav"))
      if(!side && !menu && this.open){
        this.closeNav()
      }
      if(link.length>0 && c.length===0 && this.open){
        this.closeNav()
      }
    }) 
  },
  created(){
    if(localStorage.getItem('blockScreen') === 'true'){
      this.blockScreen()
    }
  }
}
</script>
<style>
  body {
    background-image: url("../img/fundo.png");
    background-size: auto;
    background-repeat: repeat-x;
    background-color: white;
  }
  .container {
    margin: 20px 20px 0 20px;
  }
  .topo {
    margin-top: -90px;
    padding-top: 60px;
    width: 100%; 
    position: sticky;
    top: 0; 
    left: 0;
    text-align: center;
    z-index: 4;
  }  
  .boxInput {
    text-align: center;
    font-size: 30px;
    color: white;
    background:transparent;
    outline:none;
    border: 0px;
    width:85%;
  }
  .mdInput {
    /*margin-top: 10px;
    width: 90%;*/
    background:transparent;
    outline:none;
    border: 0px;
    /*border-bottom-color: #D3DAE0;*/
  }
  .mHover {
    cursor: pointer;
  }
  #table {
    overflow: scroll;
  }
  .fixo{
    z-index: 5
  }
  /*transitions router*/
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s ease;
  }
  .fade-enter, .fade-leave-active {
    opacity: 0
  }
  .child-view {
    position: absolute;
    transition: all .5s cubic-bezier(.55,0,.1,1);
  }
  .slide-left-enter, .slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(30px, 0);
    transform: translate(30px, 0);
  }
  .slide-left-leave-active, .slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(-30px, 0);
    transform: translate(-30px, 0);
  }
  .sidenav {
    height: 100%;
    width: 0;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: gainsboro;
    overflow-x: hidden;
    transition: 0.5s;
    padding-top: 60px;
  }
  @media print {
    body * {
      visibility: hidden;
    }
    #printable, #printable * {
      visibility: visible;
    }
    #printable {
      position: fixed;
      left: 0;
      top: 0;
      margin: 20px;
    }
  }
</style>
