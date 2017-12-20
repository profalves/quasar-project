<template>
<div class="layout-padding row justify-center">
    <div style="width: 500px; 
                max-width: 90vw;
                text-align: center;
                ">
        
      <q-fixed-position class="over" corner="top-right" :offset="[18, 18]">
        
        <q-icon 
            name="settings" 
            class="fa-2x" 
            @click="$router.push({
                path:'/config', 
                query:{config:true}
            })" 
        />
        
      </q-fixed-position>
      
      <img src="../../img/logo2.png" width="80%" id="logo"/>
      
      <form @submit.prevent="login">
      <q-field
        helper="Empresa"
      >
        <q-select
            align="center"
            v-model="bd"
            :options="listaEmpresas" 
            @change="setBancoAtual"
            @blur="listarUsuarios" 
        />
      </q-field>
      <q-field
        helper="Usuário"
      >
        <q-select
            align="center"
            v-model="user"
            :options="listaUsuarios"
            filter
            filter-placeholder="Procurar..."
            autofocus-filter
        />
      </q-field>
      <q-field
        helper="Senha"
      >
        <q-input
            align="center"
            v-model="pass"
            type="password"
            clearable
        />
      </q-field>
      <q-field>
        <q-btn icon="person" 
               color="faded" 
               @click="login"
               >Entrar</q-btn>
      </q-field>
    </form>    
    </div>
</div>
</template>

<script>
import axios from 'axios'
import { Alert, Dialog, Loading } from 'quasar'

//dev
let API = localStorage.getItem('wsAtual')

//debug
//const API = 'http://192.168.0.200:29755/'
    
export default {
    data () {
        return {
            bd: '',
            user: '',
            pass: '',
            usuarios: [],
            bancosDados: []
        }
    },
    computed:{
        listaEmpresas(){
            let lista = []
            let l = ''
            //let v = '' // usando ip no value
            let a = ''
            
            for (let i=0; i < localStorage.length; i++) {
                if(localStorage.getItem('Empresa'+i)){
                    l = localStorage.getItem('Empresa'+i)   
                }
                /*if(localStorage.getItem('ip'+i) && localStorage.getItem('ip'+i)){
                    v = localStorage.getItem('ip'+i)    
                }*/
                if(l !== '' && a !== l){
                    lista.push({
                        label: l,
                        value: i // ou 'v' se for setar por IP
                    })
                }
                a = l 
            }
            if(lista.length === 0){
                return [{label: 'Precisa configurar uma empresa ...', value: 'none'}]
            }
            if(lista.length === 1){
                this.bd = 1
                this.listarUsuarios()
            }
            return lista
        },
        listaUsuarios: function () {
          var a = this.usuarios
          var lista = []

          for (let i=0; i < a.length; i++) {
              let n = a[i].nome
              let v = a[i].nome
              let c = a[i].codigoIdentificacao
              lista.push({label: n, value: v, codigo: c})    
          }
          
          return lista
        }    
    },
    methods:{
        login(){
          if(this.bd === ''){
              Alert.create({
                  html: 'Selecione uma empresa antes do Login',
                  enter: 'bounceInLeft',
                  leave: 'bounceOutLeft',
                  position: 'bottom-center',
                  //color: 'warning'
              })
              return 
          }
          if(this.user === ''){
              Alert.create({
                  html: 'Antes preencha o usuário e a senha, depois clique em ENTRAR',
                  enter: 'bounceInLeft',
                  leave: 'bounceOutLeft',
                  position: 'bottom-center',
                  //color: 'warning'
              })
              return
          }
          if(this.pass === ''){
              Alert.create({
                  html: 'Antes preencha a senha e só depois clique em ENTRAR',
                  enter: 'bounceInLeft',
                  leave: 'bounceOutLeft',
                  position: 'bottom-center',
                  //color: 'warning'
              })
              return
          }
          API = localStorage.getItem('wsAtual')
          axios.get(API + 'usuario/obterUsuario?usuario='+ this.user + '&senha=' + this.pass)
          .then((res)=>{
            localStorage.setItem('tela', 'principal')
            localStorage.setItem('codUser', res.data.codigo)
            localStorage.setItem('nameUser', res.data.nome)
            localStorage.setItem('nomeEmpresa', localStorage.getItem('Empresa' + this.bd))
            //console.log(res.data)
            Loading.hide()
            this.$router.push('/')
          })
          .catch((e)=>{
            Alert.create({
              html: e.response.data[0].value,
              enter: 'bounceInLeft',
              leave: 'bounceOutLeft',
              position: 'bottom-center',
              //color: 'warning'
                
            })
            //console.log(e.response)
            Loading.hide()
          })
            
        },
        /*listarBancos(){
            var i
            for (i = 1; i <= localStorage.getItem('bancoCont'); i++) {
                var lista = { 
                                IdBanco : localStorage.getItem('IdBanco' + i),
                                ip : localStorage.getItem('ip' + i),
                                porta: localStorage.getItem('porta' + i),
                                banco: localStorage.getItem('banco' + i),
                                senha: localStorage.getItem('senhaBD' + i)
                            }
                if(lista.IdBanco!==null){
                    this.bancosDados.push(lista)
                }
            }

        },*/
        setBancoAtual(){
            if(this.bd === 'none'){
                this.$router.push({
                    path:'/config', 
                    query:{ config: true,
                            bdConfig: true
                          }
                })
            }
            let port = ''
            if(localStorage.getItem('porta' + this.bd)){
                port = ':' + localStorage.getItem('porta'+this.bd)     
            }
            let DB = ''
            if(localStorage.getItem('banco' + this.bd)){
                DB = '/' + localStorage.getItem('banco'+this.bd)     
            }
            let sv = localStorage.getItem('ip' + this.bd)
            localStorage.setItem('wsAtual', 'http://' + sv + port + DB + '/' )
            
            API = localStorage.getItem('wsAtual')
        },
        loadConfig(){
            if(localStorage.length === 0) {
                Loading.show()
                localStorage.setItem('refresh', false)
                localStorage.setItem('noHeader', false)
                localStorage.setItem('columnPicker', false)
                localStorage.setItem('responsive', false)
                localStorage.setItem('selection', 'multiple')
                localStorage.setItem('pagination', true)
                localStorage.setItem('rowHeight', 45)
                localStorage.setItem('bodyHeightProp', 'auto')
                localStorage.setItem('bodyHeight', 200)
                localStorage.setItem('alturaGrafico', 100)
                Loading.hide()
            }
            
        },
        listarUsuarios(){
          if(this.bd === 'none'){ return }
          API = localStorage.getItem('wsAtual')
          Loading.show({message: 'Carregando Usuários...'})
          axios.get(API + 'usuario/obterUsuario')
          .then((res)=>{
            this.usuarios = res.data
            //console.log(res.data)
            Loading.hide()
          })
          .catch((e)=>{
            console.log(e.response)
            if(this.bd !== 'none'){
                Dialog.create({
                  title: 'Sem Conexão',
                  message: 'Não foi possivel carregar os usuários, vá para configurações e corrija a informações de Banco de Dados',
                  buttons: [
                    {
                      label: 'Ok',
                      color: 'info',
                      raised: true
                    }
                  ]
                })
            }
            Loading.hide()
          })
        },
    },
    created(){
        this.loadConfig()
        localStorage.setItem('tela', 'login')
        localStorage.removeItem('codUser')
    }
}
</script>

<style scoped>
    #logo {
        margin-bottom: 30px;
    }
    .login {
        text-align: center;
    }
    
    
</style>