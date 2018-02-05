<template>
  <div id="dashboard">
    
    <h3 class="text-center">{{tempo}} {{user | capitalize}}</h3>
    <div class="text-center">{{today}}, {{currentDate}}</div>
    <div class="text-center clock" v-text="currentTime"></div>
      
    <div class="row">
      <div class="col-xl-6">
        <q-list inset-separator no-border>
          <q-list-header>Painel {{permissoes.funcao | capitalize}}</q-list-header>
          <!-- Menu -->
          <q-collapsible icon="menu" label="Menu">
            <div class="row text-center">
              <div class="col" @click="$router.push('clientes')">
                  <i class="fa fa-user fa-4x text-center text-blue-grey mHover"></i><br>
                  <p class="tile">Pessoas</p>
              </div>
              <div class="col" @click="$router.push('produtos')">
                  <i class="fa fa-shopping-basket fa-4x center text-secondary mHover"></i><br>
                  <p class="tile">Produtos</p>
              </div>
              <div class="col" @click="$router.push('contas')">
                  <i class="fa fa-money fa-4x center text-warning mHover"></i><br>
                  <p class="tile">Contas</p>
              </div>
            </div>
            <div class="row text-center">
              <div class="col" @click="$router.push('cadnotas?q=save')">
                  <i class="fa fa-file-text-o fa-4x text-center text-info mHover"></i><br>
                  <p class="tile">NF de Entrada</p>
              </div>
              <div class="col" @click="$router.push('relatorios')">
                  <i class="fa fa-line-chart fa-4x center text-primary mHover"></i><br>
                  <p class="tile">Relatórios</p>
              </div>
              <div class="col" @click="$router.push('usuarios')">
                  <i class="fa fa-users fa-4x center text-cyan mHover"></i><br>
                  <p class="tile">Usuários</p>
              </div>
            </div>
            <div class="row text-center">
              <div class="col" @click="$router.push('config')">
                  <i class="fa fa-cog fa-4x text-center mHover"></i><br>
                  <p class="tile">Configurações</p>
              </div>
            </div>
            
          </q-collapsible>
          <!-- Faturamento -->
          <q-collapsible v-if="permissoes.acessaFinanceiro" icon="attach_money" label="Faturamento" sublabel="Faturamento do dia: R$ 0,00 / Saldo: R$ 0,00">
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
          <!-- Vendas -->
          <q-collapsible v-if="permissoes.acessaFinanceiro" icon="grade" label="Vendas" sublabel="Total de vendas por vendedor"></q-collapsible>
          <!-- Contas -->
          <q-collapsible v-if="permissoes.acessaFinanceiro" icon="insert_chart" label="Contas" sublabel="Você tem 0 contas a pagar e 0 contas a receber hoje">
            <div class="layout-view">
              <div class="row">
                <div class="col-md-3">
                    <q-field>
                        <q-select
                            stack-label="Tipo"
                            v-model="tipoConta"
                            :options="tipos"
                            @change="listarContas"
                        />
                    </q-field>
                </div>
                <div class="col-md-3 col-xs-12 offset-md-1">
                    <q-field
                        v-if="subDesp"
                      >
                        <q-select
                            stack-label="Despesas"
                            v-model="subtipo"
                            :options="[
                                { label: 'a pagar', value: false},
                                { label: 'pagas', value: true}
                            ]"
                            @change="listarContas"
                        />
                    </q-field>
                    <q-field
                        v-else
                      >
                        <q-select
                            stack-label="Receitas"
                            v-model="subtipo"
                            :options="[
                                { label: 'a receber', value: false},
                                { label: 'pagas', value: true}
                            ]"
                            @change="listarContas"
                        />
                    </q-field>
                </div>  
                <div class="col-md-4 col-xs-12 offset-md-1">
                    <q-field
                        icon="filter_list"
                        >
                        <q-select
                            stack-label="Filtrar Data por"
                            v-model="filtroPeriodo"
                            :options="[
                                { label: 'Periodo', value: true},
                                { label: 'Dia Específico', value: false}
                            ]"
                            @change="listarContas"
                        />

                    </q-field> 
                </div>
              </div>
              <div class="row">
                  <div v-if="filtroPeriodo" class="col">
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
                  </div>
                  <div v-else class="col-md-6 col-xs-12">
                      <q-field
                          icon="today"
                          >
                          <q-datetime v-model="vencimento"
                                      type="date" 
                                      float-label="Dia Específico" 
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
            </div>

          </q-collapsible>
          <!-- Estoque Mínimo -->
          <q-collapsible icon="system_update_alt" label="Estoque Mínimo" sublabel="Você tem 0 produtos abaixo do estoque mínimo">
            
          </q-collapsible>
          <!-- Lista de Aniversariantes -->
          <q-collapsible icon="view_list" label="Lista de Aniversariantes" :sublabel="aniversariantes">
              <q-list highlight no-border v-if="visivel">
                <q-list-header>Aniversariantes</q-list-header>
                <q-item v-for="(item, index) in nivers" :key="index">
                  <q-item-main>
                    <q-item-tile label>{{ item.nome }}</q-item-tile>
                  </q-item-main>
                  <q-item-side right>
                    <q-fab color="primary" icon="keyboard_arrow_left" direction="left">
                        <q-fab-action color="lime" @click="msgEmail(item)" icon="mail" />
                        <q-btn
                          color="faded" 
                          rounded
                          @click="sms(item)"
                          >
                          SMS
                        </q-btn>
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
            <div v-if="fones.length === 0" class="layout-padding">
                <q-item>Nenhum telefone cadastrado</q-item>

            </div>
            <q-list link no-border v-else>
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

    <q-modal minimized ref="smsModal">
        <div>
            <div v-if="fones.length === 0" class="layout-padding">
                <q-item>Nenhum telefone válido cadastrado</q-item>

            </div>
            <q-list link no-border v-else>
                <q-list-header>Enviar SMS para {{pessoa}}</q-list-header>
                <q-item v-for="(fone, index) in fones" :key="index">
                    <a :href='`sms:${fone.numero}`'>{{fone.numero}}</a>
                </q-item>
                <q-item-separator />
            </q-list>
            <br>
            <q-btn color="primary" @click="$refs.smsModal.close()" id="btn-modal">Fechar</q-btn>
        </div>
    </q-modal>

    <q-modal minimized ref="emailModal">
        <div>
            <div v-if="emails.length === 0" class="layout-padding">
                <q-item>Nenhum email cadastrado</q-item>

            </div>
            <q-list link no-border v-else>
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
  import localforage from 'localforage'

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
        permissoes: {},
        
        //relógio
        currentDate: moment().format('LL'),
        currentTime: null,
        today: moment().format('dddd'),
          
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
        
        //contas
        contas: [],
        vencimento: moment().format('YYYY-MM-DDTHH:mm:SS'),
        dataInicial: '',
        dataFinal: '',
        tipoConta: 'cp',
        tipos: [
          {
            label: 'Despesas',
            value: 'cp'
          },
          {
            label: 'Receitas',
            value: 'cr'
          },
        ],
        subtipo: false,
        subDesp: true,
        filtroPeriodo: true,
        excluidos: '',
        codigoCab: '',
        selecionados: '',
        syncCount: 0,
        
        //datatime
        dias: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
        meses: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      }
    },
    computed:{
      computedClasses(){
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
      },
      contasFilter(){
        if(this.vencimento){
          let data = moment(this.vencimento).format('YYYY-MM-DDTHH:mm:SS')
          return this.contas.filter(row => row.vencimento.indexOf(data)>=0)
        }
        else if(this.dataInicial && this.dataFinal){
          let di = moment(this.dataInicial).format('YYYY-MM-DDTHH:mm:SS')
          let df = moment(this.dataFinal).format('YYYY-MM-DDTHH:mm:SS')
          return this.contas.filter(row => row.vencimento > di && row.vencimento < df)
        }
        else{
          return this.contas
        }
        
      },
      totalContas(){
        let a = this.contasFilter
        if(a.length === 0) return

        let lista = a.map(row => row.valorTitulo)

        let total = lista.reduce(function(a, b) {
          return a + b;
        });

        return total
      }

    },
    methods:{
      updateCurrentTime() {
        this.currentTime = moment().format('LTS');
      },
      getHoje(){
        Loading.show({
            spinner: AtomSpinner,
            spinnerSize: 140,
            message: 'Aguardando Dados...'
        })
        axios.get(API + 'pessoa/obteraniversariante')
        .then((res)=>{
          console.info(res.data)
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
      sms(item){
        this.$refs.smsModal.open()
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
      obterPermissoes(){
          localforage.getItem('usuario').then((value) => {
              if(value){
                  console.log(value)
                  this.permissoes = value
              }
              else{
                  console.log(value)
              }

          }).catch((err) => {
              console.log(err)
              console.log('fail')
          })
      },
      listarContas(){
        if(localStorage.getItem('loadContas') === 'false'){
            Loading.show({
                spinner: AtomSpinner,
                spinnerSize: 140,
                message: 'Aguardando Dados...'
            })
            axios.get(API + 'conta/obterContas?tipo=' + this.tipoConta + '&pagas=' + this.subtipo)
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
      
    },
    mounted(){
      this.currentTime = moment().format('LTS');
      setInterval(() => this.updateCurrentTime(), 1 * 1000);  

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
      this.obterPermissoes()
      this.listarContas()
      
    }  
  }
</script>
<style scoped>
  #btn-modal {
    margin: 0 0 15px 15px;
  }
  .clock {
    width: 100%;
    margin-top: 10px;
    color: slategray;
    font-size: 30px;
  }
  .tile {
    color: lightslategrey;
    font-weight: bold;
  }
</style>
