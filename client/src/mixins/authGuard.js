import store from '../store'
import router from '@/router'

export default {
  check: () => {
    if (!store.getters.isLogined) {
      router.push({ name: 'login' })
      return true
    }
  },
  checkBeforeEnter: (to, from, next) => {
    if (!store.getters.isLogined) {
      alert('Login First.')
      router.push({ name: 'login' })
    }
    next()
  }
}
