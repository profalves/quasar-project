<template>
  <div>
    
    <h5>Produtos na Promoção</h5>
    <!-- Botão flutuante -->
    <q-fixed-position class="over" corner="bottom-left" :offset="[18, 18]">
        <q-btn 
           round
           color="primary" 
           @click="goBack">
           <q-icon name="chevron_left" />
        </q-btn>
    </q-fixed-position>

    <div id="lista">
      <q-collapsible :opened="opened" 
                     icon="filter_list" 
                     label="Filtros"
                     >
        
        <div class="row">
          <div class="col-md-4 col-xs-12">
              <q-field
                  style="margin-left: 10px;">
                  <q-select v-model="familia"
                            filter
                            filter-placeholder="Procurar..."
                            float-label="Familias"
                            :options="familias"
                            />

              </q-field>

          </div>
          <div class="col-md-4 col-xs-12">
              <q-field
                  style="margin-left: 10px;">
                  <q-select v-model="categoria"
                            filter
                            filter-placeholder="Procurar..."
                            float-label="Categorias"
                            :options="categorias"
                            />

              </q-field>

          </div>
          <div class="col-md-4 col-xs-12">
              <q-field
                  style="margin-left: 10px;">
                  <q-select v-model="marca"
                            filter
                            filter-placeholder="Procurar..."
                            float-label="Marcas"
                            :options="marcas"
                            />

              </q-field>

          </div>
        </div>
        
        <q-search
             v-model="search" 
             color="none" 
             placeholder="Procurar..."
             >
        </q-search>
        
        <div class="row">
           <q-radio v-model="tipoCod"
                    class="col"
                    val="barras"
                    label="Cód. Barras" 
                    @focus="search = ''" />
           <q-radio v-model="tipoCod"
                    class="col"
                    val="emp" 
                    label="Cód. Emp" 
                    @focus="search = ''" />
           <q-radio v-model="tipoCod"
                    class="col"
                    val="nome"
                    label="Nome"
                    @focus="search = ''" />
        </div>
        
        
        <q-checkbox v-model="promocao" label="Exibir somente itens com promoção" /><br><br>
        
        <q-btn color="primary"
               @click="getPromocoes"
               rounded
               style="margin-bottom: 20px"
               >
               Localizar</q-btn>  
        
      </q-collapsible>
   
      <!--produtos-->
          

    </div>
  </div>
</template>

<script>
    
import { Loading, Toast } from 'quasar'
import axios from 'axios'
import localforage from 'localforage'
import { FulfillingBouncingCircleSpinner } from 'epic-spinners'
    
const API = localStorage.getItem('wsAtual')
  
//debug
//const API = 'http://192.168.0.200:29755/' 

export default {
  data () {
      return {
          canGoBack: window.history.length > 1,
          estoque: [],
          familias: [],
          categorias: [],
          marcas: [],
          familia: '',
          categoria: '',
          marca: '',
          produto: '',
          tipoCod: '',
          search: '',
          promocao: false,
          opened: true,
          produtos: [],
          itens: [],
          formas: [],
          permissoes: {},
          visivel: true,
          msg: '',
          

      }
  },
  methods:{
      goBack(){
        window.history.go(-1)
      },
      getPromocoes(){
        
        Loading.show({
          spinner: FulfillingBouncingCircleSpinner,
          spinnerSize: 140,
          message: 'Aguardando Dados...'
        })
        axios.get(API + 'relatorio/obterVendasPorProduto?')
        .then((res)=>{
            console.log(res.data)
            this.estoque = res.data
            this.itens = this.estoque[0].itens
            this.formas = this.estoque[0].formasPgto
            this.opened = false
            Loading.hide()
            
        })
        .catch((e)=>{
            Loading.hide()
            console.log(e.response)
            let error = e.response.data
            console.log(error)
            for(var i=0; error.length; i++){
                Toast.create.negative(error[i].value)
            }
            
        })
      },
      listarFamilias(){
        axios.get(API + 'produto/obterProdutosFamilia')
        .then((res)=>{
          this.familias = res.data.map(row => ({
            label: row.nome, 
            value: row.codigo
          }))
        })
        .catch((e)=>{
          console.log(e)
        })
      },
      listarCategorias(){
        axios.get(API + 'produto/obterProdutosCategorias')
        .then((res)=>{
          this.categorias = res.data.map(row => ({
            label: row.nome, 
            value: row.codigo
          }))
        })
        .catch((e)=>{
          console.log(e)
        })
      },
      listarMarcas(){
        axios.get(API + 'produto/obterProdutosMarcas')
        .then((res)=>{
          this.marcas = res.data.map(row => ({
            label: row.nome, 
            value: row.codigo
          }))
        })
        .catch((e)=>{
          console.log(e)
        })
      },
      todosProdutos(){
        Loading.show({
            spinner: FulfillingBouncingCircleSpinner,
            spinnerSize: 140,
            message: 'Aguardando Dados...'
        })
        axios.get(API + 'produto/obterproduto')
        .then((res)=>{
            Loading.hide()
            //console.log(res.data)
            this.Produtos = res.data 
        })
        .catch((e)=>{
          Loading.hide()
          console.log(e.response)
        })
          
      },
      
      collapse(){
        if(this.opened === true){
            this.opened = false
        }
        else{
            this.opened = true
        }
      },
      obterPermissoes(){
        localforage.getItem('usuario')
        .then((value) => {
            if(value){
                //console.log(value)
                this.permissoes = value
                if(this.permissoes.funcao === "VENDEDOR"){
                    this.vendedor = parseInt(localStorage.getItem('codIdUser'))
                    this.visivel = false
                }
            }
            else{
                console.log(value)
            }

        })
        .catch((err) => {
                console.log(err)
                console.log('fail')
        }) 
      }
  },
  mounted(){
      let t = this
      t.listarFamilias()
      t.listarCategorias()
      t.listarMarcas()
      t.todosProdutos()
      t.obterPermissoes()
  }
}
</script>

<style>
    .over{
        z-index: 5
    }
</style>
