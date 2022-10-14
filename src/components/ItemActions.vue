<template>
  <div class="market-items-item--actions">
    <input min="1" type="number" v-model="qty">
    <div class="market-items-item--actions-btns">
      <button v-if="typeof stocks[item.symbol] === 'undefined'" class="btn btn-green btn-sm" @click="addStock(item);">Add</button>
      <template v-else>
        <button class="btn btn-blue btn-sm" @click="addStock(item);">Update</button>
        <button class="btn btn-red btn-sm" @click="removeStock(item);">Remove</button>
      </template>
    </div>
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
    if (typeof this.stocks !== 'undefined' && typeof this.stocks[this.item.symbol] !== 'undefined' && typeof this.stocks[this.item.symbol].qty !== 'undefined') {
      this.qty = this.stocks[this.item.symbol].qty
    }
  },
  computed: {
    ...mapGetters(["stocks"]),
  },
  methods: {
    ...mapActions(["setStock", "deleteStock"]),
    addStock(item) {

      let stockData = {
        symbol: item.symbol, 
        qty: parseInt(this.qty),
        lastPrice: item.lastPrice,
        openPrice: item.openPrice,
        color: this.stocks[this.item.symbol] !== undefined ? this.stocks[this.item.symbol].color : '#' + Math.floor(Math.random() * 16777215).toString(16)
      }

      if (this.stocks[this.item.symbol] === undefined || JSON.stringify(this.stocks[this.item.symbol]) !== JSON.stringify(stockData)) {
        this.setStock(stockData)
        this.forceUpdate()
      }
    },
    removeStock(item) {
      this.deleteStock({symbol: item.symbol})
      this.forceUpdate()
    },
    forceUpdate(rerender = false) {
      this.$forceUpdate()
      this.$emit('forceUpdate', rerender)
    }
  }
};
</script>