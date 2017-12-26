<template>
  <div>
    <q-select
      float-label="Mês"
      v-model="mes"
      :options="meses"
      @change="getCaixaMes"
    />
    
    <div id="table">
        <table class="q-table" :class="computedClasses" style="margin-left:1px">
          <thead>
            <tr>
              <th>Abertura</th>
              <th>Fechamento</th>
              <th>Operador</th>
              <th>Status</th>
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
      
  </div>
</template>

<script>

import { Loading } from 'quasar'
import axios from 'axios'
    
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
    }
  },
  methods: {
    getCaixaMes(){
      Loading.show({message: 'Aguardando Dados...'})
      axios.get(API + 'caixa/obterCaixaMes?Mes=' + this.mes)
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
      
    }
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
</style>
