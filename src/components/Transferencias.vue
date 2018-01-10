<template>
  <div>
    <div class="row topo" style="margin-bottom:20px">
      <q-btn
        color="primary"
        push
        @click="goBack"
      >
        <i class="material-icons">arrow_back</i>
      </q-btn>
      
      <!--<q-btn
        color="negative"
        push big
        @click="excluir"
        style="margin-left:5px;"
        v-if="btnDelete"
      >
        <i class="material-icons">delete</i>
      </q-btn>-->
      
      
      
    </div>
    <!-- formulário -->
    <div class="row">
        <div class="col">
            <h5>Transferência de Estoque entre Filiais</h5>
        </div>
    </div>
    
    
    Transferir para a empresa: {{empDest.nome}}<br>

    <q-toolbar slot="header" inverted color="tertiary">
       <q-radio v-model="tipoCod" 
                val="barras"
                label="Cód. Barras" 
                @focus="search = ''" />
       <q-radio v-model="tipoCod" 
                val="emp" 
                label="Cód. Emp" 
                style="margin-left:20px"  
                @focus="search = ''" />
       <q-radio v-model="tipoCod" 
                val="nome"
                label="Nome" 
                style="margin-left:20px" 
                @focus="search = ''" />
    </q-toolbar>

    <q-search  
             v-model="search" 
             color="none" 
             style="margin-left: 10px"
             placeholder="Procurar..."
             @keyup.enter="listarProdutos"
             @blur="listarProdutos"
             v-if="tipoCod === 'nome'"
             >
        <q-autocomplete
          :static-data="{field: 'label', list: listaItens}"
          @selected="listarProdutos"
        />

    </q-search>
    <q-search
             v-model="search" 
             color="none" 
             style="margin-left: 10px"
             placeholder="Procurar..."
             @keyup.enter="listarProdutos"
             @blur="listarProdutos"
             v-else
             >

    </q-search>
      
    <div class="row" >
        <div class="col-8">
            <h5>{{ produto.nome }}</h5>
        </div>
        <div class="col" style="margin-top: 20px;
                                text-align: right;">
            Estoque Atual: <strong style="color: orangered;">{{ produto.qtd }}</strong>
        </div>
    </div>
    
    <div class="row">
        <div class="col col-xl-4">
            <q-input v-model="qtd" 
                     type=number 
                     float-label="Quantidade"
                     @keyup.enter="alertAdd" />    
        </div>    
        <div class="col button">
            <q-btn color="blue-9" @click="alertAdd">Adicionar Produto</q-btn>    
        </div>
    </div>
    <br>
    
    <div v-if="transferencias.length>0">
        <div id="table">
            <table 
                class="q-table" 
                :class="computedClasses" 
                style="width: 100%">
              <thead>
                <tr>
                  <th class="text-left">Cód. Barras</th>
                  <th class="text-left" width="50%">Produto</th>
                  <th class="text-left">Quant.</th>
                  <th class="text-left">Excluir</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in transferencias">
                  <td class="text-left">{{item.codBarra}}</td>
                  <td class="text-left">{{item.nome}}</td>
                  <td class="text-right">{{item.qtd}}</td>
                  <td class="text-center"><i class="material-icons text-negative icon" @click="excluirProduto(index)">delete_forever</i></td>
                </tr>
              </tbody>
            </table>  
        </div>
        <br>
        
        <q-btn color="blue-9"
               big
               rounded
               @click="enviar"
               >Enviar</q-btn>
    </div>
    
    
    
    <!-- MODAL -->
       
    <q-modal ref="modal" 
             minimized
             no-backdrop-dismiss
             no-esc-dismiss
             :content-css="{padding: '50px'}">
      <h4>Empresa Destino</h4>
      <p>Para sair, clique no botão sem selecionar nenhuma empresa</p>
      <q-select
          v-model="dest"
          :options="listaEmpresas"
      />
      <q-btn color="primary" rounded @click="$refs.modal.close(setEmpresa)">Selecionar</q-btn>
    </q-modal>
        
  </div>
</template>

<script>
import { Loading, Toast, Dialog } from 'quasar'
import axios from 'axios'
import { AtomSpinner } from 'epic-spinners'
    
const API = localStorage.getItem('wsAtual')
  
//debug
//const API = 'http://192.168.0.200:29755/'     

export default {
  data () {
    return {
      tipoCod: 'nome',
      search: '',
      transferencias: [],
      produtos: [],
      produto: {},
      qtd: 1,
      index: '',
      dest: '',
      empDest: {},
      configs: [],
      configDestino: {
        "$id": "1",
        "delivery": {
          "$id": "2",
          "solicitaSenha": true,
          "ramoAtividade": null,
          "layoutModoTouch": false,
          "layoutModoNormal": true,
          "imprimirComposicaoProduto": true,
          "imprimirAoFecharConta": true,
          "solicitaSenha1Vez": true,
          "pcServidor": false,
          "modoFicha": false,
          "imprimeItensAgrupados": true,
          "cobrarTaxaServico": true,
          "notificaSenhas": false,
          "numeroSenha": 0,
          "backupAutoMinutos": 0,
          "carregarItensPedido": false,
          "imprimeClienteCadastradoCozinha1": true,
          "localizaProdutoPorCodigoEmpresa": false,
          "removerCabecalhoCupom": true,
          "sugerirValorPagamewnto": false,
          "previsaoMinutosAtendimento": 0,
          "limiteVendaProduto": 0.00,
          "limiteVendaTotal": 0.00,
          "impressoraCozinha1": "\\\\SUPORTE01\\EPSON TM-T20 Receipt5 DEV3",
          "impressoraCozinha2": "\\\\SUPORTE01\\EPSON TM-T20 Receipt5 DEV3",
          "imprimeDuasViasCozinha": false,
          "classificaDeliverysMaisRecentes": false,
          "pizzaPorMaiorValor": false,
          "imprimirItensDetalhado": false,
          "imprimePedidoBalcaoCompleto": true,
          "imprimeSegundaViaDeliveryNaRecepcao": true,
          "impressoraGrupo01": [
            "BEBIDA",
            "CERVEJA",
            "COMBO HUMBLE",
            "COMPLEMENTO DE PEDIDO",
            "ENREGA",
            "ESPETINHO XD",
            "INDEFINIDO",
            "LASANHA",
            "LINHA 1000",
            "MINE PIZZA",
            "PETISCO",
            "PIZZA",
            "PRATOS",
            "REFRIGERANTES",
            "SERVICOS",
            "SOBREMESAS",
            "SORVETE",
            "SUCOS"
          ],
          "impressoraGrupo02": [
            "BOBINA DE PAPEL",
            "BOTAO"
          ]
        },
        "impressao": {
          "$id": "3",
          "tipoImpressora": 1,
          "tipoImpressao": 0,
          "impressoraEtiquetadora": "",
          "impressoraBobina46": "\\\\SUPORTE01\\EPSON TM-T20 Receipt5 DEV3",
          "impressoraA4": "\\\\SUPORTE01\\EPSON TM-T20 Receipt5 DEV3",
          "perguntarImpressao": true,
          "cliente_fontName": "Courier new",
          "cliente_fontSize": 7,
          "cliente_QtdCaracteres": 20,
          "cliente_Bold": false,
          "removerCabecalhoCupom": true,
          "solicitarSenhaAdmSegundaVia": false,
          "modeloImpressao": 2
        },
        "opcoesImpressaoCaixa": {
          "$id": "4",
          "detalharSuprimentos": true,
          "detalharSangrias": true,
          "detalharVendasCrediario": false,
          "detalharRecebimentos": false,
          "exibirTotalVendasPorVendedor": false
        },
        "dadosIniciaisNF": {
          "$id": "5",
          "utilizaNFELib": true,
          "numeroNFE": 1,
          "numeroNFce": 1,
          "serieNFE": 1,
          "serieNFce": 1,
          "codigoCSC": "5999BA9B-5A09-4A0D-95DC-AA33F10FE381",
          "senhaCertificado": "123456",
          "urlContNfce": "http://localhost/nfe/bin",
          "urlWebApi": "http://localhost/nfe/bin",
          "utilizaTEF": false,
          "infoAdicional": []
        },
        "importacaoXML": {
          "$id": "6",
          "validarCodBarraEAN": true,
          "validarNomeFiscalXProd": false
        },
        "parcelamentos": [
          {
            "$id": "7",
            "id": 1,
            "parcelamento": "7"
          },
          {
            "$id": "8",
            "id": 2,
            "parcelamento": "14"
          },
          {
            "$id": "9",
            "id": 3,
            "parcelamento": "21"
          },
          {
            "$id": "10",
            "id": 4,
            "parcelamento": "30"
          },
          {
            "$id": "11",
            "id": 5,
            "parcelamento": "45"
          }
        ],
        "agenda": {
          "$id": "12",
          "lancarOrcamentoAposAgendamento": false
        },
        "nomeFantasia": "LIZ BELLA",
        "urlWebServiceVS": "192.168.0.200",
        "enderecoPastaPublica": "E:\\",
        "baixarEstoqueMatPrimaVenda": true,
        "manterTelaRecebAberta": false,
        "bloquearVendaEstoqueNegativo": true,
        "bloquearEdicaoPedidoNoRecebimento": false,
        "dbPassw": "ðï±²òòé",
        "fecharCaixaComPedidosEmAberto": false,
        "utilizaApelidoConsulta": false,
        "mostraTelaTroco": true,
        "imprimeSegundaViaRecibo": false,
        "carregarFormasPgto": false,
        "etiquetaBalanca_QtdDigitos": 0,
        "codEmpresaEAN13": false,
        "prazoTrocaProduto_Dias": 15,
        "informarDadosCheque": false,
        "numeroCaixa": 1,
        "qtdCasasDecimaisNFEntrada": 2,
        "exibirDesconto": false,
        "qtdAutomatica1": false,
        "agruparProdutos": false,
        "jurosMes": 0.00,
        "permitirVendaClienteBalcao": true,
        "permitirVendaClienteCadastrado": true,
        "imprimeCarneA4": false,
        "habilitaEdicaoSubTotal": false,
        "habilitaSelecaoVendedor": true,
        "filtraClientesPorVendedor": false,
        "usarTabPrecoQtd": false,
        "mensagemFinalCupom": "atencao senhores clientes ao assinar ester termo esta de acordo que todos os produtos foram recebidos em perfeito estado ASS____________________",
        "databaseName": "aviamento",
        "ipBancoDados": ".\\SQLEXPRESS2008",
        "localBackup1": "D:\\VIRTUALSTORE\\bck",
        "localBackup2": "",
        "localRepositorioXML": "C:\\Virtualstore\\Ws\\NFE",
        "extensaoCertificado": "PFX",
        "escolherVendedorPorProduto": false,
        "exibirFornecedor": true,
        "vendedorAcessaPgto": false,
        "exibeTodosTipoProduto": true,
        "tipoPDV": 1,
        "informarDadosCartao": false,
        "industria": false,
        "naoLocalizaProdutoCodBarra": false,
        "alteraPrecoVenda": false,
        "selecionaEntregador": true
 
      },
      
      //tabela
      misc: 'bordered', //[{value: 'bordered'},{value: 'highlight'}]
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
    listaItens(){
      let a = this.produtos
      let lista = []
      
      lista = a.map(row => ({
          label: row.nome, 
          value: row.codigo
      }))
      //console.log(lista)
      return lista
    },
    listaEmpresas(){
        let lista = []
        let l = ''
        //let v = '' // usando ip no value
        let a = ''

        for (let i=0; i < localStorage.length; i++) {
            if(localStorage.getItem('Empresa'+i)){
                l = localStorage.getItem('Empresa'+i)   
            }
            /*if(localStorage.getItem('ip'+i) && localStorage.getItem('ip'+i)){
                v = localStorage.getItem('ip'+i)    
            }*/
            if(l !== '' && a !== l){
                lista.push({
                    label: l,
                    value: i // ou 'v' se for setar por IP
                })
            }
            a = l 
        }
        
        return lista
    },
    listaConfigs(){
      let a = this.configs
      let lista = []
      
      lista = a.map(row => ({
          label: row.nomeFantasia, 
          value: { 
              codigo: row.$id,
              url: row.urlWebServiceVS
                 }
      }))
      //console.log(lista)
      return lista    
    }
  },
  methods:{
    goBack(){
        window.history.back()
    },
    setEmpresa(){
      if(this.dest !== ''){
        this.todosProdutos()
        this.empDest = {
            nome: localStorage.getItem('Empresa'+this.dest),
            codigo: this.dest
        }
      }
      else{
        this.$router.push('/')
      }
    },
    listarProdutos(){
      if(this.search === ''){
        this.search = 0
      }
      
      let URL
      if(this.tipoCod === 'barras'){
          URL = API + 'produto/obterproduto?codBarra=' + this.search
      }
      else if(this.tipoCod === 'emp'){
          URL = API + 'produto/obterproduto?codEmpresa=' + this.search
      }
      else {
          URL = API + 'produto/obterproduto?nomeProduto=' + this.search
      }
      
      Loading.show({
          spinner: AtomSpinner,
          spinnerSize: 140,
          message: 'Aguardando Dados...'
      })
      axios.get(URL)
      .then((res)=>{
        Loading.hide()
        console.log(res)
        this.produto = res.data
        if(typeof this.produto !== 'object'){
            this.produto = {}
            Object.assign(this.produto, {nome: 'Produto não encontrado'});
        }
      })
      .catch((e)=>{
        Loading.hide()
        console.log(e)
        if(typeof this.produto.nome == 'undefined'){
            Object.assign(this.produto, {nome: 'Produto não encontrado'});
        }
      })
     
    },
    todosProdutos(){
        Loading.show({
          spinner: AtomSpinner,
          spinnerSize: 140,
          message: 'Aguardando Dados...'
        })
        axios.get(API + 'produto/obterproduto')
          .then((res)=>{
            Loading.hide()
            this.produtos = res.data
            //console.log(res)
          })
          .catch((e)=>{
            Loading.hide()
            console.log(e)
            Toast.create({
                html: 'Sem Conexão',
                timeout: 6000,
                bgColor: '#f44242',
                icon: 'mood_bad'
            })
          })
    },
    alertAdd(){
        if(!this.produto.codigo){
            Toast.create('Faça a busca do produto antes de adicionar')
            return
        }
        if(this.produto.qtd <= 0 || this.qtd <= 0){
            Toast.create({
              html: 'Você está prestes a adicionar um produto sem estoque para transferencia, deseja continuar?',
              icon: 'error',
              timeout: 10000,
              //color: '#f8c1c1',
              //bgColor: 'white',
              button: {
                label: 'Continuar',
                handler:() => {
                  this.addProduto()
                  this.limpar()
                },
                color: 'yellow'
              }
            })
            return
        }
        if(this.produto.qtd < this.qtd){
            Toast.create({
              html: 'Você está prestes a adicionar uma quantidade que está acima do estoque atual do produto, deseja continuar?',
              icon: 'error',
              timeout: 10000,
              //color: '#f8c1c1',
              //bgColor: 'white',
              button: {
                label: 'Continuar',
                handler:() => {
                  this.addProduto()
                  this.limpar()
                },
                color: 'yellow'
              }
            })
            return
        }
        
        this.addProduto()
        this.limpar()
    },
    addProduto(){
        let qtd = this.qtd //armazenar antes de limpar os campos
        for(let i=0; i < this.transferencias.length; i++){ //verificar duplicidade
            if(this.produto.codigo === this.transferencias[i].codigo){
                Dialog.create({
                  title: 'Você está prestes a adicionar um produto que já consta na lista, deseja somar a sua quantidade?',
                  icon: 'error',
                  timeout: 10000,
                  buttons: [
                      {
                        label: 'Cancelar',
                        color: 'negative'
                      },
                      {
                        label: 'Continuar',
                        handler:() => {
                          let s = this.transferencias[i].qtd + qtd
                          this.transferencias[i].qtd = s
                          this.limpar()
                        },
                        color: 'positive'
                      }
                    
                  ]
                })
                return
            }  
        }
        this.transferencias.push({
            codigo: this.produto.codigo,
            codBarra: this.produto.codBarra,
            nome: this.produto.nome,
            qtd: this.qtd
        })
    },
    limpar(){
        this.search = ''
        this.produto.nome = 'Próximo Produto...'
        this.produto.qtd = ''
        this.produto.codigo = ''
        this.qtd = 1
    },
    excluirProduto(index){
        if(index !== -1) {
            this.transferencias.splice(index,1)
        }
    },
    obterConfigs(){
        //let url = 'http://192.168.0.200:29755/'
        Loading.show({
          spinner: AtomSpinner,
          spinnerSize: 140,
          message: 'Aguardando Dados...'
        })
        axios.get(API + 'estoque/obterEmpresaDestino')
          .then((res)=>{
            Loading.hide()
            console.log(res)
            this.configs = res.data
          })
          .catch((e)=>{
            Loading.hide()
            console.log(e)
            Toast.create({
                html: 'Sem Conexão',
                timeout: 6000,
                bgColor: '#f44242',
                icon: 'mood_bad'
            })
          })
    },
    enviar(){
        Loading.show({
          spinner: AtomSpinner,
          spinnerSize: 140,
          message: 'Enviando Dados...'
        })
        axios.post(API + 'estoque/TransferirEstoque', [
            this.transferencias,
            this.configDestino,
            'transferencia',
            16,
            1
            
        ])
          .then((res)=>{
            Loading.hide()
            //console.log(res)
          })
          .catch((e)=>{
            Loading.hide()
            console.log(e)
            Toast.create({
                html: 'Sem Conexão',
                timeout: 6000,
                bgColor: '#f44242',
                icon: 'mood_bad'
            })
          })
    },
  },
  mounted(){
    this.$refs.modal.open()
  },
  created(){
    this.obterConfigs()
  }
  
}
</script>

<style scoped>
    .button {
        margin: 15px 0 0 20px;
    }
    .icon{
        cursor: pointer;
        font-size: 25px;
    }
</style>
