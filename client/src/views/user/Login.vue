<template>
  <div class="login">
    <div class="container">
      <img class="btn" alt="Vue logo" src="@/assets/logo.png" @click="linkTo('home')">
      <div class="space1"></div>
      <md-field class="item">
        <label>EMAIL</label>
        <md-input v-model="email"></md-input>
        <!-- <span class="md-helper-text">Helper text</span> -->
      </md-field>
      <md-field class="item">
        <label>PASSWORD</label>
        <md-input v-model="password"></md-input>
        <!-- <span class="md-helper-text">Helper text</span> -->
      </md-field>
      <div class="space2"></div>
      <md-button class="item btn md-raised" @click="login">
        <span>Login</span>
      </md-button>
      <md-button class="item btn md-raised">
        <span>Signup</span>
      </md-button>
    </div>
  </div>
</template>

<script>
import { routes } from "@/mixins/routes"
import service from "@/services/AuthenticationService"

export default {
  name: "login",
  component: {},
  data() {
    return {
      email: null,
      password: null
    }
  },
  methods: {
    async login() {
      const response = await service.login({
        email: this.email,
        password: this.password
      })
    }
  },
  mixins: [routes]
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
.btn:hover,
.btn:active {
  cursor: pointer;
  font-weight: 400;
}
.login img {
  margin-bottom: 20px;
  width: 400px;
  align-self: center;
}
.login .title {
  font-size: 2rem;
  text-align: center;
}
.login .item {
  margin: 10px;
}
.login .btn {
  font-size: 1.5rem;
}
.space1 {
  height: 50px;
}
.space2 {
  height: 30px;
}

@media screen {
}
</style>

