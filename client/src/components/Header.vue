<template>
  <div id="header">
    <div id="main-logo" class="btn" @click="$router.push({name: 'home'})">
      <img alt="Vue logo" src="@/assets/logo.png">
    </div>
    <div id="nav">
      <div class="nav2">
        <div
          class="item btn post"
          @click="$router.push({ name: 'search' })"
        >{{ text('search') | upperCase }}</div>
        <Upload class="item btn post"/>
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

  </div>
</template>

<script>
import { mapGetters } from "vuex"
import { mixins } from "@/mixins/mixins"
import PostService from "@/services/PostService"
import Upload from "@/components/Upload"

export default {
  components: { Upload },
  computed: {
    ...mapGetters(["text", "isLogined"]),
    userNavs() {
      return [
        { name: "login", route: { name: "login" }, show: !this.isLogined },
        { name: "signup", route: { name: "signup" }, show: !this.isLogined },
        { name: "logout", route: { name: "logout" }, show: this.isLogined },
        { name: "mypage", route: { name: "mypage" }, show: this.isLogined }
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
  mixins: [mixins]
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
  height: 100%;

  align-self: center;
  padding: 0px;
  margin: 0px;

  display: flex;
  justify-content: center;
  align-items: center;
}
#main-logo img {
  display: block;
  padding: 0px;
  margin: 0px;
  width: 260px;
  height: 80%;
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
  font-weight: 400;
  color: Steelblue;
}

@media (max-width: 800px) {
  #header {
    /* font-family: 'Nunito', Helvetica, Arial, sans-serif; */

    height: 50px;
    margin: 0;
    padding: 0px 5px;
  }
  #logo {
    width: auto;
    height: 80%;
    align-self: center;
    padding: 0px;
    margin: 0px;

    display: flex;
    justify-content: center;
    align-items: center;
  }
  img {
    height: 60%;
    width: auto;
  }
}

</style>
