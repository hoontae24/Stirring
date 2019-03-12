<template>
  <div class="collection-details" style>
    <md-card class="card">
      <div class="container">
        <div class="item top">
          <div class="item title">
            {{collection.title | upperCase}}
            <i
              v-if="isMe(collection.author.id)"
              class="fas fa-edit btn"
              style="font-size: 1rem;"
              @click="openEditDialog"
            ></i>
          </div>
          <div class="item author btn" @click="$router.push(`/${collection.author.id}`)">
            <md-avatar class="item profile-image" style="border-radius: 1em; border: 1px solid lightgray;">
              <img
                :src="`http://${apiAddress}:${apiPort}/static/profile-images/${authorImage}`"
                alt="Avatar"
              >
            </md-avatar>
            <div class="item author-name">{{collection.author.name}}</div>
          </div>
        </div>
        <div class="item" v-if="posts.length == 1">{{posts.length}} Post</div>
        <div class="item" v-else>{{posts.length}} Posts</div>
        <PostsBoard :posts="posts" :sort="'latest'"/>
      </div>
    </md-card>
    <CollectionEditDialog :collection="collection" ref="editDialog"/>
  </div>
</template>

<script>
import CollectionService from "@/services/CollectionService"
import UserService from "@/services/UserService"
import PostService from "@/services/PostService"
import { apiAddress, apiPort } from "@/config"

import PostsBoard from "@/components/PostsBoard"
import CollectionEditDialog from "@/components/CollectionEditDialog"

import { mapGetters } from "vuex"

export default {
  components: { PostsBoard, CollectionEditDialog },
  props: ["id"],
  data() {
    return {
      apiAddress,
      apiPort,
      collection: null,
      authorImage: null,
      posts: []
    }
  },
  computed: {
    ...mapGetters(["isMe"])
  },
  methods: {
    async loadData() {
      const res = await CollectionService.getByIds(this.id)
      this.collection = res.data.collections[0]
      const authorImage = await UserService.getUserProfileImage(
        this.collection.author.id
      )
      this.authorImage = authorImage.data.image
      const res2 = await PostService.getByIds(this.collection.posts)
      this.posts = res2.data.post
    },
    openEditDialog() {
      this.$refs.editDialog.open()
    }
  },
  created() {
    this.loadData()
    // TODO: 컬렉션 디테일 꾸미기, 구현
  }
}
</script>

<style scoped>
.card {
  width: 95%;
  margin: 20px auto;
  min-width: 370px;
  padding: 10px;
}
.container {
  margin: 10px 20px;
}
.container > .item {
  margin: 10px auto;
  margin-bottom: 20px;
  font-size: 1rem;
}
.top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.title {
  font-size: 3rem;
  vertical-align: middle;
}
.author {
  font-size: 2rem;
  display: flex;
  align-items: center;
}
.author > .item {
  margin: 0px 5px;
}

/* .btn:active, */
.btn:hover {
  cursor: pointer;
  filter: brightness(110%);
  color: steelblue;
}

@media screen and (max-width: 800px) {
  .card {
    width: 99%;
    margin: 20px auto;
    min-width: 320px;
    padding: 5px;
  }
  .container {
    margin: 10px 5px;
  }
  .container > .item {
    margin: 10px auto;
    margin-bottom: 20px;
    font-size: 1rem;
  }
  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .title {
    font-size: 1.5rem;
    vertical-align: middle;
  }
  .author {
    font-size: 1rem;
    display: flex;
    align-items: center;
  }
  .author > .item {
    margin: 0px 5px;
  }
}
</style>