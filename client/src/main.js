import Vue from 'vue'
import App from './App.vue'
import router from './route'
import store from './store'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import service from '@/services/AuthService'

Vue.config.productionTip = false

Vue.filter('upperCase', function(values) {
  return values.toUpperCase()
})

Vue.use(VueMaterial)

new Vue({
  router,
  store,
  beforeCreate() {
    service
      .refresh(localStorage.getItem('token'))
      .then(res => {
        this.$store.dispatch('login', res.data)
      })
      .catch(() => {
        this.$store.dispatch('logout')
        console.log('Failed refreshing.')
      })
  },
  render: h => h(App)
}).$mount('#app')
