<template>
  <div class="change-password wrapper">
    <div class="container">
      <div class="item title">
        <span>{{ text('changePassword') }}</span>
      </div>
      <div class="item" style="text-align: center; color: red; font-size: 1rem;">
        <span>{{ text(error) }}</span>
      </div>
      <md-field class="item" md-clearable>
        <label class="label">{{ text('currentPassword') }}</label>
        <md-input
          v-model="oldPassword.value"
          type="password"
          @keyup.enter="$refs.password.$el.focus()"
        ></md-input>
        <span
          class="md-helper-text helper"
          v-if="oldPassword.helper"
          style="color: green;"
        >{{ text(oldPassword.helper) }}</span>
        <span
          class="md-helper-text error"
          v-if="oldPassword.error"
          style="color: red;"
        >{{ text(oldPassword.error) }}</span>
      </md-field>
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
        <label class="label">{{text('newPasswordConfirm')}}</label>
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
import authGuard from "@/mixins/authGuard"
import { mapGetters } from "vuex"

export default {
  data() {
    return {
      oldPassword: {
        value: "",
        confirm: "oldPassword",
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
  computed: { ...mapGetters(["text"]) },
  methods: {
    async changePassword() {
      if (
        this.oldPassword.value.length === 0 ||
        this.newPassword.value.length === 0 ||
        this.newPassword.confirm.length === 0
      ) {
        this.error = "insertPassword"
        return
      }
      if (!this.oldPassword.valid || !this.newPassword.valid) {
        this.error = "validError"
        return
      } else {
        this.error = null
      }
      const res = await UserService.changePassword({
        id: this.$store.state.userInfo.user._id,
        oldPassword: this.oldPassword.value,
        newPassword: this.newPassword.value
      })
      if (res.data.success) {
        EventBus.$emit("showMessage", this.text("passwordChanged"))
        this.$router.go(-1)
      } else {
        this.error = res.data.message
      }
    }
  },
  mounted() {
    authGuard.check(this.$route.path)
  },
  watch: {
    "oldPassword.value": function() {
      this.validatePassword(this.oldPassword)
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