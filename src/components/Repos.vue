<template>
  <q-layout>
    <q-toolbar slot="header" color="black">
      <q-toolbar-title>
        Repositórios
      </q-toolbar-title>
    </q-toolbar>
    <router-link to="{ path: '/' }"></router-link>
      <!--<q-btn class="primary" v-link="{ path: '/' }">voltar</q-btn>-->
    
    <div class="layout-view">
      <h4>Últimos repositórios publicados</h4>
        
        <div class="list"><hr>
        <div class="item" v-for="repo in list">
          
          <div class="item-content">
            {{ repo.name }}
            
            <a :href="repo.html_url" target="_blank" style="padding-left: 20px;">
              <i class="material-icons">open_in_browser</i>
            </a><hr>
          
          </div>
          
        </div>
      </div>
    </div>

  </q-layout>
</template>

<script>
import axios from 'axios'
let user = 'profalves'

export default {
  data () {
    return {
      list: []
    }
  },
  mounted () {
    axios.get('https://api.github.com/users/' + user + '/repos?direction=asc').then((res) => {
      this.list = res.data
      console.log(this.list)
    })
  }
}
</script>

<style scoped>
    .layout-view {
        padding: 15px;
    }
</style>
