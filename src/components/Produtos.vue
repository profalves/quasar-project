<template>
  <div>
    <!-- Botão ADD -->
    <q-fixed-position class="over" corner="bottom-right" :offset="[18, 18]">
        <q-btn 

           round
           color="primary" 
           @click="novo">
           <q-icon name="add" />
        </q-btn>
    </q-fixed-position>
      
    <!-- Botão voltar -->
    <q-fixed-position class="fixo" corner="bottom-left" :offset="[18, 18]">
        <q-btn 
           round
           color="primary" 
           @click="goBack">
           <q-icon name="keyboard_arrow_left" />
        </q-btn>
    </q-fixed-position>
    
    <!-- Botão sync -->
    <q-fixed-position class="fixo" corner="bottom-left" :offset="[88, 18]">
        <q-btn 
           round
           color="primary" 
           @click="sync">
           <q-icon name="sync" />
        </q-btn>
    </q-fixed-position>
    
   
    <!-- formulário -->
    <div class="toolbar">
        <h5>Buscar Produto</h5>
    </div>

    <!--
    <q-toolbar slot="header" inverted color="tertiary">
       <q-radio v-model="tipoCod" 
                val="barras"
                label="Cód. Barras" 
                @focus="search = ''" />
       <q-radio v-model="tipoCod" 
                val="emp" 
                label="Cód. Emp" 
                style="margin-left:20px"  
                @focus="search = ''" />
       <q-radio v-model="tipoCod" 
                val="nome"
                label="Nome" 
                style="margin-left:20px" 
                @focus="search = ''" />
    </q-toolbar>
    -->
    <div class="row">
        <div class="col">
            <q-field
                label="Filtrar por"
                style="margin: 26px 0 0 10px;">
                <q-select v-model="agrupar"
                          :options="[
                            {label: '', value: 0},
                            {label: 'Familia', value: 1},
                            {label: 'Categoria', value: 2},
                            {label: 'Marca', value: 3},
                          ]"
                          />
                            
            </q-field>
    
        </div>
        <div class="col-md-6 col-xs-12" v-if="agrupar === 1">
            <q-field
                style="margin-left: 10px;">
                <q-select v-model="familia"
                          filter
                          filter-placeholder="Procurar..."
                          float-label="Familias"
                          :options="familias"
                          @change="modProdutos"
                          />
    
            </q-field>
    
        </div>
        <div class="col-md-6 col-xs-12" v-if="agrupar === 2">
            <q-field
                style="margin-left: 10px;">
                <q-select v-model="categoria"
                          filter
                          filter-placeholder="Procurar..."
                          float-label="Categorias"
                          :options="categorias"
                          @change="modProdutos"
                          />
    
            </q-field>
    
        </div>
        <div class="col-md-6 col-xs-12" v-if="agrupar === 3">
            <q-field
                style="margin-left: 10px;">
                <q-select v-model="marca"
                          filter
                          filter-placeholder="Procurar..."
                          float-label="Marcas"
                          :options="marcas"
                          @change="modProdutos"
                          />
    
            </q-field>
    
        </div>
    </div>
      
    <div class="row">
        <div class="col">
            <q-input v-model="menorValor"
                     float-label="Menor Valor"
                     v-money="money"
                     style="margin-left: 10px"
                     />
        </div>
        <div class="col">
            <q-input v-model="maiorValor"
                     float-label="Maior Valor"
                     v-money="money"
                     style="margin-left: 10px"
                     @keyup.enter="modProdutos"
                     />
        </div>
    </div>
   
    <!--  
    <q-checkbox v-model="autocomplete" 
                label="Permitir autocompletar a pesquisa"
                v-if="tipoCod === 'nome'"
                style="margin: 0 0 20px 10px"
                />
    -->
   <q-search  
             v-model="search" 
             color="none" 
             style="margin-left: 10px"
             placeholder="Procurar..."
             @keyup.enter="listarProdutos"
             v-if="autocomplete && familia === '' && categoria === '' && marca === ''"
             >
        <q-autocomplete
          @search="search"
          :max-results="maxResults"
          :static-data="{field: 'label', list: listaItens}"
          @selected="listarProdutos"
        />

    </q-search>
    
    <!--  
    <q-search v-model="search" 
              placeholder="Procurar..."
              style="margin-left: 10px"
              v-else-if="tipoCod === 'nome' && familia === '' && categoria === '' && marca === ''">
        <q-autocomplete @search="search" 
                        @selected="listarProdutos"
                        :filter="filtrarProdutos"
                        :static-data="{field: 'label', list: listaItens}"
                        @keyup.enter="listarProdutos"
                        />
    </q-search>-->
    
    <q-select v-model="search"
              filter
              filter-placeholder="Procurar..."
              v-else-if="agrupar > 0 && familia !== '' || categoria !== '' || marca !== ''"
              :options="selectItens"
              @change="listarProdutos"/>
              
      
    <!--<q-search
             v-model="search" 
             color="none" 
             style="margin-left: 10px"
             placeholder="Procurar..."
             @keyup.enter="listarProdutos"
             type="number"
             v-else
             >
    </q-search>-->
    
    <q-search
      v-model="search"
      placeholder="Procurar..."
      @change="verTipo"
      v-else
    /><br><br>
        
    <q-card v-if="produto">
      <q-card-title>
        {{ produto.nome }}
        <span slot="subtitle">{{ produto.apelido }}</span>
        <q-icon slot="right" name="more_vert" v-if="permissoes.alteraProduto">
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
        <q-icon slot="right" name="clear" class="link" @click="limpar()" v-else />
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
        <div class="row" v-if="permissoes.ret_VerCusto">
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
                    <strong>Estoque Atual: </strong><span :class="colorsClasses">{{ produto.qtd }}</span> 
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
    
    <div v-if="listaProdutos.length>0 && search"
         v-for="(produto, index) in listaProdutos"
         :key="index"
         >

      <q-card>
        <q-card-title>
          {{ produto.nome }}
          <span slot="subtitle">{{ produto.apelido }}</span>
          <q-icon slot="right" name="more_vert" v-if="permissoes.alteraProduto">
            <q-popover ref="popover">
              <q-list link class="no-border">
                <q-item @click="excluir()">
                  <q-item-main label="Excluir item"/>
                </q-item>
                <q-item @click="abrirCad(produto)">
                  <q-item-main label="Abrir Cadastro" />
                </q-item>
                <q-item @click="limpar()">
                  <q-item-main label="Fechar" />
                </q-item>
              </q-list>
            </q-popover>
          </q-icon>
          <q-icon slot="right" name="clear" class="link" @click="limpar()" v-else />
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
          <div class="row" v-if="permissoes.ret_VerCusto">
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
                      <strong>Estoque Atual: </strong><span :class="colorsClasses">{{ produto.qtd }}</span> 
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
       <q-card-separator />
        <!--
        <q-card-actions center>
          <q-btn flat @click="abrir">Abrir</q-btn>
          <q-btn flat @click="limpar">Fechar</q-btn>
        </q-card-actions>-->
      </q-card>
      
    </div>
      
    <br><br><br><br>
  </div>
</template>

<script>
import { Loading, Toast, Dialog } from 'quasar'
import axios from 'axios'
import { FulfillingBouncingCircleSpinner } from 'epic-spinners'
import localforage from 'localforage'
    
const API = localStorage.getItem('wsAtual')
  
//debug
//const API = 'http://192.168.0.200:29755/'     

export default {
  data () {
    return {
      tipoCod: 'nome',
      agrupar: 0,
      search: '',
      autocomplete: (localStorage.getItem('autocomplete') === 'true'),
      transferencias: [],
      produtos: [],
      familias: [],
      categorias: [],
      marcas: [],
      familia: '',
      categoria: '',
      marca: '',
      menorValor: '',
      maiorValor: '',
      produto: '',
      qtd: 1,
      index: '',
      dest: '',
      empDest: {},
      permissoes: '',
      maxResults: parseInt(localStorage.getItem('maxResults')),
      
      //v-money
      money: {
        decimal: ',',
        thousands: '.',
        //prefix: 'R$ ',
        //suffix: ' #',
        precision: 2,
        masked: false /* doesn't work with directive */
      },
      
      //tabela
      misc: 'bordered', //[{value: 'bordered'},{value: 'highlight'}]
      separator: 'cell', // none, horizontal, vertical, cell
      stripe: 'odd', // none, odd, even
      type: 'none', // flipped, responsive
      gutter: 'none', // compact, loose
        
        
    }
  },
  computed:{
    colorsClasses() {
      let classes
      if(this.produto.qtd<0){
        classes = 'text-negative text-bold'
      }
      else if(this.produto.qtd>0){
        classes = 'text-primary text-bold'
      }
      
      return classes
    },
    listaItens(){
      let a = this.produtos
      if(typeof a === 'string') return
      let lista = []
        
      
      
      lista = a.map(row => ({
          label: row.nome, 
          value: row.codigo
      }))
      
      return lista
    },
    selectItens(){
      let a = this.produtos
      if(typeof a === 'string') return
      let lista = []
      
      lista = a.map(row => ({
          label: row.nome + ' - R$ ' + row.valor.toFixed(2), 
          value: row.nome
      }))
      
      return lista
    },
    listaProdutos(){
      
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
  methods:{
    goBack(){
        window.history.back()
    },
    limpar(){
      this.produto = ''
      this.search = ''
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
      }
      else{
        this.type = 'text'
      }
      
    },
    filtrarProdutos(){  
      let a = this.produtos
      let lista, filter = []
       
      filter = a.filter(row => row.nome.toLowerCase().indexOf(this.search) >=0)
        
      lista = filter.map(row => ({
          label: row.nome, 
          value: row.codigo
      }))
     
      return lista
    },
    listarProdutos(){
      if(localStorage.getItem('loadProdutos') !== 'true'){
          localforage.getItem('Produtos').then((value) => {
            if(value){
                switch (this.tipoCod) {    
                    case 'barras':
                        let b = value.filter(row => row.codBarra.toString() === this.search);
                        this.produto = b[0]
                        console.log('produto codBarra', this.produto)
                        break;
                    case 'emp':
                        let e = value.filter(row => row.codEmpresa === this.search);
                        this.produto = e[0]
                        console.log('produto codEmpresa', this.produto)
                        break;
                    case 'nome':
                        let n = value.filter(row => row.nome === this.search);
                        this.produto = n[0]
                        console.log('produto nome', this.produto)
                    
                }
                
            }
          })
          return
      }
      
      let URL
      if(this.tipoCod === 'barras'){
          URL = API + 'produto/obterproduto?codBarra=' + this.search
      }
      else if(this.tipoCod === 'emp'){
          URL = API + 'produto/obterproduto?codEmpresa=' + this.search
      }
      else {
          URL = API + 'produto/obterproduto?nomeProduto=' + this.search
      }

      Loading.show({
          spinner: FulfillingBouncingCircleSpinner,
          spinnerSize: 140,
          message: 'Aguardando Dados...'
      })
      axios.get(URL)
      .then((res)=>{
        Loading.hide()
        console.log(res)
        this.produto = res.data
        if(typeof this.produto !== 'object'){
            this.produto = {}
            Object.assign(this.produto, {nome: 'Produto não encontrado'});
        }
      })
      .catch((e)=>{
        Loading.hide()
        console.log(e)
        if(typeof this.produto.nome == 'undefined'){
            Object.assign(this.produto, {nome: 'Produto não encontrado'});
        }
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
          this.produtos = res.data
          console.log('produtos', this.produtos.length)
          localforage.setItem('Produtos', res.data)
        })
        .catch((e)=>{
          Loading.hide()
          console.log(e)
          Toast.create({
              html: 'Sem Conexão',
              timeout: 6000,
              bgColor: '#f44242',
              icon: 'mood_bad'
          })
        })
    },
    modProdutos(){
        this.tipoCod = 'nome'
      
        //consultar localmente
        
        //requisição
        let 
        fam = '',
        cat = '',
        marca = '',
        valores = '',
        uni = ''
        
        if(this.familia !== ''){
            fam = 'codFamilia=' + this.familia
        }
        
        if(this.categoria !== ''){
            if(fam){
                uni = '&'
            }
            cat = uni + 'codCategoria=' + this.categoria
        }
        
        if(this.marca !== ''){
            if(fam || cat){
                uni = '&'
            }
            marca = uni + 'codMarca=' + this.marca
        }
        
        if(this.menorValor && this.maiorValor){
            let menorValor = parseFloat(this.menorValor.replace(',','.'))
            let maiorValor = parseFloat(this.maiorValor.replace(',','.'))
            if(menorValor>0 && maiorValor>0){
                if(fam || cat || marca){
                    uni = '&'
                }
            valores = uni + 'menorvalor=' + menorValor + '&maiorvalor=' + maiorValor
            }
        }
        
        Loading.show({
          spinner: FulfillingBouncingCircleSpinner,
          spinnerSize: 140,
          message: 'Aguardando Dados...'
        })
        axios.get(API + 'produto/obterproduto?' + fam + cat + marca + valores)
          .then((res)=>{
            Loading.hide()
            this.produtos = res.data
            console.log('produtos', this.produtos.length)
            console.log(res)
            console.log(typeof res.data)
            if(typeof res.data === 'string'){
                Toast.create.negative(res.data)
            }
          })
          .catch((e)=>{
            Loading.hide()
            console.log(e)
            Toast.create({
                html: 'Sem Conexão',
                timeout: 6000,
                bgColor: '#f44242',
                icon: 'mood_bad'
            })
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
    novo(){
      localStorage.setItem('cadMode', 'save')
      this.$router.push('/cadproduto')
    },
    abrir(){
      localStorage.setItem('codProduto', this.produto.codigo)
      console.log('codProduto', this.listaProdutos.codigo)
      
      localStorage.setItem('cadMode', 'edit')
      this.$router.push({ path: '/cadproduto' })
    },
    abrirCad(produto){
      console.log('atual: ', produto)
      localStorage.setItem('codProduto', produto.codigo)
      localStorage.setItem('cadMode', 'edit')
      this.$router.push({ path: '/cadproduto' })
    },
    excluir(){
      this.$refs.popover.close()
      
      Dialog.create({
          title: 'Excluir',
          message: 'Tem certeza que deseja excluir ' + this.produto.nome + '?',
          buttons: [
            {
              label: 'Não! Cancela',
              color: 'negative',
              raised: true,
              style: 'margin-top: 20px',
              handler () {
                Toast.create('Cancelado...')
              }
            },
            {
              label: 'Sim! Pode excluir',
              color: 'positive',
              raised: true,
              style: 'margin-top: 20px',
              handler: () => {
                  let obj = this.produto
                  obj.excluido = true
                  let produto  = obj.nome
                  Loading.show({
                      spinner: FulfillingBouncingCircleSpinner,
                      spinnerSize: 140,
                      message: 'Excluindo Produto...'
                  })
                  axios.post(API + 'produto/excluirProduto?codProduto=' + obj.codigo)
                  .then((res)=>{
                      //console.log(res)
                      Toast.create(produto + ' foi excluido com sucesso')
                      Loading.hide()
                      this.produto = ''
                      this.search = ''
                      this.listarProdutos()
                  })
                  .catch((e)=>{
                    console.log(e)
                    Loading.hide()
                    return
                  })  
                      
                  
              }
            }
          ]
      })
     
    },
    sync(){
      Loading.show({
          spinner: FulfillingBouncingCircleSpinner,
          spinnerSize: 140,
          message: 'Sincronizando Dados...'
      })
      axios.get(API + 'produto/obterproduto')
      .then((res)=>{
          //console.log(res.data)
          localforage.setItem('Produtos', res.data).then((value) => {
            this.produtos = (value)
            Toast.create('Dados sincronizados com sucesso')
          }).catch((err) => {
            console.log(err);
          });
          Loading.hide()
      })
      .catch((e)=>{
        console.log(e)
        Loading.hide()
      })
      
    },
    obterPermissoes(){
        localforage.getItem('usuario').then((value) => {
            if(value){
                console.log(value)
                this.permissoes = value
            }
            else{
                console.log(value)
            }

        }).catch((err) => {
            console.log(err)
            console.log('fail')
        }) 
    }
    
  },
  mounted(){
    this.obterPermissoes()
    
    if(localStorage.getItem('loadProdutos') === 'true'){
        this.todosProdutos()
        this.listarFamilias()
        this.listarCategorias()
        this.listarMarcas()
        console.log('sync get')
        return
    }
      
    localforage.getItem('Produtos')
    .then((value) => {
        if(value){
            console.log('localforage get produtos')
            //console.log(value)
            this.produtos = value;
        }
        else{
            console.log('localforage fail')
            this.todosProdutos()
        }
        
    })
    .catch((err) => {
        console.log(err)
        console.log('fail')
    }) 
    
    localforage.getItem('FamiliasProdutos')
    .then((value) => {
        if(value){
            console.log('localforage get familias')
            //console.log(value)
            this.familias = value.map(row => ({
              label: row.nome, 
              value: row.codigo
            }));
        }
        else{
            console.log('localforage fail familias')
            this.listarFamilias()
        }
        
    })
    .catch((err) => {
        console.log(err)
        console.log('fail familias')
    }) 
    
    localforage.getItem('CategoriasProdutos')
    .then((value) => {
        if(value){
            console.log('localforage get categorias')
            //console.log(value)
            this.categorias = value.map(row => ({
              label: row.nome, 
              value: row.codigo
            }));
        }
        else{
            console.log('localforage fail categorias')
            this.listarCategorias()
        }
        
    })
    .catch((err) => {
        console.log(err)
        console.log('fail')
    }) 
    
    localforage.getItem('MarcasProdutos')
    .then((value) => {
        if(value){
            console.log('localforage get marcas')
            //console.log(value)
            this.marcas = value.map(row => ({
              label: row.nome, 
              value: row.codigo
            }));
        }
        else{
            console.log('localforage fail marcas')
            this.todosProdutos()
        }
        
    })
    .catch((err) => {
        console.log(err)
        console.log('fail marcas')
    }) 
    
    
    
  },
  /*beforeUpdate(){
    this.obterPermissoes()
    console.info('before atualizando ... ')
  },
  updated(){
    this.obterPermissoes()
    console.info('update atualizando ... ')
  }*/
  
  
}
</script>

<style scoped>
    .button {
        margin: 15px 0 0 20px;
    }
    .icon{
        cursor: pointer;
        font-size: 25px;
    }
    .fields{
        margin-top: 3px;
    }
    .link{
        cursor: pointer;
    }
</style>
