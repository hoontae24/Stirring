import service from '@/services/Service'
import store from '@/store'

export default {
  signup(credentials) {
    return service.post('/api/users', credentials)
  },
  getUser(id, count = { count: store.state.count }) {
    return service.get(`/api/users/${id}?mode=id`, count)
  },
  getUserByWord(word) {
    return service.get(`/api/users/${word}?mode=word`, {
      count: store.state.count
    })
  },
  updateUser(user) {
    return service.put(`/api/users/${user._id}`, user)
  },
  createCollection(payload) {
    return service.post('/api/collections', payload)
  },
  getUserProfileImage(id) {
    return service.get(`/api/users/profile-image/${id}`)
  },
  setUserProfileImage(formData) {
    return service.put(
      `/api/users/profile-image/${formData.get('userId')}`,
      formData
    )
  },
  changePassword(user) {
    return service.put(`/api/users/password/${user.id}`, user)
  },
  deleteAccount(user) {
    return service.delete(`/api/users/${user.email}`, user)
  },
  checkEmail(email) {
    return service.get(`/api/users/email/${email}`)
  },
  resetPassword(data) {
    return service.post(`/api/users/password/`, data)
  },
  updateInterests({ userId, interests }) {
    return service.put(`/api/users/interests/${userId}`, { interests })
  }
}
