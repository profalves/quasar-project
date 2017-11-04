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
    
    <div class="row" style="margin-left:45px">
      <q-btn
        color="primary"
        push
        @click="visualizarDanfe"
      >
        <i class="material-icons">cloud_download</i>
        Visualizar
      </q-btn>
      
      <q-btn
        style="margin-left:15px"
        color="primary"
        push
        @click="importarDanfe"
        :disabled="bloqueado"
      >
        <i class="material-icons">cloud_download</i>
        Importar
      </q-btn>
    </div><br>
    
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
            <div class="col-6">
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
                        float-label="Data Nota"
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
            <div class="col-4">Desconto: R$ 0,00</div>
            <div class="col-4">Frete: R$ 0,00</div>
            <div class="col-4">Seguro: R$ 0,00</div>
        </div>
          
        <div class="row">
            <div class="col-4" style="margin-top:20px">Outros: R$ 0,00</div>
            <div class="col-4" style="margin-top:20px">Total Produtos: R$ 0,00</div>
            <div class="col-4">
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
      <q-collapsible icon="perm_identity" label="Itens">
          
        <!--Data tables HTML-->
        <div class="row" id="table">
            <table style="margin-top: 30px;" class="q-table" :class="computedClasses">
              <thead>
                <tr>
                  <th class="text-center">Cód</th>
                  <th class="text-center">Produto</th>
                  <th class="text-center">Preço Unit.</th>
                  <th class="text-center">Quantidade</th>
                  <th class="text-center">NCM</th>
                  <th class="text-center">CFOP</th>
                  <th class="text-center">CST</th>
                  <th class="text-center">Aliq. ICMS</th>
                  <th class="text-center">Valor ICMS</th>
                  <th class="text-center">Valor Total</th>
                  <th class="text-center">Adicionar</th>
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
                  <td class="text-left">88888888</td>
                  <td class="text-left">5102</td>
                  <td class="text-right">18%</td><td class="text-left">1</td>
                  <td class="text-left">$0.11</td>
                  <td class="text-right">$10.11</td>
                  <td class="text-center">
                    <q-btn round outline small color="positive" icon="add" @click="addItem"></q-btn>    
                  </td>
                  <td class="text-center">
                    <q-btn round outline small color="info" icon="edit"></q-btn>    
                  </td>
                  <td class="text-center">
                    <q-btn round outline small color="negative" icon="delete_forever"></q-btn>  
                  </td>

                </tr>
                <tr>
                  <td class="text-left">002</td>
                  <td class="text-left">Drone X</td>
                  <td class="text-right">$10.11</td>
                  <td class="text-left">1</td>
                  <td class="text-left">88888888</td>
                  <td class="text-left">5102</td>
                  <td class="text-right">18%</td><td class="text-left">1</td>
                  <td class="text-left">$0.11</td>
                  <td class="text-right">$10.11</td>
                  <td class="text-center">
                    <q-btn round outline small color="positive" icon="add" @click="addItem"></q-btn>    
                  </td>
                  <td class="text-center">
                    <q-btn round outline small color="info" icon="edit"></q-btn>    
                  </td>
                  <td class="text-center">
                    <q-btn round outline small color="negative" icon="delete_forever"></q-btn>  
                  </td>
                </tr>
                <tr>
                  <td class="text-left">003</td>
                  <td class="text-left">AlienPC</td>
                  <td class="text-right">$10.11</td>
                  <td class="text-left">1</td>
                  <td class="text-left">88888888</td>
                  <td class="text-left">5102</td>
                  <td class="text-right">18%</td><td class="text-left">1</td>
                  <td class="text-left">$0.11</td>
                  <td class="text-right">$10.11</td>
                  <td class="text-center">
                    <q-btn round outline small color="positive" icon="add" @click="addItem"></q-btn>    
                  </td>
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
        
      <!--Duplicatas-->
      <q-collapsible icon="perm_identity" label="Duplicatas">
          
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
    
    
    
</div>
    
</template>

<script>
//import axios from 'axios'
//import VMasker from 'vanilla-masker'
import listaCFOP from 'data/CFOP.json'
import { required, minLength } from 'vuelidate/lib/validators'
import { Dialog, Toast } from 'quasar'


export default {
  name: 'cadEntradasNFe',
  data () {
    return {
        tipo: '',
        fornecedor: '',
        desc: '',
        cat: '',
        sub: '',
        forma: '',
        doc: '',
        tipoDoc: '',
        select: 'vista',
        bloqueado: true,
        danfe: '',
        cfop: '',
        listaCFOP,
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
        Dialog.create({
          title: 'Adicionar Item',
          message: 'Digite cuidadosamente os dados fiscais dos itens',
          form: {
            codBarras: {
              type: 'number',
              label: 'Cód Barras',
              model: '',
              min: 5,
              max: 90
            },
            age: {
              type: 'number',
              label: 'NCM',
              model: '',
              min: 5,
              max: 90
            },
            tags: {
              type: 'chips',
              label: 'Chips',
              model: ['Joe', 'John']
            },
            comments: {
              type: 'textarea',
              label: 'Textarea',
              model: ''
            }
          },
          buttons: [
            'Cancelar',
            {
              label: 'Ok',
              handler (data) {
                Toast.create.positive({
                    html: 'Salvo com sucesso',
                    icon: 'done'
                })
                Toast.create('Dados : ' + JSON.stringify(data))
                
              }
            }
          ]
        })
          
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
        margin-top: 50px;
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
    
    
</style>