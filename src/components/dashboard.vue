<template>
  <div id="dashboard">
      <div slot="header" class="toolbar">
        <q-toolbar-title :padding="1">
          
        </q-toolbar-title>
      </div>
      <h2>{{tempo}} {{user | capitalize}}</h2>
      
      <div class="row">
        <div class="col-xl-6">
          <q-list inset-separator no-border>
            <q-list-header>Painel Gestor</q-list-header>
            <!-- Faturamento -->
            <q-collapsible icon="attach_money" label="Faturamento" sublabel="Faturamento do dia: R$ 0,00 / Saldo: R$ 0,00">
              <div class="row">
                <div class="col">
                    <q-card>
                      <q-card-title>
                        Dia
                        <q-icon slot="right" name="more_vert">
                          <q-popover ref="popover">
                            <q-list link class="no-border">
                              <q-item @click="">
                                <q-item-main label="Total de Vendas" />
                              </q-item>
                              <q-item @click="">
                                <q-item-main label="Lucro" />
                              </q-item>
                            </q-list>
                          </q-popover>
                        </q-icon>
                      </q-card-title>
                      <q-card-separator />
                      <q-card-main class="text-center">
                          <q-knob
                            v-model="dia"
                            size="120px"
                            style="font-size: 1.5rem"
                            :color="faturaCorDia"
                            line-width="5px"
                            :min="min"
                            :max="maxDia"
                            :step="1"
                          >
                            R$ {{dia}}
                          </q-knob>
                      </q-card-main>
                    </q-card>  
                </div>
                <div class="col">
                    <q-card>
                      <q-card-title>
                        Mês
                        <q-icon slot="right" name="more_vert">
                          <q-popover ref="popover">
                            <q-list link class="no-border">
                              <q-item @click="">
                                <q-item-main label="Total de Vendas" />
                              </q-item>
                              <q-item @click="">
                                <q-item-main label="Lucro" />
                              </q-item>
                            </q-list>
                          </q-popover>
                        </q-icon>
                      </q-card-title>
                      <q-card-separator />
                      <q-card-main class="text-center">
                          <q-knob
                            v-model="mes"
                            size="120px"
                            style="font-size: 1.5rem"
                            :color="faturaCorMes"
                            line-width="5px"
                            :min="min"
                            :max="maxMes"
                            :step="1"
                            
                          >
                            <!--readonly-->
                            R$ {{mes}}
                          </q-knob>
                      </q-card-main>
                    </q-card>  
                </div>
              </div>
              
              
            </q-collapsible>
            <!-- Contas -->
            <q-collapsible icon="insert_chart" label="Contas" sublabel="Você tem 0 contas a pagar e 0 contas a receber">
                
              <div class="layout-view">
                   <q-select
                      v-model="tipo"
                      float-label="Tipo de Gráfico"
                      :options="[
                        {
                          label: 'Linha',
                          icon: 'show_chart',
                          value: 'line'
                        },
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
                       ]"
                   />

                  <chartLine :width="width" :height="height" :data="data" v-if="tipo === 'line'"></chartLine>
                  <bar :data="data" v-if="tipo === 'bar'"></bar>
                  <pie :data="data" v-if="tipo === 'pie'"></pie>
                  <donut :data="data" v-if="tipo === 'donut'"></donut>
                  <polar :data="data" v-if="tipo === 'polar'"></polar>
                  <radar :data="data" v-if="tipo === 'radar'"></radar>
                  <bubble :data="data" v-if="tipo === 'bolha'"></bubble>
              </div>
                
            </q-collapsible>
            <!-- Lista de Aniversariantes -->
            <q-collapsible icon="view_list" label="Lista de Aniversariantes" :sublabel="aniversariantes">
                <q-list highlight no-border v-if="visivel">
                  <q-list-header>Aniversariantes</q-list-header>
                  <q-item v-for="(item, index) in nivers" :key="index">
                    <q-item-main>
                      <q-item-tile label>{{ item.nome }}</q-item-tile>
                      <!--<q-item-tile sublabel>{{ item.nome }}</q-item-tile>-->
                    </q-item-main>
                    <q-item-side right>
                      <q-fab color="primary" icon="keyboard_arrow_left" direction="left">
                          <q-fab-action color="lime" @click="msgEmail(item)" icon="mail" />
                          <q-fab-action color="info" @click="fone(item)" icon="phone" />
                          <q-fab-action color="secondary" @click="whats(item)" icon="fa-whatsapp" />
                          <q-btn
                            color="primary" 
                            rounded
                            @click="abrir(item)"
                            >
                            abrir
                          </q-btn>
                      </q-fab>
                    </q-item-side>
                  </q-item>

                </q-list>
            </q-collapsible>
            
          </q-list>
            
        </div>
      </div>
      
      <q-modal minimized ref="telModal">
          <div>
              <q-list link no-border>
                  <q-list-header>Ligar para Telefone de {{pessoa}}</q-list-header>
                  <q-item v-for="(fone, index) in fones" :key="index">
                      <a :href='`tel:${fone.numero}`'>{{fone.numero}}</a>
                  </q-item>
                  <q-item-separator />
              </q-list>
              <br>
              <q-btn color="primary" @click="$refs.telModal.close()" id="btn-modal">Fechar</q-btn>
          </div>
      </q-modal>

      <q-modal minimized ref="emailModal">
          <div>
              <q-list link no-border>
                  <q-list-header>Enviar Email para {{pessoa}}</q-list-header>
                  <q-item v-for="(email, index) in emails" :key="index">
                      <a :href='`mailto:${email.endereco}`'>{{email.endereco}}</a>
                  </q-item>
                  <q-item-separator />
              </q-list>
              <br>
              <q-btn color="primary" @click="$refs.emailModal.close()" id="btn-modal">Fechar</q-btn>
          </div>
      </q-modal>
      
  </div>
</template>
<script type="text/javascript">
  import { Toast, Dialog, Loading, openURL } from 'quasar'
  import axios from 'axios'
  import { AtomSpinner } from 'epic-spinners'
  var moment = require('moment');
  require("moment/min/locales.min");
  moment.locale('pt-br');

  const API = localStorage.getItem('wsAtual')

  //debug
  //const API = 'http://192.168.0.200:29755/'
    
    
  import chartLine from './charts/Line.js'
  import bar from './charts/Bar.js'
  import pie from './charts/Pizza.js'
  import donut from './charts/Donuts.js'
  import polar from './charts/Polar.js'
  import radar from './charts/Radar.js'
  import bubble from './charts/Bubble.js'
  
    
  export default {
    name: 'DashBoard',
    components: {
        chartLine,
        bar,
        pie,
        donut,
        polar,
        radar,
        bubble
    },
    data () {
      return {
        //faturamento
        dia: 0,
        mes: 0,
        min: 0,
        maxDia: parseInt(localStorage.getItem('tetoDia')),
        maxMes: parseInt(localStorage.getItem('tetoMes')),
        tempo: '',
        
        //gráficos
        user: localStorage.getItem('nameUser'),
        tipo: localStorage.getItem('tipoGrafico'),
        width: 100,
        height: parseInt(localStorage.getItem('alturaGrafico')),
        data: {
          labels:  ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
          datasets: [
            {
              label: 'Ano Atual',
              backgroundColor: '#80CBC4',
              data: [40, 20, 12, 39, 10, 70, 39, 80, 40, 20, 12, 11]
            },
            {
              label: 'Ano Anterior',
              backgroundColor: '#05CBE1',
              data: [40, 50, 72, 30, 20, 10, 29, 90, 32, 24, 52, 15]
            }
          ],
          option: {
              options: '200px',
              backgroundColor: 'grey'
          }
        },
        
        //Aniversariantes
        nivers: '',
        pessoa: '',
        visivel: false,
        msg: '',
        fones: '',
        emails: '',
        
        //tabela
        misc: 'highlight', //[{value: 'bordered'},{value: 'highlight'}]
        separator: 'cell', // none, horizontal, vertical, cell
        stripe: 'odd', // none, odd, even
        type: 'none', // flipped, responsive
        gutter: 'none', // compact, loose
      }
    },
    computed:{
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
        faturaCorDia(){
            let meta = parseInt(localStorage.getItem('metaDia'))
            let quase = parseInt(localStorage.getItem('quaseDia'))
            
            if(this.dia>meta){
                return 'positive'
            }
            else if(this.dia>quase){
                return 'warning'
            }
            else{
                return 'negative'
            }    
        },
        faturaCorMes(){
            let meta = parseInt(localStorage.getItem('metaMes'))
            let quase = parseInt(localStorage.getItem('quaseMes'))
            
            if(this.mes>meta){
                return 'positive'
            }
            else if(this.mes>quase){
                return 'warning'
            }
            else{
                return 'negative'
            } 
        },
        aniversariantes(){
            if(this.msg) return this.msg
            return 'Aniversariantes Hoje: ' + this.nivers.length    
        }
    },
    methods:{
        getHoje(){
          Loading.show({
              spinner: AtomSpinner,
              spinnerSize: 140,
              message: 'Aguardando Dados...'
          })
          axios.get(API + 'pessoa/obteraniversariante')
          .then((res)=>{
            //console.info(res.data)
            if(typeof res.data !== 'string'){
                this.nivers = res.data
                this.visivel = true
            }
            else{
                this.msg = res.data
            }
            Loading.hide()
          })
          .catch((e)=>{
            console.log(e.response)
            Loading.hide()
          })
        },
        abrir(item){
          let row = item
          localStorage.setItem('codPessoa', row.codigo)
          localStorage.setItem('cadMode', 'edit')
          //localStorage.setItem('tela', 'nivers')
          this.$router.push({ path: '/cadcliente' }) 
        },
        msgEmail(item){
          this.$refs.emailModal.open()
          this.emails = item.endEletronico
          this.pessoa = item.nome
          //console.info(this.fones)
        },
        fone(item){
          this.$refs.telModal.open()
          this.fones = item.telefones
          this.pessoa = item.nome
          //console.info(this.fones)
        },
        whats(item){
          let row = item.telefones
          console.log('row', row);
          if(row.length < 1){
            Toast.create('Não há numeros salvos para este cadastro')
          }
          for(let i=0; i < row.length; i++){
              if(row[i].movel === true){
                let w = row[i].numero
                Dialog.create({
                  title: 'Enviar mensagem via Whatsapp para ' + w,
                  message: 'Digite a sua mensagem aqui abaixo e clique em enviar.',
                  form: {
                    msg: {
                      type: 'textarea',
                      label: 'Mensagem',
                      model: ''
                    }
                  },
                  buttons: [
                    {
                      label: 'Cancelar',
                      color: 'negative',
                    },
                    {
                      label: 'Enviar',
                      color: 'positive',
                      handler: (data) => {
                        //console.log(data)
                        //console.log('telefone:', w)
                        openURL('https://api.whatsapp.com/send?phone=' + 55 + w + '&text=' + data.msg)
                      }
                    }
                  ]
                })  
              }
              else{
               Toast.create('Não há celulares definidos para este cadastro')
              }
          }
        },
        
    },
    mounted(){
        if(new Date().getHours() < 12 && new Date().getHours() > 4){
            this.tempo = 'Bom dia'
        }
        else if(new Date().getHours() >= 12 && new Date().getHours() < 18){
            this.tempo = 'Boa tarde'
        }
        else{
            this.tempo = 'Boa noite'
        }
        
        this.getHoje()
        
    }
    
    
  }
</script>
<style>
    #btn-modal {
        margin: 0 0 15px 15px;
    }
</style>
