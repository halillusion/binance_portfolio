<template>
  <div>
    <input type="text" v-model="symbol" placeholder="Search...">
    <ul class="market-items">
      <li v-for="item in results" :key="item.symbol" class="market-items-item">
        <div class="market-items-item--name">
          <span>{{ item.symbol }}</span>
          <span class="market-item--price--change" :class="item.lastPrice > item.openPrice ? 'up' : 'down'">
            <svg width="15" height="9" viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.1746 1.50008L7.36564 7.30908L1.55664 1.50008" stroke="currentColor" stroke-width="2"
                stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
          <span class="market-item--name--symbol">{{ item.lastPrice }}</span>
        </div>
        <ItemActions @forceUpdate="forceUpdate" :item="item" />
      </li>
    </ul>
  </div>
</template>
<script>
import ItemActions from './ItemActions.vue'
import { mapGetters } from "vuex";

export default {
  name: "MarketItems",
  components: { ItemActions },
  data() {
    return {
      results: [],
      symbol: '',
    }
  },
  created() {
    this.results = this.market.slice(0, 10);
  },
  computed: {
    ...mapGetters(["market"]),
  },
  props: {
    keyword: {
      type: String,
      default: '',
    },
  },
  methods: {
    forceUpdate() {
      this.$emit('forceUpdate')
    },
    search() {
      this.results = this.market.filter(stock => stock.symbol.includes(this.symbol.toUpperCase())).slice(0, 10);
    }
  },
  watch: {
    symbol() {
      this.search()
    }
  }
};
</script>