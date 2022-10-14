<template>
  <div class="modal">
    <div class="modal-content">
      <button @click="$emit('toggle')" class="modal-content--close">
        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.2259 23.3059C14.4045 23.3059 16.5341 22.6599 18.3454 21.4496C20.1568 20.2393 21.5686 18.519 22.4024 16.5064C23.2361 14.4937 23.4543 12.279 23.0294 10.1423C22.6044 8.00566 21.5554 6.04297 20.0151 4.50246C18.4747 2.96194 16.5121 1.91279 14.3755 1.48766C12.2388 1.06253 10.0241 1.28052 8.01137 2.11406C5.99863 2.94761 4.27825 4.35927 3.06779 6.17055C1.85732 7.98183 1.21114 10.1114 1.21094 12.2899C1.21081 13.7365 1.49562 15.1689 2.04912 16.5054C2.60261 17.842 3.41395 19.0564 4.4368 20.0793C5.45965 21.1023 6.67398 21.9137 8.01045 22.4673C9.34692 23.0209 10.7793 23.3059 12.2259 23.3059V23.3059Z" stroke="#CC2C00" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M9.10938 15.4079L15.3444 9.17285" stroke="#CC2C00" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M15.3444 15.4079L9.10938 9.17285" stroke="#CC2C00" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <input type="text" v-model="symbol" placeholder="Search...">
      <MarketItems :items="results" />
    </div>
  </div>
</template>

<script>
import MarketItems from './MarketItems.vue'

export default {
  name: 'Modal',
  components: { MarketItems },
  data() {
    return {
      results: [],
      symbol: '',
    }
  },
  created() {
    this.search()
  },
  methods: {
    search() {
      this.results = this.$store.state.market.filter(stock => stock.symbol.includes(this.symbol.toUpperCase()));
    }
  },
  watch: {
    symbol() {
      this.search()
    }
  }
}
</script>