<template>
  <page-layout class="root page-login" hide-appbar-menu>
    <el-card class="box-card card-root">
      <div slot="header" class="card-header">
        로그인
      </div>
      <div class="field">
        <vue-input
          class="input"
          label="email"
          :placeholder="'email' | toUpperCase"
          v-model="email"
        />
      </div>
      <div class="field">
        <vue-input
          class="input"
          type="password"
          label="password"
          :placeholder="'password' | toUpperCase"
          v-model="password"
        />
      </div>
      <el-divider class="divider"></el-divider>
      <div class="action">
        <vue-button
          class="action-btn _block"
          full-width
          type="primary"
          @click="handleSubmit"
        >
          로그인하기
        </vue-button>
        <vue-button class="action-btn _block" full-width @click="handleSignup">
          가입하기
        </vue-button>
      </div>
      <div class="links _flex">
        <div class="_grow"></div>
        <vue-link class="link-item" color="text-secondary" href="#">
          비밀번호 찾기
        </vue-link>
      </div>
    </el-card>
  </page-layout>
</template>

<script>
import PageLayout from '@/components/layouts/PageLayout';

export default {
  name: 'page-login',
  components: {
    PageLayout,
  },
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    handleSubmit() {
      const { email, password } = this;
      console.log(email, password);
    },
    handleSignup() {
      //
    },
  },
};
</script>

<style scoped lang="scss">
.root.page-login {
  .card-root {
    width: 80%;
    max-width: 500px;
    margin: auto;
    margin-top: 10vh;

    .card-header {
      font-size: xx-large;
      text-align: center;
    }

    .field {
      margin: #{$spacing * 3}px 0px;
    }

    .link-item {
      font-size: small;
    }

    .action {
      .action-btn {
        margin: #{$spacing * 1}px 0px;
      }
    }

    .divider {
      margin-bottom: #{$spacing * 3}px;
    }
  }
}
</style>
