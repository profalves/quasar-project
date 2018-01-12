<template>
  <div id="dashboard">
      <div slot="header" class="toolbar">
        <q-toolbar-title :padding="1">
          
        </q-toolbar-title>
      </div>
      <h2>{{tempo}} {{user}}</h2>
      
      <div class="row">
        <div class="col-xl-6">
          <q-list inset-separator style="background-color: white; margin-bottom: 40px;">
            <q-list-header>Informações Gerais</q-list-header>
            <!-- Faturamento -->
            <q-collapsible icon="notifications" label="Faturamento" sublabel="Configurações de exibição de Notificações no sistema">
                
              <q-knob
                v-model="model"
                size="120px"
                style="font-size: 1.5rem"
                color="secondary"
                line-width="5px"
                :min="min"
                :max="max"
                :step="5"
              >
                R$ {{model}}
              </q-knob>
              
            </q-collapsible>
            <!-- Contas -->
            <q-collapsible icon="insert_chart" label="Contas" sublabel="Configurações de exibição de gráficos no sistema">
                
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
                        }
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
                
            </q-collapsible>
            <!-- Lista de Aniversariantes -->
            <q-collapsible icon="view_list" label="Lista de Aniversariantes" sublabel="Configure globalmente a exibição das listas">
              
            </q-collapsible>
            
            
          </q-list>
            
        </div>
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
        model: 40,
        min: 0,
        max: 100,
        tempo: '',
        user: localStorage.getItem('nameUser'),
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
    mounted(){
        if(new Date().getHours() < 12 && new Date().getHours() > 4){
            this.tempo = 'Bom dia'
        }
        else if(new Date().getHours() >= 12 && new Date().getHours() < 18){
            this.tempo = 'Boa tarde'
        }
        else{
            this.tempo = 'Boa noite'
        }
        
    }
    
    
  }
</script>
<style></style>
