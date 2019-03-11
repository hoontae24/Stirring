<template>
  <div class="user-board">
    <User class="user" v-for="user in users" :key="user._id" :user="user"/>
  </div>
</template>

<script>
import UserService from "@/services/UserService"
import User from "@/components/User"
import { EventBus } from "@/mixins/EventBus"

export default {
  components: { User },
  props: ["user", "search"],
  data() {
    return {
      users: []
    }
  },
  methods: {
    async loadUsers() {
      this.users = []
      if (this.user && this.user.followings.length) {
        const res = await UserService.getUser(this.user.followings)
        this.users = res.data.user
      } else {
        const res = await UserService.getUserByWord(this.search)
        this.users = res.data.user
      }
    }
  },
  created() {
    this.loadUsers()
  },
  watch: {
    user() {
      this.loadUsers()
    },
    search() {
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
</style>