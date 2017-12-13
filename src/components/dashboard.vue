<template>
  <div class="layout-padding ">
      <div slot="header" class="toolbar">
        <q-toolbar-title :padding="1">
            Exemplo de Gráficos
        </q-toolbar-title>
      </div>
      
      <div class="layout-view">
           <q-select
              v-model="tipo"
              float-label="Tipo de Gráfico"
              :options="[
                {
                  label: 'Linha',
                  icon: 'show_chart',
                  value: 'line'
                },
                {
                  label: 'Barra',
                  icon: 'insert_chart',
                  value: 'bar'
                },
                {
                  label: 'Pizza',
                  icon: 'pie_chart',
                  value: 'pie'
                },
                {
                  label: 'Donut',
                  icon: 'donut_large',
                  value: 'donut'
                },
                {
                  label: 'PolarArea',
                  icon: 'track_changes',
                  value: 'polar'
                },
                {
                  label: 'RadarArea',
                  icon: 'multiline_chart',
                  value: 'radar'
                },
                {
                  label: 'Bolhas',
                  icon: 'bubble_chart',
                  value: 'bolha'
                },
               ]"
           />
         
          <chartLine :width="width" :height="height" :data="data" v-if="tipo === 'line'"></chartLine>
          <bar :data="data" v-if="tipo === 'bar'"></bar>
          <pie :data="data" v-if="tipo === 'pie'"></pie>
          <donut :data="data" v-if="tipo === 'donut'"></donut>
          <polar :data="data" v-if="tipo === 'polar'"></polar>
          <radar :data="data" v-if="tipo === 'radar'"></radar>
          <bubble :data="data" v-if="tipo === 'bolha'"></bubble>
      </div>
    
      
      
  </div>
</template>
<script type="text/javascript">
  import chartLine from './charts/Line.js'
  import bar from './charts/Bar.js'
  import pie from './charts/Pizza.js'
  import donut from './charts/Donuts.js'
  import polar from './charts/Polar.js'
  import radar from './charts/Radar.js'
  import bubble from './charts/Bubble.js'
  export default {
    name: 'CaixaRelatorios',
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
        }
      }
    },
    
    
  }
</script>
<style></style>
