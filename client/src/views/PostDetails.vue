<template>
  <div class="post-details" style="width: 100%;">
    <md-card class="card" v-if="author && post">
      <md-card-header class="top">
        <div class="author item btn" @click="$router.push(`../${author._id}`)">
          <md-avatar
            class="item profile-image"
            style="border-radius: 1em; border: 1px solid lightgray;"
          >
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
            <span v-if="isLike(post)" style="color: red;">&nbsp;{{text('liked')}}</span>
            <span v-else>&nbsp;{{text('like')}}</span>
          </div>
          <div
            class="item btn"
            :class="isCollected(post, collections) ? 'collected' : '' "
            @click="showCollections(post)"
          >
            <i class="fas fa-star green" style="color: green" v-if="isCollected(post, collections)"></i>
            <i class="far fa-star" v-else></i>
            <span v-if="!isCollected(post, collections)">&nbsp;{{text('collect')}}</span>
            <span v-else>&nbsp;{{text('collected')}}</span>
          </div>
          <div class="item btn" @click="actionDownload(post)">
            <i class="fas fa-arrow-down"></i>
            <span>&nbsp;{{text('download')}}</span>
          </div>
        </div>
      </md-card-header>

      <md-card-media>
        <img
          class="image-btn"
          :src="`http://${apiAddress}:${apiPort}/static/posts/`+ post.data.filename "
        >
      </md-card-media>

      <md-card-content style="display:flex; justify-content: space-between;">
        <div style="display:inline-block;">
          <div class="item author">{{text('author')}}: {{author.name}}</div>
          <div class="item tags">
            {{text('tags')}}:
            <span
              class="btn"
              style="color:steelblue"
              v-for="tag in post.tags"
              :key="tag"
              @click="linkByTag(tag)"
            >#{{tag}}</span>
          </div>
          <div class="item likes">{{text('likes')}}: {{post.likes}}</div>
          <div class="item downloads">{{text('downloads')}}: {{post.downloads}}</div>
          <div class="item views">{{text('views')}}: {{post.views}}</div>
          <div class="item updated-at">{{text('updated')}}: {{post.updatedAt.toLocaleString()}}</div>
        </div>
        <md-button v-if="isMe(post.author.id)" flat class="md-accent" @click="deletePost">{{text('delete')}}</md-button>
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
import { actions } from "@/mixins/actions"
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
    ...mapGetters(["isLike", "isMe", "text"])
  },
  methods: {
    deletePost() {
      PostService.deleteOne(this.id).then(res => {
        this.$router.go(-1)
      })
    },
    async loadPost() {
      const res = await PostService.getOne(this.id)
      if (!res.data.success) return
      this.post = res.data.post[0]
      this.post.createdAt = new Date(this.post.createdAt)
      this.post.updatedAt = new Date(this.post.updatedAt)
      const resUser = await UserService.getUser(this.post.author.id)
      this.author = resUser.data.user[0]
      this.actionView(this.post)
    },
    loadCollections() {
      if (!this.$store.getters.isLogined) return
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
  min-width: 320px;
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

/* .btn:active, */
.btn:hover {
  cursor: pointer;
  color: steelblue;
  filter: brightness(110%);
}
a {
  color: black;
}

@media screen and (max-width: 600px) {
  .top > .actions > .item {
    margin: 0 5px;
    font-size: 1.5rem;
    padding: 5px;
    border: 1px none lightblue;
    border-radius: 0.5em;
  }
  .top > .actions > .item > span {
    display: none;
  }
}
</style>

