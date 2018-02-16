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
        style="margin-left: 5px"
        v-if="btnDelete"
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
            <h5>Cadastro de Usuário</h5>
        </div>
    </div>
    
    <q-tabs color="tertiary" align="justify" style="background-color: white">
        <q-tab default name="dados" slot="title" icon="person" label="Dados Usuário" />
        <q-tab name="permissions" slot="title" icon="vpn_key" label="Permissões" />

        <q-tab-pane name="dados">
            <div class="row">
                <div class="col-md-6">
                  <q-field
                    icon="person"
                  >
                    <q-input v-model.trim="nome" 
                             float-label="Nome" 
                             clearable
                             @input="$v.nome.$touch()"
                             :error="$v.nome.$error"
                    />

                     <span style="color:#8F8F8F" v-if="!$v.nome.required">Nome é requerido</span>
                     <span v-if="!$v.nome.minLength">Este campo deve conter mais que {{$v.nome.$params.minLength.min}} caracteres.</span>

                  </q-field>   
                </div>
                <div class="offset-md-1"></div>
                <div class="col">
                  <q-field
                    icon="verified_user"
                    helper="Se não preencher, será gerado aleatoriamente"
                  >
                    <q-input v-model.number="usuario.codigoIdentificacao" 
                             float-label="Codigo de Identificação" 
                             clearable
                    />

                     

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
                             @input="$v.senha.$touch()"
                             :error="$v.senha.$error"
                    />
                    <span style="color:#8F8F8F" v-if="!$v.nome.required">A senha é de preenchimento obrigatório</span>
                  </q-field>   
                </div>
                <div class="offset-md-1"></div>
                <div class="col">
                    <q-field
                     icon="build"
                             >
                        <q-select
                            float-label="Função"
                            v-model="usuario.codigoFuncao"
                            :options="[
                                {
                                  label: 'Admin',
                                  value: 1
                                },
                                {
                                  label: 'Caixa',
                                  value: 2
                                },
                                {
                                  label: 'Vendedor',
                                  value: 3
                                },
                            ]"
                        />
                    </q-field>
                </div>

            </div>

            <div class="row">
                <div class="col-md-5">
                  <q-field
                    icon="monetization_on"
                  >
                    <q-input float-label="Desconto Máx."
                             v-model.trim="desc"
                             type="number"
                             suffix="%"
                             @blur="$v.desc.$touch()"
                             :error="$v.desc.$error"

                    />
                    <span class="form-group__message" v-if="!$v.desc.between">O desconto deve ser entre {{$v.desc.$params.between.min}} e {{$v.desc.$params.between.max}}</span>
                  </q-field>
                    
                </div>
                <div class="offset-md-2"></div>
                <div class="col">
                  <q-field
                    icon="monetization_on"
                  >
                    <q-input float-label="Comissão"
                             v-model.number="usuario.comissao"
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
                            v-model="usuario.codigoEmpresa"
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
                            v-model="usuario.codPessoa"
                            :options="listaPessoas"
                            filter
                        />
                    </q-field>
                </div>

            </div>
    
        </q-tab-pane>
        
        <q-tab-pane name="permissions">
            <center>{{usuario.nome}}</center> 
            
            <div class="row">
                <div class="col-md-6">
                    <q-card>
                      <q-card-title>
                        PDV
                      </q-card-title>
                      <q-card-separator />
                      <q-card-main class="permissions">
                        <q-checkbox class="checkbox" v-model="usuario.bloqueiaCancelaProd" label="Bloquear cancelamento de item na venda" /><br>
                        <q-checkbox class="checkbox" v-model="usuario.verQuantiaCaixa" label="Permitir ver saldo no caixa" /><br>
                        <q-checkbox class="checkbox" v-model="usuario.devolverProduto" label="Permitir nota de devolução" /><br>
                        <q-checkbox class="checkbox" v-model="usuario.pdV_PermitirOutrasSaidas" label="Permitir outras saídas" /><br>
                        <q-checkbox class="checkbox" v-model="usuario.pdV_CriarOrcamento" label="Permitir orçamento" /><br>
                        <q-checkbox class="checkbox" v-model="usuario.pdV_CancelarPedido" label="Permitir cancelamento de nota/pedido" /><br>
                        <q-checkbox class="checkbox" v-model="usuario.pdV_ModificarDescontoSistema" label="Alterar desconto dado pelo sistema" /><br>
                      </q-card-main>
                    </q-card>   
                </div>
            
                <div class="col">
                    <q-card>
                      <q-card-title>
                        Retaguarda
                      </q-card-title>
                      <q-card-separator />
                      <q-card-main class="permissions">
                        <q-checkbox class="checkbox" v-model="usuario.cadUsuario" label="Permitir cadastro de usuários" /><br>
                        <q-checkbox class="checkbox" v-model="usuario.movimentaEstoqueES" label="Permitir movimentar estoque" /><br>
                        <q-checkbox class="checkbox" v-model="usuario.ret_AlteraTabPreco" label="Permitir alterar tabela de preços" /><br>
                        <q-checkbox class="checkbox" v-model="usuario.pdV_PermitirTransfProduto" label="Permitir transferência de produtos" /><br>
                        <q-checkbox class="checkbox" v-model="usuario.ret_VerCusto" label="Permitir visualizar custo do produto" /><br>
                        <q-checkbox class="checkbox" v-model="usuario.acessaFinanceiro" label="Permitir visualizar financeiro" /><br>
                        <q-checkbox class="checkbox" v-model="usuario.alteraProduto" label="Permitir alterar produto" /><br>
                      </q-card-main>
                    </q-card>   
                </div>
            </div>
        </q-tab-pane>
    </q-tabs>
    
    
    
</div>
    
</template>

<script>
import axios from 'axios'
import VMasker from 'vanilla-masker'
import { required, between, minLength, maxLength, email } from 'vuelidate/lib/validators'
import { Dialog, Toast, Loading } from 'quasar'
import { FulfillingBouncingCircleSpinner } from 'epic-spinners'
    
//dev
const API = localStorage.getItem('wsAtual')

//debug
//const API = 'http://192.168.0.200:29755/'

export default {
  name: 'cadUsuario',
  data () {
    return {
        usuario: {
            "codigoIdentificacao": '',
            "nome": '',
            "codPessoa": 3,
            "senha": '',
            "descontoMax": 0.00,
            "comissao": 0.00,
            "cadUsuario": false,
            "bloqueiaCancelaProd": false,
            "codigoFuncao": 2,
            "codigoEmpresa": 1,
            "movimentaEstoqueES": false,
            "verQuantiaCaixa": false,
            "devolverProduto": false,
            "pdV_EstornarRecbto": false,
            "pdV_CancelarPedido": false,
            "pdV_PermitirOutrasSaidas": false,
            "pdV_ModificarDescontoSistema": false,
            "pdV_PermitirTransfProduto": false,
            "pdV_CriarOrcamento": false,
            "ret_VerCusto": false,
            "ret_AlteraTabPreco": false,
            "codigoUsuario": parseInt(localStorage.getItem('codUser')),
            "acessaFinanceiro": false,
            "alteraProduto": false
        },
        nome: '',
        senha: '',
        desc: 0,
        canGoBack: window.history.length > 1,
        error: '',
        visivel: false,
        btnDelete: false,
        vendedor: '',
        pessoas: [],
        usuarios: []
    }
  },
    
  computed: {
    listaPessoas: function () {
      var a = this.pessoas
      var lista = []
      
      for(let i=0; i<a.length; i++){
        if(a[i].codTipo === 4){
            let l = a[i].nome
            let v = a[i].codigo
            lista.push({
                label: l,
                value: v
            })
        }
      }
      
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
  },
  validations: {
    nome: {
      required,
      minLength: minLength(3)
    },
    senha: {
      required,
    },
    desc: {
      between: between(0, 99)  
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
    salvar(){
        this.usuario.nome = this.nome
        this.usuario.senha = this.senha
      
        Loading.show({
          spinner: FulfillingBouncingCircleSpinner,
          spinnerSize: 140,
          message: 'Enviando Dados...'
        })
        axios.post(API + 'usuario/gravarUsuario', this.usuario)
          .then((res)=>{
            Loading.hide()
            Toast.create.positive({
                html: 'Sucesso',
                icon: 'done'
            })
            //console.log(res)
            console.log(res.data)
            console.log(res.response)
            console.log('sucesso')
            this.$router.push('usuarios')
          })
          .catch((e)=>{
            Loading.hide()
            //console.log('error')
            console.log(e)
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
              handler: () => {
                Loading.show({
                  spinner: FulfillingBouncingCircleSpinner,
                  spinnerSize: 140,
                  message: 'Excluindo Usuário...'
                })
                axios.post(API + 'usuario/excluirUsuario?codUsuario=' + this.usuario.codigo)
                  .then((res)=>{
                      //console.log(res)
                      Toast.create('Usuário ' + this.usuario.nome + ' foi excluido com sucesso')
                      Loading.hide()
                      this.$router.push('usuarios')
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
    listarPessoas(){
      Loading.show({
          spinner: FulfillingBouncingCircleSpinner,
          spinnerSize: 140,
          message: 'Aguardando Dados...'
      })
      axios.get(API + 'pessoa/obterpessoa?todos=true')
      .then((res)=>{
          //console.log(res.data)
          this.pessoas = res.data
          Loading.hide()
      })
      .catch((e)=>{
        console.log(e)
        Loading.hide()
      })  
    },
    listarUsuarios(){
      Loading.show({
          spinner: FulfillingBouncingCircleSpinner,
          spinnerSize: 140,
          message: 'Aguardando Dados...'
      })
      axios.get(API + 'usuario/obterUsuario')
      .then((res)=>{
          //console.log(res)
          this.usuarios = res.data
          Loading.hide()
      })
      .catch((e)=>{
        console.log(e)
      })  
    },
    editarUsuario(){
      if (localStorage.getItem('cadMode')==='edit'){
          Loading.show({
              spinner: FulfillingBouncingCircleSpinner,
              spinnerSize: 140,
              message: 'Editando Usuário...'
          })
          axios.get(API + 'usuario/obterUsuario?codidentificacao=' + localStorage.getItem('codUsuario'))
          .then((res)=>{
              Loading.hide()
              console.log(res.data)
              this.usuario = res.data
              this.nome = this.usuario.nome
              this.senha = this.usuario.senha
          })
          .catch((e)=>{
            console.log(e)
          })
      }
    },
  },
  created (){
    let t = this
    if(localStorage.getItem('cadMode')==='edit'){
        t.editarUsuario()
        t.btnDelete = true
    }
    else {
        t.listarUsuarios()
    }
    t.listarPessoas()
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
    
    .permissions {
        font-size: 18px;
    }
    
    .checkbox {
        margin: 15px 0;
    }
    
</style>