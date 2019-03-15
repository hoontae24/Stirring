import store from '../store'
import router from '@/router'
import { EventBus } from '@/mixins/EventBus'

export default {
  check: from => {
    if (!store.getters.isLogined) {
      router.push({ name: 'login', query: { from } })
      EventBus.$emit('showMessage', 'Login First')
      return true
    }
  }
}
