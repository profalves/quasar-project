import {
    Bar
}
from 'vue-chartjs'

export default {
    extends: Bar,
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
    watch: {
        data: function () {
          this._chart.destroy()
          this.renderChart(this.data, this.options)
        }
    },
    mounted: function (){
        this.renderChart(this.data, this.options)
    }
}