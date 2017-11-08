<template>
<div id="clientes">
    
    <div style="margin-top:50px"></div>
    
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
            <h5>Lançamentos Financeiro</h5>
        </div>
    </div>
    
    <!--<div class="row">
        <div class="col">
            <q-field
                icon="account_balance_wallet"
             >
                <q-select
                    float-label="Tipo"
                    v-model="tipo"
                    :options="tipos"
                />
            </q-field>   
        </div>
    </div>-->
    
    <div class="row">
        <div class="col">
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
    
    <!--<div class="row">
        <div class="col">
          <q-field
            icon="feedback"
          >
            <q-input v-model.trim="desc" 
                     float-label="Descrição" 
                     clearable
            />
            
          </q-field>
        
        </div>
    </div> -->
    
    <div class="row">
        <div class="col-10 col-md-4">
            <q-field
                icon="group_work"
             >
                <q-select
                    float-label="Tipo Categoria"
                    filter
                    v-model="cat"
                    :options="options"
                />
            </q-field>
            
        </div>
        <div class="col-2 btn-plus" >
            <q-btn 
               rounded
               color="primary" 
               @click="$router.push('/')">
               <q-icon name="add" />
            </q-btn>
            
            
        </div>
        <div class="col-10 col-md-4">
            <q-field
                icon="group_work"
             >
                <q-select
                    float-label="SubCategoria"
                    filter
                    v-model="sub"
                    :options="options"
                />
            </q-field>   
        </div>
        <div class="col-2 btn-plus" >
            <q-btn 
               rounded
               color="primary" 
               @click="$router.push('/')">
               <q-icon name="add" />
            </q-btn>    
        </div>
    </div>
    
    <div class="row">
        <div class="col">
            <q-field
                icon="local_grocery_store"
             >
                <q-select
                    float-label="Forma de Pagamento"
                    v-model="forma"
                    :options="formasPagto"
                />
            </q-field>   
        </div>
    </div>
    
    <div class="row">
        <div class="col">
          <q-field
            icon="assignment_turned_in"
          >
            <q-input v-model.number="doc"
                     type="number"
                     float-label="n. Documento" 
                     clearable
            />
            
          </q-field>   
        </div>
    </div>
    
    <div class="row">
        <div class="col-md-1 col-xs-12">
            <q-checkbox v-model="checked" 
                        label="Despesa Fixa"
                        style="margin-top:15px;"
            />
        </div>
        <div class="col-md-3 offset-1">
            <q-field
                label="Qtd. de Títulos"
                >
                <q-input v-model.number="qtdTitulos"
                         type="number"
                         clearable
                />

            </q-field>  
        </div>
        <div class="col-md-3 offset-1">
            <q-field
                label="Intervalo dias"
                >
                <q-input v-model.number="intervalo"
                         type="number"
                         clearable
                />

            </q-field> 
        </div>
        <div class="col offset-1">
            <q-btn color="primary" style="margin-top:15px;" @click="open = true">Criar Títulos</q-btn>
        </div>
    </div>
    
    
    <!--<div class="row">
        <div class="col">
            <q-field
                icon="store"
             >
                <q-select
                    float-label="Tipo de Documento"
                    v-model="tipoDoc"
                    :options="tipoDocumento"
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
    </div>-->
    
    <q-collapsible icon="monetization_on" 
                   label="Títulos" 
                   style="background-color:white;
                          margin-top:30px;"
                   :opened="open"
                   >
        <!--Data tables HTML-->
        <h6 style="margin-top:30px">Parcelas</h6>
        <div class="row" id="table">
            <table style="margin-top: 30px;" class="q-table" :class="computedClasses">
              <thead>
                <tr>
                  <th class="text-left">Vencimento</th>
                  <th class="text-right">Valor Total</th>
                  <th class="text-left">Data Pagto</th>
                  <th class="text-right">Valor Pago</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="text-left">01/01/2018</td>
                  <td class="text-right">$10.11</td>
                  <td class="text-left">01/01/2018</td>
                  <td class="text-right">$10.11</td>
                  <td class="text-center">
                    <q-btn round outline small color="warning" icon="edit"></q-btn>    
                  </td>
                  <td class="text-center">
                    <q-btn round outline small color="negative" icon="delete_forever"></q-btn>  
                  </td>
                </tr>
                <tr>
                  <td class="text-left">01/01/2018</td>
                  <td class="text-right">$10.11</td>
                  <td class="text-left">01/01/2018</td>
                  <td class="text-right">$10.11</td>
                  <td class="text-center">
                    <q-btn round outline small color="warning" icon="edit"></q-btn>    
                  </td>
                  <td class="text-center">
                    <q-btn round outline small color="negative" icon="delete_forever"></q-btn>  
                  </td>
                </tr>
                <tr>
                  <td class="text-left">01/01/2018</td>
                  <td class="text-right">$10.11</td>
                  <td class="text-left">01/01/2018</td>
                  <td class="text-right">$10.11</td>
                  <td class="text-center">
                    <q-btn round outline small color="warning" icon="edit"></q-btn>    
                  </td>
                  <td class="text-center">
                    <q-btn round outline small color="negative" icon="delete_forever"></q-btn>  
                  </td>
                </tr>
              </tbody>
            </table>  

        </div>
    </q-collapsible>
    
</div>
    
</template>

<script>
//import axios from 'axios'
//import VMasker from 'vanilla-masker'

import { required, minLength } from 'vuelidate/lib/validators'
import { Dialog, Toast } from 'quasar'


export default {
  name: 'clientes',
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
        qtdTitulos: '',
        intervalo: '',
        select: '',
        checked: false,
        open: false,
        //table
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
    
   
  }
 
}
</script>

<style scoped>
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
    
    #avisoCep {
        font-weight: bolder;
        font-size: 16px;
        color: slategrey;
    }
    
    #table {
        overflow: scroll;
        width: 100%;
    }
    
    
</style>