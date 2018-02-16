import Vue from 'vue'
import VueRouter from 'vue-router'
import charts from './charts/examples/App'

Vue.use(VueRouter)

function load (component) {
  // '@' is aliased to src/components
  return () => import(`@/${component}.vue`)
}

export default new VueRouter({
  /*
   * NOTE! VueRouter "history" mode DOESN'T works for Cordova builds,
   * it is only to be used only for websites.
   *
   * If you decide to go with "history" mode, please also open /config/index.js
   * and set "build.publicPath" to something other than an empty string.
   * Example: '/' instead of current ''
   *
   * If switching back to default "hash" mode, don't forget to set the
   * build publicPath back to '' so Cordova builds work again.
   */

  routes: [
    { path: '/', component: load('dashboard') },
    { path: '/hello', component: load('Hello') },
    { path: '/clientes', component: load('Clientes') },
    { path: '/nivers', component: load('Aniversariantes') },
    { path: '/cadcliente', component: load('cadCliente') },
    { path: '/produtos', component: load('Produtos') },
    { path: '/transFiliais', component: load('Transferencias') },
    { path: '/tabprecos', component: load('TabelaPreco') },
    { path: '/cadproduto', component: load('cadProduto') },
    { path: '/contas', component: load('Contas') },
    { path: '/cadcontas', component: load('cadContas') },
    { path: '/entradanfe', component: load('EntradasNFe') },
    { path: '/cadnotas', component: load('cadNotas') },
    { path: '/importadorDanfe', component: load('importadorDanfe') },
    { path: '/relatorios', component: load('Relatorios') },
    { path: '/usuarios', component: load('Usuarios') },
    { path: '/cadusuario', component: load('cadUsuario') },
    { path: '/login', component: load('Login') },
    { path: '/config', component: load('Config') },
    { path: '/suporte', component: load('Suporte') },
      
    //Relatorios
    { path: '/relcaixa', component: load('relCaixa') },
    { path: '/caixaperiodo', component: load('relPeriodoCaixa') },
    { path: '/caixames', component: load('relCaixaMes') },
    { path: '/fechamento', component: load('relFechamentoCaixa') },
    { path: '/fluxocaixa', component: load('relFluxoCaixa') },
    { path: '/relatoriocontas', component: load('relContas') },
    { path: '/relVendas', component: load('relVendas') },
    { path: '/relVendasEstoque', component: load('relEstoque') },
    { path: '/relatoriomov', component: load('relMovimentacoes') },
    { path: '/relatoriolucro', component: load('relLucro') },
    { path: '/relFormas', component: load('relFormas') },
    { path: '/relVendasNota', component: load('relVendasNota') },
    { path: '/relVendasCliente', component: load('relVendasCliente') },
      
    
    // Ambientes testes
    { path: '/dialog', component: load('Dialogs') },
    { path: '/test', component: load('Test') },
    { path: '/vuex', component: load('VuexContent') },
    { path: '/charts', component: charts },

    // Always leave this last one
    { path: '*', redirect: '/' }, // Evitar entrar em rotas inexistentes
    { path: '*.vue', component: load('Error404') }
  ]
})
