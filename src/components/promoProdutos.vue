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
        
        <q-search v-model="search"
                  color="none" 
                  placeholder="Procurar..."
                  @keyup.enter="getPromocoes"
                  @change="verTipo"
                  >
        </q-search>
        
        <q-checkbox v-model="promocao" label="Exibir somente itens com promoção" @change="getPromocoes" /><br><br>
        
        <q-btn color="primary"
               @click="getPromocoes"
               rounded
               style="margin-bottom: 20px"
               >
               Localizar</q-btn>  
        
      </q-collapsible>
   
      <!--produtos-->
      
      <div v-for="promo in produtos">
        <q-card>
          <q-card-title>
            {{promo.produto}}
          </q-card-title>
          <q-card-main>
            <div class="row">
              <div class="col-md-6 col-xs-12">Cód. Barras: {{promo.codBarra}}</div>
              <div class="col">Cód. Empresa: {{promo.codEmpresa}}</div>
            </div>
            <strong>Preço:</strong>
            <div class="row">
              <div class="col-md-6 col-xs-12">Normal: {{promo.precoNormal | formatMoney}}</div>
              <div class="col">Promocional: {{promo.precoPromo | formatMoney}}</div>
            </div>
            <div class="row">
              <div class="col-md-4 col-xs-12">Família: {{promo.familia}}</div>
              <div class="col-md-4 col-xs-12">Categoria: {{promo.categoria}}</div>
              <div class="col-md-4 col-xs-12">Marca: {{promo.marca}}</div>
            </div>
          </q-card-main>
          <q-card-separator />
          <q-card-actions>
            <div class="row">
              <div class="col-auto">
                <q-btn color="primary" 
                       rounded small 
                       @click="lancarPromocao(promo)"
                       style="margin-top: 10px"
                       >lançar promoção</q-btn>
              </div>
            </div>
            <div class="row">
              <div class="col-auto offset-md-2">
                <q-btn color="negative" 
                       rounded small 
                       @click="deletarPromocao(promo)"
                       style="margin-top: 10px"
                       >remover promoção</q-btn>
              </div>
            </div> 
          </q-card-actions>
        </q-card>
      </div>
    </div>
    <br><br><br><br>
  </div>
</template>

<script>
    
import { Loading, Toast, Dialog } from 'quasar'
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
          produtos: [],
          familias: [],
          categorias: [],
          marcas: [],
          familia: '',
          categoria: '',
          marca: '',
          produto: '',
          tipoCod: 'nome',
          search: '',
          promocao: false,
          opened: true,
          itens: [],
          formas: [],
          permissoes: {},
          visivel: true,
          msg: '',
          type: '',
          content: ''
      }
  },
  methods:{
      goBack(){
        window.history.go(-1)
      },
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
          console.log('tipo:', this.type)
        }
        else{
          this.type = 'text'
          console.log('tipo:', this.type)
        }

      },
      getPromocoes(){
        let e = '&'
        
        let fam = ''
        if(this.familia){
          fam = 'CodFamilia=' + this.familia
        }
        let cat = ''
        if(this.categoria){
          if(this.familia){
            cat = e + 'CodCategoria=' + this.categoria
          }
          else{
            cat = 'CodCategoria=' + this.categoria
          }
        }
        let marca = ''
        if(this.marca){
          if(this.familia || this.categoria){
            marca = e + 'CodMarca=' + this.marca
          }
          else{
            marca = 'CodMarca=' + this.marca
          }
        }
        let produto = ''
        if(this.search){
          if(this.type === 'number'){
            produto = 'CodBarra=' + this.search
          }
          else{
            produto = 'nomeProduto=' + this.search
            console.log('produto', produto);
          }
          
          if(this.familia || this.categoria || this.marca){
            produto = produto.replace (/^/,'&'); //.unshift(e)
            console.log('produto', produto);
          }  
        }
        let promo = ''
        if(this.promocao){
          if(this.familia || this.categoria || this.marca){
            promo = e + 'SomenteItensPromocao=true'
          }
          else{
            promo = 'SomenteItensPromocao=true'
          }
        }
        
        Loading.show({
          spinner: FulfillingBouncingCircleSpinner,
          spinnerSize: 140,
          message: 'Aguardando Dados...'
        })
        axios.get(API + 'produto/obterProdutosPromocao?' +
                  fam + cat + marca + produto + promo)
        .then((res)=>{
          console.log(res)
          this.produtos = res.data
          if(this.produtos.length === 0 & this.type === 'number'){
            produto = 'CodEmpresa=' + this.search
            axios.get(API + 'produto/obterProdutosPromocao?' +
                  fam + cat + marca + produto + promo)
            .then((res)=>{
            console.log(res)
            this.produtos = res.data
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
          }
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
      lancarPromocao(promo){
        Dialog.create({
          title: promo.produto,
          message: 'Valor Atual: R$ ' + promo.precoNormal.toFixed(2),
          form: {
            valor: {
              type: 'text',
              label: 'Novo Valor Promocional',
              model: '0.00'
            }
          },
          buttons: [
            'Cancelar',
            {
              label: 'Ok',
              handler: (data) => {
                Loading.show({
                  spinner: FulfillingBouncingCircleSpinner,
                  spinnerSize: 140,
                  message: 'Cadastrando preço promocional...'
                })
                axios.get(API + 'produto/gravarProdutoPromocao?codigoProduto=' + promo.codigo +
                                '&Preco=' + data.valor + 
                                '&CodigoUsuario=' + localStorage.getItem('codUser'))
                .then((res)=>{
                  //console.log(res)
                  Loading.hide()
                  this.getPromocoes()
                })
                .catch((e)=>{
                  Loading.hide()
                  console.log(e.response)
                })
              }
            }
          ]
        })
      },
      deletarPromocao(promo){
        Dialog.create({
          title: 'Deseja remover o produto ' + promo.produto + ' da promoção?',
          message: 'Valor Atual: R$ ' + promo.precoNormal.toFixed(2) + '<br />' +
                   'Valor Promocional: R$ ' + promo.precoPromo.toFixed(2),
          buttons: [
            {
              label: 'cancelar',
              color: 'negative',
              raised: true,
              handler: () => { return }
            },
            {
              label: 'Ok',
              color: 'positive',
              raised: true,
              handler: () => {
                Loading.show({
                  spinner: FulfillingBouncingCircleSpinner,
                  spinnerSize: 140,
                  message: 'Cadastrando preço promocional...'
                })
                axios.get(API + 'produto/gravarProdutoPromocao?codigoProduto=' + promo.codigo +
                                '&Preco=0' + 
                                '&CodigoUsuario=' + localStorage.getItem('codUser'))
                .then((res)=>{
                  //console.log(res)
                  Loading.hide()
                  this.getPromocoes()
                })
                .catch((e)=>{
                  Loading.hide()
                  console.log(e.response)
                })
                
              }
            }
          ]
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
            this.produtos = res.data 
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
      t.obterPermissoes()
  }
}
</script>

<style>
    .over{
        z-index: 5
    }
</style>
