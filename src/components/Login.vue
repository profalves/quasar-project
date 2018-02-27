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
            @change="listarUsuarios"
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
            @keyup.enter="login"
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
import { Toast, Dialog, Loading, Events } from 'quasar'
import { FulfillingBouncingCircleSpinner } from 'epic-spinners'
import localforage from 'localforage'
    
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
              Toast.create.negative('Selecione uma empresa antes do Login')
              return 
          }
          if(this.user === ''){
              Toast.create.negative('Antes preencha o usuário e a senha, depois clique em ENTRAR')
              return
          }
          if(this.pass === ''){
              Toast.create.negative('Antes preencha a senha e só depois clique em ENTRAR')
              return
          }
          API = localStorage.getItem('wsAtual')
          Loading.show({ spinner: FulfillingBouncingCircleSpinner })
          axios.get(API + 'usuario/obterUsuario?usuario='+ this.user + '&senha=' + this.pass)
          .then((res)=>{
            localStorage.setItem('nomeEmpresa', localStorage.getItem('Empresa' + this.bd))
            Loading.hide()
            //console.log(res.data)
            
            async function getUser(){
                localforage.setItem('usuario', res.data)
                localStorage.setItem('tela', 'principal')
                localStorage.setItem('codUser', res.data.codigo)
                localStorage.setItem('nameUser', res.data.nome)
                localStorage.setItem('codIdUser', res.data.codigoIdentificacao)    
            }
              
            async function entrar(){  
                 var number = await getUser();
                 return number
            }
            
            entrar(this.$router.push('/home'));
            
          })
          .catch((e)=>{
            Loading.hide()
            Toast.create.negative({
              html: e.response.data[0].value
                
            })
            console.log(e.response)
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
            localStorage.setItem('rowsPerPage', 5)
            localStorage.setItem('tetoDia', 1000)
            localStorage.setItem('metaDia', 0)
            localStorage.setItem('quaseDia', 0)
            localStorage.setItem('tetoMes', 50000)
            localStorage.setItem('metaMes', 0)
            localStorage.setItem('quaseMes', 0)
            localStorage.setItem('qdPerc', 75)
            localStorage.setItem('qmPerc', 75)
            localStorage.setItem('tdPerc', 100)
            localStorage.setItem('tmPerc', 100)
            localStorage.setItem('loadPessoas', false)
            localStorage.setItem('loadProdutos', false)
            localStorage.setItem('loadContas', false)
            localStorage.setItem('loadUsuarios', false)
            localStorage.setItem('maxResults', 6)
            localStorage.setItem('wsAtual', '')
            localStorage.setItem('menu', 'true')
            localStorage.setItem('fiscal', 'false')
            Loading.hide()
          } 
        },
        
        // sincronização: 
        listarUsuarios(){
          this.setBancoAtual()
          this.syncStart()
          
          if(this.bd === 'none'){ return }
          
          API = localStorage.getItem('wsAtual')
          
          Loading.show({
              spinner: FulfillingBouncingCircleSpinner,
              spinnerSize: 140,
              message: 'Carregando Usuários...'
          })
          
          axios.get(API + 'usuario/obterUsuario')
          .then((res)=>{
            this.usuarios = res.data
            localforage.setItem('Usuários', res.data)
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
        listarPessoas(){
          let load = localStorage.getItem('loadPessoas')
          if(load === 'true') return
          Loading.show({
              spinner: FulfillingBouncingCircleSpinner,
              spinnerSize: 140,
              message: 'Obtendo Pessoas...'
          })
          axios.get(API + 'pessoa/obterpessoa?todos=true')
          .then((res)=>{
              //console.log(res.data)
              localforage.setItem('Pessoas', res.data)
              Loading.hide()
          })
          .catch((e)=>{
            console.log(e.response)
            Loading.hide()
          })  
        },
        listarCidadesCadastradas(){
          let load = localStorage.getItem('loadPessoas')
          if(load === 'true') return
          Loading.show({
              spinner: FulfillingBouncingCircleSpinner,
              spinnerSize: 140,
              message: 'Aguardando Dados...'
          })
          axios.get(API + '/cidade/obterCidades?somentecadastradas=true')
          .then((res)=>{
            //console.log('cidades: ', res.data)
            localforage.setItem('Cidades', res.data)
            //Loading.hide()
          })
          .catch((e)=>{
            console.log(e)
            Loading.hide()
          }) 
        },
        listarBairros(){
          let load = localStorage.getItem('loadPessoas')
          if(load === 'true') return
          Loading.show({
              spinner: FulfillingBouncingCircleSpinner,
              spinnerSize: 140,
              message: 'Aguardando Dados...'
          })
          axios.get(API + '/cidade/obterBairros')
          .then((res)=>{
            //console.log('Bairros: ', res.data)
            localforage.setItem('Bairros', res.data)
            //Loading.hide()
          })
          .catch((e)=>{
            console.log(e)
            Loading.hide()
          }) 
        },
        todosProdutos(){
          let load = localStorage.getItem('loadProdutos')
          if(load === 'true') return
          Loading.show({
              spinner: FulfillingBouncingCircleSpinner,
              spinnerSize: 140,
              message: 'Obtendo Produtos...'
          })
          axios.get(API + 'produto/obterproduto')
          .then((res)=>{
            Loading.hide()
            localforage.setItem('Produtos', res.data)
            //console.log(res.data)
          })
          .catch((e)=>{
            Loading.hide()
            console.log(e.response)
            Toast.create({
                    html: 'Sem Conexão',
                    timeout: 6000,
                    bgColor: '#f44242',
                    icon: 'mood_bad'
                })
          })
        },
        listarFamProdutos(){
          axios.get(API + 'produto/obterProdutosFamilia')
          .then((res)=>{
            localforage.setItem('FamiliasProdutos', res.data)
          })
          .catch((e)=>{
            console.log(e)
          })
        },
        listarCategorias(){
          axios.get(API + 'produto/obterProdutosCategorias')
          .then((res)=>{
            localforage.setItem('CategoriasProdutos', res.data)
          })
          .catch((e)=>{
            console.log(e)
          })
        },
        listarMarcas(){
          axios.get(API + 'produto/obterProdutosMarcas')
          .then((res)=>{
            localforage.setItem('MarcasProdutos', res.data)
          })
          .catch((e)=>{
            console.log(e)
          })
        },
        listarDespPagar(){
          let load = localStorage.getItem('loadContas')
          if(load === 'true') return
          Loading.show({
              spinner: FulfillingBouncingCircleSpinner,
              spinnerSize: 140,
              message: 'Obtendo Depesas a pagar...'
          })
          axios.get(API + 'conta/obterContas?tipo=cp&pagas=false')
          .then((res)=>{
              //console.log(res.data)
              localforage.setItem('DespPagar', res.data)
              Loading.hide()
          })
          .catch((e)=>{
            console.log(e.response)
            Loading.hide()
          })  
        },
        listarDespPagas(){
          let load = localStorage.getItem('loadContas')
          if(load === 'true') return
          Loading.show({
              spinner: FulfillingBouncingCircleSpinner,
              spinnerSize: 140,
              message: 'Obtendo Depesas pagas...'
          })
          axios.get(API + 'conta/obterContas?tipo=cp&pagas=true')
          .then((res)=>{
              //console.log(res.data)
              localforage.setItem('DespPagas', res.data)
              Loading.hide()
          })
          .catch((e)=>{
            console.log(e.response)
            Loading.hide()
          })  
        },
        listarRecPagar(){
          let load = localStorage.getItem('loadContas')
          if(load === 'true') return
          Loading.show({
              spinner: FulfillingBouncingCircleSpinner,
              spinnerSize: 140,
              message: 'Obtendo Receitas a pagar...'
          })
          axios.get(API + 'conta/obterContas?tipo=cr&pagas=false')
          .then((res)=>{
              //console.log(res.data)
              localforage.setItem('RecPagar', res.data)
              Loading.hide()
          })
          .catch((e)=>{
            console.log(e.response)
            Loading.hide()
          })  
        },
        listarRecPagas(){
          let load = localStorage.getItem('loadContas')
          if(load === 'true') return
          Loading.show({
              spinner: FulfillingBouncingCircleSpinner,
              spinnerSize: 140,
              message: 'Obtendo Receitas pagas...'
          })
          axios.get(API + 'conta/obterContas?tipo=cr&pagas=true')
          .then((res)=>{
              //console.log(res.data)
              localforage.setItem('RecPagas', res.data)
              Loading.hide()
          })
          .catch((e)=>{
            console.log(e.response)
            Loading.hide()
          })  
        },
        syncStart(){
            let ws = localStorage.getItem('wsAtual')
            if(ws === '') return
            this.listarPessoas()
            this.listarCidadesCadastradas()
            this.listarBairros()
            this.todosProdutos()
            this.listarFamProdutos()
            this.listarCategorias()
            this.listarMarcas()
            this.listarDespPagar()
            this.listarDespPagas()
            this.listarRecPagar()
            this.listarRecPagas()
        }
    },
    created(){
        Events.$on('app:loading', state => {
          console.log(`Loading está ${state ? 'ativo' : 'fechado'}`)
        })
        this.syncStart()
        localStorage.removeItem('codUser')
        
        
    },
    mounted(){
        this.loadConfig()
        if(localStorage.getItem('wsAtual') === '') return
        //verificação de carregamento sendo executado
        let c = 0
        for(let load in localStorage){
            let x = load.substring(0,4)
            let r 
            if(x === 'load'){
                r = localStorage.getItem(load)
            }
            if(r === 'true') c++
            
        }
        
        if(c === 4)return
        Loading.show({
          spinner: FulfillingBouncingCircleSpinner,
          spinnerSize: 180,
          //message: ''
        })    
    },
    updated(){ //a sincronização foi executada
        Loading.hide()
        localStorage.setItem('tela', 'login')
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