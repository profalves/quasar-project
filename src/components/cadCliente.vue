<template>
<div id="clientes">
    
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
        <div class="col-4">
            <q-field
                label="Tipo"
              >
                <q-select
                    v-model="tipo"
                    :options="tipos"
                />
            </q-field>
        </div>
    </div>
    
    <div class="row">
        <div class="col">
          <q-field
            icon="person"
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
            icon="confirmation_number"
          >
            <q-input v-model.number="cpf" 
                     float-label="CPF/CNPJ"
                     type="number"
                     clearable
                     @input="$v.cpf.$touch()"
                     :error="$v.cpf.$error"
            />
              
            <span v-if="!$v.cpf.minLength || !$v.cpf.maxLength">Este campo  deve conter entre {{$v.cpf.$params.minLength.min}} e {{$v.cpf.$params.maxLength.max}} caracteres.</span>
          </q-field>   
        </div>
        
        <div class="col-md-6">
          <q-field
            icon="phone"
          >
            <q-input v-model.number="fone" 
                     float-label="Telefone" 
                     clearable 
            />
          </q-field>   
        </div>
    </div>  
    
    <div class="row">
        <div class="col control has-icon has-icon-right">
          <q-field
            icon="email"
          >
            <q-input 
                 v-model="email" 
                 type="email" 
                 float-label="Email" suffix="@email.com"
                 @input="$v.email.$touch()"
                 :error="$v.email.$error"
                 clearable
            />
             
             <span v-if="!$v.email.email">Digite um email válido</span>
          </q-field>
             
          
        </div>
    </div>
    
    <div class="row">
        <div class="col-8 col-md-6">
          <q-field
            icon="markunread_mailbox"
            helper="Clique no botão ao lado para pesquisar o CEP"
          >
            <q-input float-label="CEP"
                     v-model.number="cep"
                     type="number"
                     @blur="listarCidades"
                     clearable
                     @input="$v.cep.$touch()"
                     :error="$v.cep.$error"
            />
            <span v-if="!$v.cep.maxLength">Quantidade de números superior ao de um cep</span>
            
          </q-field>   
        </div>
        <div class="col">
          <q-btn 
             icon="search" 
             color="primary"  
             round
             @click="buscarCep"
          >
          </q-btn>   
        </div>
    </div>
    
    <div class="row">
        <div class="col">
          <q-field
            icon="location_on"
          >
            <q-input v-model="end" float-label="Endereço"/>
          </q-field>   
        </div>
        <div class="col-lg-2 col-md-3 col-sm-12">
          <q-field
            icon="location_on"
          >
            <q-input v-model="numLogradouro" type="number" float-label="Numero"/>
          </q-field>   
        </div>
    </div>
    
    <div class="row">
        <div class="col">
          <q-field
            icon="streetview"
          >
            <q-input v-model="bairro" float-label="Bairro"/>
          </q-field>   
        </div>
        
    </div>
    <div class="row">
        <div class="col-md-4">
          <q-field
            icon="star"
          >
            <q-select
                float-label="Estado/Cidade"
                filter
                v-model="estado"
                :options="estados"
                @blur="listarCidades"
            />
          </q-field>   
        </div>
        <div class="col-md-8" style="margin-top:14px;">
          <q-field 
            icon="location_city"
            helper="Escolha primeiro um estado para deois selcionar uma cidade"
          >
            <div class="mdl-selectfield">
            <label class="ellipsis absolute self-start">Cidade</label>
            <select class="browser-default" v-model="cidade" >
              <option disabled selected>Escolha uma cidade</option>
              <option v-for="cidade in cidades">{{cidade.nome}}</option>

            </select>
            </div>   
          </q-field>   
        </div>
        
    </div>
    <div class="row">
        <label>Estados</label>
        <select>
            <option v-for="cidade in listaEstados">{{cidade.nome}}
            </option>
        </select>
        <label>Cidades</label>
        <select>
            <option v-for="cidade in listaEstados">{{cidade.cidades.cidade}}
            </option>
        </select>
        
    </div>
   
   
</div>
    
</template>

<script>
import axios from 'axios'
import VMasker from 'vanilla-masker'
import estados from 'data/estados.json'
import cidadesJSON from 'data/estados-cidades.json'
import { required, minLength, maxLength, email } from 'vuelidate/lib/validators'

//const swal = require('sweetalert')

//const APICidades = 'http://educacao.dadosabertosbr.com/api/cidades/'
const APICidades = 'http://192.168.0.200/celular/api/cidades/consulta?uf='

export default {
  name: 'clientes',
  data () {
    return {
        estados,
        cidadesJSON,
        nome: '',
        cpf: '',
        fone: '',
        email: '',
        cep: '',
        end: '',
        bairro: '',
        cidade: '',
        estado: '',
        numLogradouro: '',
        tipo: 'c',
        tipos: [
            {
              label: 'Cliente',
              value: 'c'
            },
            {
              label: 'Fornecedor',
              value: 'f'
            },
            
        ],
        cidades: [],
        canGoBack: window.history.length > 1,
        getCep: []
    }
  },
  computed: {
    // uma função "getter" computada (computed getter)
    listaEstados: function () {
      // `this` aponta para a instância Vue da variável `vm`
      return this.cidadesJSON.estados
    },
    listaCidades: function () {
      return this.cidadesJSON.estados.cidades
    }
  },
  watch: {
    'fone' (newVal, oldVal) {
      this.fone = VMasker.toNumber(newVal)
      this.fone = VMasker.toPattern(newVal, '(99) 999999999')
    },
    'cep' (newVal, oldVal) {
      this.cep = VMasker.toNumber(newVal)
      this.cep = VMasker.toPattern(newVal, '99999999')
    },
  },
  validations: {
    nome: {
      required,
      minLength: minLength(3)
    },
    cpf: {
      minLength: minLength(11),
      maxLength: maxLength(14)  
    },
    cep: {
      maxLength: maxLength(8)  
    },
    email: { 
      email  
    }
    
  },
  methods: {
    buscarCep(){
      axios.get('http://api.postmon.com.br/v1/cep/' + this.cep)
      .then((res)=>{
          this.getCep = res.data
          this.estado = this.getCep.estado.toLowerCase()
          this.end = this.getCep.logradouro
          this.bairro = this.getCep.bairro
          this.cep = this.getCep.cep
          this.listarCidades()
          this.cidade = this.getCep.cidade
          console.log(res.data)
      })
      .catch((e)=>{
        swal(
          'Oops...',
          'CEP inexistente!',
          'error'
        )
        this.cep = ''
        console.log(e)
      })  
    },
    goBack(){
      window.history.go(-1)
    },
    limpar () {
      this.nome = ''
      this.cpf = ''
      this.fone = ''
      this.email = ''
      this.cep = ''
      this.end = ''
      this.bairro = ''
      this.cidade = ''
      this.estado = ''
      this.numLogradouro = '' 
    },
    listarCidades(){
      axios.get(APICidades + this.estado)
      .then((res)=>{
        this.cidades = res.data
        console.log(res.data)
      })
    },
    salvar(){
      swal(
          'Salvo',
          'registro salvo com sucesso!',
          'success'
      )  
    },
    excluir(){
      swal({
          title: 'Você tem certeza que deseja excluir?',
          text: "Depois que o fizer não será mais revertido!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sim, pode excluir!',
          cancelButtonText: 'Não, cancela!',
          /*confirmButtonClass: 'btn btn-success',
          cancelButtonClass: 'btn btn-danger',*/
          buttonsStyling: true
        }).then(function () {
          swal(
            'Deletado!',
            'Registro excluido com sucesso',
            'success'
          )
        }, function (dismiss) {
          // dismiss can be 'cancel', 'overlay',
          // 'close', and 'timer'
          if (dismiss === 'cancel') {
            swal(
              'cancelaado',
              'Nenhuma exclusão será realizada',
              'error'
            )
          }
        })
    }
    
  }
 
}
</script>

<style scoped>

    select {
      font-family: inherit;
      background-color: transparent;
      width: 100%;
      padding: $select-padding 0;
      font-size: $select-font-size;
      color: $select-color;
      border: none;
      border-bottom: 1px solid $select-border-color;
    }

    /* Remove focus */
    select:focus {
      outline: none
    }

    /* Hide label */
    .mdl-selectfield label {
      color: #87939F;
      padding-top: 4px;
    }
    .mdl-selectfield label {
      display: none
    }
    /* Use custom arrow */
    .mdl-selectfield select {
      appearance: none
    }
    .mdl-selectfield {
      font-family: 'Roboto','Helvetica','Arial',sans-serif;
      position: relative;
        &:after {
            position: absolute;
            top: 0.75em;
            right: 0.5em;
            /* Styling the down arrow */
            width: 0;
            height: 0;
            padding: 0;
            content: '';
            border-left: .25em solid transparent;
            border-right: .25em solid transparent;
            border-top: .375em solid $select-border-color;
            pointer-events: none;
        }
    }

    span {
      color: red;
      font-size: 13px
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

    
</style>