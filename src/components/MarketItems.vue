<template>
  <div v-if="from === 'stock'">
    <ul v-if="Object.keys(result).length" class="market-items stocks">
      <li v-for="item in result" :key="item.symbol" class="market-items-item">
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
        <MarketItemActions @forceUpdate="forceUpdate" :item="item" />
      </li>
    </ul>
    <p v-else>No stocks added yet.</p>
  </div>
  <div v-else>
    <ul v-if="Object.keys(result).length" class="market-items">
      <li v-for="item in result" :key="item.symbol" class="market-items-item">
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
        <MarketItemActions @forceUpdate="forceUpdate" :item="item" />
      </li>
    </ul>
    <p v-else>No market items added yet.</p>
  </div>
</template>
<script>
import MarketItemActions from './MarketItemActions.vue'
import { mapGetters } from "vuex";

export default {
  name: "MarketItems",
  components: { MarketItemActions },
  data() {
    return {
      result: {}
    }
  },
  mounted() {
    this.result = this.from === 'stock' ? this.stocks : this.market;
  },
  computed: {
    ...mapGetters(["stocks", "market"]),
  },
  props: {
    fromStock: {
      type: Boolean,
      default: false
    },
  },
  methods: {
    forceUpdate() {
      this.$emit('forceUpdate')
    }
  }
};
</script>