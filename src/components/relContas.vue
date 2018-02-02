<template>
<div id="clientes">
  <h5>Contas</h5>
    
    <!-- Botão voltar -->
    <q-fixed-position class="fixo" corner="bottom-left" :offset="[18, 18]">
        <q-btn 
           round
           color="primary" 
           @click="goBack">
           <q-icon name="keyboard_arrow_left" />
        </q-btn>
    </q-fixed-position>
    
  <div id="filtros">
      
    <div class="row">
        <div class="col-md-6 col-xs-12">
            <q-field
                icon="date_range"
                >
                <q-datetime v-model="dataInicial"
                            type="date" 
                            float-label="Data Inicial" 
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
        <div class="col">
            <q-field
                icon="date_range"
                >
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

                />

            </q-field>  
        </div>
    </div>
     
    <q-btn color="primary"
           @click="getContas"
           class="btnGet"
           >Visualizar</q-btn>
    
  </div>
    
  <q-collapsible label="Exibir gráfico" @open="montarGrafico">
    <div>
      <div class="layout-view">
      <q-select v-model="tipo"
                Float-label="Lançar gráfico"
                @change="montarGrafico"
                :options="[
                  { label: 'Despesas', value: 1},
                  { label: 'Receitas', value: 2}
                ]" />
      <donut :data="data" v-if="visivel"></donut>   
      </div>
    </div>
  </q-collapsible>
  <q-collapsible opened label="Totais">
    <strong>Despesas</strong>
    <div class="row">
        <div class="col">Pagar: {{somaDespPagar | formatMoney}}</div>
        <div class="col">Pagas: {{somaDespPagas | formatMoney}}</div>
    </div>
    <hr>
    <strong>Receitas</strong><br>
    <div class="row">

        <div class="col">Pagar: {{somaRecPagar | formatMoney}}</div>
        <div class="col">Pagas: {{somaRecPagas | formatMoney}}</div>
    </div>
  </q-collapsible>
    
  
        
        
</div>
</template>

<script>
import { Loading } from 'quasar' //Alert, Dialog, Toast, clone, date
import axios from 'axios'
import { AtomSpinner } from 'epic-spinners'
import donut from './charts/Donuts.js'
import localforage from 'localforage'
var moment = require('moment');
require("moment/min/locales.min");
moment.locale('pt-br');
    
const API = localStorage.getItem('wsAtual')
  
//debug
//const API = 'http://192.168.0.200:29755/'    
export default {
  data () {
    return {
      contas: [],
      vencimento: '',
      dataInicial: '',
      dataFinal: '',
      despPagar: [],
      despPagas: [],
      recPagar: [],
      recPagas: [],
      somaDespPagar: 0,
      somaDespPagas: 0,
      somaRecPagar: 0,
      somaRecPagas: 0,
      visivel: false,
      syncCount: 0,
        
      //grafico
      tipo: '',
      width: 100,
      height: parseInt(localStorage.getItem('alturaGrafico')),
      data: {
          labels: ['Pagas', 'Total'],
          datasets: [
            {
              backgroundColor: [
                '#41B883',
                '#DD1B16',
              ]
            }
          ],
          option: {
              options: '200px',
              backgroundColor: 'grey'
          }
      },
      
      //datatime
      dias: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
      meses: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    }
  },
  components: {
    donut,
  },
  computed: {
    contasFilter(){
        if(this.dataInicial && this.dataFinal){
            let di = moment(this.dataInicial).format('YYYY-MM-DDTHH:mm:SS')
            let df = moment(this.dataFinal).format('YYYY-MM-DDTHH:mm:SS')
            return this.contas.filter(row => row.vencimento > di && row.vencimento < df)
        }
        else{
            return this.contas
        }
        
    },
    despesas(){
        return this.somaDespPagar + this.somaDespPagas
    },
    receitas(){
        return this.somaRecPagar + this.somaRecPagas
    },
    
    
  },
  methods: {
    goBack(){
        window.history.back()
    },
    listarContas(){
      if(localStorage.getItem('loadContas') === 'true'){
          Loading.show({
              spinner: AtomSpinner,
              spinnerSize: 140,
              message: 'Aguardando Dados...'
          })
          axios.get(API + 'conta/obterContas?tipo=' + this.tipo + '&pagas=' + this.subtipo)
          .then((res)=>{
              console.log(res)
              this.contas = res.data
              Loading.hide()
          })
          .catch((e)=>{
            console.log(e)
            Loading.hide()
          })
      }
      else{
        if(this.tipo === 'cp' && this.subtipo === false){
            localforage.getItem('DespPagar').then((value) => {
                if(value){
                    console.log('localforage get')
                    console.log(value)
                    this.contas = value;
                }
                else{
                    console.log('localforage fail')
                    this.listarContas()
                }

            }).catch((err) => {
                console.log(err)
                console.log('fail')
            })     
        }
        if(this.tipo === 'cp' && this.subtipo === true){
            localforage.getItem('DespPagas').then((value) => {
                if(value){
                    console.log('localforage get')
                    console.log(value)
                    this.contas = value;
                }
                else{
                    console.log('localforage fail')
                    this.listarContas()
                }

            }).catch((err) => {
                console.log(err)
                console.log('fail')
            })     
        }
        if(this.tipo === 'cr' && this.subtipo === false){
            localforage.getItem('RecPagar').then((value) => {
                if(value){
                    console.log('localforage get')
                    console.log(value)
                    this.contas = value;
                }
                else{
                    console.log('localforage fail')
                    this.listarContas()
                }

            }).catch((err) => {
                console.log(err)
                console.log('fail')
            })     
        }
        if(this.tipo === 'cr' && this.subtipo === true){
            localforage.getItem('RecPagas').then((value) => {
                if(value){
                    console.log('localforage get')
                    console.log(value)
                    this.contas = value;
                }
                else{
                    console.log('localforage fail')
                    this.listarContas()
                }

            }).catch((err) => {
                console.log(err)
                console.log('fail')
            })     
        }
      
      }
    },
    listarDespesasAPagar(){
          Loading.show({
              spinner: AtomSpinner,
              spinnerSize: 140,
              message: 'Aguardando Dados...'
          })
          axios.get(API + 'conta/obterContas?tipo=CP&pagas=false&dataInicial=' + this.dataInicial + '&dataFinal=' + this.dataFinal)
          .then((res)=>{
              console.log('despPagar', res)
              this.despPagar = res.data
              if(res.data.length === 0){ return 0 }
              let lista = []
              lista = this.despPagar.map(row => row.valorTitulo)
              this.somaDespPagar = lista.reduce(function(a, b) {
                return a + b;
              });
              Loading.hide()
          })
          .catch((e)=>{
            console.log(e)
            Loading.hide()
          })  
        },
    listarDespesasPagas(){
      Loading.show({
          spinner: AtomSpinner,
          spinnerSize: 140,
          message: 'Aguardando Dados...'
      })
      axios.get(API + 'conta/obterContas?tipo=CP&pagas=true&dataInicial=' + this.dataInicial + '&dataFinal=' + this.dataFinal)
      .then((res)=>{
          console.log('despPagas', res)
          this.despPagas = res.data
          if(this.despPagas.length === 0){ return 0 }
          let lista = []
          lista = this.despPagas.map(row => row.valorPago)
          this.somaDespPagas = lista.reduce(function(a, b) {
            return a + b;
          });
          
          Loading.hide()
      })
      .catch((e)=>{
        console.log(e)
        Loading.hide()
      })  
    },
    listarReceitasAPagar(){
      Loading.show({
          spinner: AtomSpinner,
          spinnerSize: 140,
          message: 'Aguardando Dados...'
      })
      axios.get(API + 'conta/obterContas?tipo=CR&pagas=false&dataInicial=' + this.dataInicial + '&dataFinal=' + this.dataFinal)
      .then((res)=>{
          console.log('recPagar', res)
          this.recPagar = res.data
          if(this.recPagar.length === 0){ return 0 }
          let lista = []
          lista = this.recPagar.map(row => row.valorTitulo)
          this.somaRecPagar = lista.reduce(function(a, b) {
            return a + b;
          });  
          Loading.hide()
      })
      .catch((e)=>{
        console.log(e)
        Loading.hide()
      })  
    },
    listarReceitasPagas(){
      Loading.show({
          spinner: AtomSpinner,
          spinnerSize: 140,
          message: 'Aguardando Dados...'
      })
      axios.get(API + 'conta/obterContas?tipo=CR&pagas=true&dataInicial=' + this.dataInicial + '&dataFinal=' + this.dataFinal)
      .then((res)=>{
          console.log('recPagas', res)
          this.recPagas = res.data
          if(this.recPagas.length === 0){ return 0 }
          let lista = []
          lista = this.recPagas.map(row => row.valorPago)
          this.somaRecPagas = lista.reduce(function(a, b) {
            return a + b;
          });
          Loading.hide()
      })
      .catch((e)=>{
        console.log(e)
        Loading.hide()
      })  
    },
    calcDespPagar(){
      if(this.despPagar.length === 0){ return 0 }
      let a = this.despPagar
      let lista = []

      lista = a.map(row => row.valorTitulo)

      this.somaDespPagar = lista.reduce(function(a, b) {
        return a + b;
      });

    },
    calcDespPagas(){
      if(this.despPagas.length === 0){ return 0 }
      let a = this.despPagas.filter(d => d.vencimento >= this.dataInicial && d.vencimento <= this.dataFinal)
      let lista = []

      lista = a.map(row => row.valorPago)

      this.somaDespPagas = lista.reduce(function(a, b) {
        return a + b;
      });
    },
    calcRecPagar(){
      if(this.recPagar.length === 0){ return 0 }
      let a = this.recPagar.filter(d => d.vencimento >= this.dataInicial && d.vencimento <= this.dataFinal)
      let lista = []

      lista = a.map(row => row.valorTitulo)

      this.somaRecPagar = lista.reduce(function(a, b) {
        return a + b;
      });   
    },
    calcRecPagas(){
      if(this.recPagas.length === 0){ return 0 }
      let a = this.recPagas
      let lista = []

      lista = a.map(row => row.valorPago)

      this.somaRecPagas = lista.reduce(function(a, b) {
        return a + b;
      });
    },
    montarGrafico(){
        let a = this.data.datasets[0]
        
        if(this.tipo === 1){
          Object.assign(a, {data:[this.somaDespPagas.toFixed(2),this.despesas.toFixed(2)]})
        }
        else{
          Object.assign(a, {data:[this.somaRecPagas.toFixed(2),this.receitas.toFixed(2)]})
        }
        
        this.visivel = true
    },
    listar(){
        let t = this
        t.listarDespesasAPagar()
        t.listarDespesasPagas()
        t.listarReceitasAPagar()
        t.listarReceitasPagas()
    },
    getContas(){
        let t = this
        t.listar()
        t.visivel = true
    },
    
    
  },
  watch: {
    data: function () {
      this._chart.destroy()
      this.renderChart(this.data, this.options)
    }
  }
  
}
</script>

<style scoped>
.my-label{
  padding: 5px;
  border-radius: 3px;
  display: inline-block;
}
.over{
    z-index: 5;
}
    .btnGet{ margin: 20px 0 }
</style>