<template>
  <div>
    <h5>Caixa</h5>
    <!-- Botão flutuante -->
    <q-fixed-position class="fixo" corner="bottom-left" :offset="[18, 18]">
        <q-btn 
           round
           color="primary" 
           @click="goBack">
           <q-icon name="chevron_left" />
        </q-btn>
    </q-fixed-position>
    
    <div class="row">
        <div class="col-xl-6">
        
        <q-select
          filter
          :float-label="caixaLabel"
          v-model="idCaixa"
          :options="listaCaixas"
          @change="getFechamento"
        />
        
        <q-checkbox
          v-model="checked"
          color="primary"
          left-label
          label="Obter Caixas Fechados"
          @change="obterCaixasFechados"
          style="margin-bottom: 30px"
        /><br />
        
        
        <q-btn color="primary"
               rounded
               v-if="checked === false"
               >fechar este caixa
        </q-btn><br><br>

        <q-list style="background-color: white">
          <q-list-header>Fechamento do Caixa</q-list-header>
          <q-item>
            <q-item-side icon="attach_money" />
            <q-item-main label="Operador:" :sublabel="nomeUsuario"/>
            Numero caixa: {{numeroCaixa}}<br>
          </q-item>
          <q-item>
            <q-item-main label="Período:" :sublabel="periodo" />
          </q-item>
          <q-item-separator />
          <q-collapsible opened label="Totais em Dinheiro">
            <q-item>
                <table class="q-table responsive">
                  <tbody>
                    <tr>
                      <td class="text-left"><i class="material-icons">send</i></td>
                      <td class="text-left">SUPRIMENTOS</td>
                      <td class="text-left">{{somaSuprimentos | formatMoney}}</td>
                    </tr>
                    <tr>
                      <td class="text-left"><i class="material-icons">send</i></td>
                      <td class="text-left">VENDAS</td>
                      <td class="text-left">{{somaVendas | formatMoney}}</td> 
                    </tr>
                    <tr>
                      <td class="text-left"><i class="material-icons">send</i></td>
                      <td class="text-left">RECEBIMENTOS</td>
                      <td class="text-left">{{somaRecebimentos | formatMoney}}</td>
                    </tr>
                    <tr>
                      <td class="text-left"><i class="material-icons">send</i></td>
                      <td class="text-left">ACRESCIMOS</td>
                      <td class="text-left">{{somaAcrescimos | formatMoney}}</td>
                    </tr>
                    <tr>
                      <td class="text-left"><i class="material-icons">send</i></td>
                      <td class="text-left">SANGRIAS</td>
                      <td class="text-left">{{somaSangrias | formatMoney}}</td>
                    </tr>

                  </tbody>
                </table>
            </q-item>
          <q-item-separator />
          </q-collapsible>
          <q-item-separator />
          <q-collapsible label="Conferencia de Caixa" v-if="checked === true">
            <q-item>
              <table class="q-table responsive">
                  <tbody>
                    <tr>
                      <td class="text-left"><i class="material-icons">send</i></td>
                      <td class="text-left">Total Informado</td>
                      <td class="text-left">{{somaConferencias | formatMoney}}</td> 
                    </tr>
                    <tr>
                      <td class="text-left"><i class="material-icons">send</i></td>
                      <td class="text-left">Total do Caixa</td>
                      <td class="text-left">{{somaSaldo | formatMoney}}</td> 
                    </tr>
                    <tr>
                      <td class="text-left"><i class="material-icons">send</i></td>
                      <td class="text-left">Saldo do Caixa:</td>
                      <td class="text-left" :class="isNegative">{{somaDiferenca | formatMoney}}</td> <!--  -->
                    </tr>
                  </tbody>
                </table>
            </q-item>
          </q-collapsible>
          <q-item-separator />
          <q-collapsible opened label="Formas de Pagamento">
            <q-item>
              <table class="q-table responsive">
                  <tbody>
                    <tr v-for="item in relFechamento.formasPgto">
                      <td class="text-left"><i class="material-icons">send</i></td>
                      <td class="text-left">{{item.nome}}</td>
                      <td class="text-left">{{item.valor | formatMoney}}</td>
                    </tr>

                  </tbody>
                </table>
            </q-item>
          </q-collapsible>
          <q-item-separator />
          <q-collapsible label="Detalhamento de Sangrias">
            <q-item>
                <table class="q-table responsive">
                  <tbody>
                    <tr v-for="item in relFechamento.sangrias">
                      <td class="text-left"><i class="material-icons">send</i></td>
                      <td class="text-left">{{item.motivo}}</td>
                      <td class="text-left">{{item.valor | formatMoney}}</td>
                      <td class="text-left">({{item.forma_Pgto}})</td>
                    </tr>
                  </tbody>
                </table>
            </q-item>
            <q-item>
                <q-item-main>Total: {{somaSangrias | formatMoney}}</q-item-main>
            </q-item>
          </q-collapsible>
          <q-item-separator />
          <q-collapsible label="Detalhamento de Suprimentos">
            <q-item>
                <table class="q-table responsive">
                  <tbody>
                    <tr v-for="item in relFechamento.suprimentos">
                      <td class="text-left"><i class="material-icons">send</i></td>
                      <td class="text-left">{{item.motivo}}</td>
                      <td class="text-left">{{item.valor | formatMoney}}</td>
                      <td class="text-left">({{item.forma_Pgto}})</td>
                    </tr>
                  </tbody>
                </table>
            </q-item>
            <q-item>
                <q-item-main>Total: {{somaSangrias | formatMoney}}</q-item-main>
            </q-item>
          </q-collapsible>
          <q-item-separator />
          <q-collapsible label="Recebimento de Crediário">
            <q-item>
                <table class="q-table responsive">
                  <tbody>
                    <tr v-for="item in relFechamento.recebimentosCrediario">
                      <td class="text-left"><i class="material-icons">send</i></td>
                      <td class="text-left">{{item.motivo}}</td>
                      <td class="text-left">{{item.valor | formatMoney}}</td>
                    </tr>
                  </tbody>
                </table>
            </q-item>
            <q-item>
                <q-item-main>Total: {{somaRecebimentos | formatMoney}}</q-item-main>
            </q-item>  
          </q-collapsible>
          <q-item-separator />
          <q-collapsible label="Vendas de Crediário">
            <q-item>
                <table class="q-table responsive">
                  <tbody>
                    <tr v-for="item in relFechamento.vendasCrediario">
                      <td class="text-left"><i class="material-icons">send</i></td>
                      <td class="text-left">{{item.motivo}}</td>
                      <td class="text-left">{{item.valor | formatMoney}}</td>
                    </tr>
                  </tbody>
                </table>
            </q-item>
            <q-item>
                <q-item-main>Total: {{somaVendasCred | formatMoney}}</q-item-main>
            </q-item> 
          </q-collapsible>
          <q-item-separator />
          <q-collapsible opened label="Vendas por Vendedor">
            <q-item>
              <table class="q-table responsive">
                  <tbody>
                    <tr v-for="item in relFechamento.vendasVendedor">
                      <td class="text-left"><i class="material-icons">send</i></td>
                      <td class="text-left">{{item.nomeUsuario}}</td>
                      <td class="text-left">{{item.valor | formatMoney}}</td> <!--  -->
                    </tr>
                  </tbody>
                </table>
            </q-item> 
            <q-item>
                <q-item-main>Total: {{somaVendas | formatMoney}}</q-item-main>
            </q-item>
          </q-collapsible>
          <q-item-separator />
          <q-item>
            <q-item-main>
                <center class="bold">{{hoje}}</center>
            </q-item-main>
          </q-item>
        </q-list> 

        </div>
    </div>
    <br><br><br> 
    
  </div>
</template>

<script>
import axios from 'axios'
import { Dialog, Loading } from 'quasar'
import bar from './charts/Bar.js' 
    
const API = localStorage.getItem('wsAtual')
  
//debug
//const API = 'http://192.168.0.200:29755/' 

export default {
  data () {
    return {
        caixa: [],
        idCaixa: '',
        caixaLabel: 'Caixas Abertos',
        checked: false,
        abertos: true,
        relFechamento: [],
        nomeUsuario: '',
        numeroCaixa: '',
        periodo: '',
        canGoBack: window.history.length > 1,
        
        
        vendedores: { // gráfico
          labels: [],
          datasets: []
        },
        width: 100,
        height: parseInt(localStorage.getItem('alturaGrafico')),
        tipo: '',
    }
  },
  components: {
    bar
  },
  computed:{
    listaCaixas(){
      let a = this.caixa
      let lista = []

      for (let i=0; i < a.length; i++) {
          let di = new Date(a[i].dataInicio).toLocaleString('pt-BR', {year: 'numeric',month: '2-digit',day: '2-digit'})
          let df = new Date(a[i].dataFechamento).toLocaleString('pt-BR', {year: 'numeric',month: '2-digit',day: '2-digit'})
          let n = a[i].usuario + ' (Inicio: ' + di + ' - Fechamento: ' + df + ')'
          let c = a[i].codigo
          lista.push({label: n, value: c})
      }
      
      return lista
    },
    somaSuprimentos(value){
      if(this.relFechamento.length === 0){ return 0 }
      let a = this.relFechamento.suprimentos
      console.log('supri', a.length);
      if(a.length === 0){ return 0 }
      let lista = []

      for (let i=0; i < a.length; i++) {
          let n = a[i].valor
          lista.push(n)
      }
       
      value = lista.reduce(function(a, b) {
        return a + b;
      });
      return value
    },
    somaVendas(value){  
      if(this.relFechamento.length === 0){ return 0 }
      let a = this.relFechamento.vendasVendedor
      console.log('vendas', a.length);
      if(a.length === 0){ return 0 }
      let lista = []

      for (let i=0; i < a.length; i++) {
          let n = a[i].valor
          lista.push(n)
      }
       
      value = lista.reduce(function(a, b) {
        return a + b;
      });
      return value
    },
    somaVendasCred(value){  
      if(this.relFechamento.length === 0){ return 0 }
      let a = this.relFechamento.vendasCrediario
      console.log('vendasCred', a.length);
      if(a.length === 0){ return 0 }
      let lista = []

      for (let i=0; i < a.length; i++) {
          let n = a[i].valor
          lista.push(n)
      }
       
      value = lista.reduce(function(a, b) {
        return a + b;
      });
      return value
    },
    somaRecebimentos(value){
      if(this.relFechamento.length === 0){ return 0 }
      let a = this.relFechamento.recebimentosCrediario
      console.log('recs', a.length);
      if(a.length === 0){ return 0 }
      let lista = []

      for (let i=0; i < a.length; i++) {
          let n = a[i].valor
          lista.push(n)
      }
       
      value = lista.reduce(function(a, b) {
        return a + b;
      });
      return value
    },
    somaAcrescimos(value){
      if(this.relFechamento.length === 0){ return 0 }
      let a = this.relFechamento.vendasCrediario
      console.log('acres', a.length);
      if(a.length === 0){ return 0 }
      let lista = []

      for (let i=0; i < a.length; i++) {
          let n = a[i].valor
          lista.push(n)
      }
       
      value = lista.reduce(function(a, b) {
        return a + b;
      });
      return value
    },
    somaSangrias(value){
      if(this.relFechamento.length === 0){ return 0 }
      let a = this.relFechamento.sangrias
      console.log('sangrias', a.length);
      if(a.length === 0){ return 0 }
      let lista = []

      for (let i=0; i < a.length; i++) {
          let n = a[i].valor
          lista.push(n)
      }
       
      value = lista.reduce(function(a, b) {
        return a + b;
      });
      return value
    },
    somaConferencias(value){
      if(this.relFechamento.length === 0){ return 0 }
      let a = this.relFechamento.fechamento
      console.log('sangrias', a.length);
      if(a.length === 0){ return 0 }
      let lista = []

      for (let i=0; i < a.length; i++) {
          let n = a[i].conferencia
          lista.push(n)
      }
       
      value = lista.reduce(function(a, b) {
        return a + b;
      });
      return value
    },
    somaDiferenca(value){
      /*if(this.relFechamento.length === 0){ return 0 }
      let a = this.relFechamento.fechamento
      console.log('sangrias', a.length);
      if(a.length === 0){ return 0 }
      let lista = []

      for (let i=0; i < a.length; i++) {
          let n = a[i].diferenca
          lista.push(n)
      }
       
      value = lista.reduce(function(a, b) {
        return a + b;
      });
      return value * -1*/
      value = this.somaConferencias - this.somaSaldo
      return value
    },
    somaSaldo(value){
      if(this.relFechamento.length === 0){ return 0 }
      let a = this.relFechamento.fechamento
      console.log('sangrias', a.length);
      if(a.length === 0){ return 0 }
      let lista = []

      for (let i=0; i < a.length; i++) {
          let n = a[i].valor
          lista.push(n)
      }
       
      value = lista.reduce(function(a, b) {
        return a + b;
      });
      return value
    },
    hoje(value){
        value = new Date()
        return new Date(value).toLocaleString('pt-BR', {weekday: 'long',year: 'numeric',month: '2-digit',day: '2-digit'})
    },
    isNegative(value){
        if(this.somaDiferenca > 0){
            value = true
        }
        return value
    }
    
  },
  methods: {
    goBack(){
      window.history.go(-1)
    },
    getFechamento(){
      Loading.show({message: 'Aguardando Dados...'})
      axios.get(API + 'caixa/gravarFechamentoCaixa?codigocaixa=' + this.idCaixa)
      .then((res)=>{
        //console.log(res.data)
        this.relFechamento = res.data
        this.nomeUsuario = this.relFechamento.abertura.nomeUsuario
        this.numeroCaixa = this.relFechamento.abertura.numeroCaixa
        let d = this.relFechamento.abertura
        let di = new Date(d.dataInicio).toLocaleString('pt-BR', {year: 'numeric',month: '2-digit',day: '2-digit'})
        let df = new Date(d.dataFechamento).toLocaleString('pt-BR', {year: 'numeric',month: '2-digit',day: '2-digit'})
        this.periodo = di + ' a ' + df
          
        Loading.hide()
      })
      .catch((e)=>{
        console.log(e)
        console.log(this.relFechamento[0].key)
        console.log(this.relFechamento[0].value)
        
        Dialog.create({
          title: this.relFechamento[0].key.toString(),
          message: this.relFechamento[0].value.toString(),
          buttons: [
            {
              label: 'OK'
            }
          ]
        })
        Loading.hide()
      })
    },
    getCaixa(){
      Loading.show({message: 'Aguardando Dados...'})
      axios.get(API + 'caixa/obterCaixaCab?aberto=' + this.abertos)
      .then((res)=>{
        //console.log(res.data)
        this.caixa = res.data
        Loading.hide()
      })
      .catch((e)=>{
        console.log(e.response)
        Dialog.create('Não há dados para exibir')
        Loading.hide()
      })
    },
    obterCaixasFechados(){
        if(this.checked === true){
            this.abertos = false
            this.caixaLabel = 'Caixas Fechados'
            this.getCaixa()
        }
        else{
            this.abertos = true
            this.caixaLabel = 'Caixas Abertos'
            this.getCaixa()
        }
    },
    abrirCaixa(){
        if(this.$route.query.q === 'save'){
            localStorage.setItem('cadMode', 'save')        
        }
        
        if(localStorage.getItem('cadMode') === 'edit'){
            this.abertos = false
            this.checked = true
            this.getCaixa()
            this.idCaixa = parseInt(localStorage.getItem('codCaixa'))
            this.getFechamento()
        }
    },
  },
  created(){
    let t = this
    t.getCaixa()
    t.abrirCaixa()
    
    

  }
}
</script>

<style >
    .bold{
        font-weight: bold
    }
    .fixo{
        z-index: 5
    }
    .isNegative{
        color: red
    }.
    table{
       margin-left: -15px 
    }    
</style>
