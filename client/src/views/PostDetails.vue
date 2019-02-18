<template>
  <div class="post-details" style="width: 100%;">
    <md-card class="card" v-if="author && post">
      <md-card-header class="top">
        <div class="author item btn">
          <md-avatar class="item profile-image">
            <img
              :src="`http://${apiAddress}:${apiPort}/static/profile-images/`+ author.image "
              alt="Avatar"
            >
          </md-avatar>
          <div class="item author-name">{{author.name}}</div>
        </div>

        <div class="item actions">
          <div class="item btn" @click="actionLike(isLike(post), post)">
            <i class="fas fa-heart red" v-if="isLike(post)" style="color: red"></i>
            <i class="far fa-heart" v-else></i>
            <span v-if="isLike(post)" style="color: red;">&nbsp;Liked</span>
            <span v-else>&nbsp;Like</span>
          </div>
          <div
            class="item btn"
            :class="isCollected(post, collections) ? 'collected' : '' "
            @click="showCollections(post)"
          >
            <i class="fas fa-star green" style="color: green" v-if="isCollected(post, collections)"></i>
            <i class="far fa-star" v-else></i>
            <span v-if="!isCollected(post, collections)">&nbsp;Collect</span>
            <span v-else>&nbsp;Collected</span>
          </div>
          <div class="item btn">
            <a
              style="color: black; text-decoration: none; color: inherit;"
              :href="`http://${apiAddress}:${apiPort}/static/posts/`+ post.data.filename"
              target="_blank"
              download
            >
              <i class="fas fa-arrow-down"></i>
              <span>&nbsp;Download</span>
            </a>
          </div>
        </div>
      </md-card-header>

      <md-card-media>
        <img
          class="image-btn"
          :src="`http://${apiAddress}:${apiPort}/static/posts/`+ post.data.filename "
        >
      </md-card-media>

      <md-card-content>
        <div class="item author">Author: {{author.name}}</div>
        <div class="item tags">
          Tags:
          <span v-for="tag in post.tags" :key="tag">#{{tag}}</span>
        </div>
        <div class="item likes">Likes: {{post.likes}}</div>
        <div class="item downloads">Downloads: {{post.downloads}}</div>
        <div class="item views">Views: {{post.views}}</div>
        <div class="item updated-at">Updated at: {{post.updatedAt.toLocaleString()}}</div>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import PostService from "@/services/PostService"
import UserService from "@/services/UserService"
import CollectionService from "@/services/CollectionService"
import { apiAddress, apiPort } from "@/config"
import { mapGetters } from "vuex"
import { actions } from "@/mixins/actionsPosts"
import { EventBus } from "@/mixins/EventBus"
export default {
  props: ["id"],
  data() {
    return {
      post: null,
      author: null,
      collections: [],
      apiAddress,
      apiPort
    }
  },
  computed: {
    ...mapGetters(["isLike"])
  },
  methods: {
    async loadPost() {
      const res = await PostService.getOne(this.id)
      if (!res.data.success) return
      this.post = res.data.post
      this.post.createdAt = new Date(this.post.createdAt)
      this.post.updatedAt = new Date(this.post.updatedAt)
      const resUser = await UserService.getUser(this.post.author.id)
      this.author = resUser.data.user
      this.actionView(this.post)
    },
    loadCollections() {
      CollectionService.getByAuthor(this.$store.state.userInfo.user._id)
        .then(res => {
          if (!res.data.success) throw new Error("Failed to load collections")
          this.collections = res.data.collections
        })
        .catch(err => {
          // TODO: Error 처리
        })
    }
  },
  created() {
    this.loadPost()
    this.loadCollections()
    EventBus.$on("loadCollections", () => {
      this.loadCollections()
    })
  },
  mixins: [actions]
}
</script>

<style scoped>
.card {
  width: 95%;
  margin: 20px auto;
  min-width: 425px;
}
.card > .top {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.top > .item {
  margin: 0px;
  display: flex;
}
.top > .author > .item {
  margin: 0;
  font-size: 1.5rem;
  margin: auto 10px;
}

.top > .actions {
  display: flex;
}
.top > .actions > .item {
  margin: 0 10px;
  font-size: 1rem;
  padding: 10px;
  border: 1px solid lightblue;
  border-radius: 1em;
}

.collected {
  border-color: green;
  color: green;
}

.btn:hover,
.btn:active {
  cursor: pointer;
  color: lightcoral;
  filter: brightness(110%);
}
a {
  color: black;
}
</style>

