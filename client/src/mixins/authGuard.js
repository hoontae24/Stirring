import store from '../store'

module.exports = (to, from, next) => {
  if (store.getters.isLogined) {
    next({ name: from.name })
  }
  next()
}