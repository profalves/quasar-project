<template>
  <div class="container">
    <div class="Chart">
      <h1 style="text-align:center;">Barchart</h1>
      <bar-example></bar-example>
    </div>

    <div class="Chart">
      <h1 style="text-align:center;">Barchart with reactive mixing for live data</h1>
      <reactive-example></reactive-example>
    </div>

    <div class="Chart">
      <h1 style="text-align:center;">Barchart with reactive mixing for live data as props</h1>
      <reactive-prop-example :chart-data="dataPoints"></reactive-prop-example>
    </div>

    <div class="Chart">
      <h1 style="text-align:center;">Linechart</h1>
      <line-example></line-example>
    </div>

    <div class="Chart">
      <h1 style="text-align:center;">Doughnutchart</h1>
      <doughnut-example></doughnut-example>
    </div>
    
    <div class="Chart">
      <h1 style="text-align:center;">Doughnut Reative</h1>
      <donut-reative></donut-reative>
    </div>

    <div class="Chart">
      <h1 style="text-align:center;">Piechart</h1>
      <pie-example></pie-example>
    </div>

    <div class="Chart">
      <h1 style="text-align:center;">Radarchart</h1>
      <radar-example></radar-example>
    </div>

    <div class="Chart">
      <h1 style="text-align:center;">Polararea</h1>
      <polar-area-example></polar-area-example>
    </div>

    <div class="Chart">
      <h1 style="text-align:center;">Bubblechart</h1>
      <bubble-example></bubble-example>
    </div>

    <div class="Chart">
      <h1 style="text-align:center;">Scatter Chart</h1>
      <scatter-example></scatter-example>
    </div>
  </div>
</template>

<script>
  import BarExample from './BarExample'
  import LineExample from './LineExample'
  import DoughnutExample from './DoughnutExample'
  import DonutReative from './DoughnutReative'
  import PieExample from './PieExample'
  import RadarExample from './RadarExample'
  import PolarAreaExample from './PolarAreaExample'
  import BubbleExample from './BubbleExample'
  import ReactiveExample from './ReactiveExample'
  import ReactivePropExample from './ReactivePropExample'
  import ScatterExample from './ScatterExample'

  export default {
    components: {
      BarExample,
      LineExample,
      DoughnutExample,
      DonutReative,
      PieExample,
      RadarExample,
      PolarAreaExample,
      BubbleExample,
      ReactiveExample,
      ReactivePropExample,
      ScatterExample
    },
    data () {
      return {
        dataPoints: null,
        height: 20
      }
    },
    mounted () {
      setInterval(() => {
        this.fillData()
      }, 2000)
    },
    methods: {
      increaseHeight () {
        this.height += 10
      },
      getRandomInt () {
        return Math.floor(Math.random() * (50 - 5 + 1)) + 5
      },
      fillData () {
        this.dataPoints = {
          labels: ['January' + this.getRandomInt(), 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          datasets: [
            {
              label: 'Data One',
              backgroundColor: '#f9cc3f',
              data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()]
            }
          ]
        }
      }
    },
    computed: {
      myStyles () {
        return {
          height: `${this.height}px`,
          position: 'relative'
        }
      }
    }
  }
</script>

<style>
  .container {
    max-width: 800px;
    margin: 0 auto;
  }

  h1 {
    font-family: 'Helvetica', Arial;
    color: #464646;
    text-transform: uppercase;
    border-bottom: 1px solid #f1f1f1;
    padding-bottom: 15px;
    font-size: 28px;
    margin-top: 0;
  }

  .Chart {
    padding: 20px;
    box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, .4);
    border-radius: 20px;
    margin: 50px 0;
  }
</style>
