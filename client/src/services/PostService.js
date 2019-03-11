import service from '@/services/Service'

export default {
  post(payload) {
    return service.post('/api/posts', payload)
  },
  getAll(payload) {
    return service.get('/api/posts', payload)
  },
  getOne(id, payload) {
    return service.get(`/api/posts/${id}`, payload)
  },
  getByIds(id, payload) {
    return service.get(`/api/posts/${id}`, payload)
  },
  updatePost(post) {
    return service.put(`/api/posts/${post._id}`, post)
  },
  deleteOne(id) {
    return service.delete(`/api/posts/${id}`)
  }
}
