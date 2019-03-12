import service from '@/services/Service'

export default {
  signup(credentials) {
    return service.post('/api/users', credentials)
  },
  getUser(id) {
    return service.get(`/api/users/${id}?mode=id`)
  },
  getUserByWord(word) {
    return service.get(`/api/users/${word}?mode=word`)
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
  }
}
