<template>
  <div class="forget">
    <div class="container">
      <div class="item title">
        <span>{{ 'Forget your password?' }}</span>
      </div>
      <md-field class="item" md-clearable>
        <label class="label">{{ 'Email' }}</label>
        <md-input v-model="email" type="email" @keyup.enter="send"></md-input>
        <span class="md-helper-text error" v-if="error" style="color: red;">{{ error }}</span>
      </md-field>
      <md-button
        class="item btn md-raised"
        style="background-color: black; color:white;"
        @click="send"
      >
        <span>{{ 'Send' }}</span>
      </md-button>
      <div class="item guide">
        <span>{{guide}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from "@/services/UserService"
import { EventBus } from "@/mixins/EventBus"

export default {
  data() {
    return {
      email: "",
      error: "",
      guide: "Send Link for new password on your email"
    }
  },
  methods: {
    async send() {
      if (!this.email.length) this.error = "Enter your email address"
      if (this.email.length) this.error = ""
      const res = await UserService.checkEmail(this.email)
      if (!res.data.success) {
        this.error = res.data.message
        return
      }
      this.guide = "Check your email, You can reset password through link."
      EventBus.$emit("showMessage", "Go to the main page", 2000, () => {
        this.$router.push({ name: "home" })
      })
    }
  }
}
</script>

<style scoped>
.container {
  margin-top: 30px;
  margin-left: auto;
  margin-right: auto;
  padding: 50px;
  width: 600px;
  border: 1px solid black;

  display: flex;
  flex-direction: column;
  align-items: center;
}
.container .item {
  width: 80%;
  margin: 20px;
}
.container .title {
  font-size: 1.5rem;
  text-align: center;
}
.container .guide {
  color: cornflowerblue;
  margin-top: 0px;
  margin-bottom: 0px;
}

@media screen and (max-width: 800px) {
  .container {
    width: 95%;
    margin-top: 10px;
    padding: 20px;
  }
  .container .item {
    font-size: 1rem;
  }
  .container .title {
    font-size: 1.5rem;
    text-align: center;
  }
}
</style>