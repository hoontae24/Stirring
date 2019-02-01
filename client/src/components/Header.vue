<template>
  <div id="header">
    <div id="main-logo" class="btn" @click="$router.push({name: 'home'})">
      <img alt="Vue logo" src="@/assets/logo.png">
    </div>
    <div id="nav">
      <div class="nav2">
        <div
          v-show="postNavs[0].show"
          class="item btn post"
          @click="$router.push(postNavs[0].route)"
        >{{ text(postNavs[0].name) | upperCase }}</div>
        <div
          v-show="postNavs[1].show"
          class="item btn post"
          @click="showD"
        >{{ text(postNavs[1].name) | upperCase }}</div>
        <div
          v-show="postNavs[2].show"
          class="item btn post"
          @click="$router.push(postNavs[2].route)"
        >{{ text(postNavs[2].name) | upperCase }}</div>
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

    <md-dialog class="md-dialog" :md-active.sync="showDialog">
      <md-dialog-title class="title">Upload the Post.</md-dialog-title>

      <md-field>
        <label>Post your images</label>
        <md-file v-model="uploadImg.name" @selected="onFileUpload($event)" accept="image/*"/>
      </md-field>

      <md-dialog-actions>
        <md-button class="md-primary" @click="showDialog = false">Close</md-button>
        <md-button class="md-primary" @click.native="upload()">Save</md-button>
      </md-dialog-actions>
    </md-dialog>

    <md-dialog-alert :md-active.sync="showAlert" md-title="Please Login to upload."/>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import { mixins } from "@/mixins/mixins"

export default {
  computed: {
    ...mapGetters(["text", "isLogined"]),
    postNavs() {
      return [
        { name: "search", route: { name: "search" }, show: true },
        { name: "upload", route: { name: "upload" }, show: true },
        { name: "collections", route: { name: "collections" }, show: true }
      ]
    },
    userNavs() {
      return [
        { name: "login", route: { name: "login" }, show: !this.isLogined },
        { name: "signup", route: { name: "signup" }, show: !this.isLogined },
        { name: "logout", route: { name: "logout" }, show: this.isLogined },
        { name: "profile", route: { name: "profile" }, show: this.isLogined }
      ]
    }
  },
  data: () => ({
    uploadImg: {name: ''},
    showDialog: false,
    showAlert: false,
    language: { name: "language" }
  }),
  methods: {
    onFileupload(evt) {
      this.uploadImg = evt[0]
    },
    showA() {
      this.showAlert = true
      setTimeout(() => {
        this.showAlert = false
      }, 1500)
    },
    showD() {
      if (!this.$store.state.userInfo.isLogined) {
        this.showA()
        this.$router.push({ name: "login" })
        return
      }
      this.showDialog = true
    },
    upload() {
      // TODO: Send to server and clear variable.
      this.showDialog = false
    },
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

.md-dialog {
  width: 70%;
  max-width: 800px;
  max-height: 500px;
  padding: 20px;
}
.md-dialog .title {
  font-size: 2rem;
}
</style>
