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
      >
        <i class="material-icons">delete</i>
      </q-btn>
        
      <q-btn
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
      </q-btn>
      
      <q-btn
        color="positive"
        push big
        @click="salvar"
        
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
                    <h4>0,00</h4>
                    <br>
            </center>
            </q-card>
        </div>
        
        <div class="col-4">
            <q-card color="primary" class="col-sm-6">
              <center>
                <q-card-title>Lucro</q-card-title>
                    <h4>0,00</h4>
                    <br>
              </center>
            </q-card>
        </div>
        
        <div class="col-4">
            <q-card color="positive" class="col-sm-6">
              <center>
                <q-card-title>Venda</q-card-title>
                    <h4>0,00</h4>
                    <br>
              </center>
            </q-card>
        </div>        
        
    </div>
    
</div>
    
</template>

<script>
//import axios from 'axios'
//import VMasker from 'vanilla-masker'

import { required, minLength } from 'vuelidate/lib/validators'
import { Dialog, Toast } from 'quasar'


export default {
  name: 'CadProdutos',
  data () {
    return {
        nome: '',
        barras: '',
        codEmpresa: '',
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
        getCep: [],
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
        Toast.create.positive({
        html: 'Salvo com sucesso',
        icon: 'done'
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
    
    .topo {
        margin-top: 50px;
		padding: 10px 10px;
		width: 100%; 
		position: fixed;
		top: 0; 
        left: 0;
		text-align: center;
        z-index: 5;
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