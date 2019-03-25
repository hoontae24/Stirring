<template>
  <div class="user-board">
    <User class="user" v-for="user in users" :key="user._id" :user="user"/>
    <md-button
      class="md-elevation-4"
      style="border: 1px solid lightblue; width: 95%; height: 50px; margin: 20px 2.5% 10px 2.5%;"
      @click="$store.commit('addCount'); loadUsers()"
    >{{text('more')}}</md-button>
  </div>
</template>

<script>
import UserService from "@/services/UserService"
import User from "@/components/User"
import { EventBus } from "@/mixins/EventBus"
import { mapGetters } from "vuex"

export default {
  components: { User },
  props: ["user", "search"],
  data() {
    return {
      users: []
    }
  },
  computed: { ...mapGetters(["text"]) },
  methods: {
    async loadUsers() {
      if (this.user && this.user.followings.length) {
        const res = await UserService.getUser(this.user.followings)
        this.users = this.users.concat(res.data.user)
      } else {
        const res = await UserService.getUserByWord(this.search)
        this.users = this.users.concat(res.data.user)
      }
    }
  },
  created() {
    this.$store.commit("resetCount")
    this.loadUsers()
  },
  watch: {
    user() {
      this.users = []
      this.loadUsers()
    },
    search() {
      this.users = []
      this.loadUsers()
    }
  }
}
</script>

<style scoped>
.user-board {
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  /* justify-content: space-around; */
}
@media screen and (max-width: 800px) {
  .user-board {
    padding: 0px;
  }
}
</style>