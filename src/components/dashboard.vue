<template>
  <div id="dashboard">
    <q-window-resize-observable @resize="onResize" />
    <h3 class="text-center">{{tempo}} {{user | capitalize}}</h3>
    <div class="text-center">{{today}}, {{currentDate}}</div>
    <div class="text-center clock" v-text="currentTime"></div>
    <q-list inset-separator no-border>
      <q-list-header>Painel {{permissoes.funcao | capitalize}}</q-list-header>
      <!-- Menu -->
      <q-collapsible icon="menu" label="Menu" v-if="menu">
        <div class="row text-center">
          <div class="col" @click="$router.push('clientes')">
              <i class="fa fa-user fa-4x text-center text-cyan mHover"></i><br>
              <p class="tile">Pessoas</p>
          </div>
          <div class="col" @click="$router.push('produtos')">
              <i class="fa fa-shopping-basket fa-4x center text-warning mHover"></i><br>
              <p class="tile">Produtos</p>
          </div>
          <div class="col" @click="$router.push('contas')" v-if="permissoes.acessaFinanceiro">
              <i class="fa fa-money fa-4x center text-secondary mHover"></i><br>
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
          <div class="col" @click="$router.push('usuarios')" v-if="permissoes.cadUsuario">
              <i class="fa fa-users fa-4x center text-blue-grey-4 mHover"></i><br>
              <p class="tile">Usuários</p>
          </div>
        </div>
        <div class="row text-center">
          <div class="col" @click="$router.push('transFiliais')" v-if="permissoes.pdV_PermitirTransfProduto">
              <i class="fa fa-truck fa-4x text-center text-negative mHover"></i><br>
              <p class="tile">Transferências</p>
          </div>
          <div class="col" @click="suporte">
              <i class="fa fa-life-ring fa-4x text-center text-orange mHover"></i><br>
              <p class="tile">Suporte</p>
          </div>
         <div class="col" @click="$router.push('config')" v-if="configBtn">
              <i class="fa fa-cog fa-4x text-center mHover"></i><br>
              <p class="tile">Configurações</p>
          </div>
        </div>
      </q-collapsible>
      <!-- Vendas -->
      <q-collapsible :opened="expandVendas" icon="fa-handshake-o" label="Vendas" :sublabel="feedVendas">
        <q-item v-if="permissoes.acessaFinanceiro">
          <q-item-main class="text-right">Ver Venda/Lucro</q-item-main>
          <q-item-side right icon="more_vert">
            <q-popover ref="popover">
              <q-list link class="no-border">
                <q-item @click="exibirVenda">
                  <q-item-main label="Total de Vendas" />
                </q-item>
                <q-item @click="exibirLucro">
                  <q-item-main label="Lucro" />
                </q-item>
              </q-list>
            </q-popover> 
          </q-item-side> 
        </q-item>
        <div class="row" v-if="permissoes.acessaFinanceiro">
          <div class="col-6 text-center">
             <!-- <q-card>
                <q-card-title>
                  Dia
                  <q-icon slot="right" name="more_vert">
                    <q-popover ref="popover">
                      <q-list link class="no-border">
                        <q-item @click="lucroDia = false">
                          <q-item-main label="Total de Vendas" />
                        </q-item>
                        <q-item @click="lucroDia = true">
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
                      size="200px"
                      style="font-size: 1.5rem"
                      :color="faturaCorDia"
                      line-width="5px"
                      :min="min"
                      :max="maxDia"
                      :step="1"
                      readonly
                    >
                      {{dia | formatMoney}}
                    </q-knob>
                </q-card-main>
              </q-card>-->
            <q-knob
              v-model="dia"
              :size="size"
              :style="font"
              :color="faturaCorDia"
              line-width="5px"
              :min="min"
              :max="maxDia"
              :step="1"
              readonly
            >
              Dia<br>
              {{dia | formatMoney}}
            </q-knob>
          </div>
          <div class="col text-center">
            <!--  <q-card>
                <q-card-title>
                  Mês
                  <q-icon slot="right" name="more_vert">
                    <q-popover ref="popover">
                      <q-list link class="no-border">
                        <q-item @click="lucroMes = false">
                          <q-item-main label="Total de Vendas" />
                        </q-item>
                        <q-item @click="lucroMes = true">
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
                      size="200px"
                      style="font-size: 1.5rem"
                      :color="faturaCorMes"
                      line-width="5px"
                      :min="min"
                      :max="maxMes"
                      :step="1"
                      readonly
                    >
                      {{mes | formatMoney}}
                    </q-knob>
                </q-card-main>
              </q-card> -->
            <q-knob
              v-model="mes"
              :size="size"
              :style="font"
              :color="faturaCorMes"
              line-width="5px"
              :min="min"
              :max="maxMes"
              :step="1"
              readonly
            >
              Mês<br>
              {{mes | formatMoney}}
            </q-knob>
          </div>
        </div>
        <q-list highlight id="ranking">
          <q-list-header v-if="permissoes.funcao === 'ADMIN'">Ranking</q-list-header>
          <q-list-header v-else>Meta</q-list-header>
          <q-item>
            <q-item-main>
              <q-select v-model="mensal"
                        :options="[
                          {
                            label: 'Meta do Dia',
                            value: false
                          },
                          {
                            label: 'Meta do Mês',
                            value: true
                          },
                        ]" />
            </q-item-main>
            <q-item-side right>
              <q-input v-if="!mensal" 
                       v-model="metaDia" 
                       type="number" 
                       align="right"
                       :disable="editMeta"/>
              <q-input v-else 
                       v-model="metaMes" 
                       type="number" 
                       align="right"
                       :disable="editMeta"/>
            </q-item-side>
          </q-item>
          <q-item v-for="(v, index) in vendasVendedor" :key="index" v-if="permissoes.funcao === 'VENDEDOR' && v.vendedor === user">
            <!--<q-item-side v-if="v.vendedor === user">{{index + 1}}</q-item-side>--> <!--caso queira observar a posição-->
            <q-item-main v-if="v.vendedor === user">
              <q-item-tile label>{{v.vendedor}}</q-item-tile>
              <q-item-tile sublabel>{{v.total | formatMoney}}</q-item-tile>
              <q-progress :percentage="v.porcentagem"
                          color="orange"
                          stripe animate 
                          style="height: 25px" />
            </q-item-main>
            <q-item-side right v-if="v.vendedor === user">{{v.porcentagem}}%</q-item-side>
          </q-item>
          <q-item v-for="(v, index) in vendasVendedor" :key="index" v-if="permissoes.funcao === 'CAIXA' && v.vendedor === user">
            <q-item-main v-if="v.vendedor === user">
              <q-item-tile label>{{v.vendedor}}</q-item-tile>
              <q-item-tile sublabel>{{v.total | formatMoney}}</q-item-tile>
              <q-progress :percentage="v.porcentagem"
                          color="orange"
                          stripe animate 
                          style="height: 25px" />
            </q-item-main>
            <q-item-side right v-if="v.vendedor === user">{{v.porcentagem}}%</q-item-side>
          </q-item>
          <q-item v-for="(v, index) in vendasVendedor" :key="index" v-if="permissoes.funcao === 'ADMIN'">
            <q-item-side>{{index + 1}}&ordm </q-item-side>
            <q-item-main>
              <q-item-tile label>{{v.vendedor}}</q-item-tile>
              <q-item-tile sublabel>{{v.total | formatMoney}}</q-item-tile>
              <q-progress :percentage="v.porcentagem"
                          color="orange"
                          stripe animate 
                          style="height: 25px" />
            </q-item-main>
            <q-item-side right>{{v.porcentagem}}%</q-item-side>
          </q-item>
        </q-list>
      </q-collapsible>
      <!-- Contas -->
      <q-collapsible :opened="expandContas" v-if="permissoes.acessaFinanceiro" icon="insert_chart" label="Contas" :sublabel="feedContas">
        <div class="layout-view">
          <div class="row">
            <div class="col-md-5 col-xs-12"
                 style="margin-top: 9px">
                <q-field
                    icon="today"
                    >
                    <q-select v-model="tipoConta"
                              :options="tipos"
                    />
                </q-field>
            </div>
            <div class="offset-md-2"></div>
            <div class="col-md-5 col-xs-12">
                <q-field
                    icon="today"
                    v-if="tipoConta === 'data'"
                    >
                    <q-datetime v-model="vencimento"
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
                <div v-else class="semana">{{semana}}</div>
            </div>
          </div>
        </div>
        <div class="layout-view">
          <q-list highlight v-if="contasPagar.length>0">
            <q-list-header>Contas a Pagar</q-list-header>
            <q-item v-for="(d, index) in contasPagar" :key="index" @click="baixar(d)">
              <q-item-side icon="fa-arrow-right" class="text-negative"/>
              <q-item-main>
                <q-item-tile label><strong>Vencimento:</strong> {{ d.vencimento | formatDate }}</q-item-tile>
                <q-item-tile sublabel>{{ d.fornecedor }}</q-item-tile>
              </q-item-main>
              <q-item-side right >
                {{ d.valorTitulo | formatMoney }}
              </q-item-side>
            </q-item>
            <q-item-separator />
            <div class="total">Total: {{ totalPagar | formatMoney }}</div>
          </q-list>
          <div v-else>
            <div class="msg">
              <i class="fa fa-smile-o fa-3x text-positive"></i>
              <div style="margin: 10px">Você não tem contas a pagar!</div>
            </div>
          </div>
          <q-list highlight v-if="contasReceber.length>0">
            <q-list-header>Contas a Receber</q-list-header>
            <q-item v-for="(d, index) in contasReceber" :key="index" @click="baixar(d)">
              <q-item-side icon="fa-arrow-right" class="text-positive"/>
              <q-item-main>
                <q-item-tile label><strong>Vencimento:</strong> {{ d.vencimento | formatDate }}</q-item-tile>
                <q-item-tile sublabel>{{ d.fornecedor }}</q-item-tile>
              </q-item-main>
              <q-item-side right >
                {{ d.valorTitulo | formatMoney }}
              </q-item-side>
            </q-item>
            <q-item-separator />
            <div class="total">Total: {{ totalReceber | formatMoney }}</div>
          </q-list>
          <div v-else>
            <div class="msg">
              <i class="fa fa-frown-o fa-3x text-negative"></i>
              <div style="margin: 10px">Você não tem contas a receber!</div>
            </div>
          </div>
        </div>
        <!--
        <div class="layout-view">
          <p class="total">Seu saldo: <strong>R$ 0,00</strong>
          </p>
        </div>
        -->
      </q-collapsible>
      <!-- Estoque Mínimo -->
      <q-collapsible :opened="expandEstoque" icon="system_update_alt" label="Estoque Mínimo" :sublabel="estoqueMin">
        
        <q-list highlight v-if="produtos.length>0">
          <!--<q-list-header>Ordem de Compra</q-list-header>-->
          <q-item>
            <q-item-main>
              <q-item-tile label class="text-bold">Ordem de Compra</q-item-tile>
            </q-item-main>
            <q-item-side right>
                <q-btn color="primary" rounded @click="gerarOrdemCompra">enviar</q-btn>
            </q-item-side>
          </q-item>
          <q-item v-for="(produto, index) in produtos" :key="index">
            <q-item-main>
              <q-item-tile label>{{produto.nome}}</q-item-tile>
              <q-item-tile sublabel>Cod. Barras: {{produto.codBarra}}</q-item-tile>
              <q-item-tile sublabel>Estoque: {{produto.qtd}} / Estoque Mínimo: {{produto.estoqueMinimo}}</q-item-tile>
            </q-item-main>
            <q-item-side right>
              <q-btn v-if="produto.cotar" icon="send" color="positive" round small @click="cotarProduto(produto)" />
              <q-btn v-else icon="send" color="grey" round small @click="cotarProduto(produto)" />
            </q-item-side>
          </q-item>
        </q-list>
        
      </q-collapsible>
      <!-- Lista de Aniversariantes -->
      <q-collapsible :opened="expandNivers" icon="view_list" label="Lista de Aniversariantes" :sublabel="aniversariantes">
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
    <br><br>
    
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
    <q-modal minimized ref="baixarConta">
      <div style="padding: 20px">
        <h5>Baixar conta de {{conta.fornecedor}}</h5>
        
        <div class="text-bold">Valor: {{conta.valorTitulo | formatMoney}}</div>
      

        <q-field
          icon="date_range"
          >
          <q-datetime v-model="conta.pagamento"
                      type="date" 
                      float-label="Pagamento" 
                      color="black"
                      format="DD/MM/YYYY"
                      ok-label="OK" 
                      clear-label="Limpar" 
                      cancel-label="Cancelar"
                      :day-names="dias"
                      :month-names="meses"
                      @change="conta.valorPago = conta.valorTitulo"

          />

        </q-field>  
        <q-field
          helper="Valor Pago"
          >
          <money v-model="conta.valorPago"
                 v-bind="money"
                 class="mdInput"
                 style="margin-top:12px"
          />
        </q-field> 

      </div>
      <q-btn color="positive" 
             @click="enviarBaixa"
             id="btn-modal"
             >
        Baixar Título
      </q-btn>
      <q-btn color="negative" 
             @click="$refs.baixarConta.close()" 
             id="btn-modal">
        Cancelar
      </q-btn>
    </q-modal>
    <q-modal minimized ref="fornecedores">
      <div style="padding: 20px">
        <q-select
          v-model="fornecedor"
          float-label="Selecione um Fornecedor"
          filter
          :options="listaFornecedores"
        />
        
        <q-list highlight>
          <q-list-header>Itens</q-list-header>
          <q-item>
            <q-item-side>
              <q-item-tile>
                <strong>Cód.</strong>
              </q-item-tile>
            </q-item-side>
            <q-item-main>
              <q-item-tile>
                Nome
              </q-item-tile>
              <!--<strong style="color:#777777">Nome</strong>-->
            </q-item-main>
            <q-item-side right>
              <strong>Qtd.</strong>
            </q-item-side>
          </q-item>
          <q-item-separator />
          <q-item v-for="(item, index) in ordemCompra" :key="index">
            <q-item-side>
              <q-item-tile>
                {{item.codigoProduto}}
              </q-item-tile>
            </q-item-side>
            <q-item-main>
              <q-item-tile label>{{item.nomeProduto}}</q-item-tile>
              <q-item-tile sublabel>Estoque: {{item.qtd}} / Estoque Mínimo: {{item.estoqueMinimo}}</q-item-tile>
            </q-item-main>
            <q-item-side right>
              <q-input v-model="item.qtd" type="number" align="right" style="width: 30%" />
            </q-item-side>
          </q-item>
          
        </q-list>
        <br>
        
        <div class="row">
          <div class="col text-left">
            <q-btn color="faded" @click="$refs.fornecedores.close()">Fechar</q-btn>
          </div>
          <div class="col text-right">
            <q-btn color="primary" @click="enviarOrdemCompra" id="btn-modal">Gerar Ordem</q-btn>
          </div>  
        </div>
      </div>
      
      
    </q-modal>
    
    <footer slot="footer" color="black">
      <center>
        Obrigado por usar <a href="http://7virtual.com.br/" target="_blank">7Virtual</a> Sistemas
      </center>
    </footer>
  </div>
</template>
<script type="text/javascript">
  import { Toast, Dialog, Loading, openURL, date } from 'quasar'
  import axios from 'axios'
  import { FulfillingBouncingCircleSpinner } from 'epic-spinners'
  import localforage from 'localforage'
  
  //datas
  let dt = date
  const hoje = new Date()
  var moment = require('moment');
  require("moment/min/locales.min");
  moment.locale('pt-br');
  
  const suporte = "5575992748983"
  
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
        user: localStorage.getItem('nameUser'),
        menu: (localStorage.getItem('menu') === 'true'),
        configBtn: (localStorage.getItem('configBtn') === 'true'),
        size: '',
        font: '',
        
        //relógio
        currentDate: moment().format('LL'),
        currentTime: null,
        today: moment().format('dddd'),
        tempo: '',
        
        //vendas
        expandVendas: (localStorage.getItem('expandVendas') === 'true'),
        lucro: false,
        min: 0,
        maxDia: parseInt(localStorage.getItem('tetoDia')),
        maxMes: parseInt(localStorage.getItem('tetoMes')),
        metaDiaria: parseInt(localStorage.getItem('metaDia')),
        metaMensal: parseInt(localStorage.getItem('metaMes')),
        periodo: '',
        vendas: [],
        vendasMes: [],
        metaDia: parseInt(localStorage.getItem('metaDiaVendedor')),
        metaMes: parseInt(localStorage.getItem('metaMesVendedor')),
        editMeta: (localStorage.getItem('editMeta') !== 'true'),
        mensal: false,
        
        //gráficos
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
        expandNivers: (localStorage.getItem('expandNivers') === 'true'),
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
        expandContas: (localStorage.getItem('expandContas') === 'true'),
        desp: [],
        recs: [],
        vencimento: hoje,
        dataInicial: '',
        dataFinal: '',
        tipoConta: 'hoje',
        tipos: [
          {label: 'Hoje', value: 'hoje'},
          {label: 'Esta Semana', value: 'semana'},
          {label: 'Este Mês', value: 'mes'},
          {label: 'Na Data', value: 'data'},
          {label: 'Todas', value: 'todas'}
        ],
        subtipo: false,
        subDesp: true,
        filtroPeriodo: true,
        semana: '',
        excluidos: '',
        codigoCab: '',
        selecionados: '',
        syncCount: 0,
        conta: '',
        
        //estoque minimo
        expandEstoque: (localStorage.getItem('expandEstoque') === 'true'),
        produtos: [],
        estoque: '',
        ordem: false,
        ordemCompra: [],
        fornecedores: [],
        fornecedor: '',
        
        //datatime
        dias: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
        meses: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        
        //v-money
        money: {
            decimal: ',',
            thousands: '.',
            prefix: 'R$ ',
            //suffix: ' #',
            precision: 2,
            masked: false /* doesn't work with directive */
        },
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
        if(this.lucro) return 'blue-grey-5'
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
        if(this.lucro) return 'blue-grey-5'
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
      dia(){
        if(this.vendas === null || this.vendas.length === 0) return 0
        let a = []
        if(!this.lucro){
          a = this.vendas.map(row => row.totalVendas)
        }
        else{
          a = this.vendas.map(row => row.lucroRS)
        } 
        let total = a.reduce(function(a, b){
          return a + b
        })
        return parseFloat(total)
      },
      mes(){
        if(this.vendasMes === null || this.vendasMes.length === 0) return 0
        let a
        if(!this.lucro){
          a = this.vendasMes.map(row => row.totalVendas)
        }
        else{
          a = this.vendasMes.map(row => row.lucroRS)
        } 
        let total = a.reduce(function(a, b){
          return a + b;
        })
        return parseFloat(total)
      },
      aniversariantes(){
        if(this.msg) return this.msg
        return 'Aniversariantes Hoje: ' + this.nivers.length    
      },
      contasPagar(){
        if(this.tipoConta === 'mes'){
          this.semana = ''
          let di = moment(dt.startOfDate(hoje, 'month')).format('YYYY-MM-DDTHH:mm:SS')
          let df = moment(dt.endOfDate(hoje, 'month')).format('YYYY-MM-DDTHH:mm:SS')
          this.semana = moment(hoje).format('MMMM/YYYY')
          return this.desp.filter(row => row.vencimento > di && row.vencimento < df)
        }
        if(this.tipoConta === 'semana'){
          let dia = dt.getDayOfWeek(hoje)
          let di = moment(dt.subtractFromDate(hoje, { days: dia })).toISOString()//.format('YYYY-MM-DDTHH:mm:SS')
          console.log('data inicial:', di);
          let df = moment(dt.addToDate(hoje, { days: 6 - dia })).toISOString()//.format('YYYY-MM-DDTHH:mm:SS')
          console.log('data final:', df);
          this.semana = 'Dom ' +  dt.formatDate(di, 'DD/MM/YYYY') + ' - ' + 'Sáb ' +  dt.formatDate(df, 'DD/MM/YYYY')
          console.log('semana:', this.semana);
          return this.desp.filter(row => row.vencimento > di && row.vencimento < df)
        }
        if(this.tipoConta === 'hoje'){
          this.semana = ''
          this.vencimento = hoje
        }
        let data = new Date(this.vencimento).toISOString().split('T').shift()
        return this.desp.filter(row => row.vencimento.indexOf(data)>=0)
      },
      contasReceber(){
        if(this.tipoConta === 'mes'){
          this.semana = ''
          let di = moment(dt.startOfDate(hoje, 'month')).format('YYYY-MM-DDTHH:mm:SS')
          let df = moment(dt.endOfDate(hoje, 'month')).format('YYYY-MM-DDTHH:mm:SS')
          this.semana = moment(hoje).format('MMMM/YYYY')
          return this.recs.filter(row => row.vencimento > di && row.vencimento < df)
        }
        if(this.tipoConta === 'semana'){
          let dia = dt.getDayOfWeek(hoje)
          let di = moment(dt.subtractFromDate(hoje, { days: dia })).format('YYYY-MM-DDTHH:mm:SS')
          let df = moment(dt.addToDate(hoje, { days: 6 - dia })).format('YYYY-MM-DDTHH:mm:SS')
          this.semana = 'Dom ' +  dt.formatDate(di, 'DD/MM/YYYY') + ' - ' + 'Sáb ' +  dt.formatDate(df, 'DD/MM/YYYY')
          return this.recs.filter(row => row.vencimento > di && row.vencimento < df)
        }
        if(this.tipoConta === 'hoje'){
          this.semana = ''
          this.vencimento = hoje
        }
        let data = new Date(this.vencimento).toISOString().split('T').shift()
        return this.recs.filter(row => row.vencimento.indexOf(data)>=0)
      },
      totalPagar(){
        let a = this.contasPagar
        if(a.length === 0) return
        let lista = a.map(row => row.valorTitulo)
        let total = lista.reduce(function(a, b) {
          return a + b;
        });
        return total
      },
      totalReceber(){
        let a = this.contasReceber
        if(a.length === 0) return
        let lista = a.map(row => row.valorTitulo)
        let total = lista.reduce(function(a, b) {
          return a + b;
        });
        return total
      },
      feedContas(){
        return 'Você tem ' + this.contasPagar.length + ' contas a pagar e ' + this.contasReceber.length + ' contas a receber'
      },
      feedVendas(){
        if(this.permissoes.funcao !== 'ADMIN') return
        let rotulo
        if(this.lucro){
          rotulo = 'Lucro'
        }
        else {
          rotulo = 'Vendas'
        }
        return rotulo + ' do dia: R$ ' + this.dia.toFixed(2) + ' / ' + rotulo + ' do mês: R$ ' + this.mes.toFixed(2)
      },
      vendasVendedor(){        
        let vendedores
        if(this.mensal){
          if(this.vendasMes === null){
            return [{
              vendedor: this.user,
              total: 0,
              porcentagem: 0.00
            }]
          }
          vendedores = this.vendasMes.map(row => ({
            vendedor: row.vendedor,
            total: row.totalVendas,
            porcentagem: parseFloat(((row.totalVendas / this.metaMes)*100).toFixed(2))
          }))
        }
        else{
          if(this.vendas === null){
            return [{
              vendedor: this.user,
              total: 0,
              porcentagem: 0.00
            }]
          }
          vendedores = this.vendas.map(row => ({
            vendedor: row.vendedor,
            total: row.totalVendas,
            porcentagem: parseFloat(((row.totalVendas / this.metaDia)*100).toFixed(2))
          }))
        }
        return vendedores.sort(function(a,b) {
            return a.total < b.total ? 1 : a.total > b.total ? -1 : 0;
        });
      },
      estoqueMin(){
        if(this.estoque) return this.estoque
        return 'Você tem ' + this.produtos.length + ' produtos abaixo do estoque mínimo'
      },
      listaFornecedores(){
        return this.fornecedores.map(row => ({
          label: row.nome,
          value: row.codigo
        }))
      }
    },
    watch:{
      tipoConta (value) {
        if(value === 'todas'){
          console.log('tipo: ', value);
          return this.$router.push('contas')
        }
      }
    },
    methods:{
      onResize (size) {
        if(size.width < 620){
          this.size = Math.round((size.width - (size.width * 0.65))) + 'px'
          this.font = 'font-size: ' + Math.round((size.width - (size.width * 0.95))) + 'px'
          console.log('size', this.size);
          console.log('font', this.font);
        }
        else if(size.width < 999){
          this.size = Math.round((size.width - (size.width * 0.75))) + 'px'
          this.font = 'font-size: ' + Math.round((size.width - (size.width * 0.97))) + 'px'
          console.log('size', this.size); 
          console.log('font', this.font); 
        }
        else{
          this.size = Math.round((size.width - (size.width * 0.80))) + 'px'
          this.font = 'font-size: ' + Math.round((size.width - (size.width * 0.97))) + 'px'
          console.log('size', this.size); 
          console.log('font', this.font); 
        }
      },
      updateCurrentTime(){
        this.currentTime = moment().format('LTS');
      },
      getHoje(){
        Loading.show({
            spinner: FulfillingBouncingCircleSpinner,
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
                console.log('permissoes:', value)
                this.permissoes = value
            }
            else{
                console.log(value)
            }
        }).catch((err) => {
            console.log(err)
            console.log('fail get permissions')
        })
      },
      listarContas(){
        let load = localStorage.getItem('loadContas')
        if(load === 'false'){
          localforage.getItem('DespPagar').then((value) => {
            if(value){
              console.log('localforage get contas Pagar')
              //console.log(value)
              this.desp = value;
            }
          }).catch((err) => {
              console.log(err)
              console.log('fail')
          })
          localforage.getItem('RecPagar').then((value) => {
            if(value){
              console.log('localforage get contas Receber')
              //console.log(value)
              this.recs = value;
            }
          }).catch((err) => {
              console.log(err)
              console.log('fail')
          })     
        }
        if(this.desp.length>0 && this.recs.length>0) return
        Loading.show({
            spinner: FulfillingBouncingCircleSpinner,
            spinnerSize: 140,
            message: 'Aguardando Dados...'
        })
        axios.get(API + 'conta/obterContas?tipo=cp')
        .then((res)=>{
            //console.log(res)
            this.desp = res.data
        })
        .catch((e)=>{
          console.log(e)
          Loading.hide()
        })
        axios.get(API + 'conta/obterContas?tipo=cr')
        .then((res)=>{
            //console.log(res)
            this.recs = res.data
        })
        .catch((e)=>{
          console.log(e)
          Loading.hide()
        })
        if(this.desp.length>0 && this.recs.length>0) Loading.hide()
      },
      baixar(d){
        this.$refs.baixarConta.open()
        this.conta = d
      },
      enviarBaixa(){
        Loading.show({message: 'Enviando Dados...'})
        axios.post(API + 'conta/pagarContas', [this.conta])
          .then((res)=>{
            Loading.hide()
            Toast.create.positive({
                html: 'Titulo baixado com sucesso',
                icon: 'done'
            })
            console.log(res)
            console.log('sucesso')
            this.$refs.baixarConta.close()
            axios.get(API + 'conta/obterContas?tipo=cp')
            .then((res)=>{
                //console.log(res)
                this.desp = res.data
            })
            .catch((e)=>{
              console.log(e)
            })
            axios.get(API + 'conta/obterContas?tipo=cr')
            .then((res)=>{
                //console.log(res)
                this.recs = res.data
            })
            .catch((e)=>{
              console.log(e)
            })
            //this.$router.push('contas')
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
      getVendas(){
        Loading.show({
          spinner: FulfillingBouncingCircleSpinner,
          spinnerSize: 140,
          message: 'Aguardando Dados...'
        })
        axios.get(API + 'relatorio/obterTotalVendas')
        .then((res)=>{
          this.vendas = res.data
          console.log('vendas:', res.data)
          console.log('vendas tipo:', typeof res.data)
          console.log('vendas tamanho:', res.data.length)
          Loading.hide()
        })
        .catch((e)=>{
          console.log(e.response)
          Loading.hide()
        })
      },
      getVendasMes(){
        Loading.show({
          spinner: FulfillingBouncingCircleSpinner,
          spinnerSize: 140,
          message: 'Aguardando Dados...'
        })
        axios.get(API + 'relatorio/obterTotalVendas?mesAtual=true')
        .then((res)=>{
          this.vendasMes = res.data
          console.log('vendas do mês:', this.vendasMes)
          console.log('vendas mês tipo:', typeof res.data)
          Loading.hide()
        })
        .catch((e)=>{
          console.log(e.response)
          Loading.hide()
        })
      },
      getEstoqueMinimo(){
        Loading.show({
          spinner: FulfillingBouncingCircleSpinner,
          spinnerSize: 140,
          message: 'Aguardando Dados...'
        })
        axios.get(API + 'produto/obterproduto?abaixoEstoqueMin=true')
          .then((res)=>{
            Loading.hide()
            if(typeof res.data !== 'string'){
              this.produtos = res.data
            }
            else{
              this.estoque = res.data
            }
            console.log('produtos:', this.produtos.length)
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
      exibirVenda(){
        this.lucro = false
        this.$refs.popover.close()
      },
      exibirLucro(){
        this.lucro = true
        this.$refs.popover.close()
      },
      cotarProduto(produto){
        if(produto.cotar === undefined) {
          Object.assign(produto, {cotar: true})
        }
        else if(produto.cotar === true) {
          Object.assign(produto, {cotar: false})
        }
        else {
          Object.assign(produto, {cotar: true})
        }
        
      },
      gerarOrdemCompra(){
        let ordem = this.produtos.filter(row => row.cotar === true)
        
        this.ordemCompra = ordem.map(row => ({
          codTabPreco: 2,
          codigoProduto: row.codigo,
          codigoUsuario: parseInt(localStorage.getItem('codUser')),
          codigoComputador: '',    
          custo: row.custo,   
          desconto: 0.00,    
          venda: row.valor,    
          acrescimo: 0.00,    
          unMedCom: row.unmed,    
          unMedTrib: row.unmed,    
          encargos: 0.00,    
          IPI: 0.00,    
          frete: 0.00,    
          seguro: 0.00,    
          outro: 0.00,    
          qtd: row.qtd,   
          tipoSaida: 'E',    
          qtdDevolvida: 0.00,    
          totalItem: '',    
          cancelado: '',    
          codPessoaEmpregado: '',
          OBS: '',    
          impresso: '',
          nomeProduto: row.nome,
          estoqueMinimo: row.estoqueMinimo
        }))
        
        if(this.ordemCompra.length>0){
          this.$refs.fornecedores.open()
        }
        else{
          Toast.create.negative('Selecione pelo menos 1 (um) produto para enviar para a ordem de compras')
        }
      },
      getFornecedores(){
        Loading.show({
          spinner: FulfillingBouncingCircleSpinner,
          spinnerSize: 140,
          message: 'Aguardando Dados...'
        })
        axios.get(API + 'pessoa/obterpessoa?codtipo=2')
        .then((res)=>{
          //console.log(res.data)
          this.fornecedores = res.data
          Loading.hide()
        })
        .catch((e)=>{
          console.log(e)
          Loading.hide()
        })
      },
      listarFornecedores(){
        if(localStorage.getItem('loadPessoas') === 'true'){
          this.getFornecedores()
          return
        }
        
        localforage.getItem('Pessoas').then((value) => {
          if(value){
              console.log('localforage get')
              console.log(value)
              this.fornecedores = value.filter(row => row.codTipo === 2);
          }
          else{
              console.log('localforage fail')
              
          }

        }).catch((err) => {
            console.log(err)
            console.log('fail')
        }) 
      
      },
      enviarOrdemCompra(){
        if(!this.fornecedor){
          Toast.create.negative('Selecione um Fornecedor antes de enviar')
          return
        }
        
        let data = new Date().toISOString()
        
        for(let i in this.ordemCompra){
          let item = this.ordemCompra[i]
          item.totalItem = item.custo * item.qtd
        }
        
        localforage.setItem('ordemTemp', {
          det: this.ordemCompra,
          cab:{
            vendaPrazo: false,
            tipoNotaE: '', //4
            tipoMovimento: 'E', //1
            numeroCupom: 0, //int
            numeroNotaE: '', //int
            chaveAcesso: '', //44 carac.
            dataVenda: data,
            codPessoaEmissor: this.fornecedor,
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
        }).then((value) => {
          console.log('ordemTemp: ', value);
          Dialog.create({
            title: '<i class="fa fa-check-circle-o text-positive text-center fa-3x"></i>',
            message: 'Ordem de compra gerada com sucesso. Você deseja finalizar agora?',
            buttons: [
              {
                label: 'continuar aqui mesmo',
                handler:() => {
                  this.$refs.fornecedores.close()
                }
              },
              {
                label: 'Ver Ordem e finalizar',
                handler:() => {
                  this.$router.push('/ordemCompra')
                }
              }
            ]
          })
        }).catch((err) => {
          console.log('erro ao gravar ordem: ', err);
        });
        
        
        
      },
      suporte(){
        Dialog.create({
          title: 'Peça ajuda ao suporte via Whatsapp',
          message: 'Digite a sua solicitação aqui abaixo e clique em enviar. Aguarde o aplicativo abrir e envie a sua mensagem',
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
              handler:(data) => {
                openURL('https://api.whatsapp.com/send?phone=' + suporte + '&text=' + data.msg)
              }
            }
          ]
        })  
      }
    },
    mounted(){
      this.currentTime = moment().format('LTS');
      setInterval(() => this.updateCurrentTime(), 1 * 1000);  
      if(hoje.getHours() < 12 && hoje.getHours() > 4){
        this.tempo = 'Bom dia'
      }
      else if(hoje.getHours() >= 12 && hoje.getHours() < 18){
        this.tempo = 'Boa tarde'
      }
      else{
        this.tempo = 'Boa noite'
      }
      this.getHoje()
      this.obterPermissoes()
      this.listarContas()
      this.getVendas()
      this.getVendasMes()
      this.getEstoqueMinimo()
      this.listarFornecedores()
      
      localStorage.setItem('cadMode', 'save')
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
  .msg {
    vertical-align: middle;
    text-align: center;
    margin: 20px;
  }
  .total{
    color: #757575;
    margin: 10px 15px 0;
    font-weight: bold;
  }
  .semana{
    color: #757575;
    text-align: right;
    vertical-align: bottom;
    padding-top: 40px;
  }
  footer{
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 1rem;
    text-align: center;
  }
  #ranking{
    margin-top: 30px;
  }
  
</style>
