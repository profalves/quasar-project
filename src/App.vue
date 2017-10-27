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
        Prof. Alves - Github
        <div slot="subtitle">Running on Quasar v{{$q.version}}</div>
      </q-toolbar-title>
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
          <q-side-link to="/">Início</q-side-link>
        </q-item>
        <q-item>
          <q-side-link to="/repos">Ver Repositórios</q-side-link>
        </q-item>
          
        <q-item @click="launch('https://github.com/profalves')">
          
          <q-item-side class="fa fa-github fa-2x"/>
          <q-item-main label="Acessar o Github" sublabel="quasar-framework.org" />
        </q-item>
        <q-item @click="launch('http://forum.quasar-framework.org')">
          <q-item-side icon="record_voice_over" />
          <q-item-main label="Forum" sublabel="forum.quasar-framework.org" />
        </q-item>
        <q-item @click="launch('https://gitter.im/quasarframework/Lobby')">
          <q-item-side icon="chat" />
          <q-item-main label="Gitter Channel" sublabel="Quasar Lobby" />
        </q-item>
        <q-item @click="launch('https://twitter.com/quasarframework')">
          <q-item-side icon="rss feed" />
          <q-item-main label="Twitter" sublabel="@quasarframework" />
        </q-item>
        
      </q-list>
    </div>
    <router-view />
  </q-layout>
  </div>
</template>

<script>
import { openURL } from 'quasar'

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
    }
  }
}
</script>
