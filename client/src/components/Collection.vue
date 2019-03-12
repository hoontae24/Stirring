<template>
  <div class="collection">
    <md-card class="container md-elevation-1">
      <div class="images btn" @click="$router.push(`/collections/${collection._id}`)">
        <img
          class="posts"
          v-for="(item, index) in posts"
          :key="item._id"
          :style="`left: ${index*50}px; top: -${index*100}%;`"
          :src="`http://${apiAddress}:${apiPort}/static/posts/${item.data.filename}`"
        >
        <!-- <img
          v-if="posts"
          class="posts"
          :style="'left: ' + '50px;'"
          :src="`http://${apiAddress}:${apiPort}/static/posts/${posts[0].data.filename}`"
        >-->
        <img v-if="!posts" class="posts" :style="null" src="@/assets/icon_collection.png">
        <!-- <div
          class="text"
        >{{collection.posts.length}} {{collection.posts.length <= 1 ? 'Post':'Posts'}}</div>-->
      </div>

      <div class="info">
        <div class="author item btn" @click="$router.push(`/${collection.author.id}`)">
          <img
            class="profile-image"
            :src="`http://${apiAddress}:${apiPort}/static/profile-images/`+ profileImage "
            alt="Avatar"
          >
          <div class="author-name" style>{{collection.author.name}}</div>
        </div>
        <div
          class="item count"
        >{{collection.posts.length}} {{(collection.posts.length < 2) ? 'Post':'Posts'}}</div>
        <div class="item title">{{collection.title}}</div>
      </div>
    </md-card>
  </div>
</template>

<script>
import { apiAddress, apiPort } from "@/config"
import PostService from "@/services/PostService"
import UserService from "@/services/UserService"

export default {
  props: ["collection"],
  data() {
    return {
      apiAddress,
      apiPort,
      posts: null,
      profileImage: null
    }
  },
  methods: {
    loadPosts() {
      UserService.getUserProfileImage(this.collection.author.id).then(res => {
        this.profileImage = res.data.image
      })
      if (this.collection.posts.length < 1) return
      PostService.getByIds(this.collection.posts).then(res => {
        this.posts = res.data.post
      })
    }
  },
  created() {
    this.loadPosts()
  }
}
</script>

<style scoped>
.collection {
  position: relative;
}
.collection {
  margin: 10px;
  width: 30%;
  max-width: 40%;
  /* min-width: 400px; */
}

.collection:before {
  content: "";
  display: block;
  padding-top: 50%;
}
.container {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  border-radius: 1em;
  overflow: hidden;
}
.images {
  /* width: fit-content; */
  height: 75%;
  border-radius: 1em;
  -moz-border-radius: 1em;
  -webkit-border-radius: 1em;
  overflow: hidden;
  margin: 0px auto;
  /* display: flex;
  align-items: center;
  justify-content: center; */
}
.posts {
  position: relative;
  display: block;
  height: 100%;
  border-radius: 1em;
  padding: 10px;
}
.text {
  height: fit-content;
  vertical-align: middle;
  text-align: center;
  font-size: 2vw;
}

.info {
  height: 25%;
  padding: 2px 10px;
  background-color: azure;
  border-radius: 1em;
  display: flex;
  justify-content: space-between;
}
.info .item {
  margin: auto 0px;
}
.profile-image {
  border-radius: 50%;
  position: relative;
  width: 40px;
  height: 40px;
  display: inline-block;
}
.author-name {
  display: inline-block;
  margin: auto 10px;
}

/* .btn:active, */
.btn:hover {
  cursor: pointer;
  color: steelblue;
  /* filter: brightness(100%); */
}
@media screen and (max-width: 1280px) {
  .collection {
    width: 45%;
    max-width: 50%;
  }
}

@media screen and (max-width: 800px) {
  .collection {
    width: 100%;
    max-width: 100%;
  }
  .profile-image {
    display: none;
  }
}
</style>