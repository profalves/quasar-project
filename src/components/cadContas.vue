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
        style="margin-left:5px;"
        v-if="btnDelete"
      >
        <i class="material-icons">delete</i>
      </q-btn>
      
      <q-btn
        color="positive"
        push big
        @click="salvar"
        style="margin-left:5px;"
      >
        <i class="material-icons">done</i>
    </q-btn>
      
    </div>
    
    <!-- formulário -->
    <div class="row">
        <div class="col">
            <h5>Lançamentos Financeiros</h5>
        </div>
    </div>
    
    
    <div class="row">
        <div class="col-xs-12 col-md-6">
            <q-field
                icon="account_balance_wallet"
             >
                <q-select
                    float-label="Tipo"
                    v-model="conta.tipo"
                    :options="tipos"
                />
            </q-field>   
        </div>
        <div class="col">
            <q-field
                icon="store"
             >
                <q-select
                    float-label="Fornecedor"
                    filter
                    v-model="conta.codFornecedor"
                    :options="listaFornecedores"
                    @change="cadFornecedor"
                />
            </q-field>   
        </div>
        <!--<div class="col-2 btn-plus" >
            
            <q-btn 
               rounded
               color="primary" 
               @click="cadFornecedor">
               <q-icon name="add" />
            </q-btn>
        </div>-->
    </div> 
    
    <!--<div class="row">
        <div class="col">
          <q-field
            icon="feedback"
          >
            <q-input v-model.trim="desc" 
                     float-label="Descrição" 
                     clearable
            />
            
          </q-field>
        
        </div>
    </div> -->
    
    <div class="row">
        <div class="col-10 col-md-6">
            <q-field
                icon="group_work"
             >
                <q-select
                    float-label="Tipo Conta"
                    filter
                    v-model="conta.codTipo"
                    :options="listaCategorias"
                    @change="selectTipo"
                />
            </q-field>
            
        </div>
        <!--<div class="col-2 btn-plus" >
            <q-btn 
               rounded
               color="primary" 
               @click="novoTipo">
               <q-icon name="add" />
            </q-btn>
            
            
        </div>-->
        <div class="col-10 col-md-6">
            <q-field
                icon="group_work"
             >
                <q-select
                    float-label="SubCategoria"
                    filter
                    v-model="conta.codSubTipoDespesa"
                    :options="listaSubCategorias"
                    @change="novoSubTipo"
                />
            </q-field>   
        </div>
        <!--<div class="col-2 btn-plus" >
            <q-btn 
               rounded
               color="primary" 
               @click="novoSubTipo">
               <q-icon name="add" />
            </q-btn>    
        </div>-->
    </div>
    
    <div class="row">
        <div class="col">
            <q-field
                icon="local_grocery_store"
             >
                <q-select
                    float-label="Forma de Pagamento"
                    v-model="conta.formaPgto"
                    :options="listaFormas"
                />
            </q-field>   
        </div>
    </div>
    
    <div class="row">
        <div class="col">
          <q-field
            icon="assignment_turned_in"
          >
            <q-input v-model.number="conta.numeroDocumento"
                     float-label="n. Documento" 
                     clearable
            />
            
          </q-field>   
        </div>
        <!--<div class="col-md-2 col-xs-12">
            <q-checkbox v-model="checked" 
                        label="Despesa Fixa"
                        style="margin-top:20px;"
            />
        </div>-->
    </div>
    
    
    <div class="row">
        <div class="col">
            <q-field
                icon="date_range"
                >
                <q-datetime v-model="conta.vencimento"
                            type="date" 
                            float-label="Vencimento" 
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
        <div class="col-xs-5 offset-md-1 offset-lg-2">
            <q-field
                helper="Valor Parcela"
                >
                <money v-model="conta.valorTitulo"
                       v-bind="money"
                       class="mdInput"
                       style="margin-top:12px"
                />
            </q-field> 
        </div>
    </div>
        
    <div class="row" v-if="geraParcela">
        <div class="col">
            <q-field
                label="Qtd. de Títulos"
                >
                <q-input v-model.number="qtdParcelas"
                         type="number"
                />

            </q-field>  
        </div>
        <div class="col">
            <q-field
                label="Intervalo dias"
                >
                <q-input v-model.number="intervalo"
                         type="number"
                />

            </q-field> 
        </div>
    </div>
    
    <q-list class="row" id="baixa" round-borders>
        <div class="col">
            <q-field
                icon="date_range"
                >
                <q-datetime v-model="conta.pagamento"
                            type="date" 
                            float-label="Pagamento" 
                            color="black"
                            format="DD/MM/YYYY"
                            ok-label="OK" 
                            clear-label="Limpar" 
                            cancel-label="Cancelar"
                            :day-names="dias"
                            :month-names="meses"
                            :disable="disable"
                            @change="conta.valorPago = conta.valorTitulo"
                            
                />

            </q-field>  
        </div>
        <div class="col">
            <q-field
                helper="Valor Pago"
                >
                <money v-model="conta.valorPago"
                       v-bind="money"
                       class="mdInput"
                       style="margin-top:12px"
                       :disabled="disable"
                />
            </q-field> 
        </div>
        <div class="col" v-if="visivel" style="text-align: center;">
            <q-btn color="primary" 
                   style="margin-top:15px;" 
                   @click="baixar"
                   >Baixar Título
            </q-btn>
        </div>
        <div v-else id="baixado">
            Título Baixado
        </div>
    </q-list>
    
    
    <!--<div class="row">
        <div class="col">
            <q-field
                icon="store"
             >
                <q-select
                    float-label="Tipo de Documento"
                    v-model="tipoDoc"
                    :options="tipoDocumento"
                />
            </q-field>   
        </div>
        <div class="col-2 btn-plus" >
            
            <q-btn 
               rounded
               color="primary" 
               @click="$router.push('/cadcliente')">
               <q-icon name="add" />
            </q-btn>
        </div>
    </div>-->
    <!--
    <q-collapsible icon="monetization_on" 
                   label="Títulos" 
                   style="background-color:white;
                          margin-top:30px;"
                   :opened="open"
                   >
        Data tables HTML
        <h6 style="margin-top:30px">Parcelas</h6>
        <div class="row" id="table">
            <table style="margin-top: 30px;" class="q-table" :class="computedClasses">
              <thead>
                <tr>
                  <th class="text-left">Vencimento</th>
                  <th class="text-right">Valor Total</th>
                  <th class="text-left">Data Pagto</th>
                  <th class="text-right">Valor Pago</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="text-left">01/01/2018</td>
                  <td class="text-right">$10.11</td>
                  <td class="text-left">01/01/2018</td>
                  <td class="text-right">$10.11</td>
                  <td class="text-center">
                    <q-btn round outline small color="warning" icon="edit"></q-btn>    
                  </td>
                  <td class="text-center">
                    <q-btn round outline small color="negative" icon="delete_forever"></q-btn>  
                  </td>
                </tr>
                <tr>
                  <td class="text-left">01/01/2018</td>
                  <td class="text-right">$10.11</td>
                  <td class="text-left">01/01/2018</td>
                  <td class="text-right">$10.11</td>
                  <td class="text-center">
                    <q-btn round outline small color="warning" icon="edit"></q-btn>    
                  </td>
                  <td class="text-center">
                    <q-btn round outline small color="negative" icon="delete_forever"></q-btn>  
                  </td>
                </tr>
                <tr>
                  <td class="text-left">01/01/2018</td>
                  <td class="text-right">$10.11</td>
                  <td class="text-left">01/01/2018</td>
                  <td class="text-right">$10.11</td>
                  <td class="text-center">
                    <q-btn round outline small color="warning" icon="edit"></q-btn>    
                  </td>
                  <td class="text-center">
                    <q-btn round outline small color="negative" icon="delete_forever"></q-btn>  
                  </td>
                </tr>
              </tbody>
            </table>  

        </div>
    </q-collapsible>-->
    
</div>
    
</template>

<script>
import axios from 'axios'
//import VMasker from 'vanilla-masker'
import { required, minLength } from 'vuelidate/lib/validators'
import { Dialog, Toast, Loading } from 'quasar'

//dev
const API = localStorage.getItem('wsAtual')

//debug
//const API = 'http://192.168.0.200:29755/'
    
export default {
  name: 'contas',
  data () {
    return {
        tipos: [
            {
              label: 'Despesa',
              value: 'CP'
            },
            {
              label: 'Receita',
              value: 'CR'
            }
        ],
        fornecedores: [],
        conta: {
            codFornecedor: '', //não nulo
            codTipo: 1, //não nulo
            codSubTipoDespesa: 1, //não nulo
            tipo: 'CP', 
            pagtoTitulo: 0,
            codigoCab: 0,
            codigoVZC: 0,
            contaFixa: false,
            formaPgto: 1,
            numeroDocumento: '',
            vencimento: '', //não nulo
            pagamento: '',
            valorTitulo: '',
            valorPago: '',
            valorDesc: '',
            valorJuros: '',
            codigoUsuario: parseInt(localStorage.getItem('codUser')), //não nulo    
        },
        qtdParcelas: 1,
        intervalo: 30,
        cat: [],
        sub: [],
        formas: [],
        doc: '',
        tipoDoc: '',
        vencimento: '',
        valor: '',
        select: '',
        checked: false,
        open: false,
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
        formasPagto: [
            {
              label: 'Cartão',
              value: 'cartao'
            },
            {
              label: 'Cheque a Vista',
              value: 'chVista'
            },
            {
              label: 'Cheque a Prazo',
              value: 'chPrazo'
            },
            {
              label: 'Duplicata em Carteira',
              value: 'dupCarteira'
            },
            {
              label: 'Duplicata em Banco',
              value: 'dupBanco'
            },
            {
              label: 'Espécie',
              value: 'dinheiro'
            },
            {
              label: 'Outro',
              value: 'outri'
            }
        ],
        tipoDocumento: [
            {
              label: 'Fatura',
              value: 'fatura'
            },
            {
              label: 'Nota Fiscal',
              value: 'nota'
            },
            {
              label: 'Boleto',
              value: 'boleto'
            },
            {
              label: 'Recibo',
              value: 'recibo'
            }
        ],
        geraParcela: true,
        visivel: true,
        btnDelete: false,
        
        
        //v-money
        money: {
            decimal: ',',
            thousands: '.',
            prefix: 'R$ ',
            //suffix: ' #',
            precision: 2,
            masked: false /* doesn't work with directive */
        },
        
        //datatime
        dias: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
        meses: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        
        //table
        styles: [
            '',
            'bordered',
            'horizontal-separator',
            'vertical-separator',
            'cell-separator',
            'striped-odd',
            'striped-even',
            'highlight',
            'compact',
            'loose',
            'flipped'
        ],
        misc: [],
        separator: 'cell', //none, horizontal, vertical, cell
        stripe: 'odd', //none, odd, even
        type: 'none', //none, flipped, responsive
        gutter: 'none', //none, compact, loose
        disable: false,
        
        // btn Voltar
        canGoBack: window.history.length > 1,
    }
  },
  
  computed: {
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
    listaFornecedores: function () {
      var a = this.fornecedores
      var lista = []
      
      for (let i=0; i < a.length; i++) {
          if(a[i].codTipo === 2){
              let n = a[i].nome
              let c = a[i].codigo
              lista.push({label: n, value: c})  
          }  
      }
      
      lista.unshift({
          label: 'NOVO...', 
          value: 0
      })
      
      return lista
    
    }, 
    listaCategorias: function () {
      var a = this.cat
      var lista = []
      
      lista = a.map(row => ({
          label: row.nome, 
          value: row.codigo
      }))
        
      lista.unshift({
          label: 'NOVO...', 
          value: 0
      })
      
      return lista
    
    }, 
    listaSubCategorias: function () {
      var a = this.sub
      var lista = []
      
      lista = a.map(row => ({
          label: row.nome, 
          value: row.codigo
      }))
        
      lista.unshift({
          label: 'NOVO...', 
          value: 0
      })
        
      return lista
    
    }, 
    listaFormas: function () {
      var a = this.formas
      var lista = []
      
      lista = a.map(row => ({
          label: row.nome, 
          value: row.codigo
      }))
      
      return lista
    
    },
    /*disable: function (){
      if(this.conta.valorPago>0){
        return true
      }
      else {
       return false
      }
    }*/
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
    salvar(){
        Loading.show({message: 'Enviando Dados...'})
        axios.post(API + 'conta/gravarConta', [this.conta, this.qtdParcelas, this.intervalo])
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
            this.$router.push('contas')
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
    baixar(){
      Loading.show({message: 'Enviando Dados...'})
      axios.post(API + 'conta/pagarContas', [this.conta])
        .then((res)=>{
          Loading.hide()
          Toast.create.positive({
              html: 'Titulo baixado com sucesso',
              icon: 'done'
          })
          //console.log(res)
          console.log(res.data)
          console.log(res.response)
          console.log('sucesso')
          this.listarContas()
          //this.$router.push('contas')
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
                Loading.show({message: 'Aguardando Dados...'})
                axios.post(API + 'conta/excluirConta?codigo=' + this.conta.codigo)
                  .then((res)=>{
                      //console.log(res)
                      Toast.create('Parcela foi excluida com sucesso')
                      Loading.hide()
                      this.$router.push('contas')
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
    listarContas(){
      Loading.show({message: 'Aguardando Dados...'})
      axios.get(API + 'conta/obterContas?codigo=' + parseInt(localStorage.getItem('codConta')))
      .then((res)=>{
          console.log('Conta:', res)
          this.conta = res.data
          this.geraParcela = false
          if(this.conta.valorPago>0) {
              this.visivel = false
              this.disable = true
          }
          Loading.hide()
      })
      .catch((e)=>{
        console.log(e)
      })  
    },
    listarPessoas(){
      Loading.show({message: 'Aguardando Dados...'})
      axios.get(API + 'pessoa/obterpessoa?codtipo=2')
      .then((res)=>{
          //console.log(res.data)
          this.fornecedores = res.data
          Loading.hide()
      })
      .catch((e)=>{
        console.log(e)
        Loading.hide()
      })  
    },
    cadFornecedor(){
        if(this.conta.codFornecedor !== 0){
            return;
        }
        localStorage.setItem('cadMode', 'save')
        localStorage.setItem('tela', 'fornContas')
        this.$router.push('/cadcliente')
    },
    listarTipos(){
      Loading.show({message: 'Aguardando Dados...'})
      axios.get(API + 'conta/obterContasTipo')
      .then((res)=>{
          //console.log(res.data)
          this.cat = res.data
          Loading.hide()
      })
      .catch((e)=>{
        console.log(e)
        Loading.hide()
      })  
    },
    novoTipo(){
        if(this.conta.codTipo !== 0){
            return;
        }
        Dialog.create({
          title: 'Novo Tipo de Conta',
          message: 'Digite o nome da novo tipo e clique em ok.',
          form: {
            nome: {
              type: 'text',
              label: 'Nome',
              model: ''
            }
          },
          buttons: [
            'Cancel',
            {
              label: 'Ok',
              handler: (data) => {
                //console.log(data)
                if(data.nome === null || data.nome === ''){
                    Toast.create.negative('O tipo não pode ser cadastrado com nome nulo') 
                    return
                }
                axios.post(API + 'conta/gravarContaTipo', data)
                  .then((res)=>{
                    //console.log(res)
                    //console.log(res.data)
                    console.log('sucesso')
                    //Toast.create('Returned ' + JSON.stringify(data))
                    Toast.create.positive('Tipo ' + JSON.stringify(data.nome) + ' cadastrado com sucesso')
                    this.listarTipos()
                  })
                  .catch((e)=>{
                    console.log('error')
                    console.log(e)
                  })
                
              }
            }
          ]
        })
        this.conta.codTipo = ''
    
    },
    selectTipo(){
        this.listarSubtipos()
        this.novoTipo()
    },
    listarSubtipos(){
      Loading.show({message: 'Aguardando Dados...'})
      axios.get(API + 'conta/obterContasSubTipo?codTipo=' + this.conta.codTipo)
      .then((res)=>{
          //console.log(res.data)
          this.sub = res.data
          Loading.hide()
      })
      .catch((e)=>{
        console.log(e)
        Loading.hide()
      })  
    },
    novoSubTipo(){
        if(this.conta.codSubTipoDespesa !== 0){
            return;
        }
        Dialog.create({
          title: 'Novo Subtipo de Conta',
          message: 'Certifique-se que o Tipo já esteja selecionado para criar um subtipo para o mesmo, digite o nome do subtipo e depois clique em ok',
          form: {
            nome: {
              type: 'text',
              label: 'Nome',
              model: ''
            },
            codTipo: {
              model: this.conta.codTipo
            }
          },
          buttons: [
            'Cancel',
            {
              label: 'Ok',
              handler: (data) => {
                //console.log(data)
                if(data.nome === null || data.nome === ''){
                    Toast.create.negative('O subtipo não pode ser cadastrado com nome nulo') 
                    return
                }
                axios.post(API + 'conta/gravarContaSubTipo', data)
                  .then((res)=>{
                    //console.log(res)
                    //console.log(res.data)
                    console.log('sucesso')
                    //Toast.create('Returned ' + JSON.stringify(data))
                    Toast.create.positive('Tipo ' + JSON.stringify(data.nome) + ' cadastrado com sucesso')
                    this.listarSubtipos()
                  })
                  .catch((e)=>{
                    console.log('error')
                    console.log(e)
                  })
                
              }
            }
          ]
        })
        this.conta.codSubTipoDespesa = ''
    
    },
    listarFormasPgto(){
      Loading.show({message: 'Aguardando Dados...'})
      axios.get(API + 'conta/obterformaspgto')
      .then((res)=>{
          //console.log(res.data)
          this.formas = res.data
          Loading.hide()
      })
      .catch((e)=>{
        console.log(e)
        Loading.hide()
      })  
    },
    
  },
  
  created (){
    let t = this
    
    if(localStorage.getItem('cadMode') === 'edit'){
        t.listarContas()
        t.btnDelete = true
    }
    
    t.listarPessoas()
    t.listarTipos()
    t.listarSubtipos()
    t.listarFormasPgto()
    

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
    
    #avisoCep {
        font-weight: bolder;
        font-size: 16px;
        color: slategrey;
    }
    
    #table {
        overflow: scroll;
        width: 100%;
    }
    
    #baixa {
        background-color: white;
        margin-top: 30px;
        padding: 10px;
        
    }
    #baixado {
        text-align: center;
        margin-top: 30px;
        font-weight: bold;
        color: darkgoldenrod;
    }
    
</style>