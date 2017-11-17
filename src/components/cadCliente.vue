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
        <div class="col-md-4">
            <q-field
                helper="Tipo Cadastro" 
              >
                <q-select
                    v-model="Pessoas.CodTipo"
                    :options="tipos"
                />
            </q-field>
        </div>
        <div class="col-md-4">
            <q-field
                helper="Tipo Pessoa"    
              >
                <q-select
                    v-model="Pessoas.PJ"
                    :options="[
                        {
                          label: 'Física',
                          value: false
                        },
                        {
                          label: 'Jurídica',
                          value: true
                        }
                    ]"
                />
            </q-field>
        </div>
        <div class="col-md-4" v-if="Pessoas.PJ==true">
            <q-field
                helper="Tipo Jurídica: Regime Tributário"    
              >
                <q-select
                    v-model="Pessoas.CodRegimeTribut"
                    :options="[
                        {
                          label: 'Física',
                          value: 0
                        },
                        {
                          label: 'Simples Nacional',
                          value: 1
                        },
                        {
                          label: 'Simples Nacional - excesso de sublimite da receita bruta',
                          value: 2
                        },
                        {
                          label: 'Regime Normal',
                          value: 3
                        }
                    ]"
                />
            </q-field>
        </div>
        
    </div>
    
        
    <q-list style="background-color: white;">
          
      <!--Dados Pessoais-->
      <q-collapsible :opened="open.dados" icon="perm_contact_calendar" label="Dados Pessoais">
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
                <q-radio v-model="sexo" val=false color="primary" left-label label="Masc." />
                <q-radio v-model="sexo" val=true color="primary" left-label label="Fem." style="margin-left: 10px" /> 
            </div>
        </div>

        <div class="row">
            <div class="col-md-6">
              <q-field
                icon="done"
                helper="CPF/CNPJ"
                :error="$v.cpf.$error"
              >
                <the-mask class="mdInput"
                          v-model="cpf"
                          :mask="['###.###.###-##', '##.###.###/####-##']"
                          @input="$v.cpf.$touch()"
                          />
                  
                
              </q-field>
                
                <span style="color:#878B8F; margin-left:43px" v-if="!$v.cpf.required">Este campo é requerido</span>
                <div class="error" v-if="!$v.cpf.minLength">Este campo deve ser igual ou maior que {{$v.cpf.$params.minLength.min}} caracteres.</div>
            </div>
            <div class="col-md-6">
              <q-field
                icon="done"
                helper="RG/Inscrição Estadual"
              >
                <q-input v-model.number="Pessoas.RG" type="number" @blur="colapDados"/>
              </q-field>   
            </div>    
        </div>    
      </q-collapsible>
             
      <!--Endereços-->
      <q-collapsible :opened="open.end" icon="pin_drop" label="Endereços">
          
        <div class="row">
            <div class="col-8 col-md-6">
              <q-field
                icon="markunread_mailbox"
                helper="Clique no botão ao lado para pesquisar o CEP"
                :error="$v.cep.$error"
                name="campoCEP"
              >
                <q-input float-label="CEP"
                         v-model.number="cep"
                         type="number"
                         @blur="listarCidades"
                         clearable
                         @input="$v.cep.$touch()"
                         ref="cep"
                         name="cep"
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
                <q-input v-model="Pessoas.Endereco" float-label="Endereço"/>
              </q-field>   
            </div>
            <div class="col-lg-2 col-md-3 col-sm-12">
              <q-field
                icon="location_on"
              >
                <q-input v-model="Pessoas.Numero" type="number" float-label="Numero"/>
              </q-field>   
            </div>
        </div>
          
        <div class="row">
            <div class="col">
              <q-field
                icon="store"
              >
                <q-input v-model="Pessoas.PontoReferencia" type="textarea" float-label="Ponto de Referência"/>
              </q-field>   
            </div>

        </div>

        <div class="row">
            <div class="col">
              <q-field
                icon="streetview"
              >
                <q-input v-model="Pessoas.Bairro" float-label="Bairro"/>
              </q-field>   
            </div>

        </div>
            
        <div class="row">
            <div class="col-md-4">
              <q-field
                icon="domain"
              >
                <q-select v-model="estado"
                          :options="listaEstados"
                          float-label="UF"
                          filter>
                </q-select>
              </q-field>   
            </div>

            <div class="col">
              <q-field 
                icon="location_city"
              >
                <q-select v-model="cidade"
                          :options="listaCidades"
                          float-label="Cidade"
                          filter>
                </q-select>
                  
              </q-field>   
            </div>

        </div>

        <div class="row btn-plus" >
            <div class="col">
                <q-btn 
                    rounded
                    color="primary" 
                    @click=""
                    disabled   
                >
                   <q-icon name="add_location" />
                   adicionar endereço
                </q-btn>
            </div>
        </div><br>
      </q-collapsible>
        
      <!--Contatos-->
      <q-collapsible :opened="open.cont" icon="contact_phone" label="Contatos">
          
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
            <div class="col-2 offset-1 btn-plus" >
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
                     v-model="Pessoas.Email" 
                     type="email" 
                     float-label="Email" suffix="@email.com"
                     @input="$v.email.$touch()"
                     :error="$v.email.$error"
                     clearable
                     @blur="colapCont"
                />

                 <span v-if="!$v.email.email">Digite um email válido</span>
              </q-field> 
            </div>
            <!--<div class="col-2 btn-plus" >
                <q-btn 
                   rounded
                   color="primary" 
                   @click="">
                   <q-icon name="add" />
                </q-btn>
            </div>-->
        </div>
          
        
      </q-collapsible>
        
      <!--Familia/Vendedor-->
      <q-collapsible :opened="open.grup" icon="people_outline" label="Grupo/Vendedor">
          <div class="row">
            <div class="col-xs-8 col-md-4">
                <q-field helper="Família">
                    <select class="browser-default" v-model="Pessoas.CodFamilia">
                      <option disabled selected>Escolha uma família</option>
                      <option v-for="familia in familias" :value="familia.codigo">{{familia.nome}}</option>
                    </select>
                </q-field>
            </div>
            <div class="col-2 offset-1 btn-plus" >
                <q-btn 
                   rounded
                   color="primary" 
                   @click="novaFamilia">
                   <q-icon name="add" />
                </q-btn>
            </div>
            <div class="col">
                <q-field helper="Vendedor">
                    <q-select
                        @blur="colapGrup"
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
      </q-collapsible>
      
      <!--Dados Complementares-->
      <q-collapsible :opened="open.comp" icon="person_outline" label="Dados Complementares">
        <div class="row">
            <div class="col-md-6 col-xs-12">
              <q-field
                icon="android"
              >
                <q-input v-model="Pessoas.Apelido" float-label="Apelido"/>

              </q-field>
            </div>    
            <div class="col">
              <q-field
                icon="date_range"
                >
                <q-datetime v-model="Pessoas.DataNasc"
                            type="date" 
                            float-label="Data de Nascimento" 
                            color="black"
                            format="DD/MM/YYYY"
                            ok-label="OK" 
                            clear-label="Limpar" 
                            cancel-label="Cancelar"
                            :day-names="dias"
                            :month-names="meses"
                />
              </q-field>
            </div>    
        </div>
          
      </q-collapsible>  
      
      <!--Crediário-->  
      <q-collapsible :opened="open.cred" icon="local_atm" label="Crediário">
        <div class="row">
            
            <div class="col-4">
                <q-field helper="Crediário">
                    <q-select
                        v-model="Pessoas.venderCrediario"
                        :options="[
                            {
                              label: 'Sim',
                              value: true
                            },
                            {
                              label: 'Não',
                              value: false
                            }
                        ]"
                    />
                </q-field>
            </div>
            <div class="offset-1 col">
                <q-field
                    helper="Limite"
                  >
                    <q-input v-model="Pessoas.LimiteCredito" @blur="colapCred"  />

                </q-field>
            </div>
        </div>
          
        
      </q-collapsible>
        
      <!--OBS-->
      <q-collapsible :opened="open.obs" icon="message" label="Observações">
        <q-input 
                 float-label="Obs:" 
                 v-model="Pessoas.Observacoes" 
                 type="textarea" 
                 />
      </q-collapsible>
        
    </q-list>
    
</div>
    
</template>

<script>
import axios from 'axios'
import VMasker from 'vanilla-masker'
import cidadesJSON from 'data/estados-cidades.json'
import { required, minLength, maxLength, email } from 'vuelidate/lib/validators'
import { Dialog, Toast } from 'quasar'

//dev
const API = 'http://192.168.0.200/WSV3/'

//debug
//const API = 'http://192.168.0.200:29755/'

export default {
  name: 'clientes',
  data () {
    return {
        //estados,
        estados: [],
        cidadesJSON,
        nome: '',
        sexo: '',
        Pessoas:{
            codigo: 0,
            CodRegimeTribut : 1,
            CodTipo : 1,
            CodFamilia : 1,
            Nome : '', //requerido
            Apelido : '',
            Contato : '',
            CPF : '', //requerido
            RG : '',
            CNPJ : '',
            NCartTrabalho : '',
            NReservista : '',
            NTituloEleitor : '',
            NPIS : '',
            NCNH : '',
            Endereco : '',
            Numero : '',
            Bairro : '',
            CEP : '',
            CodigoIBGECidade : 2930501, //not null
            CodigoUF : 29,  //not null
            LimiteCredito : 0.00, //not null
            TelResid : '',
            TelComercial : '',
            Celular1 : '',
            Celular2 : '',
            Email : '',
            Skype : '',
            Site : '',
            CodigoVendedor : 1, //not null
            Observacoes : '',
            PJ : false, //not null
            DataNasc : '',
            SexoFeminino : false,
            CaminhoFoto : '',
            CodPai : 0,
            PontoReferencia : '',
            NomePai : '',
            NomeMae : '',
            CodigoUsuario : 1,
            Excluido : false,
            EmpresaRendaExtra : 0.00,
            venderCrediario : true
        },
        cpf: '',
        datanasc: '',
        fone: '',
        tipoContato: 'cel',
        email: '',
        cep: '',
        endAdicional:{
            CodPessoa: '', //not null
            Nome: '', //not null
            Numero: '', 
            PontoRef: '', 
            Bairro: '', 
            CodigoIBGECidade: '', //not null
            CodigoUF: '', //not null
            Excluido: false, //not null
            CodTipo: 1, //not null
            CodigoUsuario: '', //not null
            CEP: ''
        },
        cidade: '',
        estado: 'ba',
        tipo: 1,
        tipos: [
            {
              label: 'Cliente',
              value: 1
            },
            {
              label: 'Dependente do Cliente',
              value: 7
            },
            {
              label: 'Empregado',
              value: 4
            },
            {
              label: 'Fornecedor',
              value: 2
            },
            {
              label: 'Referencia Pessoal',
              value: 6
            },
            {
              label: 'Referencia Pessoal',
              value: 5
            },
            {
              label: 'Transportadora',
              value: 3
            },
            
        ],
        open: {
            dados: true,
            end: false,
            cont: false,
            grup: false,
            comp: false,
            cred: false,
            obs: false,
        },
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
        //familia: '',
        familias: [],
        vendedor: 1,
        cred: 's',
        limite: '0,00',
        cidades: [],
        canGoBack: window.history.length > 1,
        getCep: [],
        error: '',
        visivel: false,
        //datatime
        dias: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
        meses: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
    }
  },
  computed: {
    // uma função "getter" computada (computed getter)
    listaEstados: function () {
      var a = this.estados
      var lista = []
      
      for (var i=0; i < a.length; i++) {
          var n = a[i].nome
          var c = a[i].codigoUF
          lista.push({label: n, codigoUF: c})    
      }
      //console.log(lista)
      return lista
    },
    listaCidades: function () {
      var a = this.cidades
      var lista = []
      
      for (var i=0; i < a.length; i++) {
          var n = a[i].nome
          var c = a[i].codigoIBGE
          lista.push({label: n, codigoIBGE: c})    
      }
      //console.log(lista)
      return lista
    
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
    'open.cred' (value) {
      if (value === true) {
        this.open.comp = false
      }  
    }
  },
  validations: {
    nome: {
      required,
      minLength: minLength(3)
    },
    cpf: {
      required,
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
          //console.log(res.data)
          this.getCep = res.data
          this.estado = this.getCep.estado.toLowerCase()
          this.listarCidades()
          this.Pessoas.Endereco = this.getCep.logradouro
          this.Pessoas.Bairro = this.getCep.bairro
          this.Pessoas.CEP = this.getCep.cep
          this.cidade = this.getCep.cidade
          this.Pessoas.CodigoIBGECidade = parseInt(this.getCep.cidade_info.codigo_ibge)
          this.Pessoas.CodigoUF = parseInt(this.getCep.estado_info.codigo_ibge)
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
    salvar(){
        //EDITAR
        
        //NOVO
        this.Pessoas.Nome = this.nome
        this.Pessoas.SexoFeminino = (this.sexo === 'true')
        this.Pessoas.DataNasc = new Date(2000, 0, 1)
        if(this.cpf==="" || this.cpf===null){
            this.Pessoas.CPF = '0'
            
        }
        else{
            this.Pessoas.CPF = this.cpf
        }
        if(this.cpf.length>11){
            this.Pessoas.CNPJ = this.cpf
            this.Pessoas.CPF = this.cpf.substring(0, 10)
            
        }
        else{
            this.Pessoas.CPF = this.cpf
        }
                
        axios.post(API + 'pessoa/gravarPessoa', this.Pessoas)
          .then((res)=>{
            Toast.create.positive({
                html: 'Salvo com sucesso',
                icon: 'done'
            })
            //console.log(res)
            console.log(res.data)
            console.log('sucesso')

          })
          .catch((e)=>{
            console.log('error')
            console.log(e)
            console.log(String(e))
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
    novaFamilia(){
        Dialog.create({
          title: 'Nova Família de Clientes',
          message: 'Digite o nome da nova família e clique em salvar.',
          form: {
            nome: {
              type: 'text',
              label: 'Nome',
              model: ''
            },
            codigoUsuario: {
              model: 1
            }
          },
          buttons: [
            'Cancel',
            {
              label: 'Ok',
              handler (data) {
                //console.log(data)
                if(data.nome === null || data.nome === ''){
                    Toast.create.negative('A família não pode ser cadastrada com nome nulo') 
                    return
                }
                axios.post(API + 'pessoa/gravarPessoaFamilia', data)
                  .then((res)=>{
                    //console.log(res)
                    console.log(res.data)
                    //console.log(res.data)
                    console.log('sucesso')
                    //Toast.create('Returned ' + JSON.stringify(data))
                    Toast.create.positive('Família ' + JSON.stringify(data.nome) + ' cadastrada com sucesso')

                  })
                  .catch((e)=>{
                    console.log('error')
                    console.log(e)
                    console.log(e.body)
                })
                
              }
            }
          ]
    })
    
    },
    listarFamilias(){
      axios.get(API + 'pessoa/obterPessoasFamilia')
      .then((res)=>{
        this.familias = res.data
        //console.log(res.data)
      })
      .catch((e)=>{
        console.log(e)
      })  
    },
    listarUFs(){
      axios.get(API + 'cidade/obterUfs')
      .then((res)=>{
        this.estados = res.data
        //console.log(res.data)
      })
      .catch((e)=>{
        console.log(e)
      })
    },
    listarCidades(){
      axios.get(API + 'cidade/obtercidades?uf=' + this.estado)
      .then((res)=>{
        this.cidades = res.data
        //console.log(res.data)
      })
    },
    testarConexao(){
      axios.get('http://192.168.0.200/WSV3/cidade/obtercidades?uf=ba')
      .then((res)=>{
        console.log('Conexão com a web realizada com sucesso')
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
        
    },
    colapDados() {
        this.open.dados=false
        this.open.end=true   
    },
    colapEnd() {
        this.open.end=false
        this.open.cont=true   
    },
    colapCont() {
        this.open.cont=false
        this.open.grup=true   
    },
    colapGrup() {
        this.open.grup=false
        this.open.comp=true   
    },
    colapComp() {
        this.open.comp=false
        this.open.cred=true   
    },
    colapCred() {
        this.open.obs=true
        this.open.cred=false
    },
    
  },
  created(){
    let t = this
    t.listarUFs()
    t.listarCidades()
    t.listarFamilias()
    t.testarConexao()
    //console.log()
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
      display: none
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
    
    .error {
      color: red;
      font-size: 12px;
      margin-left: 43px;
    }
    
    .mdInput {
        /*margin-top: 10px;
        width: 90%;*/
        background: transparent;
        outline: none;
        /*border: 1px;
        border-bottom-color: #D3DAE0;*/
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