<template>
  <div class="login">
    <div class="container">
      <div class="item" style="font-size: 3rem; text-align: center;">
        <span>{{ text('Login') }}</span>
      </div>
      <div class="space" style="height: 20px"></div>
      <div class="item" style="text-align: center; color: red; font-size: 1rem;">
        <span>{{ error }}</span>
      </div>
      <md-field class="item" md-clearable>
        <label class="label">{{ text('email') }}</label>
        <md-input v-model="email.value" type="email"></md-input>
        <span
          class="md-helper-text helper"
          v-if="email.helper"
          style="color: green;"
        >{{ email.helper }}</span>
        <span class="md-helper-text error" v-if="email.error" style="color: red;">{{ email.error }}</span>
      </md-field>
      <div class="space" style="height: 20px"></div>
      <md-field class="item">
        <label class="label">{{ text('password') }}</label>
        <md-input v-model="password.value" type="password"></md-input>
        <span
          class="md-helper-text helper"
          v-if="password.helper"
          style="color: green;"
        >{{ password.helper }}</span>
        <span
          class="md-helper-text error"
          v-if="password.error"
          style="color: red;"
        >{{ password.error }}</span>
      </md-field>
      <div class="space" style="height: 40px"></div>
      <md-button
        class="item btn md-raised"
        style="background-color: black; color:white;"
        @click="login"
      >
        <span>{{ text('login') }}</span>
      </md-button>
      <md-button class="item btn md-raised" @click="$router.push({name: 'signup'})">
        <span>{{ text('signup') }}</span>
      </md-button>
      <div class="oauth item">
        <md-button class="md-raised item">
          <span>with Google</span>
        </md-button>
        <md-button class="md-raised item">
          <span>with Facebook</span>
        </md-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mixins } from "@/mixins/validations"
import service from "@/services/AuthService"
import { mapGetters, mapActions } from "vuex"

export default {
  name: "login",
  props: ["required"],
  component: {},
  data() {
    return {
      email: {
        value: "",
        helper: null,
        error: null,
        valid: false
      },
      password: {
        value: "",
        helper: null,
        error: null,
        valid: false
      },
      error: null
    }
  },
  computed: {
    ...mapGetters(["text"])
  },
  methods: {
    ...mapActions({ vLogin: "login" }),
    async login() {
      if (this.email.value.length === 0 || this.password.value.length === 0) {
        this.error = this.text("Loginerror")
        return
      }
      const res = await service.login({
        email: this.email.value,
        password: this.password.value
      })
      if (res.data.success) {
        this.error = null
        this.vLogin(res.data)
        this.$router.go(-1)
      }
      this.error = res.data.message
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
  /* align-items: center; */
}
/* .btn:active, */
.btn:hover {
  cursor: pointer;
  font-weight: 400;
}
.login .title {
  font-size: 2rem;
  text-align: center;
}
.login .item {
  margin: 10px;
}
.item .label {
  color: darkgrey;
}
.login .btn {
  font-size: 1.5rem;
}
.oauth {
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  margin: 0;
}
.oauth > .item {
  flex-grow: 1;
}

@media screen and (max-width: 800px) {
  .container {
    width: 95%;
    padding: 20px;
  }
  .login .item {
    width: 95%;
    margin: 10px auto;
    padding: 10px 0;
  }
  .login .btn {
    font-size: 1rem;
  }
}
</style>

