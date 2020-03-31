<script>
import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: ['chartData', 'options'],
  watch: {
    chartData() {
      console.log("chartData updated.")
      this.$data._chart.update()
    }
  },
  mounted () {
    this.draw()
  },
  methods: {
    draw() {
      this.renderChart(this.chartData, this.options)
    }
  },
}
</script>

<style>
</style>