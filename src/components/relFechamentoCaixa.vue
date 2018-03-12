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
               @click="alertaAoFechar"
               >fechar este caixa
        </q-btn>
        <!--
        <q-btn color="primary"
               rounded
               @click="pdf"
               >imprimir este caixa
        </q-btn>
        -->  
        <br><br>
        
        <div ref="lista">
          
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
                      <td class="text-left" :class="status">{{somaDiferenca | formatMoney}}</td> <!--  -->
                    </tr>
                  </tbody>
                </table>
            </q-item>
          </q-collapsible>
          <q-item-separator v-if="checked === true" />
          <q-collapsible opened label="Formas de Pagamento">
            <q-item>
              <table class="q-table responsive">
                  <tbody>
                    <tr v-for="item in relFechamento.formasPgto">
                      <td class="text-left"><i class="material-icons">send</i></td>
                      <td class="text-left">{{item.formaPgtoNome}}</td>
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
                      <td class="text-left">{{item.forma_Pgto}}</td>
                      <td class="text-left">{{item.valor | formatMoney}}</td>
                      <td class="text-left">{{item.nomeCliente}}</td>
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
                      <td class="text-left">{{item.forma_Pgto}}</td>
                      <td class="text-left">{{item.valor | formatMoney}}</td>
                      <td class="text-left">{{item.nomeCliente}}</td>
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
          <q-collapsible label="Gráfico Vendas Vendedor" 
                         icon="insert_chart"
                         v-if="visivel"
                         >
            <bar :data="data"></bar>
          </q-collapsible>
          <q-item-separator v-if="visivel"/>
          <q-item>
            <q-item-main>
                <center class="bold">{{hoje}}</center>
            </q-item-main>
          </q-item>
        </q-list> 
          
        </div>

        </div>
      
    </div>
    <br><br><br><br> 
    
  </div>
</template>

<script>
import axios from 'axios'
import { Dialog, Loading } from 'quasar'
import bar from './charts/Bar2.js' 
import { FulfillingBouncingCircleSpinner } from 'epic-spinners'

//const $ = require("jquery")
import JsPDF from 'jspdf'

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
        status: '',
        view: '',
        canGoBack: window.history.length > 1,
        
        data: { // gráfico
          labels:  [],
          datasets: []
        },
        visivel: false,
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
      let di, df = ''

      for (let i=0; i < a.length; i++) {
          if(a[i].usuario){
              di = new Date(a[i].dataInicio).toLocaleString('pt-BR', {year: 'numeric',month: '2-digit',day: '2-digit'})
              if(a[i].dataFechamento !== null){
                df = new Date(a[i].dataFechamento).toLocaleString('pt-BR', {year: 'numeric',month: '2-digit',day: '2-digit'})
              }
              else {
                df = ''
              }
              let n = a[i].usuario + ' (Inicio: ' + di + ' - Fechamento: ' + df + ')'
              let c = a[i].codigo
              lista.unshift({label: n, value: c})
          }
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
      console.log('conferencias', a.length);
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
      console.log('diferencias', a.length);
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
        
      if(value < 0){
        this.status = 'isNegative'
      }
      else{
        this.status = 'isPositive'
      }
      
      return value
    },
    somaSaldo(value){
      if(this.relFechamento.length === 0){ return 0 }
      let a = this.relFechamento.fechamento
      console.log('saldo', a.length);
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
    VendedoresNomes(){
      let a = this.relFechamento.vendasVendedor
      if(!this.relFechamento.vendasVendedor){ return [] }
      let lista = []

      for (let i=0; i < a.length; i++) {
          let n = a[i].nomeUsuario
          lista.push(n)
      }
      
      return lista    
    
    },
    VendedoresResult(){
      let a = this.relFechamento.vendasVendedor
      if(!this.relFechamento.vendasVendedor){ return [] }
      let lista = []

      for (let i=0; i < a.length; i++) {
          let n = a[i].valor
          lista.push(n)
      }
      
      return lista 
        
    },
    
    
  },  
  methods: {
    goBack(){
      window.history.go(-1)
    },
    listaVendedoresNomes(){
      let a = this.relFechamento.vendasVendedor
      if(!this.relFechamento.vendasVendedor){ return [] }
      let lista = []

      for (let i=0; i < a.length; i++) {
          let n = a[i].nomeUsuario
          lista.push(n)
      }
      
      this.data.labels = lista
    
    },
    listaVendedoresResult(){
      let a = this.relFechamento.vendasVendedor
      if(!this.relFechamento.vendasVendedor){ return [] }
      let lista = []

      for (let i=0; i < a.length; i++) {
          let n = a[i].valor
          lista.push(Math.round(n))
      }
      
      this.data.datasets.push({
                                label: 'Vendedores',
                                backgroundColor: '#80CBC4',
                                data: lista
      })
        
    },
    getFechamento(){
      Loading.show({
          spinner: FulfillingBouncingCircleSpinner,
          spinnerSize: 140,
          message: 'Aguardando Dados...'
      })
      axios.get(API + 'caixa/obterFechamentoCaixa?codigocaixa=' + this.idCaixa + '&FechamentoTodos=true')
      .then((res)=>{  
        Loading.hide()
        console.log(res)
        this.relFechamento = res.data
        this.nomeUsuario = this.relFechamento.abertura.nomeUsuario
        this.numeroCaixa = this.relFechamento.abertura.numeroCaixa
        let d = this.relFechamento.abertura
        let di = new Date(d.dataInicio).toLocaleString('pt-BR', {year: 'numeric',month: '2-digit',day: '2-digit'})
        let df = new Date(d.dataFechamento).toLocaleString('pt-BR', {year: 'numeric',month: '2-digit',day: '2-digit'})
        this.periodo = di + ' a ' + df
        //grafico  
        this.listaVendedoresNomes()
        this.listaVendedoresResult()
        this.visivel = true

      })
      .catch((e)=>{
        console.log(e.response)
        Loading.hide()
      })
    },
    getCaixa(){
      Loading.show({
          spinner: FulfillingBouncingCircleSpinner,
          spinnerSize: 140,
          message: 'Aguardando Dados...'
      })
      axios.get(API + 'caixa/obterCaixaCab?aberto=' + this.abertos)
      .then((res)=>{
        Loading.hide()
        //console.log(res.data)
        this.caixa = res.data
      })
      .catch((e)=>{
        Loading.hide()
        console.log(e.response)
        Dialog.create('Não há dados para exibir')
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
            if(!this.$route.query.a){
                this.checked = true
                this.abertos = false
            }
            this.getCaixa()
            this.idCaixa = parseInt(localStorage.getItem('codCaixa'))
            this.getFechamento()
        }
    },
    alertaAoFechar(){
        if(this.relFechamento.length === 0){
            Dialog.create({
                title: 'Você não pode fechar um caixa antes de obtê-lo.',
                message: 'Selecione um caixa acima <i class="fa fa-hand-o-up" aria-hidden="true"></i>',
                buttons: [
                            {
                               label: 'OK',
                               raised: true,
                            }
                                    ]
                })
            return
        }
        
        Dialog.create({
          title: '<i class="material-icons text-negative">warning</i>' + ' Atenção!',
          message: 'Você está prestes a fechar este caixa, tem certeza?',
          buttons: [
            {
              label: 'Não',
              color: 'negative',
              raised: true,
            },
            {
              label: 'Sim',
              color: 'positive',
              raised: true,
              handler: () => {
                this.fecharCaixa()
              }
            }
          ]
        })    
    },
    fecharCaixa(){
      Loading.show({
          spinner: FulfillingBouncingCircleSpinner,
          spinnerSize: 140,
          message: 'Aguardando Dados...'
      })
      axios.post(API + 'caixa/GRAVARFechamentoCaixa?codigocaixa=' + this.idCaixa)
      .then((res)=>{  
        Loading.hide()
        console.log(res.data)
        this.relFechamento = res.data
        this.nomeUsuario = this.relFechamento.abertura.nomeUsuario
        this.numeroCaixa = this.relFechamento.abertura.numeroCaixa
        let d = this.relFechamento.abertura
        let di = new Date(d.dataInicio).toLocaleString('pt-BR', {year: 'numeric',month: '2-digit',day: '2-digit'})
        let df = new Date(d.dataFechamento).toLocaleString('pt-BR', {year: 'numeric',month: '2-digit',day: '2-digit'})
        this.periodo = di + ' a ' + df
        this.checked = true

      })
      .catch((e)=>{
        console.log(e.response)
        Loading.hide()
      })
    
    },
    pdf() {
      let doc = new JsPDF('p', 'pt', 'a4')
      // source can be HTML-formatted string, or a reference
      // to an actual DOM element from which the text will be scraped.
      //let source = this.$refs.lista.innerHTML //document.getElementById('lista').innerHTML
      //let source = $('#lista').get(0).innerHTML
      //let source = this.html.src
      let source = '<h1>7Virtual</h1>'
      console.log('source', source);
      console.log('tipo source:', typeof source);
      
      // we support special element handlers. Register them with jQuery-style 
      // ID selector for either ID or node name. ("#iAmID", "div", "span" etc.)
      // There is no support for any other type of selectors 
      // (class, of compound) at this time.
      let specialElementHandlers = {
          // element with id of "bypass" - jQuery style selector
          'table': function (element, renderer) {
              // true = "handled elsewhere, bypass text extraction"
              return true
          }
      };
      let margins = {
          top: 30,
          bottom: 30,
          left: 20,
          width: 900
      };
      // all coords and widths are in jsPDF instance's declared units
      // 'inches' in this case
      doc.fromHTML(
          source.toString(), // HTML string or DOM elem ref.
          margins.left, // x coord
          margins.top, { // y coord
              'width': margins.width, // max width of content on PDF
              'elementHandlers': specialElementHandlers
      })
      
      //doc.text('This is a test', 10, 10)
      
      
      doc.save('Test.pdf');
    },
  },
  created(){
    let t = this
    t.getCaixa()
    t.abrirCaixa()
  }
}
</script>

<style scoped>
    .bold{
        font-weight: bold
    }
    .fixo{
        z-index: 5
    }
    .isNegative{
        color: red;
        font-weight: bold
    }
    .isPositive{
        color: limegreen;
        font-weight: bold
    }
    table{
       margin-left: -15px
    }    
</style>
