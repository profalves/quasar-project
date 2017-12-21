<template>
  <div class="layout-padding ">
    <q-list sparse highlight style="background-color: white">
      <q-list-header>Relatorios</q-list-header>
      <q-item link to="/fechamento?q=save">
        <q-item-side />
        <q-item-main>
          <q-item-tile label>Caixa Agora</q-item-tile>
          <q-item-tile sublabel>Quanto tem em caixa neste momento</q-item-tile>
        </q-item-main>
      </q-item>
      
      <q-item link to="/caixames">
        <q-item-side />
        <q-item-main>
          <q-item-tile label>Caixa Mês</q-item-tile>
          <q-item-tile sublabel>Totais de vendas e recebimentos por período</q-item-tile>
        </q-item-main>
      </q-item>
      
      <q-item link to="/caixaperiodo">
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
    name: 'CaixaRelatorios'  
  }
</script>
