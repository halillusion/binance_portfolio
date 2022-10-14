<template>
  <ul class="market-items">
    <li v-for="item in items" :key="item.symbol" class="market-items-item">
      <div class="market-items-item--name">
        <span>{{ item.symbol }}</span>
        <span class="market-item--price--change" :class="item.lastPrice > item.openPrice ? 'up' : 'down'">
          <svg width="15" height="9" viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.1746 1.50008L7.36564 7.30908L1.55664 1.50008" stroke="currentColor" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
        <span class="market-item--name--symbol">{{ item.lastPrice }}</span>
      </div>
      <MarketItemActions @forceUpdate="forceUpdate" :item="item" />
    </li>
  </ul>
</template>
<script>
import MarketItemActions from './MarketItemActions.vue'
export default {
  name: "MarketItems",
  components: { MarketItemActions },
  props: {
    items: {
      type: Object|Array,
      default: () => []|{}
    },
  },
  methods: {
    forceUpdate() {
      this.$emit('forceUpdate')
    }
  }
};
</script>