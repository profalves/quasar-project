import {
    Radar
}
from 'vue-chartjs'

export default {
    extends: Radar,
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