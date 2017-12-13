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
    name: 'CaixaRelatorios',
    components: {},
    data () {
      return {
          
        //grafico
        tipo: localStorage.getItem('tipoGrafico'),
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
              height: 200,
              backgroundColor: 'grey'
          }
        }
        
        //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      }
    },
    
    
  }
</script>
<style></style>
