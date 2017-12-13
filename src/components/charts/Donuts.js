import {
    Doughnut
}
from 'vue-chartjs'

export default {
    extends: Doughnut,
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
    }
}