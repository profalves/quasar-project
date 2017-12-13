<template>
    <div class="layout-padding">
        <div slot="header" class="toolbar">
          <q-toolbar-title>
              Contas
          </q-toolbar-title>
        </div> 
        <q-list style="background-color:white">
          <!--<div class="row datas">
           <div class="col" >
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
                        @change=""
            />  

           </div>

          </div>-->
          <q-collapsible label="Exibir gráfico" @open="montarGrafico">
            <div>
              <div class="layout-view">
              <bar :data="data" v-if="visivel"></bar>   
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
        </q-list>

    </div>
</template>
<script type="text/javascript">
import { Loading } from 'quasar'
import axios from 'axios'
import bar from './charts/Bar.js'
    
const API = 'http://192.168.0.200/WSV3/' 
  
//debug
//const API = 'http://192.168.0.200:29755/'     
    
  export default {
    name: 'ContasRelatorios',
    components: {
        bar,
    },
    data () {
      return {
        despPagar: [],
        despPagas: [],
        recPagar: [],
        recPagas: [],
        visivel: false,
          
        //datatime
        dias: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
        meses: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
          
        //grafico  
        tipo: 'bar',
        width: 100,
        height: parseInt(localStorage.getItem('alturaGrafico')),
        data: {
          datasets: [
            {
              label: 'Despesas',
              backgroundColor: '#80CBC4',
              data: []
            },
            {
              label: 'Receitas',
              backgroundColor: '#05CBE1',
              data: []
            }
          ],
          option: {
              options: '200px',
              backgroundColor: 'grey'
          }
        }
      }
    },
    computed:{
        dadosFiltrados(){
            
        },
        
        somaDespPagar(value){
          if(this.despPagar.length === 0){ return 0 }
          let a = this.despPagar
          let lista = []
          
          lista = a.map(row => row.valorTitulo)
          
          value = lista.reduce(function(a, b) {
            return a + b;
          });
          return value
        },
        somaDespPagas(value){
          if(this.despPagar.length === 0){ return 0 }
          let a = this.despPagas
          let lista = []
          
          lista = a.map(row => row.valorPago)
          
          value = lista.reduce(function(a, b) {
            return a + b;
          });
          return value
        },
        somaRecPagar(value){
          if(this.despPagar.length === 0){ return 0 }
          let a = this.recPagar
          let lista = []
          
          lista = a.map(row => row.valorTitulo)
          
          value = lista.reduce(function(a, b) {
            return a + b;
          });
          return value
        },
        somaRecPagas(value){
          if(this.despPagar.length === 0){ return 0 }
          let a = this.recPagas
          let lista = []
          
          lista = a.map(row => row.valorPago)
          
          value = lista.reduce(function(a, b) {
            return a + b;
          });
          return value
        },
        despesas(){
            return this.somaDespPagar + this.somaDespPagas
        },
        receitas(){
            return this.somaRecPagar + this.somaRecPagas
        }
        
        
    },
    methods:{
        listarDespesasAPagar(){
          Loading.show({message: 'Aguardando Dados...'})
          axios.get(API + 'conta/obterContas?tipo=CP&pagas=false')
          .then((res)=>{
              console.log(res)
              this.despPagar = res.data
              Loading.hide()
          })
          .catch((e)=>{
            console.log(e)
            Loading.hide()
          })  
        },
        listarDespesasPagas(){
          Loading.show({message: 'Aguardando Dados...'})
          axios.get(API + 'conta/obterContas?tipo=CP&pagas=true')
          .then((res)=>{
              console.log(res)
              this.despPagas = res.data
              Loading.hide()
          })
          .catch((e)=>{
            console.log(e)
            Loading.hide()
          })  
        },
        listarReceitasAPagar(){
          Loading.show({message: 'Aguardando Dados...'})
          axios.get(API + 'conta/obterContas?tipo=CR&pagas=false')
          .then((res)=>{
              console.log(res)
              this.recPagar = res.data
              Loading.hide()
          })
          .catch((e)=>{
            console.log(e)
            Loading.hide()
          })  
        },
        listarReceitasPagas(){
          Loading.show({message: 'Aguardando Dados...'})
          axios.get(API + 'conta/obterContas?tipo=CR&pagas=true')
          .then((res)=>{
              console.log(res)
              this.recPagas = res.data
              Loading.hide()
          })
          .catch((e)=>{
            console.log(e)
            Loading.hide()
          })  
        },
        montarGrafico(){
            let a = this.data.datasets[0].data
            let b = this.data.datasets[1].data
            
            
            a.push(this.despesas)
            
            b.push(this.receitas)
            
            this.visivel = true
        }
    },
    created(){
        let t = this
        t.listarDespesasAPagar()
        t.listarDespesasPagas()
        t.listarReceitasAPagar()
        t.listarReceitasPagas()
    }
  }
</script>

<style>
    .datas{
        padding: 0 10px
    }
</style>
