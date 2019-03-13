import store from '../store'
import router from '@/router'
import { EventBus } from '@/mixins/EventBus'

export default {
  check: () => {
    if (!store.getters.isLogined) {
      router.push({ name: 'login' })
      EventBus.$emit('showMessage', 'Login First')
      return true
    }
  }
}
