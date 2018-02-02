import Doughnut from '../BaseCharts/Doughnut'
import reactiveData from '../mixins/reactiveData'

export default {
  extends: Doughnut,
  mixins: [reactiveData],
  data () {
    return {
      chartData: ''
    }
  },
  created () {
    this.fillData()
  },

  mounted () {
    this.renderChart(this.chartData, {responsive: true, maintainAspectRatio: false})

    setInterval(() => {
      this.fillData()
    }, 5000)
  },

  methods: {
    fillData () {
      this.renderChart({
        labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
        datasets: [
          {
            backgroundColor: [
              '#41B883',
              '#E46651',
              '#00D8FF',
              '#DD1B16'
            ],
            data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()]
          }
        ]
      }, {responsive: true, maintainAspectRatio: false})
    },

    getRandomInt () {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    }
  }
}