<template>
<div id="cadEntradasNFe">
    <div style="margin-top:60px"></div>
    <div class="row topo" style="margin-bottom:20px">
      <q-btn
        v-if="canGoBack"
        color="primary"
        push
        @click="goBack"
      >
        <i class="material-icons">arrow_back</i>
      </q-btn>
      
      <q-btn
        color="negative"
        push big
        @click="excluir"
      >
        <i class="material-icons">delete</i>
      </q-btn>
        
      <q-btn
        style="background: white; 
               color: black"
        push
        @click="limpar"  
      >
        limpar
      </q-btn>
      
      <q-btn
        style="background: white; 
               color: black"
        push big
        @click=""
        
      >
        <i class="material-icons">edit</i>
      </q-btn>
      
      <q-btn
        color="positive"
        push big
        @click="salvar"
        
      >
        <i class="material-icons">done</i>
    </q-btn>
      
    </div>
    
    <!-- formulário -->
    
    <div class="row">            
        
        <div class="col">
            <h5>Cadastro de Nota Fiscal</h5>
        </div>
    </div>
    
    
    <div class="row">
        <div class="col">
          <q-field
            icon="assignment_turned_in"
          >
            <q-input v-model.number="doc"
                     type="number"
                     float-label="Chave de Acesso" 
                     clearable
            />
            
          </q-field>   
        </div>
    </div>
    
    <div class="row" style="margin:10px 0px 0px 45px">
      <div class="col col-md-3" style="margin-bottom: 10px">
          <q-btn
            color="primary"
            push
            @click="visualizarDanfe"
          >
            <i class="material-icons">cloud_download</i>
            Visualizar
          </q-btn>
      </div>
      <div class="col" style="margin-bottom: 10px;">
          <q-btn
            color="primary"
            push
            @click="importarDanfe"
            :disabled="bloqueado"
          >
            <i class="material-icons">cloud_download</i>
            Importar
          </q-btn>
      
      </div>
      <div class="col-xs-12 col-md-4">
          <q-btn
            color="primary"
            class="full"
            push
            @click="listarDanfe"
          >
            <i class="material-icons">search</i>
            Localizar notas
          </q-btn>
      </div>
    </div>
    
    <span>{{danfe}}</span><br><br>
    
    <q-list style="background-color: white;">
    
      <!--cabeçalho-->
      <q-collapsible opened icon="explore" label="Cabeçalho">
          
        <div class="row">
            <div class="col-10">
                <q-field
                    icon="store"
                 >
                    <q-select
                        float-label="Fornecedor"
                        filter
                        v-model="fornecedor"
                        :options="options"
                    />
                </q-field>   
            </div>
            <div class="col-2 btn-plus" >

                <q-btn 
                   rounded
                   color="primary" 
                   @click="$router.push('/cadcliente')">
                   <q-icon name="add" />
                </q-btn>
            </div>
        </div>
        
        <div class="row">
            <div class="col">
                <q-field
                    icon="store"
                 >
                    <q-input
                        float-label="Empresa Destino"
                        v-model="fornecedor"
                    />
                </q-field>   
            </div>
            
        </div>
        
        <div class="row">
            <div class="col-md-6">
                <q-field
                    icon="date_range"
                 >
                    <q-input
                        float-label="Data Entrada"
                        v-model="cat"   
                    />
                </q-field>

            </div>

            <div class="col-6">
                <q-field
                    icon="date_range"
                 >
                    <q-input
                        float-label="Data Emissão"
                        v-model="sub"
                    />
                </q-field>   
            </div>
        </div>
          
        <div class="row">
            <div class="col-md-4">
                <q-field
                    icon="explore"
                 >
                    <q-input
                        float-label="N. Nota"
                        v-model="cat"   
                    />
                </q-field>

            </div>

            <div class="col" style="margin-top:15px">
                <q-field
                    icon="explore"
                    helper="CFOP - clique para exibir a lista"
                 >
                    <div class="mdl-selectfield">
                        <select class="browser-default" v-model="cfop" >
                          <option disabled selected>Escolha um CFOP</option>
                          <option v-for="cfop in listaCFOPEnt">{{cfop.value}} - {{cfop.label}}</option>
                        </select>
                        
                    </div> 
                </q-field> 
                
            </div>
            <i class="material-icons">keyboard_arrow_down</i>
        </div>
          
        <div class="row">
            <div class="col">
                <q-field>
                    <q-input float-label="Desconto"
                             v-model="desc" />
                </q-field>    
            </div>
            <div class="col">
                <q-field>
                    <q-input float-label="Frete"
                             v-model="desc" />
                </q-field>    
            </div>
            <div class="col">
                <q-field>
                    <q-input float-label="Seguro"
                             v-model="desc" />
                </q-field>    
            </div>
        </div>
          
        <div class="row">
            <div class="col">
                <q-field>
                    <q-input float-label="Outros"
                             v-model="desc" />
                </q-field>    
            </div>
            
            <div class="col-3 offset-1" style="margin-top:30px">
                <strong>Total Produtos: </strong>R$ 0,00</div>
            <div class="col offset-1" style="margin-top:13px">
                <q-select
                  v-model="select" 
                  :options="[
                    {value: 'vista', label: 'À Vista'},
                    {value: 'prazo', label: 'À Prazo'}
                  ]"
                />

            </div>
        </div>
          
        
      </q-collapsible>
        
      <!--Itens-->  
      <q-collapsible icon="local_mall" label="Itens">
          
        <!--Data tables HTML-->
        <div class="row" id="table">
            <table style="margin-top: 30px;" class="q-table" :class="computedClasses">
              <thead>
                <tr>
                  <th class="text-center">Cód</th>
                  <th class="text-center">Produto</th>
                  <th class="text-center">Preço Unit.</th>
                  <th class="text-center">Quant.</th>
                  <th class="text-center">Desconto</th>
                  <th class="text-center">Valor IPI</th>
                  <th class="text-center">Valor Total</th>
                  <th class="text-center">Editar</th>
                  <th class="text-center">Excluir</th>
                  
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="text-left">001</td>
                  <td class="text-left">iPhone 9</td>
                  <td class="text-right">$10.11</td>
                  <td class="text-left">1</td>
                  <td class="text-left">$0.11</td>
                  <td class="text-left">$0.11</td>
                  <td class="text-right">$10.11</td>
                  <td class="text-center">
                    <q-btn round outline small color="info" icon="edit" @click="addItem"></q-btn>    
                  </td>
                  <td class="text-center">
                    <q-btn round outline small color="negative" icon="delete_forever" @click="excluir"></q-btn>  
                  </td>

                </tr>
                <tr>
                  <td class="text-left">002</td>
                  <td class="text-left">Drone X</td>
                  <td class="text-right">$10.11</td>
                  <td class="text-left">1</td>
                  <td class="text-left">$0.11</td>
                  <td class="text-left">$0.11</td>
                  <td class="text-right">$10.11</td>
                  <td class="text-center">
                    <q-btn round outline small color="info" icon="edit" @click="addItem"></q-btn>    
                  </td>
                  <td class="text-center">
                    <q-btn round outline small color="negative" icon="delete_forever" @click="excluir"></q-btn>  
                  </td>
                </tr>
                <tr>
                  <td class="text-left">003</td>
                  <td class="text-left">AlienPC</td>
                  <td class="text-right">$10.11</td>
                  <td class="text-left">1</td>
                  <td class="text-left">$0.11</td>
                  <td class="text-left">$0.11</td>
                  <td class="text-right">$10.11</td>
                  <td class="text-center">
                    <q-btn round outline small color="info" icon="edit" @click="addItem"></q-btn>    
                  </td>
                  <td class="text-center">
                    <q-btn round outline small color="negative" icon="delete_forever" @click="excluir"></q-btn>  
                  </td>
                </tr>
              </tbody>
            </table>  

        </div>
        <br>
        
        <div class="col col-md-3">
            <q-btn
                color="secondary"
                push
                :key="modal"
                @click="$refs.layoutModal.open()"
                
            >
                Adicionar item
            </q-btn>
        </div>
        
    
      </q-collapsible>
        
      <!--Duplicatas-->
      <q-collapsible icon="local_atm" label="Duplicatas">
          
        <!--Data tables HTML-->
        <div class="row" id="table">
            <table style="margin-top: 30px;" class="q-table" :class="computedClasses">
              <thead>
                <tr>
                  <th class="text-center">Vencimento</th>
                  <th class="text-center">Valor Total</th>
                  <th class="text-center">Data Pagto</th>
                  <th class="text-center">Valor Pago</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="text-left">01/01/2018</td>
                  <td class="text-right">$10.11</td>
                  <td class="text-left">01/01/2018</td>
                  <td class="text-right">$10.00</td>
                  <td class="text-center">
                    <q-btn round outline small color="info" icon="edit"></q-btn>    
                  </td>
                  <td class="text-center">
                    <q-btn round outline small color="negative" icon="delete_forever"></q-btn>  
                  </td>

                </tr>
                <tr>
                  <td class="text-left">01/01/2018</td>
                  <td class="text-right">$10.11</td>
                  <td class="text-left">01/01/2018</td>
                  <td class="text-right">$0.00</td>
                  <td class="text-center">
                    <q-btn round outline small color="info" icon="edit"></q-btn>    
                  </td>
                  <td class="text-center">
                    <q-btn round outline small color="negative" icon="delete_forever"></q-btn>  
                  </td>
                </tr>
                <tr>
                  <td class="text-left">01/01/2018</td>
                  <td class="text-right">$10.11</td>
                  <td class="text-left">01/01/2018</td>
                  <td class="text-right">$0.00</td>
                  <td class="text-center">
                    <q-btn round outline small color="info" icon="edit"></q-btn>    
                  </td>
                  <td class="text-center">
                    <q-btn round outline small color="negative" icon="delete_forever"></q-btn>  
                  </td>
                </tr>
              </tbody>
            </table>  

        </div>
      </q-collapsible>
        
    </q-list>
    <br>
    
    <div class="row">
        <div class="col col-md-3">
            <q-btn
                color="primary"
                push
                @click=""
            >
                Alterar preços de venda
            </q-btn>
        </div>
        <div class="col col-md-3">
            <q-btn
                color="primary"
                push
                @click=""
            >
                Impostos para venda
            </q-btn>
        </div>
      
    
    </div>
    
    <!--MODAL-->
    <q-modal ref="layoutModal" :content-css="{minWidth: '60vw', minHeight: '60vh'}">
      <q-modal-layout>
        <q-toolbar slot="header" color="black">
          <q-btn flat @click="$refs.layoutModal.close()">
            <q-icon name="keyboard_arrow_left" />
          </q-btn>
          <q-toolbar-title>
            Adicionar item
          </q-toolbar-title>
        </q-toolbar>

        <q-toolbar slot="header" color="tertiary">
           <q-radio v-model="tipoCod" val="barras" color="white" left-label label="Cód. Barras" />
           <q-radio v-model="tipoCod" val="emp" color="white" left-label label="Cód. Emp" style="margin-left: 10px" />
           <q-search inverted v-model="search" color="none" style="margin-left: 10px"></q-search>
        </q-toolbar>
        
        <div class="layout-padding">
            <div class="row">
                <div class="col-md-6">
                    <q-field
                        icon="explore"
                        helper="NCM"
                     >
                        <the-mask class="mdInput"
                                  v-model="ncm"
                                  :mask="['####-##-##']"
                        />
                    </q-field>

                </div>

                <div class="col">
                    <q-field
                        icon="explore"
                        helper="CFOP - clique para exibir a lista"
                     >
                        <div class="mdl-selectfield">
                            <select class="browser-default" v-model="cfop" >
                              <option disabled selected>Escolha um CFOP</option>
                              <option v-for="cfop in listaCFOPEnt">{{cfop.value}} - {{cfop.label}}</option>
                            </select>

                        </div> 
                    </q-field> 

                </div>
                <i class="material-icons">keyboard_arrow_down</i>
            </div>
            <div class="row">
                <div class="col">
                    <q-field>
                        <q-input
                            float-label="Fator de Conversão"
                            v-model.number="item.fator"   
                        />
                    </q-field>
                </div>
                <div class="col">
                    <q-field>
                        <q-select
                          float-label="Tipo"
                          v-model="select" 
                          :options="[
                            {value: 'a', label: 'Tipo'},
                            {value: 'b', label: 'Tipo'}
                          ]"
                        /> 
                    </q-field> 

                </div>
                <div class="col">
                    <q-field>
                        <q-input
                            float-label="Quantidade"
                            v-model="item.qtd"   
                        />
                    </q-field>
                </div>
                <div class="col" style="margin-top: 20px;">
                    Estoque: <strong style="color: orangered">0</strong>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <q-field>
                        <q-input
                            float-label="Desconto"
                            v-model="item.desconto"   
                        />
                    </q-field>
                </div>
                <div class="col">
                    <q-field>
                        <q-input
                            float-label="Frete"
                            v-model="item.frete"   
                        />
                    </q-field>
                </div>
                <div class="col">
                    <q-field>
                        <q-input
                            float-label="Seguro"
                            v-model="item.seguro"   
                        />
                    </q-field>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <q-field>
                        <q-input
                            float-label="Outros Custos"
                            v-model="item.outros"   
                        />
                    </q-field>
                </div>
                <div class="col">
                    <q-field>
                        <q-input
                            float-label="Aliq. IPI"
                            v-model="item.AliqIPI"   
                        />
                    </q-field>
                </div>
                <div class="col">
                    <q-field>
                        <q-input
                            float-label="Valor IPI"
                            v-model="item.vIPI"   
                        />
                    </q-field>
                </div>
            </div>
    
        </div>
        
        <div class="row">
            <div class="col-4">
                <q-card color="faded" class="col-sm-6">
                <center>
                    <q-card-title>Custo</q-card-title>
                        <h4>0,00</h4>
                        <br>
                </center>
                </q-card>
            </div>

            <div class="col-4">
                <q-card color="primary" class="col-sm-6">
                  <center>
                    <q-card-title>Lucro</q-card-title>
                        <h4>0,00</h4>
                        <br>
                  </center>
                </q-card>
            </div>

            <div class="col-4">
                <q-card color="positive" class="col-sm-6">
                  <center>
                    <q-card-title>Venda</q-card-title>
                        <h4>0,00</h4>
                        <br>
                  </center>
                </q-card>
            </div>  
        </div>
          
          
        <q-toolbar slot="footer" color="black">
        </q-toolbar>
      </q-modal-layout>
    </q-modal>
    
</div>
    
</template>

<script>
//import axios from 'axios'
//import VMasker from 'vanilla-masker'
import listaCFOP from 'data/CFOP.json'
import { required, minLength } from 'vuelidate/lib/validators'
import { Dialog, Toast, Ripple } from 'quasar'


export default {
  name: 'cadEntradasNFe',
  data () {
    return {
        tipoCod: '',
        ref: 'layoutModal',
        modal: false,
        search: '',
        //cabeçário
        fornecedor: '',
        desc: '0,00',
        cat: '',
        ncm: '',
        sub: '',
        forma: '',
        doc: '',
        tipoDoc: '',
        select: 'vista',
        bloqueado: true,
        danfe: '',
        cfop: '',
        estoque: '0',
        listaCFOP,
        item: {
            ncm: '',
            cfop: '',
            fator: '0,00',
            qtd: 1,
            estoque: '0',
            vUnit: '',
            desconto: '0,00',
            frete: '0,00',
            seguro: '0,00',
            outros: '0,00',
            AliqIPI: '4%',
            vIPI: '0,01',
            custo: '',
            lucro: '',
            venda: ''
        },
        styles: [
            '',
            'bordered',
            'horizontal-separator',
            'vertical-separator',
            'cell-separator',
            'striped-odd',
            'striped-even',
            'highlight',
            'compact',
            'loose',
            'flipped'
        ],
        misc: [],
        separator: 'cell', //none, horizontal, vertical, cell
        stripe: 'odd', //none, odd, even
        type: 'none', //none, flipped, responsive
        gutter: 'none', //none, compact, loose
        tipos: [
            {
              label: 'Despesa',
              value: 'd'
            },
            {
              label: 'Receita',
              value: 'r'
            }
        ],
        options: [
            {
              label: 'Google',
              value: 'goog'
            },
            {
              label: 'Facebook',
              value: 'fb'
            },
            {
              label: 'Twitter',
              value: 'twtr'
            },
            {
              label: 'Apple Inc.',
              value: 'appl'
            },
            {
              label: 'Oracle',
              value: 'ora'
            }
        ],
        formasPagto: [
            {
              label: 'Cartão',
              value: 'cartao'
            },
            {
              label: 'Cheque a Vista',
              value: 'chVista'
            },
            {
              label: 'Cheque a Prazo',
              value: 'chPrazo'
            },
            {
              label: 'Duplicata em Carteira',
              value: 'dupCarteira'
            },
            {
              label: 'Duplicata em Banco',
              value: 'dupBanco'
            },
            {
              label: 'Espécie',
              value: 'dinheiro'
            },
            {
              label: 'Outro',
              value: 'outri'
            }
        ],
        tipoDocumento: [
            {
              label: 'Fatura',
              value: 'fatura'
            },
            {
              label: 'Nota Fiscal',
              value: 'nota'
            },
            {
              label: 'Boleto',
              value: 'boleto'
            },
            {
              label: 'Recibo',
              value: 'recibo'
            }
        ],
        
        canGoBack: window.history.length > 1,
    }
  },
  directives: {
    Ripple
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
    },
    listaCFOPEnt () {
      function cfopEntrada(cfop) {
        return cfop.value < 5000;
      }
        return this.listaCFOP.filter(cfopEntrada)
    }
  },
  validations: {
    nome: {
      required,
      minLength: minLength(3)
    },
    barras: {
      required,
      minLength: minLength(3)
    }
  },
  methods: {
    goBack(){
      window.history.go(-1)
    },
    visualizarDanfe() {
      if(this.doc!==''){
        this.danfe = ''
        this.bloqueado = false
        this.fornecedor = 'appl'
        this.desc = 'Dados da DANFE'
        this.cat = 'Dados da DANFE'
        this.sub = 'Dados da DANFE'
        this.forma = 'Dados da DANFE'
      }
      else {
        this.danfe = 'Primeiro coloque a chave de acesso!'
      }
     },
     importarDanfe() {
        this.bloqueado = true
        this.doc = ''
        this.fornecedor = ''
        this.desc = ''
        this.cat = ''
        this.sub = ''
        this.forma = ''
        this.cfop = ''
        Toast.create.positive({
            html: 'Nota importada com sucesso',
            icon: 'done'
        })
    },
    listarDanfe() {
      this.$router.push('/entradanfe')
    },
    limpar () {
      this.tipo = ''
      this.fornecedor = ''
      this.desc = ''
      this.cat = ''
      this.sub = ''
      this.forma = ''
      this.doc = ''
      this.tipoDoc = ''
    },
    salvar(){
        Toast.create.positive({
        html: 'Salvo com sucesso',
        icon: 'done'
        })
    },
    excluir(){
        Dialog.create({
          title: 'Excluir',
          message: 'Tem certeza que deseja excluir este registro?',
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
              handler () {
                Toast.create('Excluído!')
              }
            }
          ]
        })
    },
    addItem(){
          
    },
    
   
  }
 
}
</script>

<style scoped>
    select {
      font-family: inherit;
      background-color: transparent;
      width: 100%;
      padding: $select-padding 0;
      font-size: $select-font-size;
      color: $select-color;
      border: none;
      border-bottom: 1px solid $select-border-color;
    }

    /* Remove focus */
    select:focus {
      outline: none
    }

    /* Hide label */
    .mdl-selectfield label {
      color: #87939F;
      padding-top: 4px;
    }
    .mdl-selectfield label {
      display: none
    }
    /* Use custom arrow */
    .mdl-selectfield select {
      appearance: none
    }
    .mdl-selectfield {
      font-family: 'Roboto','Helvetica','Arial',sans-serif;
      position: relative;
        &:after {
            position: absolute;
            top: 0.75em;
            right: 0.5em;
            /* Styling the down arrow */
            width: 0;
            height: 0;
            padding: 0;
            content: '';
            border-left: .25em solid transparent;
            border-right: .25em solid transparent;
            border-top: .375em solid $select-border-color;
            pointer-events: none;
        }
    }
    
    .btn-plus {
        padding-top: 22px;
        text-align: center;
    }
    
    span {
        color: red;
        font-size: 12px
    }
    
    .topo {
        margin: 50px 0 0 10px;
		padding: 10px 10px;
		width: 100%; 
		position: fixed;
		top: 0; 
        left: 0;
		text-align: center;
        z-index: 5;
	}
    
    .mdInput {
        /*margin-top: 10px;
        width: 90%;*/
        background:transparent;
        outline:none;
        border: 0px;
        /*border-bottom-color: #D3DAE0;*/
    }
    
    #table {
        overflow: scroll;    
    }
    
    .full {
        width: 100%;
    }
</style>