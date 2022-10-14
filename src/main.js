import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import './index.css'
import store from './store'

store.subscribe((mutation, state) => {
  localStorage.setItem('stocks', JSON.stringify(state.stocks));
})

Vue.config.productionTip = false
Vue.prototype.$store = store;
Vue.use(Vuex)

new Vue(App).$mount('#app')
