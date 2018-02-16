<template>
  <div class="layout-padding">
    <div class="q-toolbar-title">
      Ajuste de Estoque
    </div>
    <div class="row">
      <div class="col-auto">
        <q-btn push big glossy color="primary" @click="entradaEstoque">entrada estoque</q-btn>
      </div>
      <div class="col-auto">
        <q-btn push big glossy color="primary" @click="saidaEstoque">saída estoque</q-btn>
      </div>
    </div>
    <hr>
    <div class="q-toolbar-title">
      Promoções  
    </div>
    <div class="row">
      <q-btn push big glossy color="primary" @click="produtoPromo">produtoPromo</q-btn>
      <q-btn push big glossy color="primary" @click="clientePromo">clientePromo</q-btn>
  
    </div>
    
    
      
  </div>
</template>

<script>
import axios from 'axios'
import { Loading } from 'quasar'
//import { FulfillingBouncingCircleSpinner } from 'epic-spinners'

//const API = localStorage.getItem('wsAtual')
//debug
const API = 'http://192.168.0.200:29755/'

export default {
  data(){
    return {
    
    }
  },
  methods:{
    entradaEstoque(){
      Loading.show()
      axios.get(API + 'estoque/movimentaEstoque?codProduto=10561&codigoEmpresa=0&codigoUsuario=1&qtde=10&tipoMovimento=entrada&descricao=teste entrada')
      .then(res => {
        Loading.hide()
        console.log('sucesso: ', res)
        console.log('retorno: ', res.data)
      })
      .catch(e => {
        Loading.hide()
        console.log('erro: ', e)
      })
    },
    saidaEstoque(){
      Loading.show()
      axios.get(API + 'estoque/movimentaEstoque?codProduto=10561&codigoEmpresa=0&codigoUsuario=1&qtde=5&tipoMovimento=saida&descricao=teste saida')
      .then(res => {
        Loading.hide()
        console.log('sucesso: ', res)
        console.log('retorno: ', res.data)
      })
      .catch(e => {
        Loading.hide()
        console.log('erro: ', e)
      })
    },
    produtoPromo(){
      Loading.show()
      axios.get(API + 'produto/gravarProdutoPromocao?codigoProduto=10561&preco=5&codigoUsuario=1')
      .then(res => {
        Loading.hide()
        console.log('sucesso: ', res)
        console.log('retorno: ', res.data)
      })
      .catch(e => {
        Loading.hide()
        console.log('erro: ', e)
      })
    },
    clientePromo(){
      Loading.show()
      axios.get(API + 'produto/gravarPromocaoPorCliente?totalCompras=10&diaDoMes=16&descontoMax=60&codigoUsuario=1')
      .then(res => {
        Loading.hide()
        console.log('sucesso: ', res)
        console.log('retorno: ', res.data)
      })
      .catch(e => {
        Loading.hide()
        console.log('erro: ', e)
      })
    },
  }
}
</script>

<style scoped>
  .row{
    margin: 10px;
  }
</style>
