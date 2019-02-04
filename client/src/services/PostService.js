import service from "@/services/Service"

export default {
  post(payload) {
    return service.post('/api/posts', payload)
  }
  
}