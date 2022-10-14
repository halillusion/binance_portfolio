<template>
  <main class="portfolio-box">
    <img class="logo" src="/logo.svg" alt="Logo">
    <div class="portfolio-box-action-buttons">
      <button class="btn btn-green" @click="toggleModal(true)" :class="loading ? 'disabled' : ''">Add Stock</button>
      <button class="btn" @click="init()" :class="loading ? 'disabled' : ''">Refresh</button>
    </div>
    <div class="portfolio-box-body">
      <div class="portfolio-box-body--list">
        <MarketItems :fromStock="true" />
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
      this.$forceUpdate();
    },
    async init() {
      this.loading = true
      await this.fetchMarket()
      this.loading = false
    },
  },
  computed: {
    ...mapGetters(["market", "stocks"]),
    chartData: function() {

      return {
        labels: Object.keys(this.stocks),
        datasets: [
          {
            backgroundColor: Object.values(this.stocks).map(stock => stock.color),
            data: Object.values(this.stocks).map(stock => stock.qty)
          }
        ]
      }
    }
  },
  watch: {
    modalOpened: function() {
      // this.compKey++;
      // this.$forceUpdate();
    },
    chartData: function() {
      // this.compKey++;
      // this.$forceUpdate()
    }
  }
}
</script>