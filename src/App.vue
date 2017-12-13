<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app">
  <q-window-resize-observable @resize="onResize" /> 
  <q-layout
    ref="layout"
    view="lHh Lpr fff"
    :left-class="{'bg-grey-2': true}"
  >      
      
    <q-toolbar slot="header" color="black" v-if="$route.path !== '/login' && !$route.query.config">
      <q-btn flat @click="$refs.layout.toggleLeft()">
        <q-icon name="menu" />
      </q-btn>

      <q-toolbar-title>
        7 Virtual Supervisor
        <div slot="subtitle">{{ Empresa }}</div>
      </q-toolbar-title>
        
      <q-btn flat @click="toggleFullscreen" v-if="visivel">
        <q-icon name="fullscreen" />
      </q-btn>
    </q-toolbar>

    <menuLeft slot="left" v-if="$route.path !== '/login' && !$route.query.config"></menuLeft>
    
    <transition name="fade" mode="out-in">   
        <router-view class="container"></router-view>    
    </transition>
    
  </q-layout>
  </div>
</template>

<script>
import { openURL, AppFullscreen } from 'quasar'
import menuLeft from './components/menu.vue'

export default {
  name: 'index',
  components: {
    openURL,
    menuLeft
  },
  data () {
    return {
        visivel: true,
    }
  },
  computed:{
    Empresa(){
        return localStorage.getItem('nomeEmpresa')
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
      //console.log(size)
      if(size.width < 430 || size.height < 400){
        this.visivel = false
      }
      else{
        this.visivel = true
      } 
    }
  },
  created (){
    if(!localStorage.getItem('user')){
        this.$router.push('/login')
    }
  }
  
}
</script>
<style>
    body {
        background-color: aliceblue;
    }
    .container {
        margin: 20px;
    }
    
    .topo {
        margin-top: -90px;
		padding-top: 60px;
		width: 100%; 
		position: sticky;
		top: 0; 
        left: 0;
		text-align: center;
        z-index: 5;
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

</style>
