<template>
  <div class="delete-account">
    <div class="container">
      <div class="item title">
        <span>{{ 'Delete Account' }}</span>
      </div>
      <div class="item" style="text-align: center; color: red; font-size: 1rem;">
        <span>{{ error }}</span>
      </div>
      <md-field class="item" md-clearable>
        <label class="label">{{ 'Email' }}</label>
        <md-input v-model="email.value" type="email" @keyup.enter="$refs.password.$el.focus()"></md-input>
        <span
          class="md-helper-text helper"
          v-if="email.helper"
          style="color: green;"
        >{{ email.helper }}</span>
        <span class="md-helper-text error" v-if="email.error" style="color: red;">{{ email.error }}</span>
      </md-field>
      <md-field class="item">
        <label class="label">{{ 'Password' }}</label>
        <md-input
          v-model="newPassword.value"
          type="password"
          ref="password"
          @keyup.enter="$refs.passwordConfirm.$el.focus()"
        ></md-input>
        <span
          class="md-helper-text helper"
          v-if="newPassword.helper"
          style="color: green;"
        >{{ newPassword.helper }}</span>
        <span
          class="md-helper-text error"
          v-if="newPassword.error"
          style="color: red;"
        >{{ newPassword.error }}</span>
      </md-field>
      <md-field class="item">
        <label class="label">{{ 'Password confrimation' }}</label>
        <md-input
          v-model="newPassword.confirm"
          type="password"
          ref="passwordConfirm"
          @keyup.enter="changePassword"
        ></md-input>
        <span
          class="md-helper-text helper"
          v-if="newPassword.helper"
          style="color: green;"
        >{{ newPassword.helper }}</span>
        <span
          class="md-helper-text error"
          v-if="newPassword.error"
          style="color: red;"
        >{{ newPassword.error }}</span>
      </md-field>
      <md-button
        class="item btn md-raised"
        style="background-color: black; color:white;"
        @click="changePassword"
      >
        <span>{{ 'Change password' }}</span>
      </md-button>
    </div>
  </div>
</template>

<script>
import UserService from "@/services/UserService"
import { mixins } from "@/mixins/validations"
import { EventBus } from "@/mixins/EventBus"
import authGuard from "@/mixins/authGuard"

export default {
  data() {
    return {
      email: {
        value: "",
        helper: null,
        error: null,
        valid: false
      },
      newPassword: {
        value: "",
        confirm: null,
        helper: null,
        error: null,
        valid: false
      },
      error: ""
    }
  },
  methods: {
    async changePassword() {
      if (
        this.email.value.length === 0 ||
        this.newPassword.value.length === 0 ||
        this.newPassword.confirm.length === 0
      ) {
        this.error = "insert the email and passwords"
        return
      }
      if (this.email.value !== this.$store.state.userInfo.user.email) {
        console.log(this.$store.state.userInfo.user.email)
        this.error = "This email is not matched what is logined now"
        return
      } else {
        this.error = null
      }
      const res = await UserService.deleteAccount({
        email: this.email.value,
        password: this.newPassword.value
      })
      if (res.data.success) {
        EventBus.$emit("showMessage", "The Account is deleted")
        this.$router.push({ name: "logout" })
        this.$router.push({ name: "home" })
      } else {
        this.error = res.data.message
      }
    }
  },
  created() {
    authGuard.check()
  },
  watch: {
    "email.value": function() {
      this.validateEmail(this.email)
    },
    "newPassword.value": function() {
      this.validatePassword(this.newPassword)
    },
    "newPassword.confirm": function() {
      this.validatePassword(this.newPassword)
    }
  },
  mixins: [mixins]
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
  font-size: 2rem;
  text-align: center;
}
.item .label {
  color: darkgrey;
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