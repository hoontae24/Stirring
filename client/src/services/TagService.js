import service from '@/services/Service'

export default {
  push(word) {
    return service.post(`/api/tag/${word}`)
  },

  getTop5() {
    return service.get('/api/tag/top5')
  }
}
