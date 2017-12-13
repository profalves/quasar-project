import {
    Line
}
from 'vue-chartjs'

export default {
    extends: Line,
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