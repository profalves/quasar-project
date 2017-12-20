<template>
<div>
  <h5>Período Caixa</h5>
  <!-- Botão flutuante -->
    <q-fixed-position class="over" corner="bottom-left" :offset="[18, 18]">
        <q-btn 
           round
           color="primary" 
           @click="goBack">
           <q-icon name="chevron_left" />
        </q-btn>
    </q-fixed-position>

  <div id="lista">
   
    <!--periodo-->
    <div class="row">
       <div class="col">
        <q-datetime v-model="dataInicial"
                    type="date" 
                    float-label="Data inicial" 
                    color="black"
                    format="DD/MM/YYYY"
                    ok-label="OK" 
                    clear-label="Limpar" 
                    cancel-label="Cancelar"
                    :day-names="dias"
                    :month-names="meses"
                    @change="relistarResumo()"
        />  
           
       </div>
       <div class="col">
        <q-datetime v-model="dataFinal"
                    type="date" 
                    float-label="Data Final" 
                    color="black"
                    format="DD/MM/YYYY"
                    ok-label="OK" 
                    clear-label="Limpar" 
                    cancel-label="Cancelar"
                    :day-names="dias"
                    :month-names="meses"
                    @change="listarResumo"
        />  
           
       </div>
          
    </div>
    
    <!--graficos-->
    <q-card style="background-color: white">
      <q-card-separator />
      <q-card-main>
        <div class="layout-view">
          <q-select
              v-model="tipo"
              float-label="Tipo de Gráfico"
              :options="options"
          />

          
          <bar :width="width" :height="height" :data="data" v-if="tipo === 'bar'"></bar>
          <pie :width="width" :height="height" :data="data2" v-if="tipo === 'pie'"></pie>
          <donut :width="width" :height="height" :data="data2" v-if="tipo === 'donut'"></donut>
          <!--<polar :width="width" :height="height" :data="data" v-if="tipo === 'polar'"></polar>
          <radar :width="width" :height="height" :data="data" v-if="tipo === 'radar'"></radar>
          <bubble :width="width" :height="height" :data="data" v-if="tipo === 'bolha'"></bubble>-->
        </div> 
      </q-card-main>
    </q-card>
    
    <div class="row">
        <div class="col">
            <q-card style="background-color: white">
              <q-card-title>
                Vendas
                <!--<q-btn 
                    slot="right" 
                    color="primary" 
                    round 
                    small
                    @click="exibirVendas"
                    >
                    <i class="material-icons fa-2x">arrow_downward</i>
                </q-btn>-->
              </q-card-title>
              <q-card-separator />
              <q-card-main>
                <table class="q-table">
                  <thead>
                    <tr>
                      <th class="text-left">Forma Pgto</th>
                      <th class="text-left">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in vendas">
                      <td class="text-left">{{item.formaPgto}}</td>
                      <td class="text-left">{{item.total | formatMoney}}</td>
                    </tr>
                  </tbody>
                </table> 
              </q-card-main>
              <q-card-separator />
              <div id="total"><b>Total :</b> {{ somaVendas | formatMoney}}</div>
            </q-card>      
        </div>
    
        <div class="col">
            <q-card style="background-color: white">
              <q-card-title>
                Recebimentos
                <!--<q-btn 
                    slot="right" 
                    color="primary" 
                    round 
                    small
                    @click="exibirRecs"
                    >
                    <i class="material-icons fa-2x">arrow_downward</i>
                </q-btn>-->
              </q-card-title>
              <q-card-separator />
              <q-card-main>
                <table class="q-table">
                  <thead>
                    <tr>
                      <th class="text-left">Forma Pgto</th>
                      <th class="text-left">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in recebimentos">
                      <td class="text-left">{{item.formaPgto}}</td>
                      <td class="text-left">{{item.total | formatMoney}}</td>
                    </tr>

                  </tbody>
                </table> 
              </q-card-main>
              <q-card-separator />
              <div id="total"><b>Total :</b> {{ somaRecs | formatMoney }}</div>
            </q-card>      
        </div>
        
    </div>
        
    <q-card style="background-color: white">
      <q-card-title>Grafico de Formas Detalhadas</q-card-title>
      <q-card-separator />
      <q-card-main>
        
        <div class="layout-view">
          <q-select
              v-model="tipoDet"
              float-label="Tipo de Gráfico"
              :options="[
                 {
                     label:'Detalhamento de Vendas',
                     value: 1
                 },
                 {
                     label:'Detalhamento de Recebimentos',
                     value: 2
                 }
              ]"
          />
         
         
          <bar :width="width" :height="height" :data="formasGrafVendas" v-if="tipoDet === 1"></bar>
          <bar2 :width="width" :height="height" :data="formasGrafRec" v-if="tipoDet === 2"></bar2>
        </div> 
      </q-card-main>
    </q-card>   
    
   <br><br><br>
   
 
  </div>
    
</div>
</template>

<script>
import chartLine from './charts/Line.js'
import bar from './charts/Bar.js'
import bar2 from './charts/Bar2.js'
import pie from './charts/Pizza.js'
import donut from './charts/Donuts.js'
import polar from './charts/Polar.js'
import radar from './charts/Radar.js'
import bubble from './charts/Bubble.js'
import { Dialog, Loading } from 'quasar'
import axios from 'axios'
    
const API = localStorage.getItem('wsAtual')
  
//debug
//const API = 'http://192.168.0.200:29755/' 

export default {
  
  data () {
    return {
      dataFinal: '',
      dataInicial: '',
      vendas: [],
      vendasChart: false,
      formasV: [],
      resultsV: [],
      recebimentos: [],
      recsChart: false,
      formasR: [],
      resultsR: [],
      totalV: [],
      totalR: [],
      excluidos: [],
      barVendas: false,
      barRecs: false,
      canGoBack: window.history.length > 1,
      
      //datatime
      dias: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
      meses: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        
      //chart
      options: [
        {
          label: 'Barra',
          icon: 'insert_chart',
          value: 'bar'
        },
        {
          label: 'Pizza',
          icon: 'pie_chart',
          value: 'pie'
        },
        {
          label: 'Donut',
          icon: 'donut_large',
          value: 'donut'
        }
      ],
      tipo: '',
      optionsDet: [
        {
          label: 'Barra',
          icon: 'insert_chart',
          value: 'bar'
        },
        {
          label: 'Pizza',
          icon: 'pie_chart',
          value: 'pie'
        },
        {
          label: 'Donut',
          icon: 'donut_large',
          value: 'donut'
        }
      ],

      tipoDet: '',
      width: 100,
      height: parseInt(localStorage.getItem('alturaGrafico')),
      data: { // bar
          labels:  ['Vendas','Recebimentos'],
          datasets: [],
          /*option: {
              options: '200px',
              backgroundColor: 'grey'
          }*/
      },
      data2: { //pie & donut
          labels:  ['Vendas','Recebimentos'],
          datasets: []
      },
      
      formasGrafVendas: { // bar
          labels:  [],
          datasets: []
      },
      formasGrafVendas2: { //pie & donut
          labels:  [],
          datasets: []
      },
      formasGrafRec: { // bar
          labels:  [],
          datasets: []
      },
      formasGrafRec2: { //pie & donut
          labels:  [],
          datasets: []
      },
      
      /*dataLineVendas: { //pie & donut
          labels:  [],
          datasets: []
      },
      dataLineRec: { //pie & donut
          labels:  [],
          datasets: []
      }*/
    
    }
  },
  computed: {
    somaVendas(value){
      if(this.vendas.length === 0){ return 0 }
      let a = this.vendas
      let lista = []

      for (let i=0; i < a.length; i++) {
          let n = a[i].total
          lista.push(n)
      }
       
      value = lista.reduce(function(a, b) {
        return a + b;
      });
      return value
    },
    somaRecs(value){
      
      if(this.recebimentos.length === 0){ return 0 }
      
      let a = this.recebimentos
      let lista = []

      for (let i=0; i < a.length; i++) {
          let n = a[i].total
          lista.push(n)
      }
       
      value = lista.reduce(function(a, b) {
        return a + b;
      });
      return value
    },
  },
  components: {
    chartLine,
    bar,
    bar2,
    pie,
    donut,
    polar,
    radar,
    bubble
  },
  methods: {
    goBack(){
      window.history.go(-1)
    },
    formasVendas() {
      var a = this.vendas
      var lista = []
      
      for (let i=0; i < a.length; i++) {
          let n = a[i].formaPgto
          lista.push(n) 
      }
      
      this.formasV = lista
        console.log('this.formasV', this.formasV);
    
    },
    formasRecs() {
      var a = this.recebimentos
      var lista = []
      
      for (let i=0; i < a.length; i++) {
          let n = a[i].formaPgto
          lista.push(n) 
      }
      
      this.formasR = lista
        console.log('this.formasR', this.formasR);
    
    },
    resultsVendas() {
      var a = this.vendas
      var lista = []
      
      for (let i=0; i < a.length; i++) {
          let n = a[i].total
          lista.push(n) 
      }
      
      this.resultsV = lista
        console.log('this.resultsV', this.resultsV);
    
    },
    resultsRecs() {
      var a = this.recebimentos
      var lista = []
      
      for (let i=0; i < a.length; i++) {
          let n = a[i].total
          lista.push(n) 
      }
      
      this.resultsR = lista
        console.log('this.resultsR', this.resultsR);
    
    },
    totalVendas(){
      if(this.vendas.length === 0){ return 0 }
      let a = this.vendas
      let lista = []

      for (let i=0; i < a.length; i++) {
          let n = a[i].total
          lista.push(n)
      }
       
      this.totalV = lista.reduce(function(a, b) {
        return a + b;
      });
    },
    totalRecs(){
      
      if(this.recebimentos.length === 0){ return 0 }
      
      let a = this.recebimentos
      let lista = []

      for (let i=0; i < a.length; i++) {
          let n = a[i].total
          lista.push(n)
      }
       
      this.totalR = lista.reduce(function(a, b) {
        return a + b;
      });
    },
    relistarResumo(){
      if(this.dataFinal !== ''){
        this.listarResumo()
        this.tipo = ''
      }  
    },
    listarResumo(){
      Loading.show({message: 'Aguardando Dados...'})
      axios.get(API + '/caixa/obterResumoCaixa?datainicial=' + this.dataInicial + '&datafinal=' + this.dataFinal)
      .then((res)=>{
          console.log(res.data)
          //zerando dados
          
          //obtendo dados de vendas
          this.vendas = res.data.vendas
          this.data.datasets = []
          this.data2.datasets = []
          this.totalVendas()
          this.data.datasets.push({
              label: 'Vendas',
              backgroundColor: '#80CBC4',
              data: [this.totalV]
          })
          //obtendo dados de recebimentos
          this.recebimentos = res.data.recebimentos
          this.totalRecs()
          this.data.datasets.push(
          {
              label: 'Recebimentos',
              backgroundColor: '#05CBE1',
              data: [this.totalR]
          })
          
          //obtendo dados par ao grafico pizza e 
          this.data2.datasets.push({
              backgroundColor: ['#80CBC4', '#05CBE1'],
              data: [this.totalV, this.totalR]
          })
          
          //obtendo grafico por formas de pagamento
          
          this.formasGrafVendas.datasets = []
          this.formasGrafRec.datasets = []
          
          
          this.formasVendas()
          this.formasRecs()
          this.resultsVendas()
          this.resultsRecs()
          
          this.formasGrafVendas.labels = this.formasV
          
          this.formasGrafVendas.datasets.push(
              {
                  label: 'Vendas',
                  backgroundColor: '#80CBC4',
                  data: this.resultsV
              }   
          )
          
          this.formasGrafRec.labels = this.formasR
          this.formasGrafRec.datasets.push(
              {
                  label: 'Recebimentos',
                  backgroundColor: '#05CBE1',
                  data: this.resultsR
              }
          )
          
          
          this.tipo = '' // limpando atrib. para renderizar
          this.tipo = 'bar' // limpando atrib. para renderizar
          Loading.hide()
          
      })
      .catch((e)=>{
        console.log(e.response)
        Dialog.create({
          title: 'Erro',
          message: 'Não há dados para exibir dentro deste período',
          buttons: [
            {
              label: 'OK'
            }
          ]
        })
        Loading.hide()
      })  
    },
    exibirVendas(){
        if(this.barVendas === false){
            this.barVendas = true
            this.barRecs = false
        }
        else{
            this.barVendas = false
            this.barRecs = true
        }
    },
    exibirRecs(){
        if(this.barRecs === false){
            this.barVendas = false
            this.barRecs = true
        }
        else{
            this.barVendas = true
            this.barRecs = false
        }
    },
    
    refresh (done) {
      this.timeout = setTimeout(() => {
        this.listarPessoas()
      }, 5000)
    },
    
  },
  
  created(){
  }
}
</script>

<style>
    #total{
        margin: 10px; 
        font-size: 20px
    }
    .over{
        z-index: 5
    }
    
</style>
