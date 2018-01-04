<template>
  <div class="layout-padding ">
    <q-list sparse highlight style="background-color: white">
      <q-list-header>Relatorios</q-list-header>
      <q-item link to="/relVendasEstoque">
        <q-item-side />
        <q-item-main>
          <q-item-tile label>Vendas por Produto</q-item-tile>
          <q-item-tile sublabel>Totais de produtos vendidos em um determinado período</q-item-tile>
        </q-item-main>
      </q-item>
      
      <q-item link to="/relVendasNota">
        <q-item-side />
        <q-item-main>
          <q-item-tile label>Vendas por Nota</q-item-tile>
          <q-item-tile sublabel>Totais de vendas por período determinado de notas</q-item-tile>
        </q-item-main>
      </q-item>
      
      <q-item link to="/relVendasCliente">
        <q-item-side />
        <q-item-main>
          <q-item-tile label>Vendas por Cliente</q-item-tile>
          <q-item-tile sublabel>Totais de vendas por Clientes em um determinado período</q-item-tile>
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
