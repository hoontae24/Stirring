<template>
  <div class="my-page">
    <md-card class="tabs-view">
      <!-- <md-tabs md-sync-route md-alignment="fixed">
        <md-tab id="tab-profile" md-label="profile" @click="$router.push('/mypage/profile')"></md-tab>
        <md-tab id="tab-posts" md-label="posts" @click="$router.push('/mypage/posts')"></md-tab>
        <md-tab id="tab-collections" md-label="collections">collections</md-tab>
        <md-tab id="tab-likes" md-label="likes">likes</md-tab>
        <md-tab id="tab-followings" md-label="followings">followings</md-tab>
      </md-tabs>-->
      <Profile :user="user"/>
      <div class="tabs-container">
        <div class="tabs-navs">
          <!-- <md-button v-bind:class="isActive('profile')" @click="$router.push(`/${id}/profile`)">profile</md-button> -->
          <md-button
            v-bind:class="isActive('posts')"
            class="btn"
            @click="$router.push(`/${id}/posts`)"
          >posts {{user.posts.length}}</md-button>
          <md-button
            v-bind:class="isActive('collections')"
            class="btn"
            @click="$router.push(`/${id}/collections`)"
          >collections {{user.collections.length}}</md-button>
          <md-button
            v-bind:class="isActive('likes')"
            class="btn"
            @click="$router.push(`/${id}/likes`)"
          >likes {{user.likes.length}}</md-button>
          <md-button
            v-bind:class="isActive('followings')"
            class="btn"
            @click="$router.push(`/${id}/followings`)"
          >followings {{user.followings.length}}</md-button>
        </div>
        <div class="tabs-content">
          <router-view :id="id" :user="user"></router-view>
        </div>
      </div>
    </md-card>
  </div>
</template>

<script>
import UserService from "@/services/UserService"
import Profile from "@/components/Profile"
import { EventBus } from "@/mixins/EventBus"

export default {
  components: { Profile },
  props: ["id"],
  data() {
    return {
      user: { image: "face-default.png" }
    }
  },
  methods: {
    isActive(name) {
      return this.$route.name === name ? "selected" : null
    },
    async loadUser() {
      const res = await UserService.getUser(this.id)
      this.user = res.data.user[0]
    }
  },
  created() {
    EventBus.$on("loadUser", () => {
      this.loadUser()
    })
    this.loadUser()
  },
  watch: {
    id() {
      this.loadUser()
    }
  }
}
</script>

<style scoped>
.my-page {
  width: 95%;
  margin: 20px auto;
}
.tabs-view {
  padding: 10px;
  border-radius: 1em;
  overflow: hidden;
}
.tabs-container {
  border: 1px solid lightgray;
  margin: 20px 10px;
  border-radius: 0.5rem;
  overflow: hidden;
}
.tabs-navs {
  border-bottom: 1px solid lightgray;
}
.tabs-content {
  min-height: 100px;
  padding: 10px 10px;
}
.selected {
  /* border: 1px solid lightblue; */
  /* background-color: ghostwhite; */
}
.btn {
  border-radius: 1em;
  overflow: hidden;
}

@media screen and (max-width: 800px) {
  .my-page {
    width: 98%;
    margin: 10px auto;
  }
  .tabs-view {
    padding: 0px;
    border-radius: 1em;
    overflow: hidden;
  }
  .tabs-container {
    border: 1px solid lightgray;
    margin: 20px 10px;
    border-radius: 1em;
    overflow: hidden;
  }
  .tabs-navs {
    border-bottom: 1px solid lightgray;
    overflow: auto;
  }
  .md-button {
    overflow: hidden;
    margin: 2px;
    padding: 0px;
    font-size: 1rem;
  }
  .md-ripple {
    padding: 0px;
  }

  .tabs-content {
    min-height: 100px;
    padding: 0px;
  }
  .selected {
    /* border: 1px solid lightblue; */
    /* background-color: azure; */
  }
  .btn {
    border-radius: 1em;
    overflow: hidden;
  }
}
</style>


