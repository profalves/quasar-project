<template>
<div id="cadUsuario">
    
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
            <h5>Cadastro de Usuário</h5>
        </div>
    </div>
    
    <q-tabs color="tertiary" align="justify">
        <q-tab default name="dados" slot="title" icon="person" label="Dados Usuário" />
        <q-tab name="permissions" slot="title" icon="vpn_key" label="Permissões" />

        <q-tab-pane name="dados">
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
                <div class="col-md-6">
                  <q-field
                    icon="vpn_key"
                  >
                    <q-input v-model.trim="senha"
                             type="password"
                             float-label="Senha" 
                             clearable         
                    /> 
                  </q-field>   
                </div>
                <div class="col">
                    <q-field
                     icon="build"
                             >
                        <q-select
                            float-label="Função"
                            v-model="vendedor"
                            :options="[
                                {
                                  label: 'Admin',
                                  value: 1
                                }
                            ]"
                        />
                    </q-field>
                </div>

            </div>

            <div class="row">
                <div class="col-md-6">
                  <q-field
                    icon="monetization_on"
                  >
                    <q-input float-label="Desconto Máx."
                             v-model.number="cpf"
                             type="number"
                             suffix="%"

                             />
                  </q-field>   
                </div>
                <div class="col">
                  <q-field
                    icon="monetization_on"
                  >
                    <q-input float-label="Comissão"
                             v-model.number="cpf"
                             type="number"
                             suffix="%"

                             />
                  </q-field>   
                </div>    
            </div>

            <div class="row">
                <div class="col-xs-12 col-md-6">
                    <q-field>
                        <q-select
                            float-label="Empresa"
                            v-model="vendedor"
                            :options="[
                                {
                                  label: '7Virtual',
                                  value: 1
                                }
                            ]"
                        />
                    </q-field>
                </div>
                <div class="col">
                    <q-field>
                        <q-select
                            float-label="Empregado"
                            v-model="vendedor"
                            :options="[
                                {
                                  label: 'Não Identificado',
                                  value: 1
                                }
                            ]"
                        />
                    </q-field>
                </div>

            </div>
    
        </q-tab-pane>
        
        <q-tab-pane name="permissions">
            <div class="row">
                <div class="col-md-6">
                    <q-card>
                      <q-card-title>
                        PDV
                      </q-card-title>
                      <q-card-separator />
                      <q-card-main>
                        <q-checkbox v-model="PDV.check1" label="Bloquear cancelamento de item na venda" /><br>
                        <q-checkbox v-model="checked" label="Permitir ver saldo no caixa" /><br>
                        <q-checkbox v-model="checked" label="Permitir nota de devolução" /><br>
                        <q-checkbox v-model="checked" label="Permitir outras saídas" /><br>
                        <q-checkbox v-model="checked" label="Permitir orçamento" /><br>
                        <q-checkbox v-model="checked" label="Permitir cancelamento de nota/pedido" /><br>
                        <q-checkbox v-model="checked" label="Alterar desconto dado pelo sistema" /><br>
                      </q-card-main>
                    </q-card>   
                </div>
            
                <div class="col">
                    <q-card>
                      <q-card-title>
                        Retaguarda
                      </q-card-title>
                      <q-card-separator />
                      <q-card-main>
                        <q-checkbox v-model="RET.check1" label="Permitir cadastro de usuários" /><br>
                        <q-checkbox v-model="checked" label="Permitir movimentar estoque" /><br>
                        <q-checkbox v-model="checked" label="Permitir alterar tabela de preços" /><br>
                        <q-checkbox v-model="checked" label="Permitir transferência de produtos" /><br>
                        <q-checkbox v-model="checked" label="Permitir visualizar custo do produto" /><br>
                        <q-checkbox v-model="checked" label="Permitir visualizar financeiro" /><br>
                        <q-checkbox v-model="checked" label="Permitir alterar produto" /><br>
                      </q-card-main>
                    </q-card>   
                </div>
            </div>
        </q-tab-pane>
    </q-tabs>
    
    
        
    
    
</div>
    
</template>

<script>
//import axios from 'axios'
import VMasker from 'vanilla-masker'
import estados from 'data/estados.json'
import cidadesJSON from 'data/estados-cidades.json'
import { required, minLength, maxLength, email } from 'vuelidate/lib/validators'
import { Dialog, Toast } from 'quasar'

export default {
  name: 'cadUsuario',
  data () {
    return {
        estados,
        cidadesJSON,
        nome: '',
        senha: '',
        cpf: '',
        obs: '',
        checked: false,
        tipoPessoa: 'f',
        tipo: 'c',
        PDV: {
          check1: false,
          check2: true,
          check3: true,
          check4: true,
          check5: false, 
          check6: false, 
          check7: false, 
            
        },
        RET: {
          check1: false,
          check2: true,
          check3: true,
          check4: true,
          check5: false, 
          check6: false, 
          check7: false,  
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
        margin: 50px 0 0 10px;
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