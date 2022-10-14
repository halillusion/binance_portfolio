<template>
  <div class="market-items-item--qty">
    <input min="1" type="number" v-model="qty">
    <button v-if="typeof stocks[item.symbol] === 'undefined'" class="btn btn-green btn-sm" @click="addStock(item);">Add</button>
    <template v-else>
      <button class="btn btn-blue btn-sm" @click="addStock(item);">Update</button>
      <button class="btn btn-red btn-sm" @click="removeStock(item);">Remove</button>
    </template>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "MarketItemActions",
  data() {
    return {
      qty: 1
    }
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    },
  },
  created() {
    this.qty = this.stocks[this.item.symbol] || 1;
  },
  computed: {
    ...mapGetters(["stocks"]),
  },
  methods: {
    ...mapActions(["setStock", "deleteStock"]),
    addStock(item) {
      this.setStock({
        symbol: item.symbol, 
        qty: parseInt(this.qty),
        lastPrice: item.lastPrice,
        openPrice: item.openPrice
      });
      this.$forceUpdate();
      this.$emit('forceUpdate');
    },
    removeStock(item) {
      this.deleteStock({symbol: item.symbol});
      this.$forceUpdate();
      this.$emit('forceUpdate');
    }
  }
};
</script>