<template>
  <div id="header">
    <div class="small-menu">
      <div class="item" @click="showSmallMenu = true">
        <i class="fas fa-bars"></i>
      </div>
    </div>
    <div id="main-logo" class="btn" @click="$router.push({name: 'home'})">
      <!-- <div id="main-logo" class="btn"> -->
      <!-- <a href="/" class="link"> -->
      <img alt="Vue logo" src="@/assets/logo.png">
      <!-- </a> -->
    </div>
    <div id="nav">
      <div class="nav2" ref="nav2">
        <div class="item btn post" @click="$router.push('/')">{{ text('home') | upperCase }}</div>
        <div ref="search" class="item post">
          <div class="btn" @click="$router.push('/search')">
            {{ text('search') | upperCase }}
            <i class="fas fa-angle-down"></i>
          </div>
          <div class="drop-down-nav" ref="dropDownNav">
            <div
              class="item btn2 post"
              @click="$router.push('/search/posts')"
            >{{ text('posts') | upperCase }}</div>
            <div
              class="item btn2 post"
              @click="$router.push('/search/authors')"
            >{{text( 'authors') | upperCase }}</div>
            <div
              class="item btn2 post"
              @click="$router.push('/search/collections')"
            >{{ text('collections') | upperCase }}</div>
          </div>
        </div>
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
        <div id="changeLan" class="item">
          <div class="btn">
            {{ text('language') | upperCase }}
            <i class="fas fa-angle-down"></i>
          </div>
          <div class="drop-down-language">
            <div class="item btn2" @click="changeLan('korean')">{{ text('korean') | upperCase }}</div>
            <div class="item btn2" @click="changeLan('english')">{{ text('english') | upperCase }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="small-menu" v-if="userNavs[0].show">
      <div class="item" @click="$router.push(userNavs[0].route)">
        <i class="far fa-user"></i>
      </div>
    </div>
    <div class="small-menu" v-if="userNavs[3].show">
      <div class="item" @click="$router.push(userNavs[3].route)">
        <img
          class="profile-image"
          :src="`http://${apiAddress}:${apiPort}/static/profile-images/`+ $store.state.userInfo.user.image "
          alt="Avatar"
        >
      </div>
    </div>

    <md-drawer :md-active.sync="showSmallMenu">
      <md-toolbar class="md-transparent" md-elevation="0">
        <span class="small-title" @click="showSmallMenu = false">{{text('menu') | upperCase}}</span>
        <div class="md-toolbar-section-end">
          <md-button class="md-icon-button md-dense" @click="showSmallMenu = false">
            <i class="fas fa-chevron-left"></i>
          </md-button>
        </div>
      </md-toolbar>

      <md-list class="small-nav">
        <md-list-item
          class="item post"
          @click="showSmallMenu = false; $router.push('/')"
        >{{ text('home') | upperCase }}</md-list-item>
        <md-list-item
          class="item post"
          @click="showSmallMenu = false; $router.push('/search')"
        >{{ text('search') | upperCase }}</md-list-item>
        <md-list-item
          class="item post"
          @click="showSmallMenu = false; $router.push('/search/posts')"
        >{{ text('posts') | upperCase }}</md-list-item>
        <md-list-item
          class="item post"
          @click="showSmallMenu = false; $router.push('/search/authors')"
        >{{ text('authors') | upperCase }}</md-list-item>
        <md-list-item
          class="item post"
          @click="showSmallMenu = false; $router.push('/search/collections')"
        >{{ text('collections') | upperCase }}</md-list-item>
        <md-list-item
          class="item post"
          @click="showSmallMenu = false; $refs.uploadDialog.open()"
        >{{ text('upload') | upperCase }}</md-list-item>
        <md-list-item
          v-for="nav in userNavs"
          :key="nav.name"
          v-show="nav.show"
          class="item user"
          @click="showSmallMenu = false; $router.push(nav.route)"
        >{{ text(nav.name) | upperCase }}</md-list-item>
        <md-list-item
          id="changeLan"
          class="item"
          @click="showSmallMenu = false; changeLan('')"
        >{{ text('language') | upperCase }}</md-list-item>
      </md-list>
    </md-drawer>

    <div id="topBtn" class="top-button btn" @click="scrollTop">
      <span>{{text('top')}}</span>
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
import { apiPort, apiAddress } from "@/config"

export default {
  components: { UploadDialog, CollectDialog },
  computed: {
    ...mapGetters(["text", "isLogined"]),
    userNavs() {
      let userId = " "
      if (this.$store.state.userInfo.isLogined)
        userId = this.$store.state.userInfo.user._id
      return [
        {
          name: "login",
          route: { name: "login", query: { from: this.$route.path } },
          show: !this.isLogined
        },
        { name: "signup", route: { name: "signup" }, show: !this.isLogined },
        { name: "logout", route: { name: "logout" }, show: this.isLogined },
        { name: "mypage", route: { path: `/${userId}` }, show: this.isLogined }
      ]
    }
  },
  data: () => ({
    showSmallMenu: false,
    apiAddress,
    apiPort
  }),
  methods: {
    changeLan(language) {
      this.$store.dispatch("changeLan", language)
    },
    scrollTop() {
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth"
      })
    },
    checkScroll() {
      if (
        document.body.scrollTop > 50 ||
        document.documentElement.scrollTop > 50
      )
        document.getElementById("topBtn").style.display = "block"
      else document.getElementById("topBtn").style.display = "none"
    }
  },
  mounted() {
    window.onscroll = this.checkScroll
    // this.$refs.dropDownNav.style.left = this.$refs.search.offsetLeft + "px"
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
  align-items: center;
}
/* #header * {
  background-color: white;
} */
.small-menu {
  display: none;
}
.small-nav {
  display: none;
}
#main-logo {
  width: 240px;
  max-width: 240px;
  min-width: 240px;
  height: 69px;

  align-self: center;
  padding: 0px;
  margin: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
}
/* #main-logo > .link {
  display: block;
  margin: auto;
  width: 260px;
  height: 68px;
} */
#main-logo img {
  display: block;
  width: 240px;
  height: 60px;
  /* height: 68px; */
}
#nav {
  width: 100%;
  margin-right: 10px;
  margin-left: 10px;
  text-align: center;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.nav2:nth-child(1) > .item:nth-child(1) {
  width: 60px;
}
.drop-down-nav {
  position: absolute;
  top: 60px;
  left: 320px;
  padding-right: 10px;
  text-align: start;
  display: none;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
}
.nav2 > .item:nth-child(2):hover .drop-down-nav {
  background-color: white;
  z-index: 100;
  display: flex;
}
.drop-down-language {
  position: absolute;
  top: 60px;
  right: 10px;
  padding: 0 10px;
  text-align: end;
  display: none;
  flex-direction: column;
  justify-content: space-around;
}
.nav2 > .item:last-child:hover .drop-down-language {
  background-color: white;
  z-index: 100;
  display: flex;
}
.drop-down-nav > .item,
.drop-down-language > .item {
  margin: 10px;
}
.nav2 {
  display: flex;
  align-self: center;
  cursor: default;
}
.nav2 > .item {
  align-self: center;
  padding: 15px 10px;
}
.top-button {
  display: none;
  z-index: 100;
  position: fixed;
  right: 20px;
  bottom: 20px;
  padding: 5px;
  color: green;
  border: 1px solid lightgray;
  border-radius: 0.4rem;
  background-color: rgba(255, 255, 255, 0.7);
}

/* .btn:active, */
.btn:hover {
  cursor: pointer;
  color: Steelblue;
}
.btn2:hover {
  cursor: pointer;
  color: Steelblue;
}
@media screen and (max-width: 800px) {
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
  .md-drawer {
    max-width: 150px;
  }
  .small-menu {
    display: block;
    font-size: 30px;
  }
  .small-menu .item:hover,
  .small-menu .item:active {
    cursor: pointer;
  }
  .small-menu .profile-image {
    display: block;
    width: 35px;
    max-width: 35px;
    min-width: 35px;
    height: 35px;
    object-fit: cover;
    border-radius: 50%;
    overflow: hidden;
  }
  .small-title {
    margin-left: 10px;
    font-size: 1.5rem;
  }
  .small-nav {
    z-index: 100;
    display: block;
    position: absolute;
    width: 100%;
  }
  .small-nav .item {
    margin: 5px;
    background-color: rgb(255, 255, 255);
    text-align: right;
    font-size: 20px;
    font-weight: 500;
  }
  .top-button {
    right: 10px;
    bottom: 10px;
  }
}
</style>
