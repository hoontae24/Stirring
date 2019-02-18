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
        <div
          class="item btn post"
          @click="$router.push({ name: 'search' })"
        >{{ text('search') | upperCase }}</div>
        <UploadDialog class="item btn post"/>
        <div
          class="item btn post"
          @click="$router.push({ name: 'collections'})"
        >{{ text('collections') | upperCase }}</div>
      </div>
      <div class="nav2">
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
    language: { name: "language" }
  }),
  methods: {
    changeLan() {
      this.$store.dispatch("changeLan")
    }
  },
  created() {
    EventBus.$on("showCollections", post => {
      this.$refs.collectDialog.open(post)
    })
  }
}
</script>

<style lang="css" scoped>
#header {
  /* font-family: 'Nunito', Helvetica, Arial, sans-serif; */
  background-color: white;
  width: 100%;
  height: 70px;
  margin: 0;
  padding: 0px 10px 0px 10px;
  border-bottom: 1px solid lightgrey;

  display: flex;
  justify-content: space-between;
}
#header * {
  background-color: white;
}
#main-logo {
  width: 260px;
  height: 69px;

  /* align-self: center; */
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
  height: 68px;
  width: 260px;
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
.item {
  align-self: center;
  padding: 15px 10px;
}
.btn:hover,
.btn:active {
  cursor: pointer;
  font-weight: 600;
  color: Steelblue;
}

@media screen and (max-width: 800px) {
}
</style>
