import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import AuthService from '@/services/AuthService'
import { EventBus } from '@/mixins/EventBus'

Vue.config.productionTip = false

Vue.filter('upperCase', function(values) {
  return values.toUpperCase()
})

Vue.use(VueMaterial)

new Vue({
  router,
  store,
  beforeCreate() {
    AuthService
      .refresh(localStorage.getItem('token'))
      .then(res => {
        this.$store.dispatch('login', res.data)
        EventBus.$emit('loadCollections')
      })
      .catch(() => {
        this.$store.dispatch('logout')
        console.log('Failed refreshing.')
      })
  },
  render: h => h(App)
}).$mount('#app')
