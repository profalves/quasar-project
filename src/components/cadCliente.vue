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
        style="margin-left: 5px"
      >
        <i class="material-icons">delete</i>
      </q-btn>
            
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
            <h5>Cadastro de Pessoas</h5>
        </div>
    </div>
    
    <div class="row">
        <div class="col-md-4">
            <q-field
                helper="Tipo Cadastro" 
              >
                <q-select
                    v-model="Pessoas.codTipo"
                    :options="tipos"
                />
            </q-field>
        </div>
        <div class="col-md-4">
            <q-field
                helper="Tipo Pessoa"    
              >
                <q-select
                    v-model="Pessoas.pj"
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
        <div class="col-md-4" v-if="Pessoas.pj === true">
            <q-field
                helper="Tipo Jurídica: Regime Tributário"    
              >
                <q-select
                    v-model="Pessoas.codRegimeTribut"
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
            <div class="col" id="genero" v-if="Pessoas.pj === false">
                <q-radio v-model="sexo" val=false color="primary" left-label label="Masc." />
                <q-radio v-model="sexo" val=true color="primary" left-label label="Fem." style="margin-left: 10px" /> 
            </div>
        </div>

        <div class="row">
            <div class="col-md-6" style="margin-top: 2px">
              <q-field
                icon="done"
                :error="$v.cpf.$error"
                helper="CPF/CNPJ"
              >
                <the-mask v-model="cpf"
                          :mask="['###.###.###-##', '##.###.###/####-##']"
                          @input="$v.cpf.$touch()"
                          class="mdInput"
                />
                  
                
              </q-field>
                
                <!--<span style="color:#878B8F; margin-left:43px" v-if="!$v.cpf.required">Este campo é requerido</span>-->
                <div class="error" v-if="!$v.cpf.minLength">Este campo deve ser igual ou maior que 11 caracteres.</div>
            </div>
            <div class="col-md-6">
              <q-field
                icon="done"
                helper="RG/Inscrição Estadual"
              >
                <q-input v-model="Pessoas.rg" @blur="colapDados"/>
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
                         v-mask="['########']"
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
                <q-input v-model="Pessoas.endereco" float-label="Endereço"/>
              </q-field>   
            </div>
            <div class="col-lg-2 col-md-3 col-sm-12">
              <q-field
                icon="location_on"
              >
                <q-input v-model="Pessoas.numero" type="number" float-label="Numero"/>
              </q-field>   
            </div>
        </div>
          
        <div class="row">
            <div class="col">
              <q-field
                icon="store"
              >
                <q-input v-model="Pessoas.pontoReferencia" type="textarea" float-label="Ponto de Referência"/>
              </q-field>   
            </div>

        </div>

        <div class="row">
            <div class="col">
              <q-field
                icon="streetview"
              >
                <q-input v-model="Pessoas.bairro" float-label="Bairro"/>
              </q-field>   
            </div>

        </div>
            
        <div class="row">
            <div class="col-md-4">
              <q-field
                icon="domain"
              >
                <q-dialog-select v-model="estado"
                          :options="listaEstados"
                          float-label="UF"
                          @blur="listarCidades"
                          filter
                />
              </q-field>   
            </div>

            <div class="col">
              <q-field 
                icon="location_city"
              >
                <q-dialog-select v-model="Pessoas.codigoIBGECidade"
                          :options="listaCidades"
                          float-label="Cidade"
                          filter
                />
                  
              </q-field>   
            </div>

        </div>

        <div class="row btn-plus" v-if="visivel">
            <div class="col">
                <q-btn 
                    rounded
                    color="primary" 
                    @click="$refs.layoutModal.open(limparEnd())"  
                >
                   <q-icon name="add_location" />
                   adicionar endereço
                </q-btn>
            </div>
        </div><br>
          
        <!--Demais Endereços-->
            <q-collapsible icon="pin_drop" label="Demais Endereços" v-if="visivel">
            
                <q-list v-for="item in enderecos" :key="item.$id">
                  <q-list-header>Endereço: {{item.codigo}}</q-list-header>
                  <q-item>
                    <q-item-main>
                        <div >
                            <strong>Rua:</strong> {{item.endereco}}
                            <strong>,</strong> {{item.numero}}<br>
                            <strong>Ponto de Referência:</strong> {{item.pontoRef}}<br>
                            <strong>Bairro:</strong> {{item.bairro}}<br>
                            <strong>Cidade:</strong> {{item.cidade}} <strong>UF:</strong> {{item.uf}}<br>
                            <strong>CEP:</strong> {{item.cep}}<br><br>
                        </div>
                    </q-item-main>
                  </q-item>
                  <q-item-separator />
                  <q-item>
                    <div class="row">
                        <div class="col-6">
                            <a @click="$refs.layoutModal.open(editarEnd(item))" color="info"><i class="material-icons fa-2x">mode_edit</i></a>
                        </div>
                        <div class="col-6">
                            <i class="material-icons fa-2x mHover text-negative" @click="excluirEnd(item)" color="negative">delete_forever</i>
                        </div>
                    </div>
                  </q-item>
                </q-list>
            </q-collapsible>
            
        <!--Demais Endereços--
        <q-collapsible v-if="listEndAdd" icon="pin_drop" label="Demais Endereços">
            
            <div class="row" id="table">    
                <table class="q-table" :class="computedClasses">
                  <thead>
                    <tr>
                      <th class="text-left">Logradouro</th>
                      <th class="text-left">N.</th>
                      <th class="text-left">Bairro</th>
                      <th class="text-left">Cidade</th>
                      <th class="text-left">Ver</th>
                      <th class="text-left">Editar</th>
                      <th class="text-left">Excluir</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in enderecos">
                      <td class="text-left">{{ item.endereco }}</td>
                      <td class="text-right">{{ item.numero }}</td>
                      <td class="text-left">{{ item.bairro }}</td>
                      <td class="text-left">{{ item.cidade }}</td>
                      <td class="text-center">
                        <i class="material-icons fa-2x mHover" @click="$refs.enderecoModal.open(endItem = item)" color="negative">visibility</i>  
                      </td>
                      <td class="text-center">
                        <a @click="$refs.layoutModal.open(editarEnd(item))" color="info"><i class="material-icons fa-2x" >mode_edit</i></a>   
                      </td>
                      <td class="text-center">
                        <i class="material-icons fa-2x mHover text-negative" @click="" color="negative">delete_forever</i> 
                      </td>
                    </tr>
                  </tbody>
                </table>
            </div>
            

          </q-collapsible>-->
      </q-collapsible>
              
      <!--Contatos-->
      <q-collapsible :opened="open.cont" icon="contact_phone" label="Contatos">
          
        <div class="row">
            
            <div class="col-md-4">
              <q-field
                icon="phone"
              >
                <q-select
                    float-label="Tipo Contato"
                    v-model="foneADD.CodTipo"
                    :options="[
                        {
                          label: 'Pessoal',
                          value: 1
                        },
                        {
                          label: 'Residencial',
                          value: 2
                        },
                        {
                          label: 'Comercial',
                          value: 3
                        },
                        {
                          label: 'Recado',
                          value: 4
                        }
                    ]"   
                />
              </q-field>   
            </div>
            <div class="col-xs-8 col-md-5" id="fone">
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
                   @click="adicionarTel">
                   <q-icon name="add" />
                </q-btn>
            </div>
        </div>
          
        <div class="row">
            <div class="col" style="margin: 10px 0 10px">
                <q-checkbox label="Móvel?" v-model="foneADD.movel"/>
            </div>
        </div>
          
        <hr>
          
        <div class="row">
            
            <div class="col-md-4">
              <q-field
                icon="email"
              >
                <q-select
                    float-label="Tipo Email"
                    v-model="emailADD.CodTipo"
                    :options="[
                        {
                          label: 'Pessoal',
                          value: 1
                        },
                        {
                          label: 'Profissional',
                          value: 2
                        },
                        {
                          label: 'NFE',
                          value: 3
                        }
                    ]"   
                />
              </q-field>   
            </div>
            <div class="col-xs-8 col-md-5 control has-icon has-icon-right" id="email">
              <q-field
                helper="Email"
                :error="$v.email.$error"
              >
                <q-input 
                     v-model="email" 
                     type="email"
                     @input="$v.email.$touch()"
                     placeholder="@email.com"
                     clearable
                     @blur="colapCont"
                />

                 <span v-if="!$v.email.email">Digite um email válido</span>
              </q-field> 
            </div>
            <div class="col-2 offset-1 btn-plus" >
                <q-btn 
                   rounded
                   color="primary" 
                   @click="adicionarEmail">
                   <q-icon name="add" />
                </q-btn>
            </div>
        </div>
          
        
      </q-collapsible>
        
      <!--Familia/Vendedor-->
      <q-collapsible :opened="open.grup" icon="people_outline" label="Grupo/Vendedor">
          <div class="row">
            <div class="col-xs-8 col-md-4">
                <q-field helper="Família">
                    <q-select
                        filter
                        v-model="Pessoas.codFamilia"
                        :options="listaFamiliasPessoas"
                        @click="listarFamilias"
                    />
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
                        v-model="Pessoas.codigoVendedor"
                        :options="listaVendedores"
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
                <q-input v-model="Pessoas.apelido" float-label="Apelido"/>

              </q-field>
            </div>    
            <div class="col">
              <q-field
                icon="date_range"
                >
                <q-datetime v-model="Pessoas.dataNasc"
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
                    <q-input v-model="Pessoas.limiteCredito" @blur="colapCred"  />

                </q-field>
            </div>
        </div>
          
        
      </q-collapsible>
        
      <!--OBS-->
      <q-collapsible :opened="open.obs" icon="message" label="Observações">
        <q-input 
                 float-label="Obs:" 
                 v-model="Pessoas.observacoes" 
                 type="textarea" 
                 />
      </q-collapsible>
      
        
    </q-list>
    
    <!--MODAL-->
    <q-modal ref="layoutModal" :content-css="{minWidth: '60vw', minHeight: '60vh'}">
      <q-modal-layout>
        <q-toolbar slot="header" color="black">
          <q-btn flat @click="$refs.layoutModal.close()">
            <q-icon name="keyboard_arrow_left" />
          </q-btn>
          <q-toolbar-title>
            Endereços Adicionais
          </q-toolbar-title>
        </q-toolbar>
        
        <div class="layout-padding">
        <div class="row">
            <div class="col-8 col-md-6">
              <q-field
                icon="markunread_mailbox"
                helper="Clique no botão ao lado para pesquisar o CEP"
                :error="$v.cep.$error"
                name="campoCEP"
              >
                <q-input float-label="CEP"
                         v-model.number="cep2"
                         type="number"
                         @blur="listarCidades"
                         clearable
                         @input="$v.cep.$touch()"
                         v-mask="['########']"
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
                 @click="buscarCepADD"
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
                <q-input v-model="endAdicional.Nome" float-label="Endereço"/>
              </q-field>   
            </div>
            <div class="col-lg-2 col-md-3 col-sm-12">
              <q-field
                icon="location_on"
              >
                <q-input v-model="endAdicional.Numero" type="number" float-label="Numero"/>
              </q-field>   
            </div>
        </div>
          
        <div class="row">
            <div class="col">
              <q-field
                icon="store"
              >
                <q-input v-model="endAdicional.PontoRef" type="textarea" float-label="Ponto de Referência"/>
              </q-field>   
            </div>

        </div>

        <div class="row">
            <div class="col">
              <q-field
                icon="streetview"
              >
                <q-input v-model="endAdicional.Bairro" float-label="Bairro"/>
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
                          @blur="listarCidades"
                          filter>
                </q-select>
              </q-field>   
            </div>

            <div class="col">
              <q-field 
                icon="location_city"
              >
                <q-select v-model="endAdicional.CodigoIBGECidade"
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
                    @click="adicionarEnd"  
                >
                   <q-icon name="add_location" />
                   salvar endereço
                </q-btn>
            </div>
        </div><br> 
            
            
        </div>
        
        
      </q-modal-layout>
    </q-modal>
    
    <!--MODAL de endereço adicional-->
    <!--<q-modal ref="enderecoModal" minimized :content-css="{padding: '10px'}">
      <div class="container">
        <h4>Endereço {{endItem.codigo}}</h4>
            <div style="font-size: 20px">
                <strong>Rua:</strong> {{endItem.nome}}
                <strong>,</strong> {{endItem.numero}}<br>
                <strong>Ponto de Referência:</strong><br>
                {{endItem.pontoRef}}<br>
                <strong>Bairro:</strong> {{endItem.bairro}}<br>
                <strong>CEP:</strong> {{endItem.cep}}<br><br>
            </div>
        <q-btn color="negative" @click="$refs.enderecoModal.close()">fechar</q-btn>
        
      </div>
    </q-modal>-->
    
</div>
    
</template>

<script>
import axios from 'axios'
import VMasker from 'vanilla-masker'
import { required, minLength, maxLength, email } from 'vuelidate/lib/validators'
import { Dialog, Toast, Loading } from 'quasar'

//dev
const API = 'http://192.168.0.200/WSV3/'

//debug
//const API = 'http://192.168.0.200:29755/'

export default {
  name: 'clientes',
  data () {
    return {
        estados: [],
        estadoNovo: [],
        enderecos: [],
        //cidadesJSON,
        cad: '',
        nome: '',
        sexo: '',
        Pessoas:{
            codigo: 0,
            codRegimeTribut : 1,
            codTipo : 1,
            codFamilia : 1,
            nome : '', //requerido
            apelido : '',
            contato : '',
            cpf : '', //requerido
            rg : '',
            cnpj : '',
            endereco : '',
            numero : '',
            bairro : '',
            cep : '',
            codigoIBGECidade : '', //not null
            codigoUF : 29,  //not null
            limiteCredito : 0.00, //not null
            telResid : '',
            telComercial : '',
            celular1 : '',
            celular2 : '',
            email : '',
            skype : '',
            site : '',
            codigoVendedor : 1, //not null
            observacoes : '',
            pj : false, //not null
            dataNasc : '',
            sexoFeminino : false,
            caminhoFoto : '',
            codPai : 0,
            pontoReferencia : '',
            nomePai : '',
            nomeMae : '',
            codigoUsuario : 1,
            excluido : false,
            venderCrediario : true
        },
        cpf: '',
        datanasc: '',
        fone: '',
        tipoContato: 1,
        tipoEmail: 1,
        email: '',
        cep: '',
        cep2: '',
        endAdicional:{
            CodPessoa: parseInt(localStorage.getItem('codPessoa')) , //not null
            Nome: '', //not null
            Numero: '', 
            PontoRef: '', 
            Bairro: '', 
            Cidade: '', //not null
            CodigoIBGECidade: 2930501, //not null
            UF: 'BA', //not null
            CodigoUF: 29, //not null
            Excluido: false, //not null
            CodTipo: 1, //not null
            CodigoUsuario: 1, //not null
            CEP: '',
            Codigo: 0,
        },
        cidade: '',
        cidade2: '',
        estado: 'BA',
        estado2: 'BA',
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
        endItem: {},
        foneADD: {
            Numero: '' ,
            CodTipo: 1 ,
            movel: false,
            codPessoa: 527
        },
        emailADD: {
            Endereco: '',
            CodTipo: 1,
            codPessoa: 527
        },
        select: '',
        check: '',
        listEndAdd: true,
        listTelAdd: true,
        listEmailAdd: true,
        familias: [],
        vendedores: [],
        vendedor: 1,
        limite: '0,00',
        cidades: [],
        canGoBack: window.history.length > 1,
        getCep: [],
        error: '',
        visivel: true,
        //datatime
        dias: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
        meses: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        //tabela
        misc: 'bordered', //[{value: 'bordered'},{value: 'highlight'}]
        separator: 'cell', // none, horizontal, vertical, cell
        stripe: 'odd', // none, odd, even
        type: 'none', // flipped, responsive
        gutter: 'none', // compact, loose
    }
  },
  computed: {
    // uma função "getter" computada (computed getter)
    computedClasses () {
      let classes = []
      if (this.misc.includes('bordered')) {
        classes.push('bordered')
      }
      if (this.misc.includes('highlight')) {
        classes.push('highlight')
      }
      if (this.separator !== 'none') {
        classes.push(this.separator + '-separator')
      }
      if (this.stripe !== 'none') {
        classes.push('striped-' + this.stripe)
      }
      if (this.type !== 'none') {
        classes.push(this.type)
      }
      if (this.gutter !== 'none') {
        classes.push(this.gutter)
      }
      return classes
    },
    listaEstados: function () {
      var a = this.estados
      var lista = []
      
      for (let i=0; i < a.length; i++) {
          let n = a[i].nome
          let u = a[i].uf
          let c = a[i].codUF
          lista.push({label: n, value: u, codigoUF: c})    
      }
      //console.log(lista)
      return lista
    },
    listaCidades: function () {
      var a = this.cidades
      var lista = []
      
      for (let i=0; i < a.length; i++) {
          let n = a[i].nome
          let c = a[i].codigoIBGE
          lista.push({label: n, value: c})    
      }
      //console.log(lista)
      return lista
    
    },
    listaFamiliasPessoas: function () {
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
    listaVendedores: function () {
      var a = this.vendedores
      var lista = []
      
      for (let i=0; i < a.length; i++) {
          let n = a[i].nome
          let c = a[i].codigoIdentificacao
          lista.push({label: n, value: c})    
      }
      //console.log(lista)
      return lista
    
    }
  },
  watch: {
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
      minLength: minLength(10)
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
          console.log(res.response)
          this.getCep = res.data
          this.estado = this.getCep.estado
          this.listarCidades()
          this.Pessoas.endereco = this.getCep.logradouro
          this.Pessoas.bairro = this.getCep.bairro
          this.Pessoas.cep = this.getCep.cep
          this.cidade = this.getCep.cidade
          this.Pessoas.codigoIBGECidade = parseInt(this.getCep.cidade_info.codigo_ibge)
          this.Pessoas.CodigoUF = parseInt(this.getCep.estado_info.codigo_ibge)
      })
      .catch((e)=>{
        this.error = e.response
        Dialog.create({
          title: 'CEP inexistente',
          message: this.error.statusText,
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
        console.log(e.response)
      })  
    },
    buscarCepADD(){
      axios.get('http://api.postmon.com.br/v1/cep/' + this.cep2)
      .then((res)=>{
          console.log(res.response)
          this.getCep = res.data
          this.estado = this.getCep.estado
          axios.get(API + 'cidade/obtercidades?uf=' + this.estado)
          .then((res)=>{
            this.cidades = res.data
            //console.log(res.data)
          })
          this.endAdicional.UF = this.getCep.estado
          this.endAdicional.Nome = this.getCep.logradouro
          this.endAdicional.Bairro = this.getCep.bairro
          this.endAdicional.CEP = this.getCep.cep
          this.endAdicional.Cidade = this.getCep.cidade
          this.endAdicional.CodigoIBGECidade = parseInt(this.getCep.cidade_info.codigo_ibge)
          this.endAdicional.CodigoUF = parseInt(this.getCep.estado_info.codigo_ibge)
      })
      .catch((e)=>{
        this.error = e.response
        Dialog.create({
          title: 'CEP inexistente',
          message: this.error.statusText,
          buttons: [
            {
              label: 'Ok',
              raised: true,
              color: 'info'
            }
          ]
        })
        this.cep = ''
        console.log(e.response)
      })  
    },
    goBack(){
      window.history.go(-1)
    },
    salvar(){
        //NOVO
        this.Pessoas.nome = this.nome
        this.Pessoas.sexoFeminino = (this.sexo === 'true')
        this.Pessoas.dataNasc = new Date(2000, 0, 1)
        
        if(this.cpf.length>11){
            this.Pessoas.cnpj = this.cpf
            this.Pessoas.cpf = this.cpf.substring(0, 10)
            
        }
        else{
            this.Pessoas.cpf = this.cpf
        }
        if(this.cpf==="" || this.cpf===null){
            this.Pessoas.cpf = 0
            
        }
        
        if(this.Pessoas.codigoIBGECidade === ''){
            this.Pessoas.codigoIBGECidade = 2930501
        }
        
        axios.post(API + 'pessoa/gravarPessoa', this.Pessoas)
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
        this.Pessoas.excluido = true
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
              handler: () => {
                this.salvar()
                this.listarPessoas()
                Toast.create('Excluído!')
                this.$router.push('clientes')
              }
            }
          ]
        })
    },
    //ENDEREÇOS
    adicionarEnd(){
        Loading.show({message: 'Aguarde...'})
        axios.post(API + 'pessoaEnd/gravarEndereco', this.endAdicional)
          .then((res)=>{
            Loading.hide()
            console.log(res)
            //console.log(res.response)
            //console.log(res.data)
            console.log('sucesso')
            //Toast.create('Returned ' + JSON.stringify(res.data))
            this.estado = 'BA'
            Toast.create.positive('Endereço cadastrado com sucesso')
            this.listarEnderecos()
            this.$refs.layoutModal.close()
            

          })
          .catch((e)=>{
            console.log('error')
            console.log(e)
            console.log(e.body)
            console.log(e.response)
          })
    },
    excluirEnd(item){
        let endEx = this.endAdicional
        endEx = item
        endEx.Nome = item.endereco
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
                return
              }
            },
            {
              label: 'Sim! Pode excluir',
              color: 'positive',
              raised: true,
              style: 'margin-top: 20px',
              handler(data) {
                let vm = this
                endEx.excluido = true
                data = endEx
                Loading.show({message: 'Excluindo...'})
                axios.post(API + 'pessoaEnd/gravarEndereco', data)
                  .then((res)=>{
                    Loading.hide()
                    console.log(res)
                    //console.log(res.response)
                    //console.log(res.data)
                    console.log('sucesso')
                    //Toast.create('Returned ' + JSON.stringify(item))
                    //this.estado = 'BA'
                    Toast.create('Excluido')
                    vm.listarEnderecos()

                  })
                  .catch((e)=>{
                    Toast.create('Returned ' + JSON.stringify(item))
                    console.log('error')
                    console.log(e)
                    console.log(e.response)
                    console.log(e.response.data)
                  })
              }
            }
          ]
        })
        
        
        
    },
    getEnd(item){
        this.endAdicional = item
    },
    editarEnd(item){
        this.cep2 = item.cep
        this.endAdicional.Nome = item.endereco
        this.endAdicional.Numero = item.numero
        this.endAdicional.PontoRef = item.pontoRef
        this.endAdicional.Bairro = item.bairro
        this.estado = item.uf
        this.endAdicional.codigoIBGECidade = item.codigoIBGECidade
        this.endAdicional.codigo = item.codigo
    },
    limparEnd(){
        this.cep2 = ''
        this.endAdicional.Nome = ''
        this.endAdicional.Numero = ''
        this.endAdicional.PontoRef = ''
        this.endAdicional.Bairro = ''
        this.estado = 'BA'
        this.endAdicional.codigo = 0
        this.endAdicional.excluido = false
    },
    adicionarTel(){
        this.foneADD.Numero = this.fone
        axios.post(API + 'pessoaTelefone/gravarPessoaTelefone', this.foneADD)
          .then((res)=>{
            //console.log(res)
            console.log(res.data)
            console.log(res.response)
            //console.log(res.data)
            console.log('sucesso')
            //Toast.create('Returned ' + JSON.stringify(data))
            Toast.create.positive('cadastrado com sucesso')

          })
          .catch((e)=>{
            console.log('error')
            console.log(e)
            console.log(e.body)
            console.log(e.response)
          })
    },
    adicionarEmail(){
        this.emailADD.Endereco = this.email
        axios.post(API + 'pessoaEnd/gravarPessoaEndEletronico', this.emailADD)
          .then((res)=>{
            //console.log(res)
            console.log(res.data)
            console.log(res.response)
            //console.log(res.data)
            console.log('sucesso')
            //Toast.create('Returned ' + JSON.stringify(data))
            Toast.create.positive('cadastrado com sucesso')

          })
          .catch((e)=>{
            console.log('error')
            console.log(e)
            console.log(e.body)
            console.log(e.response)
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
      })
      .catch((e)=>{
        console.log(e)
      })
    },
    listarVendedores(){
      axios.get(API + 'usuario/obterUsuario')
      .then((res)=>{
        this.vendedores = res.data
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
      axios.get(API + 'cidade/obterufs?uf=' + this.estado)
      .then((res)=>{
        this.estadoNovo = res.data
        this.Pessoas.CodigoUF = parseInt(this.estadoNovo[0].codUF)
        //console.log(res.data)
      })
    
    },
    listarEnderecos(){
      let c = parseInt(localStorage.getItem('codPessoa'))
      if(isNaN(c)){
        return 
      }
        
      axios.get(API + 'pessoaEnd/obterEnderecos?CodPessoa=' + c)
      .then((res)=>{
        this.enderecos = res.data
        //console.log(res.data)
      })
      .catch((e)=>{
        this.enderecos = e.response
        //console.log(res.data)
      })
      
    },
    listarPessoas(){
      if (localStorage.getItem('cadMode')==='edit'){
          Loading.show({message: 'Aguardando Dados...'})
          axios.get(API + 'pessoa/obterpessoa?codClientePK=' + localStorage.getItem('codPessoa'))
          .then((res)=>{
              Loading.hide()
              //console.log(res.data)
              this.Pessoas = res.data
              this.nome = this.Pessoas.nome
              if(this.Pessoas.cnpj!==""){
                this.cpf = this.Pessoas.cnpj
              }
              else {
                this.cpf = this.Pessoas.cpf
              }
              if(this.Pessoas.cnpj===null){
                this.cpf = this.Pessoas.cpf
              }
              else {
                this.cpf = this.Pessoas.cpf
              }
              this.cep = this.Pessoas.cep
              if(this.Pessoas.sexoFeminino!==null){
                this.sexo = this.Pessoas.sexoFeminino.toString()
              }
              
          })
          .catch((e)=>{
            console.log(e)
          })
      }
    },
    testarConexao(){
      axios.get('https://httpbin.org/get')
      .then((res)=>{
        console.log('Conexão com a web realizada com sucesso')
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
    t.listarVendedores()
    t.listarEnderecos()
    t.listarPessoas()
    t.testarConexao()
    if (localStorage.getItem('cadMode')==='save'){
        this.visivel = false
    }
      
  }
 
}
</script>

<style scoped>

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
    
    .btn-plus {
        margin-top: 20px;
    }
    
    #fone {
        margin-top: 12px
    }
    
    #email {
        margin-top: 10px
    }
    
    #cod {
        text-align: right;
    }
    
    #genero {
        text-align: center;
        margin-top: 15px;
    }
    
    
</style>