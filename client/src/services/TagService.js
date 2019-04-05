import service from '@/services/Service'

export default {
  push(word) {
    return service.post(`/api/tags/${word}`)
  },

  getTop5() {
    return service.get('/api/tags/top5')
  }
}
