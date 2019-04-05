import service from '@/services/Service'
import store from '../store'

export default {
  // User id값을 보내어, 해당 유저의 Collection들을 요청한다.
  getByAuthor(authorId) {
    return service.get('/api/collections', {
      author: authorId,
      count: store.state.count
    })
  },

  getMine(authorId) {
    return service.get('/api/collections', {
      author: authorId,
      count: { old: 0, new: 5000 }
    })
  },

  getByIds(ids) {
    return service.get(`/api/collections/${ids}?mode=id`, {
      count: store.state.count
    })
  },

  getByWords(word) {
    return service.get(`/api/collections/${word}?mode=word`, {
      count: store.state.count
    })
  },

  // payload.collection.posts 에 payload.post를 추가하도록 요청한다.
  addPost(payload) {
    return service.post('/api/collections/posts', payload)
  },

  // payload.collection.posts 에 payload.post를 삭제하도록 요청한다.
  subtractPost(payload) {
    return service.delete('/api/collections/posts', payload)
  },

  update(payload) {
    return service.put('/api/collections/' + payload.collection._id, payload)
  },

  delete(payload) {
    return service.delete('/api/collections/' + payload.collection._id, payload)
  }
}
