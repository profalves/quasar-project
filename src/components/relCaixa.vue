<template>
  <div class="layout-padding">
    <q-fixed-position class="fixo" corner="bottom-left" :offset="[18, 18]">
        <q-btn 
           round
           color="primary" 
           @click="goBack">
           <q-icon name="keyboard_arrow_left" />
        </q-btn>
    </q-fixed-position>
    
    <q-list sparse highlight style="background-color: white">
      <q-list-header>Relatorios</q-list-header>
      <q-item link to="/fechamento?q=save">
        <q-item-side />
        <q-item-main>
          <q-item-tile label>Caixa Agora</q-item-tile>
          <q-item-tile sublabel>Quanto tem em caixa neste momento</q-item-tile>
        </q-item-main>
      </q-item>
      
      <q-item link to="/fluxocaixa">
        <q-item-side />
        <q-item-main>
          <q-item-tile label>Fluxo de Caixa</q-item-tile>
          <q-item-tile sublabel>Verifica o seu cumulativo de caixa de acordo com um período indicado</q-item-tile>
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
  name: 'CaixaRelatorios',
  methods: {
    goBack(){
        window.history.back()
    }
  }
}
</script>
