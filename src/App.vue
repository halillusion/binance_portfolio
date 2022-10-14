<template>
  <main class="portfolio-box">
    <img class="logo" src="/logo.svg" alt="Logo">
    <div class="portfolio-box-action-buttons">
      <button class="btn btn-green" @click="toggleModal(true)" :class="loading ? 'disabled' : ''">Add Stock</button>
      <button class="btn" @click="init()" :class="loading ? 'disabled' : ''">Refresh</button>
    </div>
    <div class="portfolio-box-body">
      <div class="portfolio-box-body--list">
        <StockItems :key="refreshKey" @forceUpdate="forceUpdate" />
      </div>
      <div class="portfolio-box-body--chart">
        <Chart />
      </div>
    </div>
    <Modal :key="refreshKey" @toggle="toggleModal" :class="modalOpened ? 'opened' : ''" />
    <div class="copyright">
      <a target="_blank" href="https://github.com/halillusion/binance_portfolio">Github</a>
      <a target="_blank" href="https://github.com/halillusion">Other Projects</a>
    </div>
  </main>
</template>
<script>
import { mapActions } from "vuex";
import Chart from './components/Chart.vue'
import Modal from './components/Modal.vue'
import StockItems from './components/StockItems.vue'
export default {
  name: "App",
  components: { Chart, Modal, StockItems },
  name: 'Portfolio',
  data() {
    return {
      modalOpened: false,
      loading: false,
      refreshKey: 0,
    }
  },
  created() {
    this.init()
    setInterval(() => {
      this.init()
    }, 1200000);  // 20 minutes
  },
  beforeMount() {
    this.$store.commit('INIT_STOCKS')
  }, 
  methods: {
    ...mapActions(["fetchMarket"]),
    toggleModal() {
      this.modalOpened = !this.modalOpened;
      this.refreshKey++;
    },
    async init() {
      this.loading = true
      await this.fetchMarket()
      this.loading = false
    },
    forceUpdate() {
      this.refreshKey++;
    },
  },
}
</script>