import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    market: [],
    stocks: {},
  },
  mutations: {
    INIT_STOCKS(state) {
      if (localStorage.getItem('stocks')) {
        state.stocks = JSON.parse(localStorage.stocks);
      }
    },
    SET_MARKET(state, payload) {
      state.market = payload
    },
    SET_STOCK(state, payload) {
      state.stocks[payload.symbol] = payload
    },
    DELETE_STOCK(state, payload) {
      delete(state.stocks[payload.symbol])
    }
  },
  actions: {
    async fetchMarket({ commit }) {
      return await fetch('https://api2.binance.com/api/v3/ticker/24hr?type=MINI')
        .then(response => response.json())
        .then(data => {
          commit('SET_MARKET', data)
        })
    },
    setStock({ commit }, payload) {
      commit('SET_STOCK', payload)
    },
    deleteStock({ commit }, payload) {
      commit('DELETE_STOCK', payload)
    }
  },
  getters: {
    market(state) {
      return state.market
    }, 
    stocks(state) {
      return state.stocks
    }
  },
}); 