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
        <div class="col">
            <h5>Cadastro de Pessoas</h5>
        </div>
    </div>
    
    <div class="row">
        <div class="col">
            <q-field
                helper="Tipo Cadastro" 
              >
                <q-select
                    v-model="tipo"
                    :options="tipos"
                />
            </q-field>
        </div>
        <div class="col">
            <q-field
                helper="Tipo Pessoa"    
              >
                <q-select
                    v-model="tipoPessoa"
                    :options="[
                        {
                          label: 'Física',
                          value: 'f'
                        },
                        {
                          label: 'Jurídica',
                          value: 'j'
                        }
                    ]"
                />
            </q-field>
        </div>
        
    </div>
    
    <div class="row">
        <div class="col">
            <q-field helper="Família">
                <q-select
                    filter
                    v-model="familia"
                    :options="options"
                />
            </q-field>
        </div>
        <div class="col">
            <q-field helper="Vendedor">
                <q-select
                    filter
                    v-model="vendedor"
                    :options="[
                        {
                          label: 'User Logado',
                          value: 1
                        }
                    ]"
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
            
             <span style="color:#878B8F" v-if="!$v.nome.required">Nome é requerido</span>
             <span v-if="!$v.nome.minLength">Este campo deve conter mais que {{$v.nome.$params.minLength.min}} caracteres.</span>
            
          </q-field>   
        </div>
    </div> 
    
    <div class="row">
        <div class="col" id="genero">
            <q-radio v-model="sexo" val="mas" color="primary" left-label label="Masc." />
            <q-radio v-model="sexo" val="fem" color="primary" left-label label="Fem." style="margin-left: 10px" /> 
        </div>
    </div>
    
    <div class="row">
        <div class="col-md-6">
          <q-field
            icon="done"
            helper="CPF/CNPJ"
          >
            <the-mask class="mdInput"
                      v-model="cpf"
                      :mask="['###.###.###-##', '##.###.###/####-##']"
                      />
          </q-field>   
        </div>
        <div class="col-md-6">
          <q-field
            icon="done"
            helper="RG/Inscrição Estadual"
          >
            <q-input v-model="rg"/>
          </q-field>   
        </div>    
    </div>
    <br>
        
    <q-list style="background-color: white;">
          
      <!--Endereços-->
      <q-collapsible icon="pin_drop" label="Endereços">
          
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
                         ref="cep"
                />
                <span v-if="!$v.cep.maxLength">Quantidade de números superior ao de um cep</span>

              </q-field>   
            </div>
            <div class="col">
              <q-btn 
                 icon="search" 
                 color="primary"
                 style="margin: 17px 0 0 20px"
                 round small
                 @click="buscarCep"
                 :disabled="visivel"
              >
              </q-btn>
              <span id="avisoCep" v-if="visivel">Offline</span>
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
                icon="store"
              >
                <q-input v-model="ponto" type="textarea" float-label="Ponto de Referência"/>
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
                icon="domain"
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

        <div class="row btn-plus" >
            <div class="col">
                <q-btn 
                   rounded
                   color="primary" 
                   @click="">
                   <q-icon name="add_location" />
                   adicionar endereço
                </q-btn>
            </div>
        </div><br>
      </q-collapsible>
        
      <!--Contatos-->
      <q-collapsible icon="contact_phone" label="Contatos">
          
        <div class="row">
            
            <div class="col col-md-4">
              <q-field
                icon="phone"
              >
                <q-select
                    float-label="Tipo Contato"
                    v-model="tipoContato"
                    :options="[
                        {
                          label: 'Residencial',
                          value: 'res'
                        },
                        {
                          label: 'Comercial',
                          value: 'com'
                        },
                        {
                          label: 'Celular',
                          value: 'cel'
                        }
                    ]"   
                />
              </q-field>   
            </div>
            <div class="col" id="fone">
              <q-field
                helper="Fone"
              >
                <the-mask class="mdInput"
                          v-model.number="fone"
                          float-label="Fone" 
                          :mask="['(##) ####-####', '(##) #####-####']"
                          />
              </q-field>   
            </div>
            <div class="col-2 btn-plus" >
                <q-btn 
                   rounded
                   color="primary" 
                   @click="">
                   <q-icon name="add" />
                </q-btn>
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
            <div class="col-2 btn-plus" >
                <q-btn 
                   rounded
                   color="primary" 
                   @click="">
                   <q-icon name="add" />
                </q-btn>
            </div>
        </div>
          
        
      </q-collapsible>
      
      <!--Dados Complementares-->
      <q-collapsible icon="person_outline" label="Dados Complementares">
        <div class="row">
            <div class="col-md-6 col-xs-12">
              <q-field
                icon="android"
                helper="Apelido"
              >
                <input class="mdInput" v-model="alias" />

              </q-field>
            </div>    
            <div class="col">
              <q-field
                icon="cake"
                helper="Data de Nascimento"
              >
                <the-mask class="mdInput"
                          v-model="datanasc"
                          type="data" 
                          :mask="['##/##/####']"
                />

              </q-field>
            </div>    
        </div>
          
      </q-collapsible>  
      
      <!--Crediário-->  
      <q-collapsible icon="local_atm" label="Crediário">
        <div class="row">
            
            <div class="col-4">
                <q-field helper="Crediário">
                    <q-select
                        v-model="cred"
                        :options="[
                            {
                              label: 'Sim',
                              value: 's'
                            },
                            {
                              label: 'Não',
                              value: 'n'
                            }
                        ]"
                    />
                </q-field>
            </div>
            <div class="offset-1 col">
                <q-field
                    label="Limite"
                  >
                    <q-input v-model="limite" />

                </q-field>
            </div>
        </div>
          
        
      </q-collapsible>
        
      <!--OBS-->
      <q-collapsible icon="message" label="Observações">
        <q-input 
                 float-label="Obs:" 
                 v-model="obs" 
                 type="textarea" 
                 />
      </q-collapsible>
        
    </q-list>
    
</div>
    
</template>

<script>
import axios from 'axios'
import VMasker from 'vanilla-masker'
import estados from 'data/estados.json'
import cidadesJSON from 'data/estados-cidades.json'
import { required, minLength, maxLength, email } from 'vuelidate/lib/validators'
import { Dialog, Toast } from 'quasar'


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
        rg: '',
        sexo: '',
        datanasc: '',
        alias: '',
        fone: '',
        tipoContato: 'cel',
        email: '',
        cep: '',
        end: '',
        bairro: '',
        ponto: '',
        cidade: '',
        estado: 'ba',
        numLogradouro: '',
        obs: '',
        tipoPessoa: 'f',
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
        options: [
            {
              label: 'Indefinido',
              value: 'ind'
            },
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
        select: '',
        familia: 'ind',
        vendedor: 1,
        cred: 's',
        limite: '0,00',
        cidades: [],
        canGoBack: window.history.length > 1,
        getCep: [],
        error: '',
        visivel: false
    }
  },
  computed: {
    // uma função "getter" computada (computed getter)
    listaEstados: function () {
      // `this` aponta para a instância Vue da variável `vm`
      return this.cidadesJSON.estados
    },
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
      minLength: minLength(10),
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
          //console.log(res.data)
          this.getCep = res.data
          this.estado = this.getCep.estado.toLowerCase()
          this.listarCidades()
          this.end = this.getCep.logradouro
          this.bairro = this.getCep.bairro
          this.cep = this.getCep.cep
          this.cidade = this.getCep.cidade
          
      })
      .catch((e)=>{
        Dialog.create({
          title: 'CEP inexistente',
          message: 'Digite um CEP válido',
          buttons: [
            {
              label: 'Ok',
              raised: true,
              color: 'info'
            }
          ]
        })
        this.cep = ''
        this.$refs.cep.focus();
        this.error = e
        //console.log(e)
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
    listarCidades(){
      axios.get(APICidades + this.estado)
      .then((res)=>{
        this.cidades = res.data
        //console.log(res)
      })
    },
    testarConexao(){
      axios.get('http://192.168.0.200/celular/api/cidades/consulta?uf=ba')
      .then((res)=>{
        console.log(res)
      })
      .catch((e)=>{
        Dialog.create({
          title: 'Erro',
          message: 'dispositivo offLine',
          buttons: [
            {
              label: 'Ok',
              raised: true,
              color: 'info'
            }
          ]
        })
        this.visivel = true
        this.error = e
        //console.log(e)
      })
        
    }
    
  },
  created(){
    let t = this
    t.listarCidades()
    t.testarConexao()
    
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
    
    #avisoCep {
        font-weight: bolder;
        font-size: 16px;
        color: slategrey;
        margin: 15px 0 0 15px;
        text-decoration: blink;
    }
    
    #fone {
        margin-top: 12px;
    }
    
    .btn-plus {
        margin-top: 20px;
    }
    
    #cod {
        text-align: right;
    }
    
    #genero {
        text-align: center;
        margin-top: 15px;
    }
    
</style>