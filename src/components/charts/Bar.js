import {
    Bar
}
from 'vue-chartjs'
import reactiveData from './mixins/reactiveData'


export default {
    extends: Bar,
    props: ['data'],
    mixins: [reactiveData],
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
          this._chart.destroy()
          this.renderChart(this.data, this.options)
        }
    }
}