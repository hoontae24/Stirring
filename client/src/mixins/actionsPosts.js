import store from '@/store'
import UserService from '@/services/UserService'
import PostService from '@/services/PostService'
import authGuard from '@/mixins/authGuard'
import { apiAddress, apiPort } from '@/config'

import { EventBus } from '@/mixins/EventBus'

export const actions = {
  methods: {
    async loadPosts(sort, count, authorId = null) {
      const response = await PostService.getAll({ sort, count, authorId })
      if (!response.data.success) return response.data.message
      this.posts = response.data.posts
    },
    actionView(post) {
      post.views += 1
      PostService.updatePost(post)
    },
    actionLike(isLike, post) {
      authGuard.check()
      if (isLike) {
        post.likes -= 1
        store.dispatch('actionUnlike', post)
      } else {
        post.likes += 1
        store.dispatch('actionLike', post)
      }
      PostService.updatePost(post)
    },
    showCollections(post) {
      // Emit event to showCollectDialog on Header.vue
      EventBus.$emit('showCollections', post)
    },
    isCollected(post, collections) {
      let result = false
      collections.forEach(item => {
        if (this.hasPost(post, item)) result = true
      })
      return result
    },
    hasPost(post, collection) {
      let result = false
      collection.posts.forEach(item => {
        if (item === post._id) result =  true
      })
      return result
    },
    actionDownload(post) {}
  }
}
