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
          
    </div>
</div>
</template>

<script>
import axios from 'axios'
import { Dialog, Loading } from 'quasar'

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
                if(localStorage.getItem('banco'+i)){
                    l = localStorage.getItem('banco'+i)   
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
            localStorage.setItem('tela', 'principal')
            localStorage.setItem('codUser', 1)
            this.$router.push('/')
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
                
                Dialog.create({
                  title: 'Bem-vindo às Configurações',
                  message: 'Você foi redirecionado para esta tela. Configure um banco de dados com as informações necessárias para a sua conexão.',
                  buttons: [
                    {
                      label: 'Ok',
                      color: 'info',
                      raised: true
                    }
                  ]
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
            localStorage.setItem('wsAtual', 'http://' + sv + DB + port + '/' )
            
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
          if(this.bd === 0){ return }
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
            Loading.hide()
          })
        },
    },
    mounted(){
        //this.listarUsuarios()
    },
    created(){
        this.loadConfig()
        localStorage.setItem('tela', 'login')
        localStorage.removeItem('codUser')
        
        //this.listarBancos()
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