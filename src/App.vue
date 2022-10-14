<template>
  <main class="portfolio-box">
    <img class="logo" src="/logo.svg" alt="Logo">
    <div class="portfolio-box-action-buttons">
      <button class="btn btn-green" @click="toggleModal(true)" :class="loading ? 'disabled' : ''">Add Stock</button>
      <button class="btn" @click="init()" :class="loading ? 'disabled' : ''">Refresh</button>
    </div>
    <div class="portfolio-box-body">
      <div class="portfolio-box-body--list">
        <MarketItems @forceUpdate="forceUpdate" v-if="Object.keys(stocks).length" :items="stocks" />
        <p v-else>No stocks added yet.</p>
      </div>
      <div class="portfolio-box-body--chart">
        <Chart :chartData="chartData" />
      </div>
    </div>
    <Modal @toggle="toggleModal" :class="modalOpened ? 'opened' : ''" />
  </main>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

import Chart from './components/Chart.vue'
import Modal from './components/Modal.vue'
import MarketItems from './components/MarketItems.vue'
export default {
  name: "App",
  components: { Chart, Modal, MarketItems },
  name: 'Portfolio',
  data() {
    return {
      modalOpened: false,
      loading: false,
    }
  },
  created() {
    this.init()
    setInterval(() => {
      this.init()
    }, 1200000);
  },
  beforeMount() {
    this.$store.commit('INIT_STOCKS')
  }, 
  methods: {
    ...mapActions(["fetchMarket"]),
    toggleModal() {
      this.modalOpened = !this.modalOpened;
    },
    async init() {
      this.loading = true
      await this.fetchMarket();
      this.loading = false
      this.forceUpdate()
    },
    forceUpdate() {
      this.$forceUpdate();
    },
    generateColorCode() {
      return '#' + Math.floor(Math.random()*16777215).toString(16);
    }
  },
  computed: {
    ...mapGetters(["market", "stocks"]),
    chartData: function() {

      let colors = [];
      for (let i = 0; i < Object.keys(this.stocks).length; i++) {
        colors.push(this.generateColorCode());
      }

      return {
        labels: Object.keys(this.stocks),
        datasets: [
          {
            backgroundColor: colors,
            data: Object.values(this.stocks).map(stock => stock.qty)
          }
        ]
      }
    }
  },
}
</script>