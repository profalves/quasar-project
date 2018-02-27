<template>
<div class="layout-padding">
  
  <h4>Nova forma de pesquisa</h4>
  
  <q-search
    v-model="search"
    placeholder="Procurar..."
    float-label="Produtos"
    @change="verTipo"
  /><br><br>
  primeiro digito: {{content}}<br>
  tipo: {{type}}
  
  <div v-for="produto in listaProdutos" v-if="visivel">
    <q-card>
      <q-card-title>
        {{ produto.nome }}
        <span slot="subtitle">{{ produto.apelido }}</span>
        <q-icon slot="right" name="more_vert">
          <q-popover ref="popover">
            <q-list link class="no-border">
              <q-item @click="excluir()">
                <q-item-main label="Excluir item"/>
              </q-item>
              <q-item @click="abrir()">
                <q-item-main label="Abrir Cadastro" />
              </q-item>
              <q-item @click="limpar()">
                <q-item-main label="Fechar" />
              </q-item>
            </q-list>
          </q-popover>
        </q-icon>
        
      </q-card-title>
      <q-card-main>
        <div class="row">
            <div class="col-xs-12 col-md-6">
                <q-field
                  icon="fa-barcode"
                    
                >
                 <p class="fields">
                    <strong>Cód. Barras: </strong>{{ produto.codBarra }} 
                 </p>
                    
                </q-field>
            </div>
            <div class="col-xs-12 col-md-6">
                <q-field
                  icon="domain"
                
                >
                 <p class="fields">
                    <strong>Cód. Empresa: </strong>{{ produto.codEmpresa }} 
                 </p>
                
                </q-field>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12 col-md-6"> <!--permissão ver custo-->
                <q-field
                  icon="monetization_on"
                >
                 <p class="fields">
                    <strong>Custo: </strong>{{ produto.custo | formatMoney }} 
                 </p>
                
                </q-field>
            </div>
            <div class="col-xs-12 col-md-6">
                <q-field
                  icon="fa-percent"
                >
                 <p class="fields">
                    <strong>Margem de Lucro: </strong>{{ produto.percLucro | formatPerc }} 
                 </p>
                
                </q-field>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12 col-md-6">
                <q-field
                  icon="monetization_on"
                >
                 <p class="fields">
                    <strong>Venda: {{ produto.valor | formatMoney }} </strong>
                 </p>
                    
                </q-field>
            </div>
            <div class="col">
                <q-field
                  icon="store"
                    
                >
                 <p class="fields">
                    <strong>Estoque Atual: </strong><span>{{ produto.qtd }}</span> 
                 </p>
                    
                </q-field>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12 col-md-6">
                <q-field
                  icon="fa-th-large"
                    
                >
                 <p class="fields">
                    <strong>Categoria: </strong>{{ produto.categoria }} 
                 </p>
                    
                </q-field>
            </div>
            <div class="col">
                <q-field
                  icon="local_grocery_store"
                    
                >
                 <p class="fields">
                    <strong>Família: </strong>{{ produto.familia }} 
                 </p>

                </q-field>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <q-field
                  icon="fa-truck"

                >
                 <p class="fields">
                    <strong>Marca: </strong>{{ produto.marca }} 
                 </p>

                </q-field>
            </div>
            <div class="col-xs-12 col-md-6">
                <q-field
                  icon="ion-battery-low"

                >
                 <p class="fields">
                    <strong>Estoque Mínimo: </strong>{{ produto.estoqueMinimo }}
                 </p>

                </q-field>
            </div>
        </div>
      </q-card-main>
      <!--<q-card-separator />
      <q-card-actions center>
        <q-btn flat @click="abrir">Abrir</q-btn>
        <q-btn flat @click="limpar">Fechar</q-btn>
      </q-card-actions>-->
    </q-card>
  </div>
  
</div>
</template>

<script>
import { Loading } from 'quasar' //Toast, Dialog 
import axios from 'axios'
import { FulfillingBouncingCircleSpinner } from 'epic-spinners'
import localforage from 'localforage'
    
const API = localStorage.getItem('wsAtual')
  
//debug
//const API = 'http://192.168.0.200:29755/'  

export default{
  data(){
    return{
      produtos: [],
      search: '',
      content: '',
      type: 'text',
      visivel: false,
    }
  },
  computed:{
    listaProdutos(){
      if(this.search.length === 0){
        this.visivel = false
      }
      else{
        this.visivel = true
      }
      
      if(this.type === 'number'){
        
        let value = this.produtos.filter(row => row.codBarra.toString().indexOf(this.search)>=0)
        console.log('value', value.length);
        if(value.length === 0){
          console.log('produtos por codEmpresa', this.produtos);
          console.log('search por codEmpresa', this.search);
          return this.produtos.filter(row => row.codEmpresa.toString().indexOf(this.search)>=0)
        }
        console.log('produtos por codBarra', this.produtos);
        console.log('search por codBarra', this.search);
        return value
        
      }
      else{
        let value = this.produtos.filter(row => row.nome.toLowerCase().indexOf(this.search)>=0)
        if(value.length === 0){
          console.log('produtos por codEmpresa', this.produtos);
          console.log('search por codEmpresa', this.search);
          return this.produtos.filter(row => row.codEmpresa.toString().indexOf(this.search)>=0)
        }
        console.log('produtos por string', this.produtos);
        return value
        
      }
      
    }
  },
  mounted(){
    this.todosProdutos()
  },
  methods:{
    verTipo(){
      console.log('tipo de pesquisa:', typeof this.search)
      this.content = this.search.substring(0,1)
      if(this.content === '0' ||
         this.content === '1' ||
         this.content === '2' ||
         this.content === '3' ||
         this.content === '4' ||
         this.content === '5' ||
         this.content === '6' ||
         this.content === '7' ||
         this.content === '8' ||
         this.content === '9' ){
        this.type = 'number'
      }
      else{
        this.type = 'text'
      }
      
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
          this.produtos = res.data
          console.log('produtos', this.produtos.length)
          localforage.setItem('Produtos', res.data)
        })
        .catch((e)=>{
          Loading.hide()
          console.log(e)
        })
    },
  }
}
</script>