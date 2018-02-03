import {
    Doughnut
}
from 'vue-chartjs'
import reactiveProp from './mixins/reactiveProp'

export default {
    extends: Doughnut,
    mixins: [reactiveProp],
    props: ['data'],
    data() {
        return {
            options: {
                title: {
                    display: true,
                    text: '' // Titulo
                }
            }
        }
    },
    mounted: function (){
        this.renderChart(this.data, this.options)
        
    },
    watch: {
        data: function () {
          this.chart.destroy()
          this.renderChart(this.data, this.options)
        }
    }
}