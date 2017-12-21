<template>
  <div class="layout-padding ">
    <q-list sparse highlight style="background-color: white">
      <q-list-header>Relatorios</q-list-header>
      <q-item link to="/relVendasEstoque">
        <q-item-side />
        <q-item-main>
          <q-item-tile label>Vendas por Estoque</q-item-tile>
          <q-item-tile sublabel>Produtos vendidos em um determinado período</q-item-tile>
        </q-item-main>
      </q-item>
      
      <q-item link to="/relVendasNota">
        <q-item-side />
        <q-item-main>
          <q-item-tile label>Vendas por Nota</q-item-tile>
          <q-item-tile sublabel>Totais de vendas e recebimentos por período</q-item-tile>
        </q-item-main>
      </q-item>
      
      <q-item link to="/">
        <q-item-side />
        <q-item-main>
          <q-item-tile label>Caixa Periodo</q-item-tile>
          <q-item-tile sublabel>Totais de vendas e recebimentos por período</q-item-tile>
        </q-item-main>
      </q-item>
      
    </q-list> 
    
  </div>
</template>
<script>
  export default {
    name: 'VendasRelatorios'  
  }
</script>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style>
</style>
