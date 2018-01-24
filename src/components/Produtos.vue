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
    <div class="row">
        <div class="col">
            <h5>Buscar Produto</h5>
        </div>
    </div>

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

    <q-search  
             v-model="search" 
             color="none" 
             style="margin-left: 10px"
             placeholder="Procurar..."
             @keyup.enter="listarProdutos"
             @blur="listarProdutos"
             v-if="tipoCod === 'nome'"
             >
        <q-autocomplete
          :static-data="{field: 'label', list: listaItens}"
          @selected="listarProdutos"
        />

    </q-search>
    <q-search
             v-model="search" 
             color="none" 
             style="margin-left: 10px"
             placeholder="Procurar..."
             @keyup.enter="listarProdutos"
             @blur="listarProdutos"
             v-else
             >
    </q-search>
        
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
                  icon="fa-product-hunt"

                >
                 <p class="fields">
                    <strong>Tipo: </strong>{{ produto.tipo }} 
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
</template>

<script>
import { Loading, Toast, Dialog } from 'quasar'
import axios from 'axios'
import { AtomSpinner } from 'epic-spinners'
import localforage from 'localforage'
    
const API = localStorage.getItem('wsAtual')
  
//debug
//const API = 'http://192.168.0.200:29755/'     

export default {
  data () {
    return {
      tipoCod: 'nome',
      search: '',
      transferencias: [],
      produtos: [],
      produto: '',
      qtd: 1,
      index: '',
      dest: '',
      empDest: {},
      permissoes: '',
        
      
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
      let lista = []
      
      lista = a.map(row => ({
          label: row.nome, 
          value: row.codigo
      }))
      //console.log(lista)
      return lista
    },
  },
  methods:{
     goBack(){
        window.history.back()
    },
    limpar(){
      this.produto = ''
      this.search = ''
    },
    listarProdutos(){
      if(localStorage.getItem('loadProdutos') !== 'true'){
          localforage.getItem('Produtos').then((value) => {
            if(value){
                switch (this.tipoCod) {    
                    case 'barra':
                        let b = value.filter(row => row.codBarra === this.search);
                        this.produto = b[0]
                        console.log('produto', this.produto)
                        break;
                    case 'emp':
                        let e = value.filter(row => row.codEmpresa === this.search);
                        this.produto = e[0]
                        console.log('produto', this.produto)
                        break;
                    case 'nome':
                        let n = value.filter(row => row.nome === this.search);
                        this.produto = n[0]
                        console.log('produto', this.produto)
                    
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
          spinner: AtomSpinner,
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
          spinner: AtomSpinner,
          spinnerSize: 140,
          message: 'Aguardando Dados...'
        })
        axios.get(API + 'produto/obterproduto')
          .then((res)=>{
            Loading.hide()
            this.produtos = res.data
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
    novo(){
      localStorage.setItem('cadMode', 'save')
      this.$router.push('/cadproduto')
    },
    abrir(){
      localStorage.setItem('codProduto', this.produto.codigo)
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
                      spinner: AtomSpinner,
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
          spinner: AtomSpinner,
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
                //console.log(value)
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
    if(localStorage.getItem('loadProdutos') === 'true'){
        this.todosProdutos()
        return
    }
      
    localforage.getItem('Produtos').then((value) => {
        if(value){
            console.log('localforage get')
            console.log(value)
            this.produtos = value;
        }
        else{
            console.log('localforage fail')
            this.todosProdutos()
        }
        
    }).catch((err) => {
        console.log(err)
        console.log('fail')
    }) 
    
    this.obterPermissoes()
    
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
