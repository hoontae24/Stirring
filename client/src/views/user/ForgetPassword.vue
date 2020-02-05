<template>
  <div class="forget wrapper">
    <div class="container">
      <div class="item title">
        <span>{{ text('forgetYourPassword') }}</span>
      </div>
      <md-field class="item" md-clearable>
        <label class="label">{{ text('email') }}</label>
        <md-input v-model="email" type="email" @keyup.enter="send"></md-input>
        <span class="md-helper-text error" v-if="error" style="color: red;">{{ text(error) }}</span>
      </md-field>
      <md-button
        class="item btn md-raised"
        style="background-color: black; color:white;"
        @click="send"
      >
        <span>{{ text('send') }}</span>
      </md-button>
      <div class="item guide">
        <span>{{ text(guide)}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from "@/services/UserService"
import { EventBus } from "@/mixins/EventBus"
import { mapGetters } from "vuex"

export default {
  data() {
    return {
      email: "",
      error: "",
      guide: "forgetGuide"
    }
  },
  computed: { ...mapGetters(["text"]) },
  methods: {
    async send() {
      if (!this.email.length) this.error = "enterEmail"
      if (this.email.length) this.error = ""
      const res = await UserService.checkEmail(this.email)
      if (!res.data.success) {
        this.error = res.data.message
        return
      }
      this.guide = "forgetGuide2"
      EventBus.$emit("showMessage", this.text("forgetGuide2"), 5000, () => {})
      this.$router.push({ name: "home" })
    }
  }
}
</script>

<style scoped>
.wrapper {
  padding: 20px;
}
.container {
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