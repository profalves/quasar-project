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
        style="margin-left:5px;"
        v-if="btnDelete"
      >
        <i class="material-icons">delete</i>
      </q-btn>
      
      <q-btn
        color="positive"
        push big
        @click="salvar"
        style="margin-left:5px;"
      >
        <i class="material-icons">done</i>
    </q-btn>
      
    </div>
    
    <!-- formulário -->
    
    <div class="row">            
        
        <div class="col">
            <h5>Ordem de Compra</h5>
        </div>
    </div>
    
    <q-list style="background-color: white;">
    
      <!--cabeçalho-->
      <q-collapsible :opened="open.cab" icon="explore" label="Cabeçalho">
          
        <div class="row">
            <div class="col">
                <q-field
                    icon="store"
                 >
                    <q-select
                        float-label="Fornecedor"
                        filter
                        v-model="cabecalho.codPessoaEmissor"
                        :options="listaFornecedores"
                        @change="cadFornecedor"
                    />
                </q-field>   
            </div>
            
        </div>
        
        
        <div class="row">
            <div class="col-md-6">
                <q-field
                    icon="date_range"
                 >
                    <q-datetime v-model="cabecalho.dataEntrada"
                                type="date" 
                                float-label="Data Entrada" 
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

            <div class="col-md-6">
                <q-field
                    icon="date_range"
                 >
                    <q-datetime v-model="cabecalho.dataVenda" 
                                type="date" 
                                float-label="Data Emissão" 
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
          
        <div class="row">
            <div class="col">
                <q-field
                    icon="explore"
                 >
                    <q-input
                        float-label="N. Nota"
                        v-model="cabecalho.numeroCupom"
                        type="number"
                    />
                </q-field>

            </div>

            <!--<div class="col">
                <q-field
                    icon="explore"
                 >
                    
                    <q-search v-model="cfop"
                              float-label="CFOP"
                              
                    >
                        <q-autocomplete
                          separator
                          :static-data="{field: 'value', list: listaCFOPEnt}"
                          @search="search"
                        />
                          
                    </q-search>    
                     
                </q-field> 
                
            </div>-->
            
        </div>
          
        <div class="row">
            <div class="col">
              <q-field
                icon="done"
                :error="$v.chave.$error"
                helper="Chave de Acesso"
              >
                <the-mask v-model="cabecalho.chaveAcesso"
                          :mask="['####-####-####-####-####-####-####-####-####-####-####']"
                          @input="$v.chave.$touch()"
                          class="mdInput"
                          style="width: 100%"
                />
                  
                
              </q-field>
                
                <!--<span style="color:#878B8F; margin-left:43px" v-if="!$v.cpf.required">Este campo é requerido</span>-->
                <div class="error" v-if="!$v.chave.minLength">Este campo deve ser conter  caracteres.</div>
            </div>
        </div>
          
        <div class="row">
            <div class="col-xs-12 col-md-6" style="margin-top: 10px">
                <q-field
                    label="Total da Nota"
                >
                    {{ somaNota | formatMoney }} 
                </q-field>    
            </div>
                
            <div class="col-xs-12 col-md-6" style="margin-top:10px">
                <q-select
                  v-model="cabecalho.vendaPrazo" 
                  :options="[
                    {value: false, label: 'À Vista'},
                    {value: true, label: 'À Prazo'}
                  ]"
                  @blur="open.desp = true"
                />

            </div>
        </div>
      
      </q-collapsible>
        
      <!--Outros-->  
      <q-collapsible :opened="open.desp" icon="monetization_on" label="Outras Despesas">
            <div class="row">
                <div class="col-md-6">
                    <q-field>
                        <q-input float-label="Desconto"
                                 v-model="desc" />
                    </q-field>    
                </div>
                <div class="col-md-6">
                    <q-field>
                        <q-input float-label="Frete"
                                 v-model="desc" />
                    </q-field>    
                </div>

            </div>

            <div class="row">
                <div class="col-md-6">
                    <q-field>
                        <q-input float-label="Seguro"
                                 v-model="desc" />
                    </q-field>    
                </div>
                <div class="col-md-6">
                    <q-field>
                        <q-input float-label="Outros"
                                 v-model="desc"
                                 @blur="open.itens = true"/>
                    </q-field>    
                </div>

            </div>
        
      </q-collapsible>
        
      <!--Itens-->  
      <q-collapsible :opened="open.itens" icon="local_mall" label="Itens">
         
        <div class="col col-md-3">
            <q-btn
                color="secondary"
                push
                :key="modal"
                @click="openModal"
                
            >
                Adicionar item
            </q-btn>
        </div>
        
        <br>
        <!--Data tables HTML-->
        <div class="row" id="table">
            <table class="q-table" :class="computedClasses">
              <thead>
                <tr>
                  <th class="text-center">Cód</th>
                  <th class="text-center">Produto</th>
                  <th class="text-center">Preço Unit.</th>
                  <th class="text-center">Quant.</th>
                  <th class="text-center">Valor Total</th>
                  <th class="text-center">Editar</th>
                  <th class="text-center">Excluir</th>
                  
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in CadNotas.det">
                  <td class="text-left">{{ item.codigoProduto }}</td>
                  <td class="text-left">{{ item.nomeProduto }}</td>
                  <td class="text-right">{{ item.custo | formatMoney }}</td>
                  <td class="text-right">{{ item.qtd }}</td>
                  <td class="text-right">{{ item.totalItem | formatMoney }}</td>
                  <td class="text-center">
                    <q-btn round outline small color="info" icon="edit" @click="editItem(item)"></q-btn>    
                  </td>
                  <td class="text-center">
                    <q-btn round outline small color="negative" icon="delete_forever" @click="excluirItem(index)"></q-btn>  
                  </td>
                </tr>
              </tbody>
            </table>  
            
        </div>
        <div class="col-6" style="margin-top:30px">
            <strong>Total Produtos: </strong>{{ somaNota | formatMoney }}
        </div>
        
    
      </q-collapsible>
        
      <!--Duplicatas-->
      <q-collapsible v-if="cabecalho.vendaPrazo===true" :opened="open.dup" icon="local_atm" label="Duplicatas">
          <div v-if="visivel">
            <div class="row">
                <div class="col">
                    <q-field>
                        <q-select
                            float-label="Forma de Pagamento"
                            filter
                            v-model="duplicata.formaPgto"
                            :options="listaFormas"
                        />
                    </q-field> 

                </div>
                
            </div>
            
            <div class="row">
                <div class="col-md-6">
                    <q-field>
                        <q-select
                            float-label="Tipo Despesa"
                            filter
                            v-model="duplicata.codTipo"
                            :options="listaCategorias"
                            @change="listarSubtipos"
                        />
                    </q-field> 

                </div>
                <div class="col-md-6">
                    <q-field>
                        <q-select
                            float-label="SubTipo Despesa"
                            filter
                            v-model="duplicata.codSubTipoDespesa"
                            :options="listaSubCategorias"
                        />
                    </q-field> 

                </div>
                
            </div>
            
            <div class="row">
                <div class="col-md-6">
                    <q-field
                    >
                        
                        <q-datetime v-model="duplicata.vencimento"
                                type="date" 
                                float-label="Vencimento" 
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
                <div class="col-md-6">
                    <q-field>
                        <q-input
                            float-label="Quantidade Parcelas"
                            v-model.number="qtdParcelas"
                            @blur="dividir"
                        />
                    </q-field>
                </div>
                
                
            </div>
            
            <div class="row">
                <div class="col-md-6">
                    <q-field
                            helper="Intervalo Dias"
                    >
                        <q-input
                            
                            v-model="intervalo"
                            class="mdInput"
                        />
                    </q-field>
                </div>
                <div class="col-md-6">
                    <q-field
                        helper="Valor Parcelas"
                    >
                        <money v-model="duplicata.valorTitulo" 
                               v-bind="money"
                               class="mdInput"
                               style="margin-top: 2px"
                        />
                    </q-field>
                </div>
            </div>
           
        </div>
        <div v-else>
            <!--Data tables HTML-->
            <div class="row" id="tableDup">
                <table style="margin-top: 30px;" class="q-table" :class="computedClasses">
                  <thead>
                    <tr>
                      <th class="text-center">Vencimento</th>
                      <th class="text-center">Valor Parcela</th>
                      <th class="text-center">Pagamento</th>
                      <th class="text-center">Valor Pago</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="dup in titulos">
                      <td class="text-left">{{dup.vencimento | formatDates}}</td>
                      <td class="text-right">{{dup.valorTitulo | formatMoney}}</td>
                      <td class="text-left">{{dup.pagamento | formatDates}}</td>
                      <td class="text-right">{{dup.valorPago | formatMoney}}</td>
                    </tr>

                  </tbody>
                </table>  

            </div>
            <div class="col-6" style="margin-top:30px">
                <strong>Total Duplicatas: </strong>{{ somaContas | formatMoney}}
            </div>
        </div> 
      </q-collapsible>
        
    </q-list>
    <br><br>
    
    
    <!--MODAL-->
    <q-modal ref="layoutModal" :content-css="{minWidth: '60vw', minHeight: '100vh'}">
      <q-modal-layout>
        <q-toolbar slot="header" color="black">
          <q-btn flat @click="$refs.layoutModal.close()">
            <q-icon name="keyboard_arrow_left" />
          </q-btn>
          <q-toolbar-title>
            Detalhes do item
          </q-toolbar-title>
        </q-toolbar>
        
        <div v-if="!editarItem">
          <q-toolbar slot="header" color="tertiary">
             <q-radio v-model="tipoCod" 
                      val="barras" 
                      color="white" 
                      label="Cód. Barras" 
                      @focus="search = ''" />
             <q-radio v-model="tipoCod" 
                      val="emp" color="white" 
                      label="Cód. Emp" 
                      style="margin-left: 20px"  
                      @focus="search = ''" />
             <q-radio v-model="tipoCod" 
                      val="nome" color="white" 
                      label="Nome" 
                      style="margin-left: 20px" 
                      @focus="search = ''" />
          </q-toolbar>
          <q-toolbar slot="header" color="tertiary" v-if="tipoCod === 'nome'">
             <q-search inverted 
                       v-model="search" 
                       color="none" 
                       style="margin-left: 10px"
                       placeholder="Procurar..."
                       @keyup.enter="listarProdutos"
                       @blur="listarProdutos"
                       >
                  <q-autocomplete
                    :max-results="maxResults"
                    :static-data="{field: 'label', list: listaItens}"
                    @selected="listarProdutos"
                  />

             </q-search>
          </q-toolbar>
          <q-toolbar slot="header" color="tertiary" v-else>
             <q-search inverted 
                       v-model="search" 
                       color="none" 
                       style="margin-left: 10px"
                       placeholder="Procurar..."
                       @keyup.enter="listarProdutos"
                       @blur="listarProdutos"
                       >

             </q-search>
        </q-toolbar>
        </div>
        
        <div class="layout-padding">
            
            <div class="row" v-if="!editarItem">
                <div class="col-8">
                    <h5>{{ produto.nome }}</h5>
                </div>
                <div class="col" style="margin-top: 20px;
                                        text-align: right;">
                    Estoque: <strong style="color: orangered;">{{ produto.qtd }}</strong>
                </div>
            </div>
            <div v-else>
                <div class="col-8">
                    <h5>{{ detItem.nomeProduto }}</h5>
                </div>
            </div>
            <hr />
            
            <!--<div class="row">
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
            </div>-->
            
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
                            float-label="Unidade de Medida"
                            filter
                            v-model="detItem.unMedCom"
                            :options="listaMedidas"
                        />
                    </q-field> 

                </div>
            </div>
            
            
            
            <div class="row">
                <div class="col">
                    <q-field>
                        <q-input
                            float-label="Quantidade"
                            v-model="detItem.qtd"   
                        />
                    </q-field>
                </div>
                <div class="col">
                    <q-field
                        helper="Custo"
                    >
                        
                        <money v-model="detItem.custo"
                               v-bind="money"
                               class="mdInput"
                               style="margin-top:12px"
                        />
                    </q-field>
                </div>
                
            </div>
            
            <div class="row">
                <div class="col-md-6">
                    <q-field
                        helper="Desconto"
                    >
                        <money v-model="detItem.desconto"
                               v-bind="money"
                               class="mdInput"
                        />
                    </q-field>
                </div>
                <div class="col-md-6">
                    <q-field
                        helper="Frete"
                    >
                        <money v-model="detItem.frete" 
                               v-bind="money"
                               class="mdInput"
                        />
                    </q-field>
                </div>
            </div>
            
            <div class="row">
                <div class="col-md-6">
                    <q-field
                        helper="Seguro"
                    >
                        <money v-model="detItem.seguro"   
                               v-bind="money"
                               class="mdInput"
                        />
                    </q-field>
                </div>
                <div class="col-md-6">
                    <q-field
                        helper="Outros Custos"
                    >
                        <money v-model="detItem.outro"
                               v-bind="money"
                               class="mdInput"
                        />
                    </q-field>
                </div>
            </div>
            
            <div class="row">
                
                <div class="col-md-6">
                    <q-field>
                        <q-input
                            float-label="Aliq. IPI (%)"
                            v-model="item.AliqIPI"
                            suffix="%"
                            style="padding-right: 20px"
                        />
                    </q-field>
                </div>
                <div class="col-md-6">
                    <q-field
                        helper="IPI"
                             >
                        <money v-model="detItem.IPI"
                               v-bind="money"
                               class="mdInput"
                               style="margin-top: 12px"
                        />
                    </q-field>
                    
                </div>
            </div>
    
        </div>
        
        <div class="row">
            
            <div class="col">
                <q-card color="primary" class="col-sm-6">
                  <center>
                    <q-card-title>Lucro</q-card-title>
                        <input v-model="item.desconto"
                               class="boxInput"
                               v-money="perc"
                        />
                        <br>
                  </center>
                </q-card>
            </div>

            <div class="col">
                <q-card color="positive" class="col-sm-6">
                  <center>
                    <q-card-title>Venda</q-card-title>
                        <money v-model="detItem.venda"
                               class="boxInput"
                               :money="money"
                        />
                  </center>
                </q-card>
            </div>  
        </div>
        
        <div class="row">
            <div class="col" style="margin:10px">
                <q-btn color="secondary" @click="verificarDuplicidade($refs.layoutModal.close())">Adicionar item</q-btn>
            </div>   
        </div>
        
      </q-modal-layout>
    </q-modal>
    
    
    
</div>
    
</template>

<script>
import axios from 'axios'
import { FulfillingBouncingCircleSpinner } from 'epic-spinners'
import listaCFOP from 'data/CFOP.json'
import { minLength } from 'vuelidate/lib/validators'
import { Dialog, Toast, Loading, Ripple } from 'quasar'
import localforage from 'localforage'
  
const itemInit = { //det 
    codTabPreco: 2,
    codigoProduto: '',
    codigoUsuario: parseInt(localStorage.getItem('codUser')),
    codigoComputador: '',    
    custo: 0.00,    
    custoTrib: 0.00,    
    desconto: 0.00,    
    venda: 0.00,    
    acrescimo: 0.00,    
    unMedCom: '',    
    unMedTrib: '',    
    encargos: 0.00,    
    IPI: 0.00,    
    frete: 0.00,    
    seguro: 0.00,    
    outro: 0.00,    
    qtd: 1,    
    qtdCom: 1,    
    tipoSaida: 'V',    
    qtdDevolvida: 0.00,    
    totalItem: 0.00,    
    cancelado: '',    
    codPessoaEmpregado: '',
    OBS: '',    
    impresso: ''
}
    
//dev
const API = localStorage.getItem('wsAtual')

//debug
//const API = 'http://192.168.0.200:29755/'


export default {
  name: 'OrdemCompras',
  data () {
    return {
        //Objeto Cadastro de notas
        CadNotas:{
            det:[],
            formasPgto:[
                {
                    dataPagto: '',
                    valor: 0.00,
                    formaPagto: 1,
                    codigoTransacao: 1,
                    codigoOperacao: 1,
                    codigoCaixa: 1,
                    codigoUsuario: parseInt(localStorage.getItem('codUser')),
                    codigoEmpresa: 1,
                    dataVencimento: '',
                    codigoOpCartao: 1,
                    codigoBandeiraNFCE: '',
                    codigoCCBandeira: '',
                    tipoIntregCartao: '',
                    OBS: '',
                    qtdParcelas: '',
                    quitado: false
                }
            ],
            titulos: [],
            cheques: [
                {
                    codPessoaTitular: 1,
                    codigoBanco: 100,
                    valor: 0.00,
                    numeroCheque: 9999999,
                    numeroAgencia: '',
                    numeroConta: '',
                    dataVcto: '',
                    codigoUsuario: parseInt(localStorage.getItem('codUser')),

                }
            ],
            cartao: [
                {
                    codOperadora: 1,
                    codBandeira: 1,
                    dataVcto: new Date(),
                    valorParcela: 0.00,
                    taxaOP: '',
                    taxaMensal: '',
                    codigoUsuario: parseInt(localStorage.getItem('codUser'))
                }
            ],
            Transporte: {
                    CodPessoa: 1,
                    modFrete: 1, //Required
                    quantVolumes: 0,
                    pesoLiquido: 0.00,
                    pesoBruto: 0.00,
                    especie: '', //50
                    marca: '', //50
                    numeroVolumes: 0,
                    placaVeiculo: '',
                    UFVeiculo: 'ba'
            }       
        },
        
        //Objetos Auxiliares
        cabecalho:{ //cab
            vendaPrazo: false,
            tipoNotaE: '', //4
            tipoMovimento: 'E', //1
            numeroCupom: 0, //int
            numeroNotaE: '', //int
            chaveAcesso: '', //44
            dataVenda: '',
            codPessoaEmissor: '',
            codPessoaDestina: 1,
            valorBruto: 0.00,
            valorDesconto: 0.00,
            valorAcrescimo: 0.00,
            valorRecibo: 0.00,
            troco: 0.00,
            codigoCaixa: 1,
            codigoOperacao: 1,
            codigoParcelamento: 1,
            codigoDependente: '',
            codigoEmpresa: 1,
            codigoUsuario: parseInt(localStorage.getItem('codUser')),
            codigoVendedor: 1,
            codigoStatus: '',
            OBS: '',
            dataEntrada: ''
        },
        detItem: { //det 
            codTabPreco: 2,
            codigoProduto: '',
            codigoUsuario: parseInt(localStorage.getItem('codUser')),
            codigoComputador: '',    
            custo: 0.00,    
            custoTrib: 0.00,    
            desconto: 0.00,    
            venda: 0.00,    
            acrescimo: 0.00,    
            unMedCom: '',    
            unMedTrib: '',    
            encargos: 0.00,    
            IPI: 0.00,    
            frete: 0.00,    
            seguro: 0.00,    
            outro: 0.00,    
            qtd: 1,    
            qtdCom: 1,    
            tipoSaida: 'V',    
            qtdDevolvida: 0.00,    
            totalItem: 0.00,    
            cancelado: '',    
            codPessoaEmpregado: '',
            OBS: '',    
            impresso: ''
        },
        duplicata: {
            codFornecedor: '', //não nulo
            codTipo: 1, //não nulo
            codSubTipoDespesa: 1, //não nulo
            tipo: 'CP', 
            pagtoTitulo: 0,
            codigoCab: 0,
            codigoVZC: 0,
            contaFixa: false,
            formaPgto: 1,
            formaPgtoNFce: 1,
            numeroDocumento: '',
            vencimento: new Date(), //não nulo
            pagamento: '',
            valorTitulo: '',
            valorPago: '',
            valorDesc: '',
            valorJuros: '',
            codigoUsuario: parseInt(localStorage.getItem('codUser')), //não nulo
        },
        titulos: [],
        qtdParcelas: 1,
        intervalo: 30,
        tipoEntradaEstoque: 'compra', // { Compra, OrdemCompra, LancarProducao }
        visivel: true,
        tipoCod: 'nome',
        ref: 'layoutModal',
        modal: false,
        search: '',
        
        //cabeçário
        pessoas: [],
        desc: '0,00',
        nNfe: '',
        ncm: '',
        forma: '',
        doc: '',
        tipoDoc: '',
        select: 'vista',
        bloqueado: true,
        danfe: '',
        cfop: '',
        listaCFOP,
        
        //itens
        estoque: '0',
        item: {
            ncm: '',
            cfop: '',
            fator: 1,
            qtd: 1,
            estoque: '0',
            vUnit: '',
            desconto: '0,00',
            frete: '0,00',
            seguro: '0,00',
            outros: '0,00',
            AliqIPI: '',
            vIPI: '0,01',
            custo: '',
            lucro: '',
            venda: ''
        },
        selected: '',
        produto: '',
        produtos: [],
        unidades: [],
        indice: 0,
        cat: [],
        sub: [],
        formas: [],
        editarItem: false,
        
        //configs
        dias: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
        meses: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        open: {
            cab: true,
            desp: false,
            itens: false,
            dup: false
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
        maxResults: parseInt(localStorage.getItem('maxResults')),
        canGoBack: window.history.length > 1,
        btnDelete: false,
        
        //v-money
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
      let a = this.listaCFOP.filter(cfopEntrada)
      let lista = []
      
      for (let i=0; i < a.length; i++) {
          let n = a[i].value.toString() + ' - ' + a[i].label.toString()
          let c = a[i].value.toString()
          let v = c.toString().substring(3,4)
          if(v!=='0'){
            lista.push({label: n, value: c})
          }   
      }
      return lista
      
      
      
    },
    listaFornecedores: function () {
      var a = this.pessoas
      var lista = []
      
      for (let i=0; i < a.length; i++) {
          if(a[i].codTipo === 2){
              let n = a[i].nome
              let c = a[i].codigo
              lista.push({label: n, value: c})  
          }  
      }
      
      lista.unshift({
          label: 'NOVO...', 
          value: 0
      })
      
      return lista
    
    }, 
    listaDestina: function () {
      let a = this.pessoas
      let lista = []
      
      lista = a.map(row => ({
          label: row.nome, 
          value: row.codigo
      }))
      
      return lista
    
    },
    listaItens: function () {
      var a = this.produtos
      var lista = []
      
      lista = a.map(row => ({
          label: row.nome, 
          value: row.codigo
      }))
      
      return lista
    },
    listaMedidas: function () {
      var a = this.unidades
      var lista = []
      
      lista = a.map(row => ({
          label: row.nome, 
          value: row.codigo
      }))
      
      return lista
    },
    listaCategorias: function () {
      var a = this.cat
      var lista = []
      
      lista = a.map(row => ({
          label: row.nome, 
          value: row.codigo
      }))
      
      return lista
    
    }, 
    listaSubCategorias: function () {
      var a = this.sub
      var lista = []
      
      lista = a.map(row => ({
          label: row.nome, 
          value: row.codigo
      }))
      
      return lista
    
    }, 
    listaFormas: function () {
      var a = this.formas
      var lista = []
      
      lista = a.map(row => ({
          label: row.nome, 
          value: row.codigo
      }))
      
      return lista
    
    },
    somaNota(value){
      if(this.CadNotas.det.length === 0){ return 0 }
      let a = this.CadNotas.det
      let lista = []
      
      lista = a.map(row => row.totalItem )
      
      value = lista.reduce(function(a, b) {
        return a + b;
      });
      return value
    },
    somaContas(value){
      
      if(this.titulos.length === 0){ return 0 }
      
      let a = this.titulos
      let lista = []
      
      lista = a.map(row => row.valorTitulo )
       
      value = lista.reduce(function(a, b) {
        return a + b;
      });
      return value
    }
  },
  
  validations: {
    chave: {
      minLength: minLength(43)
    },
  },
  methods: {
    goBack(){
      window.history.go(-1)
    },
    cadFornecedor(){
        if(this.cabecalho.codPessoaEmissor === 0){
            return;
        }
        localStorage.setItem('tela', 'fornNotas')
        localStorage.setItem('cadMode', 'save')
        this.$router.push('/cadcliente')
    },
    
    /*
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
    */
    
    salvar(){
        Object.assign(this.CadNotas, {cab: this.cabecalho})
        if(this.cabecalho.vendaPrazo === true) {
            this.duplicata.codFornecedor = this.cabecalho.codPessoaEmissor
            this.CadNotas.titulos.push(this.duplicata)
        }
        
        Loading.show({
          spinner: FulfillingBouncingCircleSpinner,
          spinnerSize: 140,
          message: 'Enviando Dados...'
        })
        
        axios.post(API + 'pedido/gravarPedido', [this.CadNotas, this.tipoEntradaEstoque, this.qtdParcelas, this.intervalo])
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
            this.CadNotas.det = []
            this.$router.push('entradanfe')
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
              handler () {
                Toast.create('Excluído!')
              }
            }
          ]
        })
    },
    
    openModal(){
        this.$refs.layoutModal.open()
        this.search = ''
        this.detItem = itemInit
        this.produto = {}
        this.editarItem = false
    },
    verificarDuplicidade(){
      if(this.editarItem){
        let qtd = this.detItem.qtd //armazenar antes de limpar os campos
        for(let i in this.CadNotas.det){ //verificar duplicidade
            if(this.produto.codBarra === this.CadNotas.det[i].codBarra){
                console.log('CadNotas.det.codBarra', this.CadNotas.det[i].codBarra);
                console.log('produto.codBarra', this.produto.codBarra);
                let s = this.CadNotas.det[i].qtd + qtd
                this.CadNotas.det[i].qtd = s
                let c = this.CadNotas.det[i].custo * s
                this.CadNotas.det[i].totalItem = c
                return
            }  
        }
        
        this.addItem()
      }
      else {
        this.enviarItem()
      }
    },
    addItem(){
        if(this.produto === ''){
            Toast.create('Não pode adicionar item nulo')
            return
        }
        
        Object.assign(this.detItem, {nomeProduto: this.produto.nome})
        
        this.enviarItem()
            
    },
    enviarItem(){ //calcular impostos dos itens
        let Fiscal = false //depois transformar em vaiável global
        let VendasDet = this.detItem
        let VendasDetImp = {}
        let FatorConversao = this.item.fator
        let tipoEntradaEstoque = 'ordemCompra'
        Loading.show({
          spinner: FulfillingBouncingCircleSpinner,
          spinnerSize: 140,
          message: 'Enviando Dados...'
        })
        axios.post(API + 'vendasDet/retornaMvVendasDet', [
            Fiscal,
            VendasDet,
            VendasDetImp,
            FatorConversao,
            tipoEntradaEstoque
        ])
        .then((res)=>{
          console.log(res.data)
          this.CadNotas.det.push(res.data)
          this.duplicata.valorTitulo = this.somaNota
          this.detItem = {
            codTabPreco: 2,
            codigoProduto: '',
            codigoUsuario: parseInt(localStorage.getItem('codUser')),
            codigoComputador: '',    
            custo: 0.00,    
            custoTrib: 0.00,    
            desconto: 0.00,    
            venda: 0.00,    
            acrescimo: 0.00,    
            unMedCom: '',    
            unMedTrib: '',    
            encargos: 0.00,    
            IPI: 0.00,    
            frete: 0.00,    
            seguro: 0.00,    
            outro: 0.00,    
            qtd: 1,    
            qtdCom: 1,    
            tipoSaida: 'V',    
            qtdDevolvida: 0.00,    
            totalItem: 0.00,    
            cancelado: '',    
            codPessoaEmpregado: '',
            OBS: '',    
            impresso: ''
          }
          Loading.hide()
        })
        .catch((e)=>{
          console.log(e.response)
          Loading.hide()
        })
    },
    editItem(item){
        this.$refs.layoutModal.open()
        this.search = ''
        this.detItem = item
        this.editarItem = true
    },
    excluirItem(index){
        this.indice = index
        
        if(this.indice !== -1) {
            this.CadNotas.det.splice(index,1)
        }
    },
     
    addDup(){
        this.CadNotas.titulos.push(this.duplicata)
    },
      
    dividir(){
        if(this.somaNota === 0){
            Toast.create('Você não pode gerar parcelas de uma nota sem itens')
        }
        let d = this.somaNota / this.qtdParcelas
        this.duplicata.valorTitulo = d    
    },
      
    findTemp(){
        localforage.getItem('ordemTemp').then((value) => {
        if(value){
            Dialog.create({
              title: 'Ordem de compra salva como rascunho',
              message: 'Você tem uma ordem de compra salva temporariamente, deseja recuperar?',
              buttons: [
                {
                  label: 'Não',
                  color: 'negative',
                  raised: true,
                  style: 'margin-top: 20px'
                },
                {
                  label: 'Sim',
                  color: 'positive',
                  raised: true,
                  style: 'margin-top: 20px',
                  handler:() => {
                    this.CadNotas = value
                    this.cabecalho = this.CadNotas.cab
                    Toast.create.positive('Ordem de compra recuperada com sucesso!')
                  }
                }
              ]
            })
        }
        
      }).catch(function(err) {
        Toast.create.negative('Falha ao carregagar a ordem: ' + err)
        
      });
    },
      
    //====== LISTAS ======================================================================
    
    listarPessoas(){
      Loading.show({
          spinner: FulfillingBouncingCircleSpinner,
          spinnerSize: 140,
          message: 'Aguardando Dados...'
      })
      axios.get(API + 'pessoa/obterpessoa?todos=true')
      .then((res)=>{
          //console.log(res.data)
          this.pessoas = res.data
          Loading.hide()
      })
      .catch((e)=>{
        console.log(e)
        Loading.hide()
      })  
    },
    listarProdutos(){
      if(this.search === ''){
        this.search = 0
      }
        
      if(this.tipoCod === 'barras'){
          Loading.show({
              spinner: FulfillingBouncingCircleSpinner,
              spinnerSize: 140,
              message: 'Aguardando Dados...'
          })
          axios.get(API + 'produto/obterproduto?codBarra=' + this.search)
          .then((res)=>{
            Loading.hide()
            this.produto = res.data
            this.detItem.custo = this.produto.custo
            this.detItem.venda = this.produto.valor
            this.detItem.unMed = this.produto.unMed
            this.detItem.codigoProduto = this.produto.codigo
            
            //console.log(res)
            if(typeof this.produto.nome == 'undefined'){
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
      }
      else if(this.tipoCod === 'emp'){
          axios.get(API + 'produto/obterproduto?codEmpresa=' + this.search)
          .then((res)=>{
            this.produto = res.data
            this.detItem.custo = this.produto.custo
            this.detItem.venda = this.produto.valor
            this.detItem.unMedCom = this.produto.unMed
            this.detItem.codigoProduto = this.produto.codigo
            
            //console.log(res)
            if(typeof this.produto.nome == 'undefined'){
                Object.assign(this.produto, {nome: 'Produto não encontrado'});
            }
          })
          .catch((e)=>{
            console.log(e)
            if(typeof this.produto.nome == 'undefined'){
                Object.assign(this.produto, {nome: 'Produto não encontrado'});
            }
          })
      }
      else {//nome
          Loading.show({
              spinner: FulfillingBouncingCircleSpinner,
              spinnerSize: 140,
              message: 'Aguardando Dados...'
          })
          axios.get(API + 'produto/obterproduto?nomeProduto=' + this.search)
          .then((res)=>{
            Loading.hide()
            this.produto = res.data
            this.detItem.custo = this.produto.custo
            this.detItem.venda = this.produto.valor
            this.detItem.unMed = this.produto.unMed
            this.detItem.codigoProduto = this.produto.codigo
            
            //console.log(res)
            if(typeof this.produto.nome == 'undefined'){
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
      }
    },
    todosProdutos(){
        localforage.getItem('Produtos').then((value) => {
            if(value){
                console.log('localforage get')
                //console.log(value)
                this.produtos = value;
            }
            else{
                console.log('localforage fail')
                this.todosProdutos()
            }

        }).catch((err) => {
            console.log(err)
            console.log('fail')
        }) 
        
        if(localStorage.getItem('loadProdutos') === 'true'){
            Loading.show({
              spinner: FulfillingBouncingCircleSpinner,
              spinnerSize: 140,
              message: 'Aguardando Dados...'
            })
            axios.get(API + 'produto/obterproduto')
              .then((res)=>{
                Loading.hide()
                this.produtos = res.data
                console.log('Sync Produtos', res)
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
        }
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
    listarTipos(){
      Loading.show({
          spinner: FulfillingBouncingCircleSpinner,
          spinnerSize: 140,
          message: 'Aguardando Dados...'
      })
      axios.get(API + 'conta/obterContasTipo')
      .then((res)=>{
          //console.log(res.data)
          this.cat = res.data
          Loading.hide()
      })
      .catch((e)=>{
        console.log(e)
        Loading.hide()
      })  
    },
    listarSubtipos(){
      Loading.show({
          spinner: FulfillingBouncingCircleSpinner,
          spinnerSize: 140,
          message: 'Aguardando Dados...'
      })
      axios.get(API + 'conta/obterContasSubTipo?codTipo=' + this.duplicata.codTipo)
      .then((res)=>{
          //console.log(res.data)
          this.sub = res.data
          Loading.hide()
      })
      .catch((e)=>{
        console.log(e)
        Loading.hide()
      })  
    },
    listarFormasPgto(){
      Loading.show({
          spinner: FulfillingBouncingCircleSpinner,
          spinnerSize: 140,
          message: 'Aguardando Dados...'
      })
      axios.get(API + 'conta/obterformaspgto')
      .then((res)=>{
          //console.log(res.data)
          this.formas = res.data
          Loading.hide()
      })
      .catch((e)=>{
        console.log(e)
        Loading.hide()
      })  
    },
    listarNotas(){
      Loading.show({
          spinner: FulfillingBouncingCircleSpinner,
          spinnerSize: 140,
          message: 'Aguardando Dados...'
      })
      axios.get(API + 'pedido/obterPedido?codigoCab=' + localStorage.getItem('codCab'))
      .then((res)=>{
          //console.log(res.data)
          this.CadNotas = res.data
          this.cabecalho = this.CadNotas.cab
          Loading.hide()
      })
      .catch((e)=>{
        console.log(e)
        Loading.hide()
      })  
    },
    listarContas(){
      Loading.show({
          spinner: FulfillingBouncingCircleSpinner,
          spinnerSize: 140,
          message: 'Aguardando Dados...'
      })
      axios.get(API + 'conta/obterContas?codigoCab=' + localStorage.getItem('codCab'))
      .then((res)=>{
          //console.log(res.data)
          this.titulos = res.data
          Loading.hide()
      })
      .catch((e)=>{
        console.log(e)
        Loading.hide()
      })  
    },
      
  },
  mounted(){
    let t = this
    
    
    if(localStorage.getItem('cadMode') === 'edit'){
        t.listarNotas()
        t.listarContas()
        this.visivel = false
        this.btnDelete = true
    }
    
    t.listarPessoas()
    t.todosProdutos()
    t.listarUnidadesMedida()
    t.listarTipos()
    t.listarSubtipos()
    t.listarFormasPgto()
    t.findTemp()
    
  },
  beforeRouteLeave(to, from, next){
    if(this.CadNotas.det.length === 0){
      next()
      return
    }
    Dialog.create({
      title: 'Espere!',
      message: 'Tem certeza que deseja sair sem salvar a nota?',
      buttons: [
        {
          label: 'Pode sair sem salvar',
          color: 'negative',
          raised: true,
          style: 'margin-top: 20px',
          handler:() => {
            next()
          }
        },
        {
          label: 'Salvar nota e continuar',
          color: 'warning',
          raised: true,
          style: 'margin-top: 20px',
          handler:() => {
            Object.assign(this.CadNotas, {cab: this.cabecalho})
            localforage.setItem('ordemTemp', this.CadNotas);
            Toast.create('Ordem de compra salva temporariamente!')
            this.$router.push('/ordemCompra')
          }
        },
        {
          label: 'Salvar nota e sair',
          color: 'positive',
          raised: true,
          style: 'margin-top: 20px',
          handler:() => {
            Object.assign(this.CadNotas, {cab: this.cabecalho})
            localforage.setItem('notaTemp', this.CadNotas);
            Toast.create('Ordem de compra salva temporariamente!')
            next()
          }
        }
      ]
    })
  },

 
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