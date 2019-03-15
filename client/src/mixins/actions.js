import store from '@/store'
import PostService from '@/services/PostService'
import authGuard from '@/mixins/authGuard'
import { apiAddress, apiPort } from '@/config'

import { EventBus } from '@/mixins/EventBus'

export const actions = {
  methods: {
    async loadPosts(condition) {
      const response = await PostService.getAll(condition)
      if (!response.data.success) return response.data.message
      this.posts = response.data.posts
    },
    actionView(post) {
      post.views += 1
      PostService.updatePost(post)
    },
    actionLike(isLike, post) {
      if (authGuard.check(this.$route.path)) return
      if (isLike) {
        post.likes -= 1
        store.dispatch('actionUnlike', post)
      } else {
        post.likes += 1
        store.dispatch('actionLike', post)
      }
      EventBus.$emit('loadUser')
    },
    showCollections(post) {
      if (authGuard.check(this.$route.path)) return
      // Emit event to showCollectDialog on CollectionDialog.vue
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
        if (item === post._id) result = true
      })
      return result
    },
    actionDownload(post) {
      post.downloads += 1
      PostService.updatePost(post)
      const imageUrl = `http://${apiAddress}:${apiPort}/static/posts/${
        post.data.filename
      }`
      location = imageUrl
      // var link = document.createElement('a')
      // document.body.appendChild(link)
      // link.href = imageUrl
      // link.click()
    },
    actionFollow(isFollow, user, isMe) {
      if (isMe) return
      if (authGuard.check(this.$route.path)) return
      if (!isFollow) store.dispatch('actionFollow', user)
      else store.dispatch('actionUnfollow', user)
    },
    linkByTag(tag) {
      this.$router.push('/search/posts?word=' + tag)
    }
  }
}
