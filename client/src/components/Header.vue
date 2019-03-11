<template>
  <div id="header">
    <!-- <div id="main-logo" class="btn" @click="$router.push({name: 'home'})"> -->
    <div id="main-logo" class="btn">
      <a href="/" class="link">
        <img alt="Vue logo" src="@/assets/logo.png">
      </a>
    </div>
    <div id="nav">
      <div class="nav2">
        <div class="item btn post" @click="$router.push('/search')">{{ text('search') | upperCase }}</div>
        <div class="item btn post" @click="$router.push('/search/posts')">{{ 'posts' | upperCase }}</div>
        <div
          class="item btn post"
          @click="$router.push('/search/authors')"
        >{{ 'authors' | upperCase }}</div>
        <div
          class="item btn post"
          @click="$router.push('/search/collections')"
        >{{ text('collections') | upperCase }}</div>
      </div>
      <div class="nav2">
        <div
          class="item btn post"
          @click="showSmallMenu = false; $refs.uploadDialog.open()"
        >{{ text('upload') | upperCase }}</div>
        <div
          v-for="nav in userNavs"
          v-show="nav.show"
          class="item btn user"
          :key="nav.name"
          @click="$router.push(nav.route)"
        >{{ text(nav.name) | upperCase }}</div>
        <div
          id="changeLan"
          class="item btn"
          @click="changeLan"
        >{{ text(language.name) | upperCase }}</div>
      </div>
    </div>
    <div id="small-menu">
      <div class="item" @click="showSmallMenu = !showSmallMenu">
        <i class="fas fa-bars"></i>
      </div>
    </div>
    <div id="small-nav" v-if="showSmallMenu">
      <div
        class="item btn post"
        @click="showSmallMenu = false; $router.push('/search')"
      >{{ text('search') | upperCase }}</div>
      <div class="divider" style></div>
      <div
        class="item btn post"
        @click="showSmallMenu = false; $router.push('/search/posts')"
      >{{ 'posts' | upperCase }}</div>
      <div class="divider" style></div>
      <div
        class="item btn post"
        @click="showSmallMenu = false; $router.push('/search/authors')"
      >{{ 'authors' | upperCase }}</div>
      <div class="divider" style></div>
      <div
        class="item btn post"
        @click="showSmallMenu = false; $router.push('/search/collections')"
      >{{ text('collections') | upperCase }}</div>

      <div class="divider" style></div>
      <div
        class="item btn post"
        @click="showSmallMenu = false; $refs.uploadDialog.open()"
      >{{ text('upload') | upperCase }}</div>

      <div v-for="nav in userNavs" :key="nav.name" v-show="nav.show">
        <div class="divider"></div>
        <div
          class="item btn user"
          @click="showSmallMenu = false; $router.push(nav.route)"
        >{{ text(nav.name) | upperCase }}</div>
      </div>
      <div class="divider"></div>
      <div
        id="changeLan"
        class="item btn"
        @click="showSmallMenu = false; changeLan()"
      >{{ text(language.name) | upperCase }}</div>
    </div>
    <UploadDialog ref="uploadDialog"/>
    <CollectDialog ref="collectDialog"/>
  </div>
</template>

<script>
// import components
import UploadDialog from "@/components/UploadDialog"
import CollectDialog from "@/components/CollectDialog"

// import services
import { mapGetters } from "vuex"
import PostService from "@/services/PostService"
import { EventBus } from "@/mixins/EventBus"

export default {
  components: { UploadDialog, CollectDialog },
  computed: {
    ...mapGetters(["text", "isLogined"]),
    userNavs() {
      let userId = " "
      if (this.$store.state.userInfo.isLogined)
        userId = this.$store.state.userInfo.user._id
      return [
        { name: "login", route: { name: "login" }, show: !this.isLogined },
        { name: "signup", route: { name: "signup" }, show: !this.isLogined },
        { name: "logout", route: { name: "logout" }, show: this.isLogined },
        { name: "mypage", route: { path: `/${userId}` }, show: this.isLogined }
      ]
    }
  },
  data: () => ({
    language: { name: "language" },
    showSmallMenu: false
  }),
  methods: {
    changeLan() {
      this.$store.dispatch("changeLan")
    }
  }
}
</script>

<style lang="css" scoped>
#header {
  /* font-family: 'Nunito', Helvetica, Arial, sans-serif; */
  background-color: white;
  width: 100%;
  height: 75px;
  margin: 0;
  padding: 0px 10px 0px 10px;
  border-bottom: 1px solid lightgrey;

  display: flex;
  justify-content: space-between;
}
#header * {
  background-color: white;
}
#small-menu {
  display: none;
}
#small-nav {
  display: none;
}
#main-logo {
  width: 260px;
  height: 69px;

  align-self: center;
  padding: 0px;
  margin: 0px;
}
#main-logo > .link {
  display: block;
  margin: auto;
  width: 260px;
  height: 68px;
}
#main-logo img {
  width: 260px;
  height: 68px;
}
#nav {
  width: 100%;
  margin-right: 10px;
  margin-left: 10px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.nav2 {
  display: flex;
  align-self: center;
}
.nav2 > .item {
  align-self: center;
  padding: 15px 10px;
}
.btn:hover,
.btn:active {
  cursor: pointer;
  color: Steelblue;
}

@media screen and (max-width: 1000px) {
  #header {
    width: 100%;
    height: 60px;
  }
  #main-logo {
    width: 190px;
    height: 53px;

    /* align-self: center; */
    padding: 0px;
    margin: 0px auto;
  }
  #main-logo > .link {
    display: block;
    margin: auto;
    width: 190px;
    height: 53px;
  }
  #main-logo img {
    width: 190px;
    height: 53px;
  }
  #nav {
    display: none;
  }
  #small-menu {
    display: block;
    position: absolute;
    right: 10px;
    top: 10px;
    font-size: 30px;
  }
  #small-menu .item:hover,
  #small-menu .item:active {
    cursor: pointer;
  }
  #small-nav {
    z-index: 100;
    display: block;
    position: absolute;
    top: 50px;
    left: 0px;
    width: 100%;
    background-color: rgb(241, 241, 241);
  }
  #small-nav > * {
    background-color: rgb(241, 241, 241);
  }
  #small-nav .item {
    height: 25px;
    margin: 5px;
    background-color: rgb(241, 241, 241);
    text-align: right;
    font-size: 20px;
    font-weight: 500;
  }
  .divider {
    height: 1px;
    border: 0.5px solid lightgray;
  }
}
</style>
