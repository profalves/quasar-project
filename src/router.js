import Vue from 'vue'
import VueRouter from 'vue-router'

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
    { path: '/', component: load('Home') },
    { path: '/hello', component: load('Hello') },
    { path: '/clientes', component: load('Clientes') },
    { path: '/cadcliente', component: load('cadCliente') },
    { path: '/produtos', component: load('Produtos') },
    { path: '/cadproduto', component: load('cadProduto') },
    { path: '/contas', component: load('Contas') },
    { path: '/entradanfe', component: load('EntradasNFe') },
    { path: '/relatorios', component: load('Relatorios') },
    { path: '/usuarios', component: load('Usuarios') },
    { path: '/login', component: load('Login') },
    { path: '/dialog', component: load('Dialogs') },

    // Always leave this last one
    { path: '*', component: load('Error404') }, // Not found
    { path: '*.vue', component: load('Error404') }
  ]
})
