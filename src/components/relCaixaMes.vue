<template>
  <div>
    <q-fixed-position class="fixo" corner="bottom-left" :offset="[18, 18]">
      <q-btn 
         round
         color="primary" 
         @click="goBack">
         <q-icon name="keyboard_arrow_left" />
      </q-btn>
    </q-fixed-position>
    <q-fixed-position class="fixo" corner="bottom-right" :offset="[18, 18]">
      <q-btn color="primary"
             rounded
             @click="pdf"
             v-if="caixa.length>0"
             >imprimir
      </q-btn>
    </q-fixed-position>
    
    <div class="row">
      
      <div class="col">
        <q-select
          float-label="Mês"
          v-model="mes"
          :options="meses"
          @change="getCaixaMes"
        /> 
      </div>
      
      <div class="col">
        <q-input
          float-label="Ano"
          v-model="ano"
          type="number"
          @blur="getCaixaMes"
          @keyup.enter="getCaixaMes"
        /> 
      </div>
    
    
    </div>
    
    <div v-if="caixa.length>0">
      
        <table class="q-table" :class="computedClasses" style="margin-left:1px; margin-top: 10px;">
          <thead>
            <tr>
              <th @click="irFechamento(item)">Abertura</th>
              <th @click="irFechamento(item)">Fechamento</th>
              <th @click="irFechamento(item)">Operador</th>
              <th @click="irFechamento(item)">Status</th>
              <th>Ver Caixa</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in caixa">
              <td data-th="Name">{{ item.abertura | formatDate }}</td>
              <td data-th="Name">{{ item.fechamento | formatDate }}</td>
              <td data-th="Name">{{ item.operador }}</td>
              <td data-th="Name">{{ item.status }}</td>
              <td>
                <q-btn
                    color="primary" 
                    rounded
                    small
                    @click="irFechamento(item)"
                    >
                    abrir
                </q-btn>
              </td>
            </tr>
          </tbody>
        </table>
    </div>
    <br><br><br><br>
    
    <div id="printable" v-show="false">
      
        <table class="q-table" :class="computedClasses" style="margin:20px">
          <thead>
            <tr>
              <th @click="irFechamento(item)">Abertura</th>
              <th @click="irFechamento(item)">Fechamento</th>
              <th @click="irFechamento(item)">Operador</th>
              <th @click="irFechamento(item)">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in caixa">
              <td data-th="Name">{{ item.abertura | formatDate }}</td>
              <td data-th="Name">{{ item.fechamento | formatDate }}</td>
              <td data-th="Name">{{ item.operador }}</td>
              <td data-th="Name">{{ item.status }}</td>
            </tr>
          </tbody>
        </table>
    </div>
      
  </div>
</template>

<script>

import { Loading } from 'quasar'
import axios from 'axios'
import { FulfillingBouncingCircleSpinner } from 'epic-spinners'
    
const API = localStorage.getItem('wsAtual')
  
//debug
//const API = 'http://192.168.0.200:29755/' 

export default {
  data () {
    return {
      caixa: [],
      meses: [
          { 
              label:'Janeiro', 
              value: 1
          },
          { 
              label:'Fevereiro', 
              value: 2
          },
          { 
              label:'Março', 
              value: 3
          },
          { 
              label:'Abril', 
              value: 4
          },
          { 
              label:'Maio', 
              value: 5
          },
          { 
              label:'Junho', 
              value: 6
          },
          { 
              label:'Julho', 
              value: 7
          },
          { 
              label:'Agosto', 
              value: 8
          },
          { 
              label:'Setembro', 
              value: 9
          },
          { 
              label:'Outubro', 
              value: 10
          },
          { 
              label:'Novembro', 
              value: 11
          },
          { 
              label:'Dezembro', 
              value: 12
          }
      ],
      mes: '',
      anos: [
        {label: '2017', value: 2017}
      ],
      ano: new Date().getFullYear(),
        
      //tabela
      misc: 'highlight', //[{value: 'bordered'},{value: 'highlight'}]
      separator: 'cell', // none, horizontal, vertical, cell
      stripe: 'odd', // none, odd, even
      type: 'none', // flipped, responsive
      gutter: 'none', // compact, loose
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
    
  },
  methods: {
    goBack(){
        window.history.back()
    },
    getCaixaMes(){
      
      let ano = ''
      if(this.ano){
        ano = '&ano=' + this.ano
      }
      
      Loading.show({
          spinner: FulfillingBouncingCircleSpinner,
          spinnerSize: 140,
          message: 'Aguardando Dados...'
      })
      axios.get(API + 'caixa/obterCaixaMes?Mes=' + this.mes + ano)
      .then((res)=>{
        //console.log(res.data)
        this.caixa = res.data
        Loading.hide()
      })
      .catch((e)=>{
        console.log(e.response)
        Loading.hide()
      })
    },
    irFechamento(item){
      localStorage.setItem('codCaixa', item.codigo)
      localStorage.setItem('cadMode', 'edit')
      if(item.status === 'OK'){
        this.$router.push({ path: '/fechamento' })
      }
      else {
        this.$router.push({ path: '/fechamento?a=aberto' })
      }
      
    },
    pdf(){
      var printContents = document.getElementById('printable').innerHTML
      var w = window.open();
      self.focus();
      w.document.open();
      w.document.write('<'+'html'+'><'+'body'+'>');
      w.document.write('<h3>Relatório Caixa Mês</h3>');
      w.document.write(printContents);
      w.document.write('<'+'/body'+'><'+'/html'+'>');
      w.document.close();
      w.print();
      w.close();
    },
  },
  
}
</script>

<style scoped>
  @media (max-height: 540px) {
    #table {
      margin-top: 10px;
      max-width: 100%;
      max-height: 400px;
      line-height: 100%;
      overflow: scroll;
      }
  }
  @media (min-height: 550px ) {
    #table {
      margin-top: 10px;
      max-width: 100%;
      max-height: 420px;
      line-height: 100%;
      overflow: scroll;
      }
  }
  @media (min-height: 730px) {
    #table {
      margin-top: 10px;
      max-width: 100%;
      max-height: 590px;
      line-height: 100%;
      overflow: scroll;
      }
  }

  #table {
    margin-top: 10px;
    max-width: 100%;
    max-height: auto;
    line-height: 100%;
    overflow: scroll;
  }

  table {
    border-collapse: collapse;
    border: 1px solid #666;
    width: 100%;    
  }

  #printable{
    margin-top: 10px;
  }
</style>
