<template>
  <div>
    
    <h5>Vendas por Período de Notas</h5>
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
            />  

           </div>

        </div>
        
        <div></div>
        
        <q-btn color="primary"
               @click="getNotas"
               rounded>
               Visualizar</q-btn>
        
        
    </div>
  </div>
</template>

<script>
    
import { Loading, Toast } from 'quasar'
import axios from 'axios'
    
//const API = localStorage.getItem('wsAtual')
  
//debug
const API = 'http://192.168.0.200:29755/' 

export default {
  data () {
      return {
          canGoBack: window.history.length > 1,
          notas: [],
          familias: [],
          categorias: [],
          marcas: [],
          dataInicial: '',
          dataFinal: '',
          agrup: '', // agrp: cat, marca, familia, todos
          familia: '',
          vendedor: '',
          produto: '',
          codTipo: '',
          composicao: '',
          
          //datatime
          dias: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
          meses: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],

      }
  },
  methods:{
      goBack(){
        window.history.go(-1)
      },
      getNotas(){
        if(this.dataInicial === ''){
            Toast.create.negative('Selecione um período antes')
            return
        }
        
        Loading.show({message: 'Aguardando Dados...'})
        axios.get(API + 'relatorio/obterRptPorNota?' +
                'dataInicial=' + this.dataInicial +
                '&dataFinal=' + this.dataFinal +
                /*
                '&codCliente=' + 
                '&codVendedor= ' + 
                '&produto= ' + 
                '&tipoNota= ' +
                '&numerocupomde=' +
                '&numerocupomate=' +
                */
                '&ocultarExcluidos=false')
        .then((res)=>{
        console.log(res.data)
        this.notas = res.data
        Loading.hide()
        })
        .catch((e)=>{
        console.log(e.response)
        Loading.hide()
        })
      },
      listarFamilias(){
          axios.get(API + 'produto/obterProdutosFamilia')
          .then((res)=>{
            this.familias = res.data
          })
          .catch((e)=>{
            console.log(e)
          })
      },
      
      
  }
}
</script>

<style>
</style>
