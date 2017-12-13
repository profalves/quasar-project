<template>
<div class="layout-padding row justify-center wall">
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
      
      <img src="../../img/logo2.png" width="100%" id="logo"/>
      <q-field
        helper="Empresa"
      >
        <q-select
            align="center"
            v-model="bd"
            :options="listaEmpresas" 
            @change="setBancoAtual"  
        />
      </q-field>
      <q-field
        helper="Usuário"
      >
        <q-select
            align="center"
            v-model="user"
            :options="[
                { label: 'Luke Skywalker', value: 1 },
                { label: 'Darth Vader', value: 2 },
                { label: 'C-3PO', value: 3 },
                { label: 'R2-D2', value: 4 },
                { label: 'Leia Organa', value: 5 },
            ]"
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
import table from '../data/table.json'
    
export default {
    data () {
        return {
            table,
            bd: '',
            user: '',
            pass: '',
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
                        value: i
                    })
                }
                a = l 
            }
            
            return lista
        },
        
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
            let port = ''
            if(localStorage.getItem('porta'+this.bd)){
                port=':' + localStorage.getItem('porta'+this.bd)     
            }
            let sv = localStorage.getItem('ip'+this.bd)
            localStorage.setItem('_wsAtual', 'http://' + sv + port + '/' )    
        }
    },
    created(){
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