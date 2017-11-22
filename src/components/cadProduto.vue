<template>
<div id="cadproduto">
    
    <div style="margin-top:50px"></div>
    
    <div class="row topo" style="margin-bottom:20px">
      <q-btn
        v-if="canGoBack"
        color="primary"
        push
        @click="goBack"
      >
        <i class="material-icons">arrow_back</i>
      </q-btn>
      
      <q-btn
        color="negative"
        push big
        @click="excluir"
        style="margin-left: 5px"
      >
        <i class="material-icons">delete</i>
      </q-btn>
        
      <!--<q-btn
        style="background: white; 
               color: black"
        push
        @click="limpar"  
      >
        limpar
      </q-btn>
      
      <q-btn
        style="background: white; 
               color: black"
        push big
        @click=""
        
      >
        <i class="material-icons">edit</i>
      </q-btn>-->
      
      <q-btn
        color="positive"
        push big
        @click="salvar"
        style="margin-left: 5px"
      >
        <i class="material-icons">done</i>
    </q-btn>
      
    </div>
    
    <!-- formulário -->
    <div class="row">
        <div class="col">
            <h5>Cadastro de Produtos</h5>
        </div>
    </div>
    
    <div class="row">
        <div class="col">
            <q-field
                icon="format_color_fill"
             >
                <q-select
                    float-label="Tipo de Produto"
                    filter
                    v-model="select"
                    :options="[
                        {label: 'Mercadoria para Revenda', value: 1},
                        {label: 'Materia Prima', value: 2},
                        {label: 'Item do Sistema', value: 3},
                        {label: 'Mercadoria para Consumo', value: 4},
                        {label: 'Fabricação para Venda', value: 5},
                        {label: 'Venda Casada - Combo de Produtos', value: 6}
                    ]"
                />
            </q-field>   
        </div>
    </div>
    
    <div class="row">
        <div class="col-md-6">
          <q-field
            icon="crop_free"
          >
            <q-input v-model.number="barras"
                     type="number"
                     float-label="Cód. Barras" 
                     clearable
            />
            
          </q-field>   
        </div>
        <div class="col">
          <q-field
            icon="store"
          >
            <q-input v-model.number="codEmpresa"
                     type="number"
                     float-label="Cód. Empresa" 
                     clearable
            />
            
          </q-field>   
        </div>
    </div> 
    
    <div class="row">
        <div class="col-md-6">
          <q-field
            icon="local_shipping"
          >
            <q-input v-model.number="barras"
                     type="number"
                     float-label="Cód. Fornecedor" 
                     clearable
            />
            
          </q-field>   
        </div>
        <div class="col-md-6">
          <q-field
            icon="store"
          >
            <q-input v-model.number="id"
                     type="number"
                     float-label="Cód. Produto" 
                     clearable
            />
            
          </q-field>   
        </div>
    </div> 
    
    <div class="row">
        <div class="col">
          <q-field
            icon="local_grocery_store"
          >
            <q-input v-model.trim="nome" 
                     float-label="Nome" 
                     clearable
                     @input="$v.nome.$touch()"
                     :error="$v.nome.$error"
            />
            
             <span style="color:grey" v-if="!$v.nome.required">Nome é requerido</span>
             <span v-if="!$v.nome.minLength">Este campo deve conter mais que {{$v.nome.$params.minLength.min}} caracteres.</span>
            
          </q-field>
        
        </div>
    </div> 
      
    <div class="row">
        <div class="col-md-6">
          <q-field
            icon="local_mall"
          >
            <q-input v-model.trim="nome" 
                     float-label="Apelido" 
                     clearable
            />
            
          </q-field>
        
        </div>
        <div class="col">
            <q-field
                icon="store"
             >
                <q-select
                    float-label="Família de Produtos"
                    filter
                    v-model="select"
                    :options="listaFamiliasProdutos"
                />
            </q-field>   
        </div>
        <div class="col-2 btn-plus" >
            
            <q-btn 
               rounded
               color="primary" 
               @click="$router.push('/')">
               <q-icon name="add" />
            </q-btn>
        </div>
        
    </div>
    
    <div class="row">
        <div class="col-10 col-md-4">
            <q-field
                icon="store"
             >
                <q-select
                    float-label="Categoria"
                    filter
                    v-model="select"
                    :options="options"
                />
            </q-field>
            
        </div>
        <div class="col-2 btn-plus" >
            <q-btn 
               rounded
               color="primary" 
               @click="$router.push('/')">
               <q-icon name="add" />
            </q-btn>
            
            
        </div>
        <div class="col-10 col-md-4">
            <q-field
                icon="store"
             >
                <q-select
                    float-label="Marca"
                    filter
                    v-model="select"
                    :options="options"
                />
            </q-field>   
        </div>
        <div class="col-2 btn-plus" >
            <q-btn 
               rounded
               color="primary" 
               @click="$router.push('/')">
               <q-icon name="add" />
            </q-btn>    
        </div>
    </div>
    
    <div class="row">
        <div class="col-10 col-md-4">
            <q-field
                icon="format_color_fill"
             >
                <q-select
                    float-label="Unidade de Medida"
                    filter
                    v-model="select"
                    :options="[
                        {label: 'UND', value: 'und'},
                        {label: 'KG', value: 'kg'},
                        {label: 'PCT', value: 'pct'},
                        {label: 'FD', value: 'fd'}
                    ]"
                />
            </q-field>   
        </div>
        <div class="col-2 btn-plus" >
            
            <q-btn 
               rounded
               color="primary" 
               @click="$router.push('/')">
               <q-icon name="add" />
            </q-btn>
        </div>
        <div class="col" id="estoque">
          <q-field
            icon="storage"
          >
            Estoque: {{estoque}}
            
          </q-field>   
        </div>
    
    </div>
    
    <div class="row">
        <div class="col-4">
            <q-card color="faded" class="col-sm-6">
            <center>
                <q-card-title>Custo</q-card-title>
                    <input v-model="preco"
                           v-money="money"
                           class="boxInput"
                    />
            </center>
            </q-card>
        </div>
        
        <div class="col-4">
            <q-card color="primary" class="col-sm-6">
              <center>
                <q-card-title>Lucro</q-card-title>
                    <input v-model="preco"
                           v-money="money"
                           class="boxInput"
                    />
              </center>
            </q-card>
        </div>
        
        <div class="col-4">
            <q-card color="positive" class="col-sm-6">
              <center>
                <q-card-title>Venda</q-card-title>
                    <input v-model="preco"
                           v-money="money"
                           class="boxInput"
                    />
              </center>
            </q-card>
        </div>        
        
    </div>
    
</div>
    
</template>

<script>
import axios from 'axios'
import { required, minLength } from 'vuelidate/lib/validators'
import { Dialog, Toast } from 'quasar'
    
//dev
const API = 'http://192.168.0.200/WSV3/'

//debug
//const API = 'http://192.168.0.200:29755/'


export default {
  name: 'CadProdutos',
  data () {
    return {
        nome: '',
        barras: '',
        codEmpresa: '',
        Produto: {
            codigo: 0,
            codBarra: 9999, //não nulo
            codEmpresa: 9999, //não nulo
            codFornecedor: 1,
            codFabrica: 1,
            codCategoria: 1,
            codMarca: 1,
            codFamilia: 1,
            codTipo: 1, //não nulo
            codUsuario: 1, //não nulo
            nome: 'TESTE RETAGUARDA WEB', //não nulo
            apelido: '',
            ncm: '',
            custo: '',
            percLucro: '',
            referencia: '',
            posicaoFisica: '',
            aplicacao: '',
            excluido: '',
        },
        familias: [],
        preco: 0.00,
        money: {
            decimal: ',',
            thousands: '.',
            prefix: 'R$ ',
            //suffix: ' #',
            precision: 2,
            masked: false /* doesn't work with directive */
        },
        id: '',
        estoque: 0,
        select: '',
        options: [
            {
              label: 'Google',
              value: 'goog'
            },
            {
              label: 'Facebook',
              value: 'fb'
            },
            {
              label: 'Twitter',
              value: 'twtr'
            },
            {
              label: 'Apple Inc.',
              value: 'appl'
            },
            {
              label: 'Oracle',
              value: 'ora'
            }
        ],
        cidades: [],
        canGoBack: window.history.length > 1,
        error: '',
        visivel: false
    }
  },
  validations: {
    nome: {
      required,
      minLength: minLength(3)
    },
    barras: {
      required,
      minLength: minLength(3)
    }
  },
  computed: {
    listaFamiliasProdutos: function () {
      var a = this.familias
      var lista = []
      
      for (let i=0; i < a.length; i++) {
          let n = a[i].nome
          let c = a[i].codigo
          lista.push({label: n, value: c})    
      }
      //console.log(lista)
      return lista
    },
  },
  methods: {
    goBack(){
      window.history.go(-1)
    },
    limpar () {
      this.nome = ''
      this.barras = ''
      this.select = ''
      
    },
    salvar(){
        //NOVO
        //this.Pessoas.nome = this.nome
        
        axios.post(API + 'produto/gravarProduto', this.Produto)
          .then((res)=>{
            Toast.create.positive({
                html: 'Sucesso',
                icon: 'done'
            })
            //console.log(res)
            console.log(res.data)
            console.log(res.response)
            console.log('sucesso')
            this.$router.push('clientes')
          })
          .catch((e)=>{
            //console.log('error')
            //console.log(e)
            console.log(String(e))
            let error = e.response.data
            console.log(error)
            for(var i=0; error.length; i++){
                Toast.create.negative(error[i].value)
            }
        })
    },
    excluir(){
        Dialog.create({
          title: 'Excluir',
          message: 'Tem certeza que deseja excluir este registro?',
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
              handler () {
                Toast.create('Excluído!')
              }
            }
          ]
        })
    },
    listarFamilias(){
      axios.get(API + 'produto/obterProdutosFamilia')
      .then((res)=>{
        this.familias = res.data
      })
      .catch((e)=>{
        console.log(e)
      })
    },
    
   
  },
  created(){
    let t = this
    t.listarFamilias()    
  }
 
}
</script>

<style scoped>
    .btn-plus {
        padding-top: 22px;
        text-align: center;
    }
    
    span {
        color: red;
        font-size: 12px
    }
    
    .mdInput {
        /*margin-top: 10px;
        width: 90%;*/
        background:transparent;
        outline:none;
        border: 0px;
        /*border-bottom-color: #D3DAE0;*/
    }
    
    #id {
        margin-top: 15px;
        font-weight: bolder;
        font-size: 16px;    
    }
    
    #estoque {
        margin-top: 15px;
        font-weight: bolder;
        font-size: 16px; 
        color: red;
    }
    
    
</style>