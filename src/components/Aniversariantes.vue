<template>
  <div>
    <h5>Lista de Aniversariantes</h5>
    
    <q-select
      float-label="Mês"
      v-model="mes"
      :options="meses"
      @change="getAniversariantes"
    />
    
    <div id="table">
        <table class="q-table" :class="computedClasses" style="margin-left:1px">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Data</th>
              <th>Enviar</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in caixa">
              <td data-th="Name">{{ item.nome }}</td>
              <td data-th="Aniversário">{{ item.dia }}</td>
              <td data-th="Enviar">
                <q-btn
                    color="primary" 
                    rounded
                    small
                    @click=""
                    id="btn"
                    >
                    <i class="fa fa-envelope-o fa-2x"></i>
                </q-btn>
                <q-btn
                    color="primary" 
                    rounded
                    small
                    id="btn"
                    >
                    <i class="fa fa-phone fa-2x"></i>
                </q-btn>
                <q-btn
                    color="primary" 
                    rounded
                    small
                    id="btn"
                    >
                    <i class="fa fa-whatsapp fa-2x"></i>
                </q-btn>
                <q-btn
                    color="primary" 
                    rounded
                    small
                    @click="abrir(item)"
                    id="btn"
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
import { AtomSpinner } from 'epic-spinners'
    
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
      mes: parseInt(localStorage.getItem('mesAniversariante')),
        
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
  filters:{
    formatNiver: function (value) {
        if(value === null) {return null}
        return new Date(value).toLocaleString('pt-BR', {month: '2-digit',day: '2-digit'})
    }
  },
  methods: {
    getAniversariantes(){
      localStorage.setItem('mesAniversariante', this.mes)
      Loading.show({
          spinner: AtomSpinner,
          spinnerSize: 140,
          message: 'Aguardando Dados...'
      })
      axios.get(API + 'pessoa/obteraniversariante?mes=' + this.mes)
      .then((res)=>{
        console.log(res.data)
        this.caixa = res.data
        Loading.hide()
      })
      .catch((e)=>{
        console.log(e.response)
        Loading.hide()
      })
    },
    msgEmail(item){},
    fone(item){},
    whats(item){},
    abrir(item){
      let row = item
      localStorage.setItem('codPessoa', row.codigo)
      localStorage.setItem('cadMode', 'edit')
      localStorage.setItem('tela', 'nivers')
      this.$router.push({ path: '/cadcliente' }) 
    }
    
  },
  created(){
    if(localStorage.getItem('mesAniversariante') && localStorage.getItem('tela') === 'nivers'){
      this.getAniversariantes()  
    }
    else{
      localStorage.setItem('mesAniversariante', '')
    }
  }
  
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
    
    th {
        background-color: white;
    }
    
    #btn {
        margin: 0 0 5px 5px;
    }
    
</style>
