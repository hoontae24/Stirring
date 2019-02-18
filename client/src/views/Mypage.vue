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
      <div class="tabs-navs">
        <md-button v-bind:class="isActive('profile')" @click="$router.push(`/${id}/profile`)">profile</md-button>
        <md-button v-bind:class="isActive('posts')" @click="$router.push(`/${id}/posts`)">posts</md-button>
        <md-button v-bind:class="isActive('collections')" @click="$router.push(`/${id}/collections`)">collections</md-button>
        <md-button v-bind:class="isActive('likes')" @click="$router.push(`/${id}/likes`)">likes</md-button>
        <md-button v-bind:class="isActive('followings')" @click="$router.push(`/${id}/followings`)">followings</md-button>
      </div>
      <div class="tabs-content">
        <router-view :id="id"></router-view>
      </div>
    </md-card>
  </div>
</template>

<script>
export default {
  props: ['id'],
  methods: {
    isActive(name) {
      return this.$route.name === name ? 'selected' : null
    }
  }
}
</script>

<style scoped>
.my-page {
  width: 95%;
  margin: 30px auto;
}
.tabs-view {
  padding: 10px;
}
.tabs-content {
  padding: 0px 10px;
}
.selected {
  border: 1px solid lightblue;
  background-color: azure;
}
</style>


