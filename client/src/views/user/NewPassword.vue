<template>
  <div class="new-password wrapper">
    <div class="container">
      <div class="item title">
        <span>{{ text('newPassword') }}</span>
      </div>
      <div class="item" style="text-align: center; color: red; font-size: 1rem;">
        <span>{{ text(error) }}</span>
      </div>
      <md-field class="item">
        <label class="label">{{ text('newPassword') }}</label>
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
        >{{ text(newPassword.helper) }}</span>
        <span
          class="md-helper-text error"
          v-if="newPassword.error"
          style="color: red;"
        >{{ text(newPassword.error) }}</span>
      </md-field>
      <md-field class="item">
        <label class="label">{{ text('newPasswordConfirm') }}</label>
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
        >{{ text(newPassword.helper) }}</span>
        <span
          class="md-helper-text error"
          v-if="newPassword.error"
          style="color: red;"
        >{{ text(newPassword.error) }}</span>
      </md-field>
      <md-button
        class="item btn md-raised"
        style="background-color: black; color:white;"
        @click="changePassword"
      >
        <span>{{ text('changePassword') }}</span>
      </md-button>
    </div>
  </div>
</template>

<script>
import UserService from "@/services/UserService"
import { mixins } from "@/mixins/validations"
import { EventBus } from "@/mixins/EventBus"
import { mapGetters } from "vuex"

export default {
  props: ["token"],
  data() {
    return {
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
  computed: { ...mapGetters(["text"]) },
  methods: {
    async changePassword() {
      if (
        this.newPassword.value.length === 0 ||
        this.newPassword.confirm.length === 0
      ) {
        this.error = "insertPassword"
        return
      }
      if (!this.newPassword.valid) {
        this.error = "validError"
        return
      } else {
        this.error = null
      }
      const res = await UserService.resetPassword({
        newPassword: this.newPassword.value,
        token: this.$route.query.token
      })
      if (res.data.success) {
        EventBus.$emit(
          "showMessage",
          this.text("passwordChanged"),
          2000,
          () => {
            this.$router.push({ name: "login" })
          }
        )
      } else {
        this.error = res.data.message
      }
    }
  },
  created() {},
  watch: {
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