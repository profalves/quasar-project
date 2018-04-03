<template>
<div id="clientes">
  <h5>Financeiro</h5>
  <!-- Botão ADD -->
    <q-fixed-position class="over" corner="bottom-right" :offset="[18, 18]">
        <q-btn 
           round
           color="primary" 
           @click="novo">
           <q-icon name="add" />
        </q-btn>
    </q-fixed-position>
    
    <!-- Botão voltar -->
    <q-fixed-position class="fixo" corner="bottom-left" :offset="[18, 18]">
        <q-btn 
           round
           color="primary" 
           @click="goBack">
           <q-icon name="keyboard_arrow_left" />
        </q-btn>
    </q-fixed-position>
    
    <!-- Botão sync -->
    <q-fixed-position class="fixo" corner="bottom-left" :offset="[88, 18]">
        <q-btn 
           round
           color="primary" 
           @click="sync">
           <q-icon name="sync" />
        </q-btn>
    </q-fixed-position>
    
  <div id="lista">
      
    <div class="row">
        <div class="col-md-3">
            <q-field>
                <q-select
                    stack-label="Tipo"
                    v-model="tipo"
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
        <div v-else class="col-md-7 col-xs-12">
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
    
    <center>
      <h4>Total: {{totalContas | formatMoney}}</h4>
    </center>
    
    <q-data-table
      ref="dtable"
      :data="contasFilter"
      :config="config"
      :columns="colunas"
      @refresh="refresh"
      @selection="selection"
      @rowclick="rowClick"
      style="background-color:white;"
    >
      <template slot="selection" scope="props">
        <q-btn flat small 
               color="primary" 
               @click="selectAll">
          Selecionar todos
        </q-btn>
        <q-btn flat 
               color="primary" 
               @click="editar(props)" 
               v-if="visivel">
          <q-icon name="edit" />
        </q-btn>
        <q-btn v-if="subtipo === false"
               flat 
               color="primary" 
               @click="baixarTitulos(props)">
          Baixar
        </q-btn>
        <q-btn flat 
               color="primary" 
               @click="deleteRow(props)">
          <q-icon name="delete" /> Excluir parcela
        </q-btn>
        <q-btn v-if="selecionados < 2 && codigoCab > 0"
               flat color="primary" 
               @click="deleteAll(props)">
          <q-icon name="delete_forever" /> Excluir conta
        </q-btn>
      </template>
    </q-data-table>
    
   
    
    <!-- Configurações -->
    <q-collapsible
      label="Opções"
      icon="settings"
      style="background-color:white;
             margin-bottom:100px;"
      class="shadow-2"
    >
        
      <!--<q-field
        icon="title"
        label="Nome da Tabela"
        :label-width="4"
      >
        <q-input v-model="config.title" />
      </q-field>-->

        
      <q-field
        icon="widgets"
        label="Recursos"
        :label-width="4"
      >
        <div class="column group" style="margin: -5px -7px">
          <q-checkbox v-model="config.refresh" label="Atualizar tabela (refresh)" />
          <q-checkbox v-model="config.columnPicker" label="Selecionar colunas" />
          <q-checkbox v-model="pagination" label="Paginação" />
          <q-checkbox v-model="config.responsive" label="Responsiva" />
          <q-checkbox v-model="config.noHeader" label="Sem Cabeçário" />
        </div>
      </q-field>

      <q-field
        icon="check box"
        label="Tipo de Seleção"
        :label-width="4"
      >
        <q-select
          v-model="config.selection"
          class="col-xs-12 col-sm"
          float-label="Seleção"
          :options="[
            {label: 'Nenhuma', value: false},
            {label: 'Singular', value: 'single'},
            {label: 'Multipla', value: 'multiple'}
          ]"
        />
      </q-field>

      <!--<q-field
        icon="place"
        label="Sticky Columns"
        :label-width="4"
      >
        <q-select
          v-model="config.leftStickyColumns"
          class="col-xs-12 col-sm"
          float-label="Left Sticky Columns"
          :options="[
            {label: 'None', value: 0},
            {label: '1', value: 1},
            {label: '2', value: 2}
          ]"
        />
        <br>
        <q-select
          v-model="config.rightStickyColumns"
          class="col-xs-12 col-sm"
          float-label="Right Sticky Columns"
          :options="[
            {label: 'None', value: 0},
            {label: '1', value: 1},
            {label: '2', value: 2}
          ]"
        />
      </q-field>-->

      <q-field
        icon="format_line_spacing"
        label="Altura das linhas"
        :label-width="4"
      >
        <q-slider v-model="rowHeight" :min="38" :max="200" label-always :label-value="`${rowHeight}px` "/>
      </q-field>

      <q-field
        icon="content_paste"
        label="Tamanho"
        :label-width="4"
      >
        <div class="row no-wrap items-center">
          <div class="col-auto" style="margin-top: 10px">
            <q-select
              v-model="bodyHeightProp"
              float-label="Style"
              :options="[
                {label: 'Auto', value: 'auto'},
                {label: 'Altura', value: 'height'},
                {label: 'Altura Min', value: 'minHeight'},
                {label: 'Altura Max', value: 'maxHeight'}
              ]"
            />
          </div>
          <q-slider class="col" v-model="bodyHeight" :min="100" :max="700" label-always :disable="bodyHeightProp === 'auto'" :label-value="`${bodyHeight}px`" />
        </div>
      </q-field>
    </q-collapsible>
  </div>
</div>
</template>

<script>
import { Alert, Dialog, Toast, Loading, clone, date } from 'quasar'
import axios from 'axios'
import { FulfillingBouncingCircleSpinner } from 'epic-spinners'
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
      tipo: 'cp',
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
      text: 'text',
      excluidos: '',
      codigoCab: '',
      selecionados: '',
      visivel: true,
      syncCount: 0,
      
      config: {
        title: '',
        refresh: (localStorage.getItem('refresh') === 'true'),
        noHeader: (localStorage.getItem('noHeader') === 'true'),
        columnPicker: (localStorage.getItem('columnPicker') === 'true'),
        bodyStyle: {
          maxHeight: '500px'
        },
        rowHeight: localStorage.getItem('rowHeight') + 'px',
        responsive: true, //(localStorage.getItem('responsive') === 'true')
        pagination: {
          rowsPerPage: parseInt(localStorage.getItem('rowsPerPage')),
          options: [5, 10, 15, 30, 50, 100]
        },
        selection: localStorage.getItem('selection'),
        messages: {
          noData: '<i class="material-icons">warning</i> Não há dados para exibir.',
          noDataAfterFiltering: '<i class="material-icons">warning</i> Sem resultados. Por favor, redefina suas buscas.'
        },
        // (optional) Override default labels. Useful for I18n.
        labels: {
          columns: 'Colunas',
          allCols: 'Todas',
          rows: 'Linhas',
          selected: {
            singular: 'item selecionado.',
            plural: 'itens selecionados.'
          },
          clear: 'limpar',
          search: 'Buscar',
          all: 'Todos'
        }
      },
      colunas: [
        {
          label: 'Vencimento',
          field: 'vencimento',
          width: '105px',
          classes: 'bg-grey-5',
          filter: true,
          type: 'string',
          sort (a, b) {
            return (new Date(b)) - (new Date(a))
          },
          format (value) {
            return new Date(value).toLocaleString('pt-BR', {year: 'numeric',month: '2-digit',day: '2-digit'})
          }
        },
        {
          label: 'Fornecedor',
          field: 'fornecedor',
          width: '120px',
          //classes: 'bg-orange-2',
          sort: true,
          filter: true,
          type: 'date',
          
        },
        /*{
          label: 'Tipo',
          field: 'rotation_period',
          filter: 'true',
          sort: true,
          format (value) {
            if (value < 24) {
              return '<i class="material-icons text-negative">thumb_down</i> - Despesa'
            }
            return '<i class="material-icons text-positive">thumb_up</i> - Receita'
          },
          width: '100px'
        },*/
        
        {
          label: 'Categoria',
          field: 'contaTipo',
          filter: true,
          sort: true,
          type: 'string',
          width: '100px'
        },
        
        /*{
          label: 'SubCategoria',
          field: 'contaSubTipo',
          filter: true,
          sort: true,
          type: 'string',
          width: '100px'
        }, 
          
        
        {
          label: 'Origem',
          field: 'codigoCab',
          filter: true,
          sort: true,
          type: 'number',
          width: '85px',
          format (value) {
            if (value <= 0) {
              return '<strong>AVULSA</strong>'
            }
            return '<strong>NOTA</strong>'
          },
        },*/
        
        {
          label: 'Total',
          field: 'valorTitulo',
          sort: true,
          filter: true,
          type: 'string',
          width: '100px',
          format (value) {
            function numberToReal(numero) {
                numero = numero.toFixed(2).split('.');
                numero[0] = "R$ " + numero[0].split(/(?=(?:...)*$)/).join('.');
                return numero.join(',');
            }
            let x = numberToReal(value);
            return x
          }
        }
      ],
      pagination: (localStorage.getItem('pagination') === 'true'),
      oldPagination: {
          rowsPerPage: parseInt(localStorage.getItem('rowsPerPage')),
          options: [5, 10, 15, 30, 50, 100]
      },
      rowHeight: parseInt(localStorage.getItem('rowHeight')),
      bodyHeightProp: localStorage.getItem('bodyHeightProp'),
      bodyHeight: parseInt(localStorage.getItem('bodyHeight')),
        
      //datatime
      dias: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
      meses: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    }
  },
  computed: {
    listaCodCab(){
        let a = this.contas
        let lista = []
        
        for(let i=0; i < a.length; i++){
            if(this.contas[i].codigoCab > 0){
                lista.push(this.contas[i])
            }
        }
        
        return lista
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
  methods: {
    goBack(){
        window.history.back()
    },
    listarContas(){
      if(localStorage.getItem('loadContas') === 'true'){
          Loading.show({
              spinner: FulfillingBouncingCircleSpinner,
              spinnerSize: 140,
              message: 'Aguardando Dados...'
          })
          axios.get(API + 'conta/obterContas?tipo=' + this.tipo + '&pagas=' + this.subtipo)
          .then((res)=>{
              console.log(res)
              this.contas = res.data.contas
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
    deleteRow(props){
      let row = props.rows
      console.log(row)
      this.excluidos = row
      Dialog.create({
          title: 'Excluir',
          message: 'Tem certeza que deseja excluir ' + this.excluidos.length + ' registro(s)?',
          buttons: [
            {
              label: 'Não! Cancela',
              color: 'negative',
              raised: true,
              style: 'margin-top: 20px',
              handler () {
                Toast.create('Cancelado...')
              }
            },
            {
              label: 'Sim! Pode excluir',
              color: 'positive',
              raised: true,
              style: 'margin-top: 20px',
              handler: () => {
                  let a = this.excluidos
                  let obj = {}

                  for (let i=0; i < a.length; i++) {
                      obj = a[i].data
                      let f = obj.fornecedor
                      let p = obj.numeroDocumento.split('/').pop()
                      Loading.show({
                          spinner: FulfillingBouncingCircleSpinner,
                          spinnerSize: 140,
                          message: 'Enviando Dados...'
                      })
                      axios.post(API + 'conta/excluirConta?codigo=' + obj.codigo)
                          .then((res)=>{
                              //console.log(res)
                              Toast.create('Parcela ' + p + ' de ' + f + ' foi excluida com sucesso')
                              Loading.hide()
                              this.listarContas()
                          })
                          .catch((e)=>{
                            console.log(e)
                            Loading.hide()
                            return
                          })  
                      
                  }
              }
            }
          ]
      })
    },
    deleteAll(props){
      let row = props.rows
      console.log(row)
      this.excluidos = row
      Dialog.create({
          title: 'Excluir',
          message: 'Tem certeza que deseja excluir a conta de ' + this.excluidos[0].data.fornecedor + ' e suas parcelas?',
          buttons: [
            {
              label: 'Não! Cancela',
              color: 'negative',
              raised: true,
              style: 'margin-top: 20px',
              handler () {
                Toast.create('Cancelado...')
              }
            },
            {
              label: 'Sim! Pode excluir',
              color: 'positive',
              raised: true,
              style: 'margin-top: 20px',
              handler: () => {
                  let a = this.excluidos
                  let obj = a[0].data
                  let f = obj.fornecedor
                  Loading.show({
                      spinner: FulfillingBouncingCircleSpinner,
                      spinnerSize: 140,
                      message: 'Enviando Dados...'
                  })
                  axios.post(API + 'conta/excluirConta?codigoCab=' + obj.codigoCab)
                      .then((res)=>{
                          //console.log(res)
                          Toast.create('Conta de ' + f + ' foi excluida com sucesso')
                          Loading.hide()
                          this.listarContas()
                      })
                      .catch((e)=>{
                        console.log(e)
                        Loading.hide()
                        return
                      })
              }
            }
          ]
      })
    },
    baixarTitulos(props){
      let row = props.rows
      console.log(row)
      this.excluidos = row
      Dialog.create({
          title: 'Excluir',
          message: 'Tem certeza que deseja baixar ' + this.excluidos.length + ' registro(s)?',
          buttons: [
            {
              label: 'Não! Cancela',
              color: 'negative',
              raised: true,
              style: 'margin-top: 20px',
              handler () {
                Toast.create('Cancelado...')
              }
            },
            {
              label: 'Sim! Pode baixar',
              color: 'positive',
              raised: true,
              style: 'margin-top: 20px',
              handler: () => {
                  let a = this.excluidos
                  let obj = {}
                  let lista = []
                  
                  for (let i=0; i < a.length; i++) {
                      obj = a[i].data
                      obj.pagamento = new Date().toISOString()
                      obj.valorPago = obj.valorTitulo
                      lista.push(obj)
                  }
                  
                  Loading.show({
                      spinner: FulfillingBouncingCircleSpinner,
                      spinnerSize: 140,
                      message: 'Enviando Dados...'
                  })
                  axios.post(API + 'conta/pagarContas', lista)
                      .then((res)=>{
                          //console.log(res)
                          Toast.create.positive('Titulos Baixados com sucesso')
                          Loading.hide()
                          this.listarContas()
                      })
                      .catch((e)=>{
                        console.log(e)
                        Loading.hide()
                        return
                      })  
                      
                
              }
            }
          ]
      })
    },
    refresh(done){
      this.listarContas()
      done()
    },
    editar(props){
      console.log(props.rows[0].data.codigo)
      let row = props.rows[0].data
      localStorage.setItem('codConta', row.codigo)
      localStorage.setItem('cadMode', 'edit')
      this.$router.push({ path: '/cadContas' }) 
    },
    selection(number, rows){
      if(rows.length > 1){
        this.visivel = false
      }
      else{
        this.visivel = true
      }
      console.log(`selecionou ${number}: ${rows}`)
      console.log(rows)
      this.codigoCab = rows[0]
      this.selecionados = number
    },
    rowClick(row){
      console.log('clicked on a row', row)
      localStorage.setItem('codConta', row.codigo)
      localStorage.setItem('cadMode', 'edit')
      let timeStamp = row.vencimento
      let formattedDate = date.formatDate(timeStamp, 'DD/MM/YYYY')
          
      Alert.create({
          enter: 'bounceInRight',
          leave: 'bounceOutRight',
          color: 'positive',
          icon: 'tag_faces',
          html: `Conta de ` + row.fornecedor + `<br>` +
                `Venc.: ` + formattedDate,
          position: 'bottom-center',
          actions: [
            {
              label: 'Abrir',
              handler: () => {
                this.$router.push({ path: '/cadContas' })
                console.log('acting')
              }
            },
            {
              label: 'Fechar',
              handler: () => {
                return;
              }
            }
          ]
      })
    },
    selectAll(number, rows) {
        this.$refs.dtable.clearSelection()
        
        for (let i in this.contasFilter){
            this.$refs.dtable.selectedRows.push(this.$refs.dtable.rows[i])
            this.$refs.dtable.rowSelection[i] = true
        }
        //this.$refs.dtable.toolbar = 'selection'
        console.log(`selecionou ${number}: ${rows}`)
        console.log(rows)
    },
    novo(){
      localStorage.setItem('cadMode', 'save')
      this.$router.push('/cadContas')
    },
    sync(){
      let c = 0  
      
      Loading.show({
          spinner: FulfillingBouncingCircleSpinner,
          spinnerSize: 140,
          message: 'Sincronizando contas...'
      })
      axios.get(API + 'conta/obterContas?tipo=cp&pagas=false')
      .then((res)=>{
          console.log('DespPagar', res.data)
          localforage.setItem('DespPagar', res.data.contas)
          c = c+1
          console.log('c', c);
          if(c === 4){ Loading.hide() }
      })
      .catch((e)=>{
        console.log(e.response)
        Loading.hide()
      })  
        
      axios.get(API + 'conta/obterContas?tipo=cp&pagas=true')
      .then((res)=>{
          console.log('DespPagas', res.data)
          localforage.setItem('DespPagas', res.data.contas)
          c = c+1
          console.log('c', c);
          if(c === 4){ Loading.hide() }
      })
      .catch((e)=>{
        console.log(e.response)
        Loading.hide()
      })  
        
      axios.get(API + 'conta/obterContas?tipo=cr&pagas=false')
      .then((res)=>{
          console.log('RecPagar', res.data)
          localforage.setItem('RecPagar', res.data.contas)
          c = c+1
          console.log('c', c);
          if(c === 4){ Loading.hide() }
      })
      .catch((e)=>{
        console.log(e.response)
        Loading.hide()
      })  
    
      axios.get(API + 'conta/obterContas?tipo=cr&pagas=true')
      .then((res)=>{
          console.log('RecPagas', res.data)
          localforage.setItem('RecPagas', res.data.contas)
          c = c+1
          console.log('c', c);
          if(c === 4){ Loading.hide() }
      })
      .catch((e)=>{
        console.log(e.response)
        Loading.hide()
      })
        
      
    
    }
  },
  beforeDestroy () {
    clearTimeout(this.timeout)
  },
  watch: {
    filtroPeriodo (value) {
        if(value === true){
            this.vencimento = ''
        }
        else{
            this.dataInicial = ''
            this.dataFinal = ''
        }
    
    },
    pagination (value) {
      if (!value) {
        this.oldPagination = clone(this.config.pagination)
        this.config.pagination = false
        return
      }
      this.config.pagination = this.oldPagination
    },
    rowHeight (value) {
      this.config.rowHeight = value + 'px'
    },
    bodyHeight (value) {
      let style = {}
      if (this.bodyHeightProp !== 'auto') {
        style[this.bodyHeightProp] = value + 'px'
      }
      this.config.bodyStyle = style
    },
    bodyHeightProp (value) {
      let style = {}
      if (value !== 'auto') {
        style[value] = this.bodyHeight + 'px'
      }
      this.config.bodyStyle = style
    },
    tipo (value) {
        if (value === 'r') {
            this.subDesp=false
        }
        else {
            this.subDesp=true
        }
    }
  },
  mounted(){
    if(localStorage.getItem('loadContas') === 'false'){
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
    if (localStorage.getItem('pagination') === 'false') {
      this.oldPagination = clone(this.config.pagination)
      this.config.pagination = false
      return
    }
    this.config.pagination = this.oldPagination
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
</style>