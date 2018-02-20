<template>
  <div>
      <q-window-resize-observable @resize="onResize" />
      <q-fixed-position class="fixo" corner="bottom-left" :offset="[18, 18]">
        <q-btn 
           round
           color="primary" 
           @click="goBack">
           <q-icon name="chevron_left" />
        </q-btn>
      </q-fixed-position>
      
      <div class="row">
        <div class="col">
            <h5>Cadastrar Promoções para Clientes</h5>
        </div>
      </div>
      
      <div class="row">
        <div class="col-xl-6">
          <q-list inset-separator style="background-color: white;">
            <!-- Cadastrar Tab -->
            <div class="layout-padding">
              
              <div class="row">
                <div class="col-md-6">
                  <q-field
                    icon="monetization_on"
                    helper="Acima de R$"
                  >
                    <money v-model="acima"
                           v-bind="money"
                           class="mdInput"
                    />
                  </q-field>   
                </div>
                <div class="col-md-6">
                  <q-field
                    icon="show_chart"
                    helper="Desconto %"
                  >
                    <money v-model="desc"
                           v-bind="perc"
                           class="mdInput"
                    />
                  </q-field>   
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <q-field
                    icon="monetization_on"
                    helper="Dia Mês"
                  >
                    <q-input v-model="dia"
                             class="mdInput"
                             :min="1"
                             :max="31"
                    />
                  </q-field>   
                </div> 
                <div class="col btn-plus">
                    <q-btn 
                       rounded
                       color="primary" 
                       @click="salvar">
                       Incluir
                    </q-btn>
                </div>
              </div>
              <br>
            <strong>Tabelas de Preços salvas:</strong><br><br>
             
            <q-checkbox v-model="check"
                        v-if="visivel"
                        label="Exibição Vertical"
                        left-label
                        class="check"
                        @change="responsiva" />
              

            <div class="row" id="config">    
                <table class="q-table" :class="computedClasses" style="width: 100%">
                  <thead>
                    <tr>
                      <th class="text-left">Valor</th>
                      <th class="text-left">Desconto</th>
                      <th class="text-left">Dia</th>
                      <th class="text-left">Editar</th>
                      <th class="text-left">Excluir</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in tabs">
                      <td data-th="Valor" class="text-left">{{ item.mLminima | formatMoney }}</td>
                      <td data-th="Desconto" class="text-left">{{ item.descontoMax | formatPerc }}</td>
                      <td data-th="Dia" class="text-left">{{ item.descontoMax }}</td>
                      <td class="text-center">
                        <a @click="editar(item)" color="info"><i class="material-icons fa-2x" >mode_edit</i></a>   
                      </td>
                      <td class="text-center">
                        <i class="material-icons fa-2x mHover text-negative" 
                           @click="excluir(item, index)" 
                           color="negative"
                           v-if="item.codigo !== 1 && item.codigo !== 2"
                           >delete_forever</i> 
                      </td>
                    </tr>
                  </tbody>
                </table>
            </div>
            
            </div>

          </q-list>
      </div>
    </div>
    <br><br><br>
    
  </div>
</template>

<script>
import { Dialog, Toast, Loading } from 'quasar'
import { required } from 'vuelidate/lib/validators'
import axios from 'axios'
import { FulfillingBouncingCircleSpinner } from 'epic-spinners'
    
const API = localStorage.getItem('wsAtual')
  
//debug
//const API = 'http://192.168.0.200:29755/'   

export default {
  data () {
    return {
      //btn voltar
      canGoBack: window.history.length > 1,
      tabs: [],
      acima: 0,
      desc: 0,
      dia: 0,
      codigo: '',
      filtro: '',
      indice: '',
      edit: false,
      check: false,
      visivel: false,
        
      money: {
        decimal: ',',
        thousands: '.',
        prefix: 'R$ ',
        //suffix: ' #',
        precision: 2,
        masked: false /* doesn't work with directive */
      },
      perc: {
        decimal: ',',
        thousands: '.',
        //prefix: 'R$ ',
        suffix: ' %',
        precision: 2,
        masked: false /* doesn't work with directive */
      },
        
      //tabela
      misc: 'bordered', //[{value: 'bordered'},{value: 'highlight'}]
      separator: 'cell', // none, horizontal, vertical, cell
      stripe: 'odd', // none, odd, even
      type: 'none', // flipped, responsive
      gutter: 'none', // compact, loose
      
    }
  },
  validations: {
    nome: { required },
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
    }
  },
  methods: {
    goBack(){
      window.history.go(-1)
    },
    listarTabs (){
        Loading.show({
          spinner: FulfillingBouncingCircleSpinner,
          spinnerSize: 140,
          message: 'Obtendo Promoções...'
        })
        axios.get(API + 'produto/obterPromocaoPorCliente')
          .then((res)=>{
            Loading.hide()
            this.tabs = res.data
            //console.log(res)
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
    salvar(){
        let promocao = {
            totalCompras: this.acima,
            DiaDoMes: this.dia,
            DescontoMax: this.desc,
            CodigoUsuario: localStorage.getItem('codUser')
        }
        console.log(JSON.stringify(promocao))
        
        Loading.show({
          spinner: FulfillingBouncingCircleSpinner,
          spinnerSize: 140,
          message: 'Enviando Dados...'
        })
        axios.get(API + 'produto/gravarPromocaoPorCliente?totalCompras=15.00&DiaDoMes=20&descontoMax=50.00&CodigoUsuario=1')
          .then((res)=>{
            Loading.hide()
            console.log(res)
            this.listarTabs()
            Toast.create.positive('A Promocao foi salva com sucesso')
            this.limpar()
          })
          .catch((e)=>{
            Loading.hide()
            console.log(e.response)
            let error = e.response.data
            for(var i=0; error.length; i++){
                Toast.create.negative(error[i].value)
            }
          })
        
    },
    editar(item, index) {
        let t = this
        t.codigo = item.codigo
        t.nome = item.nome
        t.ml = item.ml
        t.mlMin = item.mLminima
        t.descMax = item.descontoMax
        
    },
    limpar(){
        this.acima = ''
        this.dia = ''
        this.desc = ''
    },
    excluir(item, index) {
        item.excluido = true
        Dialog.create({
          title: '<i class="material-icons text-negative">warning</i> Atenção!',
          message: 'Deseja excluir a tabela ' + item.nome + '?',
          buttons: [
            {
              label: 'Cancelar',
              raised: true,
              color: 'faded',
              handler: () => { return }
            },
            {
              label: 'Excluir',
              raised: true,
              color: 'negative',
              handler: () => {
                Loading.show({
                    spinner: FulfillingBouncingCircleSpinner,
                    spinnerSize: 140,
                    message: 'Excluindo tabela...'
                })
                
                axios.post(API + 'produto/gravarTabPrecoCab', item)
                  .then((res)=>{
                    Loading.hide()
                    console.log(res)
                    this.listarTabs()
                    Toast.create('A tabela ' + item.nome + ' foi excluida com sucesso')
                  })
                  .catch((e)=>{
                    Loading.hide()
                    console.log(e.response)
                    let error = e.response.data
                    for(var i=0; error.length; i++){
                        Toast.create.negative(error[i].value)
                    }
                  })
              }
            }
          ]
        })
        
          
    },
    onResize (size) {
      //console.log(size)
      if(size.width < 430){
        this.visivel = true
      }
      else{
        this.visivel = false
      }
      
    },
    responsiva(){
        if(this.check === true){
            this.type = 'responsive'
        }
        else {
            this.type = 'none'
        }
    }
    
  },
  mounted(){
    this.listarTabs()
    
  }
  
}
</script>

<style scoped>
    #config {
        overflow: scroll;
    }
    .low{
        margin-bottom: 50px;
        font-weight: 
    }
    .fixo{
        z-index: 
    }
    .btn-plus{
        margin: 10px 0 0 45px
    }
    .check{
        margin-bottom: 10px
    }
    .right{
        margin-left: 10px
    }
</style>
