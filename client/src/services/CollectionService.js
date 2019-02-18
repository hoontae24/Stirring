import service from "@/services/Service"

export default {
  // User.collections 에 있는 id값들 보내어, Collection들을 요청한다.
  getByAuthor(author) {
    return service.get('/api/collections', author)
  },

  // payload.collection.posts 에 payload.post를 추가하도록 요청한다.
  addPost(payload) {
    return service.post('/api/collections/posts', payload)
  },

  // payload.collection.posts 에 payload.post를 삭제하도록 요청한다.
  subtractPost(payload) {
    return service.delete('/api/collections/posts', payload)
  }
}