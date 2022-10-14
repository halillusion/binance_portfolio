<template>
  <Pie :chart-data="chartData" :chart-options="{responsive: true, maintainAspectRatio: false}" :dataset-id-key="'label'" :width="400" :height="400" />
</template>

<script>
import { mapGetters } from "vuex";
import { Pie } from 'vue-chartjs/legacy'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)

export default {
  name: 'PieChart',
  components: {
    Pie
  },
  data() {
    return {
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      },
      chartData: {}
    }
  },
  methods: {
    generateData() {
      let state = {...this.stocks}
      this.chartData = {
        labels: Object.keys(state),
        datasets: [
          {
            backgroundColor: Object.values(state).map(stock => stock.color),
            data: Object.values(state).map(stock => stock.qty)
          }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(["stocks"])
  },
  created() {
    this.generateData()
  },
  mounted() {
    setInterval(this.generateData, 1000);
  },
  watchEffect() {
    this.generateData()
  }
}
</script>
