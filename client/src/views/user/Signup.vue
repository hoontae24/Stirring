<template>
  <div class="signup">
    <div class="container">
      <div class="item" style="font-size: 3rem; text-align: center;">
        <span>{{text('SIGNUP')}}</span>
      </div>
      <div class="space" style="height: 20px"></div>
      <div class="item" style="text-align: center; color: green; font-size: 1.5rem;">
        <span>{{ success }}</span>
      </div>
      <div class="item" style="text-align: center; color: red; font-size: 1rem;">
        <span>{{ error }}</span>
      </div>
      <md-field class="item" md-clearable>
        <label class="label">{{ text('name') }}</label>
        <md-input v-model="name.value"></md-input>
        <span
          class="md-helper-text helper"
          v-if="name.helper"
          style="color: green;"
        >{{ name.helper }}</span>
        <span class="md-helper-text error" v-if="name.error" style="color: red;">{{ name.error }}</span>
      </md-field>
      <div class="space" style="height: 20px"></div>
      <md-field class="item" md-clearable>
        <label class="label">{{ text('EMAIL') }}</label>
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
        <label class="label">{{ text('PASSWORD') }}</label>
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
      <div class="space" style="height: 20px"></div>
      <md-field class="item">
        <label class="label">{{ text('PASSWORD_Confirm') }}</label>
        <md-input v-model="password.confirm" type="password" @keyup.enter="signup"></md-input>
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
        @click="signup"
      >
        <span>{{ text('Signup') }}</span>
      </md-button>
      <div class="oauth">
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
import service from "@/services/UserService"
import { mixins } from "@/mixins/mixins"
import { mapGetters } from "vuex"

export default {
  computed: {
    ...mapGetters(["text"])
  },
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
        confirm: null,
        helper: null,
        error: null,
        valid: false
      },
      name: {
        value: "",
        helper: null,
        error: null,
        valid: false
      },
      error: null,
      success: null
    }
  },
  methods: {
    async signup() {
      if (
        this.email.value.length === 0 ||
        this.password.value.length === 0 ||
        this.name.value.length === 0
      ) {
        this.error = this.text("loginerror")
        return
      }
      if (!this.email.valid || !this.password.valid || !this.name.valid) {
        this.error = "Please enter the user data CORRECTLY"
        return
      } else {
        this.error = null
      }
      const res = await service.signup({
        name: this.name.value,
        email: this.email.value,
        password: this.password.value
      })
      if (res.data.success) {
        this.success = "Signed up successfully."
        setTimeout(() => {
          this.$router.push({ name: "home" })
        }, 2000)
      }
    }
  },
  watch: {
    "name.value": function() {
      this.validateName(this.name)
    },
    "email.value": function() {
      this.validateEmail(this.email)
    },
    "password.value": function() {
      this.validatePassword(this.password)
    },
    "password.confirm": function() {
      this.validatePassword(this.password)
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
.btn:hover,
.btn:active {
  cursor: pointer;
  font-weight: 400;
}
.signup img {
  margin-bottom: 20px;
  width: 400px;
  align-self: center;
}
.signup .title {
  font-size: 2rem;
  text-align: center;
}
.signup .item {
  margin: 10px;
}
.item .label {
  color: darkgrey;
}
.signup .btn {
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
</style>

