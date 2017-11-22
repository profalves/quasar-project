<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app">
    
  <q-layout
    ref="layout"
    view="lHh Lpr fff"
    :left-class="{'bg-grey-2': true}"
  >      
      
    <q-toolbar slot="header" color="black">
      <q-btn
        flat
        @click="$refs.layout.toggleLeft()"
      >
        <q-icon name="menu" />
      </q-btn>

      <q-toolbar-title>
        Retaguarda Web
        <div slot="subtitle">7Virtual</div>
      </q-toolbar-title>
        
      <q-btn flat @click="toggleFullscreen">
        <q-icon name="fullscreen" />
      </q-btn>
    </q-toolbar>

    <div slot="left">
      <!--
        Use <q-side-link> component
        instead of <q-item> for
        internal vue-router navigation
      -->

      <q-list no-border link inset-delimiter>
        <q-list-header>Menu</q-list-header>
        <q-item>
          <q-item-side icon="star" />
          <q-side-link to="/">
              Inicio
          </q-side-link>
        </q-item>
        <q-item>
          <q-item-side icon="people" />
          <q-side-link to="/clientes">
              <q-item-main label="Pessoas" sublabel="Cadastros de clientes, fornecedores, etc." />
          </q-side-link>
        </q-item>
        <q-item>
          <q-item-side icon="assignment_turned_in" />
          <q-side-link to="/produtos">
               <q-item-main label="Produtos" sublabel="Cadastros de Produtos" />
          </q-side-link>
        </q-item>
        <q-item>
          <q-item-side icon="account_balance_wallet" />
          <q-side-link to="/contas">
               <q-item-main label="Contas" sublabel="Cadastros Financeiros" />
          </q-side-link>
          
        </q-item>
        <q-item>
          <q-item-side icon="insert_drive_file" />
          <q-side-link to="/cadnotas">
               <q-item-main label="Entradas de Notas" sublabel="Cadastros de NFe de Compras" />
          </q-side-link>
        </q-item>
        <q-item>
          <q-item-side icon="dashboard" />
          <q-side-link to="/relatorios">
                <q-item-main label="Relatórios" sublabel="Relatórios Gerais" />
          </q-side-link>
        </q-item>
        <q-item>
          <q-item-side icon="person" />
          <q-side-link to="/usuarios">
                <q-item-main label="Usuários" sublabel="Cadastros de Usuários, Alteração de Senhas, etc." />
          </q-side-link>
          
        </q-item>
        <q-item>
          <q-item-side icon="settings" />
          <q-side-link to="/config">
                <q-item-main label="Configurações" sublabel="Configurações Gerais" />
          </q-side-link>
          
        </q-item>
        <q-item>
          <q-item-side icon="exit_to_app" />
          <q-side-link to="/login">
                <q-item-main label="Sair" />
          </q-side-link>
        </q-item>  
        
        <!-- 
        <q-item>
          <q-side-link to="/">Início</q-side-link>
        </q-item>
        <q-item>
          <q-side-link to="/repos">Ver Repositórios</q-side-link>
        </q-item>
         
        <q-item @click="launch('https://github.com/profalves')">
          
          <q-item-side class="fa fa-github fa-2x"/>
          <q-item-main label="Acessar o Github" sublabel="quasar-framework.org" />
        </q-item>-->
        
        
      </q-list>
    </div>
    <div class="container">
        <router-view />
    </div>
    
  </q-layout>
  </div>
</template>

<script>
import { openURL, AppFullscreen } from 'quasar'

export default {
  name: 'index',
  components: {
    openURL
  },
  data () {
    return {
    }
  },
  methods: {
    launch (url) {
      openURL(url)
    },
    toggleFullscreen () {
      AppFullscreen.toggle()
    }
  },
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
        margin-top: -80px;
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

</style>
