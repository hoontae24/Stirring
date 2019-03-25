<template>
  <div class="login">
    <div class="wrapper">
      <div class="container">
        <div class="item" style="font-size: 3rem; text-align: center;">
          <span>{{ text('login') }}</span>
        </div>
        <div class="item" style="text-align: center; color: red; font-size: 1rem;">
          <span>{{ text(error) }}</span>
        </div>
        <md-field class="item" md-clearable>
          <label class="label">{{ text('email') }}</label>
          <md-input v-model="email.value" type="email" @keyup.enter="$refs.password.$el.focus()"></md-input>
          <span
            class="md-helper-text helper"
            v-if="email.helper"
            style="color: green;"
          >{{ email.helper }}</span>
          <span
            class="md-helper-text error"
            v-if="email.error"
            style="color: red;"
          >{{ email.error }}</span>
        </md-field>
        <div class="space" style="height: 20px"></div>
        <md-field class="item">
          <label class="label">{{ text('password') }}</label>
          <md-input v-model="password.value" type="password" ref="password" @keyup.enter="login"></md-input>
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
        <div class="item forget">
          <span @click="$router.push({name: 'forget'})">{{text('forget')}}</span>
        </div>
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
        <md-button class="md-raised item">
          <span>{{ text('loginGoogle') }}</span>
        </md-button>
        <md-button class="md-raised item">
          <span>{{ text('loginFacebook') }}</span>
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
    ...mapGetters(["text", "isLogined"])
  },
  methods: {
    ...mapActions({ vLogin: "login" }),
    async login() {
      if (this.email.value.length === 0 || this.password.value.length === 0) {
        this.error = "loginError"
        return
      }
      const res = await service.login({
        email: this.email.value,
        password: this.password.value
      })
      if (res.data.success) {
        this.error = null
        if (this.$route.query.from)
          this.$router.push({ path: this.$route.query.from })
        else this.$router.push({ name: "home" })
        this.vLogin(res.data)
        return
      }
      this.error = res.data.message
    }
  },
  watch: {
    // isLogined() {
    //   if (this.$route.query.from)
    //     this.$router.push({ path: this.$route.query.from })
    //   else if (this.$route.query.from.path !== "/login") this.$router.push("/")
    //   else this.$router.go(-1)
    // }
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
  width: 80%;
  margin: 10px auto;
}
.item .label {
  color: darkgrey;
}
.login .forget {
  margin-top: 0;
  color: gray;
  text-decoration: underline;
}
.login .forget span:active,
.login .forget span:hover {
  cursor: pointer;
  color: steelblue;
}
.login .btn {
  font-size: 1.5rem;
}
/* .oauth {
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  margin: 0;
}
.oauth > .item {
  flex-grow: 1;
} */

@media screen and (max-width: 800px) {
  .container {
    width: 95%;
    margin-top: 10px;
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

