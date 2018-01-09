<template>
    <div class="layout-padding">
        <div slot="header" class="toolbar">
          <q-toolbar-title>
              <h5>Contas</h5>
          </q-toolbar-title>
        </div><br>
        <q-list style="background-color:white">
          <div class="row datas">
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
                        @change="getContas"
            />  

           </div>
          </div>
          
          <q-btn color="primary"
                 @click="getContas"
                 >Visualizar</q-btn>
          
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
    
const API = localStorage.getItem('wsAtual')
  
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
        somaDespPagar: 0,
        somaDespPagas: 0,
        somaRecPagar: 0,
        somaRecPagas: 0,
        despesas: 0,
        receitas: 0,
        visivel: false,
        dataInicial: '',
        dataFinal: '',
          
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
    methods:{
        listarDespesasAPagar(){
          Loading.show({message: 'Aguardando Dados...'})
          axios.get(API + 'conta/obterContas?tipo=CP&pagas=false')//&dataInicial=' + this.dataInicial + '&dataInicial=' + this.dataFinal)
          .then((res)=>{
              //console.log(res)
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
              //console.log(res)
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
              //console.log(res)
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
              //console.log(res)
              this.recPagas = res.data
              Loading.hide()
          })
          .catch((e)=>{
            console.log(e)
            Loading.hide()
          })  
        },
        calcDespPagar(){
          this.listarDespesasAPagar()
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
          let a = this.recPagas.filter(d => d.vencimento >= this.dataInicial && d.vencimento <= this.dataFinal)
          let lista = []
          
          lista = a.map(row => row.valorPago)
          
          this.somaRecPagas = lista.reduce(function(a, b) {
            return a + b;
          });
        },
        totalDespesas(){
            this.despesas = this.somaDespPagar + this.somaDespPagas
        },
        totalReceitas(){
            this.receitas = this.somaRecPagar + this.somaRecPagas
        },
        montarGrafico(){
            let a = this.data.datasets[0].data
            let b = this.data.datasets[1].data
            
            a.push(this.despesas.toFixed(2))
            b.push(this.receitas.toFixed(2))
            
            this.visivel = true
        },
        listar(){
            let t = this
            t.listarDespesasAPagar()
            t.listarDespesasPagas()
            /*t.listarReceitasAPagar()
            t.listarReceitasPagas() */  
        },
        getContas(){
            let t = this
            t.listar()
            t.calcRecPagar()
            t.calcRecPagas()
            t.calcDespPagar()
            t.calcDespPagas()
            t.totalDespesas()
            t.totalReceitas()
            t.visivel = true
        }
    },
    mounted(){
        //this.listar() 
    }
  }
</script>

<style scoped>
    .datas{
        padding: 0 10px
    }
</style>
