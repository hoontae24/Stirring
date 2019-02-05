import service from "@/services/Service"

export default {
  post(payload) {
    return service.post('/api/posts', payload)
  },
  getAll() {
    return service.get('/api/posts')
  }
  
}