import Vue from 'vue'
import App from './App.vue'
import router from './route'
import store from './store'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'

Vue.config.productionTip = false

Vue.filter('upperCase', function(values) {
  return values.toUpperCase()
})

Vue.use(VueMaterial)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
