<template>
<div id="cadproduto">
    
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
        style="margin-left: 5px"
        v-if="btnDelete"
      >
        <i class="material-icons">delete</i>
      </q-btn>
        
      <!--<q-btn
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
      </q-btn>-->
      
      <q-btn
        color="positive"
        push big
        @click="salvar"
        style="margin-left: 5px"
      >
        <i class="material-icons">done</i>
    </q-btn>
      
    </div>
    
    <!-- formulário -->
    <div class="row">
        <div class="col">
            <h5>Cadastro de Produtos</h5>
        </div>
    </div>
    
    <div class="row">
        <div class="col">
            <q-field
                icon="format_color_fill"
             >
                <q-select
                    float-label="Tipo de Produto"
                    filter
                    v-model="CadProduto.produto.codTipo"
                    :options="[
                        {label: 'Mercadoria para Revenda', value: 1},
                        {label: 'Materia Prima', value: 2},
                        {label: 'Item do Sistema', value: 3},
                        {label: 'Mercadoria para Consumo', value: 4},
                        {label: 'Fabricação para Venda', value: 5},
                        {label: 'Venda Casada - Combo de Produtos', value: 6}
                    ]"
                />
            </q-field>   
        </div>
    </div>
    
    <div class="row">
        <div class="col-md-6">
          <q-field
            icon="fa-barcode"
          >
            <q-input v-model.number="CadProduto.produto.codBarra"
                     float-label="Cód. Barras"
                     type="number"
            />
            
          </q-field>   
        </div>
        <div class="col">
          <q-field
            icon="crop_free"
          >
            <q-input v-model.number="CadProduto.produto.codEmpresa"
                     float-label="Cód. Empresa"
                     type="number"
            />
            
          </q-field>   
        </div>
    </div> 
    
    <div class="row">
        <div class="col-md-6">
          <q-field
            icon="local_shipping"
          >
            <q-input v-model.number="CadProduto.produto.codFornecedor"
                     float-label="Cód. Fornecedor"
                     type="number"
            />
            
          </q-field>   
        </div>
        <div class="col-md-6">
          <q-field
            icon="store"
          >
            <q-input v-model.number="CadProduto.produto.codFabrica"
                     float-label="Cód. Produto"
                     type="number"
            />
            
          </q-field>   
        </div>
    </div> 
    
    <div class="row">
        <div class="col">
          <q-field
            icon="local_grocery_store"
          >
            <q-input v-model.trim="nome" 
                     float-label="Nome" 
                     clearable
                     @input="$v.nome.$touch()"
                     :error="$v.nome.$error"
            />
            
             <span style="color:grey" v-if="!$v.nome.required">Nome é requerido</span>
             <span v-if="!$v.nome.minLength">Este campo deve conter mais que {{$v.nome.$params.minLength.min}} caracteres.</span>
            
          </q-field>
        
        </div>
    </div> 
      
    <div class="row">
        <div class="col-md-6">
          <q-field
            icon="local_mall"
          >
            <q-input v-model.trim="CadProduto.produto.apelido" 
                     float-label="Apelido" 
                     clearable
            />
            
          </q-field>
        
        </div>
        <div class="col">
            <q-field
                icon="store"
             >
                <q-select
                    float-label="Família de Produtos"
                    filter
                    v-model="CadProduto.produto.codFamilia"
                    :options="listaFamiliasProdutos"
                    @change="novaFamilia"
                />
            </q-field>   
        </div>
    </div>
    
    <div class="row">
        <div class="col-xs-12 col-md-6">
            <q-field
                icon="format_color_fill"
             >
                <q-select
                    float-label="Unidade de Medida"
                    filter
                    v-model="CadProduto.produto.unmed"
                    :options="listaMedidas"
                    @change="novaUnidade"
                />
            </q-field>   
        </div>
        <div class="col-xs-12 col-md-6">
            <q-field
                icon="store"
             >
                <q-select
                    float-label="Categoria"
                    filter
                    v-model="CadProduto.produto.codCategoria"
                    :options="listaCategorias"
                    @change="novaCategoria"
                />
            </q-field>
            
        </div>
        
    </div>
    
    <div class="row">
        <div class="col-md-6">
          <q-field
            icon="fa-battery-quarter"
          >
            <q-input v-model.number="CadProduto.produto.estoqueMinimo"
                     type="number"
                     float-label="Estoque Minimo" 
                     clearable
            />
            
          </q-field>
        
        </div>
        <!--<div class="col-2 btn-plus" >
            <q-btn 
               rounded
               color="primary" 
               @click="novaCategoria">
               <q-icon name="add" />
            </q-btn>
            
            
        </div>-->
        <div class="col-xs-12 col-md-6">
            <q-field
                icon="store"
             >
                <q-select
                    float-label="Marca"
                    filter
                    v-model="CadProduto.produto.codMarca"
                    :options="listaMarcas"
                    @change="novaMarca"
                />
            </q-field>   
        </div>
        <!--<div class="col-2 btn-plus" >
            <q-btn 
               rounded
               color="primary" 
               @click="novaMarca">
               <q-icon name="add" />
            </q-btn>    
        </div>-->
    </div>
    
    <div class="row">
        <div class="col-xs-12 col-md-6">
            <q-field
                icon="format_color_fill"
             >
                <q-select
                    float-label="Unidade de Medida"
                    filter
                    v-model="CadProduto.produto.unmed"
                    :options="listaMedidas"
                    @change="novaUnidade"
                />
            </q-field>   
        </div>
        <!--<div class="col-2 btn-plus" >
            
            <q-btn 
               rounded
               color="primary" 
               @click="novaUnidade">
               <q-icon name="add" />
            </q-btn>
        </div>-->
        <div class="col" id="estoque">
          <q-field
            icon="storage"
          >
            Estoque: {{CadProduto.produto.qtd}}
            
          </q-field>   
        </div>
    
    </div>
    
    <div class="row">
        <div class="col-sm-12 col-md-4" v-if="permissoes.ret_VerCusto">
            <q-card color="faded">
            <center>
                <q-card-title>Custo</q-card-title>
                    <money v-model="CadProduto.produto.custo"
                           v-bind="money"
                           class="boxInput"
                    />
            </center>
            </q-card>
        </div>
        
        <div class="col-sm-12 col-md-4" v-if="permissoes.ret_VerCusto">
            <q-card :color="colorsClasses">
              <center>
                <q-card-title>Lucro</q-card-title>
                    <money v-model="CadProduto.produto.percLucro"
                           v-bind="perc"
                           class="boxInput"
                    />
              </center>
            </q-card>
        </div>
        
        <div class="col-sm-12 col-md-4">
            <q-card color="positive" >
              <center>
                <q-card-title>Venda</q-card-title>
                    <money v-model="valorVenda"
                           v-bind="money"
                           class="boxInput"
                    />
              </center>
            </q-card>
        </div>        
        
    </div>
    
    <q-list style="background-color: white;
                   margin-top: 20px">
        <q-collapsible icon="monetization_on" label="Tabela de Preço">
            <div class="row" id="table">    
                <table class="q-table" :class="computedClasses">
                  <thead>
                    <tr>
                      <th class="text-left">Tabela</th>
                      <th class="text-left">M. Lucro</th>
                      <th class="text-left">Valor</th>
                      <th class="text-left">ML Min.</th>
                      <th class="text-left">Valor Min.</th>
                      <th class="text-left">Editar</th>
                      <th class="text-left">Excluir</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in tabPreco">
                      <td class="text-left">{{ item.nome }}</td>
                      <td class="text-left">
                        <money v-model="tabPreco[index].ml"
                               v-bind="perc"
                               class="mdInput"
                        />  
                      </td>
                      <td class="text-left">
                        <money v-model="CadProduto.precos[index].valor"
                               v-bind="money"
                               class="mdInput"
                        />  
                      </td>
                      <td class="text-left">
                        <money v-model="tabPreco[index].mLminima"
                               v-bind="perc"
                               class="mdInput"
                        />  
                      </td>
                      <td class="text-left">
                        <money v-model="CadProduto.precos[index].valorMinimo"
                               v-bind="money"
                               class="mdInput"
                        />  
                      </td>
                      <td class="text-center">
                        <a @click="" color="info"><i class="material-icons fa-2x">mode_edit</i></a>   
                      </td>
                      <td class="text-center">
                        <i class="material-icons fa-2x mHover text-negative" @click="" color="negative">delete_forever</i> 
                      </td>
                    </tr>
                  </tbody>
                </table>
            </div>
        </q-collapsible>
        
        <q-collapsible icon="explore" label="Fator de Conversão" v-if="visivel">
            <div class="row">
                <div class="col-md-4">
                    <q-field
                        icon="format_color_fill"
                     >
                        <q-select
                            float-label="Unidade de Medida"
                            filter
                            v-model="fatorConv.unMed"
                            :options="listaMedidas"
                        />
                    </q-field>   
                </div>
                <!--<div class="col-2 btn-plus" >

                    <q-btn 
                       rounded
                       color="primary" 
                       @click="novaUnidade">
                       <q-icon name="add" />
                    </q-btn>
                </div>-->
                <div class="col">
                    <q-field
                        icon="library_books"
                     >
                        <q-input
                            float-label="Fator de conversão"
                            v-model="fatorConv.fatorConversao"
                        />
                    </q-field>   
                </div>
            </div>
            <div class="row">
                <div class="col-4">
                    <q-field helper="Valor de Custo R$">
                        <money v-model="CadProduto.produto.custo"
                               v-bind="money"
                               class="mdInput"
                        />
                    </q-field> 
                </div>

                <div class="col-4">
                    <q-field helper="Margem de Lucro %">
                        <money v-model="CadProduto.produto.percLucro"
                               v-bind="perc"
                               class="mdInput"
                        />
                    </q-field> 
                </div>

                <div class="col-4">
                    <q-field helper="Valor de Venda R$">
                        <money v-model="fatorConv.valorVenda"
                               v-bind="money"
                               class="mdInput"
                        />
                    </q-field>
                </div>        
            </div>
            
            
            <div class="row">
                <div class="col">
                    <q-checkbox v-model="fatorConv.conversaoEntrada" label="Conversão padrão para NF de entrada" />
                </div>
            </div>
            
            <div class="row btn-plus left">
                <div class="col">
                    <q-btn 
                        rounded
                        color="primary" 
                        @click="salvarFator"
                    >adicionar fator
                    </q-btn>
                </div>
            </div><br>
            
            <div class="row" id="table">    
                <table class="q-table" :class="computedClasses">
                  <thead>
                    <tr>
                      <th class="text-left">Un. Medida</th>
                      <th class="text-left">Fator Conv.</th>
                      <th class="text-left">Entrada</th>
                      <th class="text-left">ML</th>
                      <th class="text-left">Custo</th>
                      <th class="text-left">Venda</th>
                      <th class="text-left">Editar</th>
                      <th class="text-left">Excluir</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in fatores">
                      <td class="text-left">{{ item.unMed }}</td>
                      <td class="text-right">{{ item.fatorConversao }}</td>
                      <td class="text-left">{{ item.conversaoEntrada | boolString }}</td>
                      <td class="text-left">{{ item.ml | decimal }}</td>
                      <td class="text-left">{{ CadProduto.produto.custo | decimal }}</td>
                      <td class="text-left">{{ item.valorVenda | decimal }}</td>
                      <td class="text-center">
                        <a @click="editarFator(item)" color="info"><i class="material-icons fa-2x">mode_edit</i></a>   
                      </td>
                      <td class="text-center">
                        <i class="material-icons fa-2x mHover text-negative" @click="excluirFator(item)" color="negative">delete_forever</i> 
                      </td>
                    </tr>
                  </tbody>
                </table>
            </div>
        </q-collapsible>
           
        <q-collapsible icon="add_circle" label="Matéria-Prima" v-if="visivel">
            <div class="row">
                <div class="col">
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
                             @change="listarMateriaPrima"
                             @keyup.enter="listarMateriaPrima"
                             @blur="listarMateriaPrima"
                             v-if="tipoCod === 'nome'"
                             >
                        <q-autocomplete
                          :max-results="maxResults"
                          :static-data="{field: 'label', list: listaProdutos}"
                          @selected="listarProdutos"
                        />

                    </q-search>
                    <q-search
                             v-model="search" 
                             color="none" 
                             style="margin-left: 10px"
                             placeholder="Procurar..."
                             @keyup.enter="listarMateriaPrima"
                             @blur="listarMateriaPrima"
                             v-else
                             >

                    </q-search> 
                </div>
            </div>
            
            <div class="row">
                <div class="col">
                    <q-checkbox v-model="mtProds" label="Somente matérias primas" />
                </div>
            </div>
            
            <div class="text-center">
                <h5>{{prodMP.nome}}</h5>
            </div>
                      
            <div class="row">
                <div class="col">
                    <q-field helper="Valor de Custo R$" disabled>
                        <q-input v-model="CadProduto.produto.custo" readonly />
                    </q-field> 
                </div>
                <div class="col">
                    <q-field
                        helper="Fator de conversão"
                     >
                        <q-input
                            v-model="fcMatPrima"
                            type="number"
                        />
                    </q-field>   
                </div>
            </div>
            <div class="row">
                <div class="col-4">
                    <q-field helper="Qte. Produzida">
                        <q-input
                            v-model="qteProd"
                            color="info"
                            type="number"
                        />
                    </q-field> 
                </div>

                <div class="col-4">
                    <q-field helper="Qte. Utilizada">
                        <q-input
                            v-model="qteUtil"
                            color="negative"
                            type="number"
                        />
                    </q-field>
                </div>
                <div class="col text-center">
                    <q-btn 
                        rounded
                        color="primary" 
                        @click="salvarMateriaPrima"
                    >adicionar Produto
                    </q-btn>
                </div>       
            </div><br>
            
            <div class="row" id="table">    
                <table class="q-table" :class="computedClasses">
                  <thead>
                    <tr>
                      <th class="text-left">Matéria Prima</th>
                      <th class="text-left">Valor Unit.</th>
                      <th class="text-left">Qtde</th>
                      <th class="text-left">Total</th>
                      <th class="text-left">Excluir</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in composicao">
                      <td class="text-left">{{ item.materiaPrima }}</td>
                      <td class="text-right">{{ item.valorUnit | formatMoney }}</td>
                      <td class="text-left">{{ item.qtde }}</td>
                      <td class="text-left">{{ item.total | formatMoney }}</td>
                      
                      <td class="text-center">
                        <i class="material-icons fa-2x mHover text-negative" @click="excluirMateriaPrima(item)" color="negative">delete_forever</i> 
                      </td>
                    </tr>
                  </tbody>
                </table>
            </div>
        </q-collapsible>
        
    </q-list>
    <div style="margin-bottom: 30px"></div>
</div>
    
</template>

<script>
import axios from 'axios'
import { required, minLength } from 'vuelidate/lib/validators'
import { Dialog, Toast, Loading } from 'quasar'
import { AtomSpinner } from 'epic-spinners'
import localforage from 'localforage'
    

    
//dev
const API = localStorage.getItem('wsAtual')

//debug
//const API = 'http://192.168.0.200:29755/'

export default {
  name: 'CadProduto',
  data () {
    return {
        nome: '',
        cod: '',
        CadProduto: {
            produto: {
                codigo: 0,
                codBarra: '', //não nulo
                codEmpresa: '', //não nulo
                codFornecedor: '',
                codFabrica: '',
                codCategoria: 1,
                codMarca: 1,
                codFamilia: 1,
                codTipo: 1, //não nulo
                codigoUsuario: parseInt(localStorage.getItem('codUser')), //não nulo
                nome: '', //não nulo
                apelido: '',
                ncm: '',
                custo: '',
                percLucro: '',
                referencia: '',
                posicaoFisica: '',
                aplicacao: '',
                unmed: 'UN',
                estoqueMinimo: '',
            },
            precos: [
                {
                    codigoCab: 1,
                    codProduto: 0,
                    valor: 0.00,
                    valorMinimo: 0.00,
                    codigoUsuario: parseInt(localStorage.getItem('codUser'))
                },
                {
                    codigoCab: 2,
                    codProduto: 0,
                    valor: 0.00,
                    valorMinimo: 0.00,
                    codigoUsuario: parseInt(localStorage.getItem('codUser'))
                }
            ]
        },
        produtos: [],
        /*ProdutosTbPrecoDet: {
            codigoCab: 2,
            codProduto: 0,
            valor: 0.00,
            valorMinimo: 0.00,
            codigoUsuario: parseInt(localStorage.getItem('codUser'))
        },*/
        valor: '',
        familias: [],
        categorias: [],
        marcas: [],
        unidades: [],
        tabPreco: [],
        tabPrecoValores: [],
        custo: 0.00,
        preco: 0.00,
        lucro: 0.00,
        money: {
            decimal: ',',
            thousands: '.',
            prefix: 'R$ ',
            //suffix: ' #',
            precision: 2,
            masked: false /* doesn't work with directive */
        },
        perc: {
            decimal: ',',
            thousands: '.',
            //prefix: 'R$ ',
            suffix: ' %',
            precision: 2,
            masked: false /* doesn't work with directive */
        },
        id: '',
        estoque: 0,
        select: 1,
        checked: false,
        canGoBack: window.history.length > 1,
        error: '',
        visivel: false,
        btnDelete: false,
        fatorConv: {
            codigoProduto: parseInt(localStorage.getItem('codProduto')),
            unMed: '',
            fatorConversao: '',
            valorVenda: 0.00,
            conversaoEntrada: false,
            codigoUsuario: parseInt(localStorage.getItem('codUser'))
        
        },
        fatores: [],
        matPrima: {
            codigoProduto: parseInt(localStorage.getItem('codProduto')),
            codigoMatPrima: 6,
            codigoUsuario: parseInt(localStorage.getItem('codUser'))
        
        },
        composicao: [],
        tipoCod: 'nome',
        search: '',
        prodMP: '',
        fcMatPrima: 1,
        qteProd: 1,
        qteUtil: 1,
        mtProds: false,
        permissoes: {},
        maxResults: parseInt(localStorage.getItem('maxResults')),
        
        //tabela
        misc: 'bordered', //[{value: 'bordered'},{value: 'highlight'}]
        separator: 'cell', // none, horizontal, vertical, cell
        stripe: 'odd', // none, odd, even
        type: 'none', // flipped, responsive
        gutter: 'none', // compact, loose
    }
  },
  filters: {
    boolString: function (value) {
      if (value===true) {
        return 'Sim'
      }
      else {
        return 'Não'
      }
    },
    decimal: function (value) {
      return value.toFixed(2)
    },
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
    colorsClasses(){
      if(this.CadProduto.produto.percLucro <= 0){
        return 'negative'
      }
      else {
        return 'primary'
      }
    },
    listaFamiliasProdutos: function () {
      var a = this.familias
      var lista = []
      
      lista = a.map(row => ({
          label: row.nome, 
          value: row.codigo
      }))
        
      lista.unshift({
          label: 'NOVO...', 
          value: 0
      })
      
      return lista
    },
    listaCategorias: function () {
      var a = this.categorias
      var lista = []
      
      lista = a.map(row => ({
          label: row.nome, 
          value: row.codigo
      }))
      
      lista.unshift({
          label: 'NOVO...', 
          value: 0
      })
        
      return lista
    },
    listaMarcas: function () {
      var a = this.marcas
      var lista = []
      
      lista = a.map(row => ({
          label: row.nome, 
          value: row.codigo
      }))
        
      lista.unshift({
          label: 'NOVO...', 
          value: 0
      })
      
      return lista
    },
    listaMedidas: function () {
      var a = this.unidades
      var lista = []
      
      lista = a.map(row => ({
          label: row.nome, 
          value: row.codigo
      }))
      
      lista.unshift({
          label: 'NOVO...', 
          value: 0
      })
        
      return lista
    },
    listaProdutos: function () {
      let a = this.produtos
      let lista = []
      
      if(this.mtProds === true){
          for(let i=0; i < a.length; i++){
                if(a[i].codTipo === 2){
                    let n = a[i].nome
                    let c = a[i].codigo
                    lista.push({
                      label: n, 
                      value: c
                    })
                }
          }
          
      }
      else{
      
          lista = a.map(row => ({
              label: row.nome, 
              value: row.codigo
          }))

          
      }
      
      return lista
    },
    valorVenda(){
        if(this.CadProduto.produto.percLucro>0){
            return this.CadProduto.produto.custo + (this.CadProduto.produto.custo*(this.CadProduto.produto.percLucro/100))
        }
    },
    
  },
  methods: {
    goBack(){
      window.history.go(-1)
    },
    salvar(){
        //NOVO
        this.CadProduto.produto.nome = this.nome
                
        if(this.CadProduto.produto.codFabrica === ''){
            this.CadProduto.produto.codFabrica = 0
        }
        if(this.CadProduto.produto.codBarra === ''){
            this.CadProduto.produto.codBarra = 0
        }
        if(this.CadProduto.produto.codEmpresa === ''){
            this.CadProduto.produto.codEmpresa = 0
        }
        if(this.CadProduto.produto.codFornecedor === ''){
            this.CadProduto.produto.codFornecedor = 0
        }
        
        if(this.valor>0){
            this.CadProduto.precos[1].valor = this.valor
        }
        
        Loading.show({
          spinner: AtomSpinner,
          spinnerSize: 140,
          message: 'Enviando Dados...'
        })
        axios.post(API + 'produto/gravarProduto', this.CadProduto)
          .then((res)=>{
            Loading.hide()
            Toast.create.positive({
                html: 'Sucesso',
                icon: 'done'
            })
            //console.log(res)
            console.log(res.data)
            console.log(res.response)
            console.log('sucesso')
            this.$router.push('produtos')
          })
          .catch((e)=>{
            Loading.hide()
            //console.log('error')
            console.log(e)
            console.log(String(e))
            let error = e.response.data
            console.log(error)
            for(var i=0; error.length; i++){
                Toast.create.negative(error[i].value)
            }
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
              handler: () => {
                let produto  = this.CadProduto.produto.nome
                Loading.show({
                  spinner: AtomSpinner,
                  spinnerSize: 140,
                  message: 'Aguardando Dados...'
                })
                axios.post(API + 'produto/excluirProduto?codProduto=' + this.CadProduto.produto.codigo)
                  .then((res)=>{
                      //console.log(res)
                      Toast.create(produto + ' foi excluido com sucesso')
                      Loading.hide()
                      this.listarProdutos()
                  })
                  .catch((e)=>{
                    console.log(e)
                    Loading.hide()
                    return
                  })
                this.$router.push('produtos')
              }
            }
          ]
        })
    },
    listarFamilias(){
      axios.get(API + 'produto/obterProdutosFamilia')
      .then((res)=>{
        this.familias = res.data
      })
      .catch((e)=>{
        console.log(e)
      })
    },
    novaFamilia(){
        if(this.CadProduto.produto.codFamilia !== 0){
            return;
        }
        
        Dialog.create({
          title: 'Nova Família de Produtos',
          message: 'Digite o nome da nova família e clique em ok.',
          form: {
            nome: {
              type: 'text',
              label: 'Nome',
              model: ''
            },
            codigoUsuario: {
              model: parseInt(localStorage.getItem('codUser'))
            }
          },
          buttons: [
            'Cancel',
            {
              label: 'Ok',
              handler: (data) => {
                //console.log(data)
                if(data.nome === null || data.nome === ''){
                    Toast.create.negative('A família não pode ser cadastrada com nome nulo') 
                    return
                }
                axios.post(API + 'produto/gravarProdutoFamilia', data)
                  .then((res)=>{
                    //console.log(res)
                    //console.log(res.data)
                    console.log('sucesso')
                    //Toast.create('Returned ' + JSON.stringify(data))
                    Toast.create.positive('Família ' + JSON.stringify(data.nome) + ' cadastrada com sucesso')
                    this.listarFamilias()
                  })
                  .catch((e)=>{
                    console.log('error')
                    console.log(e)
                  })
                
              }
            }
          ]
        })
        
        this.CadProduto.produto.codFamilia = ''
    
    },
    listarCategorias(){
      axios.get(API + 'produto/obterProdutosCategorias')
      .then((res)=>{
        this.categorias = res.data
      })
      .catch((e)=>{
        console.log(e)
      })
    },
    novaCategoria(){
        if(this.CadProduto.produto.codCategoria !== 0){
            return;
        }
        
        Dialog.create({
          title: 'Nova Categoria',
          message: 'Digite o nome da nova categoria e clique em ok.',
          form: {
            nome: {
              type: 'text',
              label: 'Nome',
              model: ''
            },
            codigoUsuario: {
              model: parseInt(localStorage.getItem('codUser'))
            }
          },
          buttons: [
            'Cancel',
            {
              label: 'Ok',
              handler: (data) => {
                //console.log(data)
                if(data.nome === null || data.nome === ''){
                    Toast.create.negative('A categoria não pode ser cadastrada com nome nulo') 
                    return
                }
                axios.post(API + 'produto/gravarProdutoCategoria', data)
                  .then((res)=>{
                    //console.log(res)
                    console.log(res)
                    //console.log(res.data)
                    console.log('sucesso')
                    //Toast.create('Returned ' + JSON.stringify(data))
                    Toast.create.positive('Categoria ' + JSON.stringify(data.nome) + ' cadastrada com sucesso')
                    this.listarCategorias()
                  })
                  .catch((e)=>{
                    console.log('error')
                    console.log(e)
                    console.log(e.body)
                  })
                
              }
            }
          ]
        })
        this.CadProduto.produto.codCategoria = ''
    
    },
    listarMarcas(){
      axios.get(API + 'produto/obterProdutosMarcas')
      .then((res)=>{
        this.marcas = res.data
      })
      .catch((e)=>{
        console.log(e)
      })
    },
    novaMarca(){
        if(this.CadProduto.produto.codMarca !== 0){
            return;
        }
        
        Dialog.create({
          title: 'Nova Marca',
          message: 'Digite o nome da nova marca e clique em ok.',
          form: {
            nome: {
              type: 'text',
              label: 'Nome',
              model: ''
            },
            codigoUsuario: {
              model: parseInt(localStorage.getItem('codUser'))
            }
          },
          buttons: [
            'Cancel',
            {
              label: 'Ok',
              handler (data) {
                //console.log(data)
                if(data.nome === null || data.nome === ''){
                    Toast.create.negative('A marca não pode ser cadastrada com nome nulo') 
                    return
                }
                axios.post(API + 'produto/gravarProdutoMarca', data)
                  .then((res)=>{
                    //console.log(res)
                    //console.log(res.data)
                    console.log('sucesso')
                    //Toast.create('Returned ' + JSON.stringify(data))
                    Toast.create.positive('Marca ' + JSON.stringify(data.nome) + ' cadastrada com sucesso')

                  })
                  .catch((e)=>{
                    console.log('error')
                    console.log(e)
                    console.log(e.body)
                  })
                
              }
            }
          ]
        })
        this.CadProduto.produto.codMarca = ''
    
    },
    listarUnidadesMedida(){
      axios.get(API + 'produto/obterUnMedidas')
      .then((res)=>{
        this.unidades = res.data
      })
      .catch((e)=>{
        console.log(e)
      })
    },
    novaUnidade(){
        if(this.CadProduto.produto.unmed !== 0){
            return;
        }
        
        Dialog.create({
          title: 'Nova Unidade de Medida de Produtos',
          message: 'Digite o nome da nova unidade de medida (É suportado apenas 6 (seis) caracteres), depois digite o seu significado (é preferivel em 1 (uma) palavra) e clique em ok.',
          form: {
            nome: {
              type: 'text',
              label: 'Nome',
              model: ''
            },
            significado: {
              type: 'text',
              label: 'Significado',
              model: ''
            },
            codigoUsuario: {
              model: parseInt(localStorage.getItem('codUser'))
            }
          },
          buttons: [
            'Cancel',
            {
              label: 'Ok',
              handler: (data) => {
                //console.log(data)
                if(data.nome === null || data.nome === ''){
                    Toast.create.negative('A unidade de medida não pode ser cadastrada com nome nulo') 
                    return
                }
                axios.post(API + 'produto/gravarUnMedida', data)
                  .then((res)=>{
                    //console.log(res)
                    console.log(res)
                    //console.log(res.data)
                    console.log('sucesso')
                    //Toast.create('Returned ' + JSON.stringify(data))
                    Toast.create.positive('Unidade de Medida "' + JSON.stringify(data.nome) + '" cadastrada com sucesso')
                    this.listarUnidadesMedida()
                  })
                  .catch((e)=>{
                    console.log('error')
                    console.log(e)
                    console.log(e.body)
                  })
                
              }
            }
          ]
        })
        
        this.CadProduto.produto.unmed = ''
    
    }, 
    listarTabelasPreco(){
      axios.get(API + 'produto/obterProdutosTbPrecoCab')
      .then((res)=>{
        this.tabPreco = res.data
      })
      .catch((e)=>{
        console.log(e)
      })
    },
    listarTabPrecoDet(){
      let cod = localStorage.getItem('codProduto')
      axios.get(API + 'produto/obterProdutosTBPrecoDet?CodigoProduto=' + cod)
      .then((res)=>{
        this.CadProduto.precos = res.data
      })
      .catch((e)=>{
        console.log(e)
      })
    },
    listarProdutos(){
      if (localStorage.getItem('cadMode')==='edit'){
          Loading.show({
              spinner: AtomSpinner,
              spinnerSize: 140,
              message: 'Aguardando Dados...'
          })
          axios.get(API + 'produto/obterproduto?codProduto=' + localStorage.getItem('codProduto'))
          .then((res)=>{
              Loading.hide()
              //console.log(res.data)
              this.CadProduto.produto = res.data
              this.nome = this.CadProduto.produto.nome  
              this.valor = this.CadProduto.produto.valor  
          })
          .catch((e)=>{
            Loading.hide()
            console.log(e.response)
          })
      }
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
    listarFatoresConv(){
      axios.get(API + 'produto/obterProdutosOutrasEmb?codProduto=' + parseInt(localStorage.getItem('codProduto')))
      .then((res)=>{
        this.fatores = res.data
        //console.log(res)
      })
      .catch((e)=>{
        console.log(e)
      })
    },
    salvarFator(){
        if(this.fatorConv.fatorConversao === '' || this.fatorConv.fatorConversao === 0){
            Toast.create.negative('Você não pode salvar sem preencher um fator')
            return;
        }
        
        this.fatorConv.valorVenda = this.CadProduto.produto.valor
        
        Loading.show({
          spinner: AtomSpinner,
          spinnerSize: 140,
          message: 'Aguardando Dados...'
        })
        axios.post(API + 'produto/gravarProdutosOutrasEmb', this.fatorConv)
          .then((res)=>{
            Loading.hide()
            Toast.create.positive({
                html: 'Sucesso',
                icon: 'done'
            })
            //console.log(res)
            console.log(res.data)
            console.log(res.response)
            console.log('sucesso')
            this.fatorConv = {
                codigoProduto: parseInt(localStorage.getItem('codProduto')),
                unMed: '',
                fatorConversao: '',
                valorVenda: 0.00,
                conversaoEntrada: false,
                codigoUsuario: parseInt(localStorage.getItem('codUser'))

            }
            this.listarFatoresConv()
          })
          .catch((e)=>{
            Loading.hide()
            //console.log('error')
            console.log(e)
            console.log(String(e))
            let error = e.response.data
            console.log(error)
            for(var i=0; error.length; i++){
                Toast.create.negative(error[i].value)
            }
        })  
    },
    editarFator(item){
        this.fatorConv = item    
        this.fatorConv.unMed = parseInt(item.unMed)   
    },
    excluirFator(item){
        let fator = item
        Dialog.create({
          title: 'Excluir',
          message: 'Tem certeza que deseja excluir este fator de conversão?',
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
                
                Loading.show({
                  spinner: AtomSpinner,
                  spinnerSize: 140,
                  message: 'Aguardando Dados...'
                })
                axios.post(API + 'produto/excluirProdutosOutrasEmb?codigo=' + fator.codigo)
                  .then((res)=>{
                      //console.log(res)
                      Toast.create('O Fator de Conversão selecionado foi excluido com sucesso')
                      Loading.hide()
                      this.listarFatoresConv()
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
    listarMateriaPrima(){
      if(this.search === '' && this.tipoCod === 'nome'){
        return  
      }
      if(this.search === '' && this.tipoCod !== 'nome'){
        return;
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
        this.prodMP = res.data
        if(typeof this.prodMP !== 'object'){
            this.prodMP = {}
            Object.assign(this.prodMP, {nome: 'Produto não encontrado'});
        }
      })
      .catch((e)=>{
        Loading.hide()
        console.log(e)
        if(typeof this.prodMP.nome == 'undefined'){
            Object.assign(this.prodMP, {nome: 'Produto não encontrado'});
        }
      })
     
    },
    salvarMateriaPrima(){
        if(this.search === '' || this.search === 0){
            Toast.create.negative('Você não pode adicionar matéria prima sem selecionar o produto')
            return;
        }
        
        this.matPrima.codigoMatPrima = this.prodMP.codigo
        let Qtd = this.qteUtil * this.fcMatPrima
        let umInt = Math.round(Qtd / this.qteProd).toFixed(3)       
        Object.assign(this.matPrima, { qtde: umInt })
        console.log('matPrima:', this.matPrima);
        
        
        let lista = []
        
        lista.push(this.matPrima)
        
        Loading.show({
          spinner: AtomSpinner,
          spinnerSize: 140,
          message: 'Aguardando Dados...'
        })
        axios.post(API + 'produtoMatPrima/gravarProdutoMatPrima', lista)
          .then((res)=>{
            Loading.hide()
            Toast.create.positive({
                html: 'Sucesso',
                icon: 'done'
            })
            //console.log(res)
            console.log(res.data)
            console.log(res.response)
            console.log('sucesso')
            this.matPrima = {
                codProduto: parseInt(localStorage.getItem('codProduto')),
                codigoMatPrima: '',
                codigoUsuario: parseInt(localStorage.getItem('codUser'))
            }
            this.listarFatoresConv()
          })
          .catch((e)=>{
            Loading.hide()
            //console.log('error')
            console.log(e.response)
            console.log(String(e))
            let error = e.response.data
            console.log(error)
            for(var i=0; error.length; i++){
                Toast.create.negative(error[i].value)
            }
        })  
        
    },
    obterMateriaPrima(){
        Loading.show({
          spinner: AtomSpinner,
          spinnerSize: 140,
          message: 'Aguardando Dados...'
        })
        axios.get(API + 'produtomatprima/obtermateriaprima?codigoproduto=' + localStorage.getItem('codProduto'))
          .then((res)=>{
            console.log(res)
            this.composicao = res.data
          })
          .catch((e)=>{
            Loading.hide()
            console.log(e.response)
        })  
    },
    excluirMateriaPrima(item){
        Dialog.create({
          title: 'Excluir',
          message: 'Tem certeza que deseja excluir a matéria prima ' + item.materiaPrima + '?',
          buttons: [
            {
              label: 'Não! Cancela',
              color: 'negative',
              raised: true,
              style: 'margin-top: 20px',
              handler(){
                Toast.create('Cancelado...')
              }
            },
            {
              label: 'Sim! Pode excluir',
              color: 'positive',
              raised: true,
              style: 'margin-top: 20px',
              handler: () => {
                Loading.show({
                  spinner: AtomSpinner,
                  spinnerSize: 140,
                  message: 'Aguardando Dados...'
                })
                axios.post(API + 'produto/excluirProdutosOutrasEmb?codigo=' + item.codigo)
                  .then((res)=>{
                      //console.log(res)
                      Toast.create('O Fator de Conversão selecionado foi excluido com sucesso')
                      Loading.hide()
                      this.listarFatoresConv()
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
    }
   
  },
  mounted(){
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
  created(){
    let t = this
    t.listarFamilias()
    t.listarCategorias()
    t.listarMarcas()
    t.listarUnidadesMedida()
    t.listarTabelasPreco()
    t.listarFatoresConv()
    t.listarProdutos()
    t.todosProdutos()
      
    if(localStorage.getItem('cadMode') === 'edit'){
        t.btnDelete = true
        t.visivel = true
        t.listarTabPrecoDet()
        t.obterMateriaPrima()
        
    }

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
    
    .mdInput {
        /*margin-top: 10px;*/
        width: 100%;
        background:transparent;
        outline:none;
        border: 0px;
        /*border-bottom-color: #D3DAE0;*/
    }
    
    #id {
        margin-top: 15px;
        font-weight: bolder;
        font-size: 16px;    
    }
    
    #estoque {
        margin-top: 15px;
        font-weight: bolder;
        font-size: 16px; 
        color: darkorange;
    }
    
    
</style>