<template>
  <page-layout hide-appbar-menu>
    <div class="card-root">
      <div class="card-header">
        로그인
      </div>
      <div class="field">
        <vue-input
          class="input"
          label="email"
          placeholder="EMAIL"
          v-model:value="loginState.email"
          @focus="e => console.log('focus')"
        />
      </div>
      <div class="field">
        <vue-input
          class="input"
          type="password"
          label="password"
          placeholder="PASSWORD"
          v-model:value="loginState.password"
        />
      </div>
      <vue-divider class="divider"></vue-divider>
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
        <vue-link class="link-item" color="text-regular" href="#">
          비밀번호 찾기
        </vue-link>
      </div>
    </div>
  </page-layout>
</template>

<script>
import PageLayout from '@/components/layouts/PageLayout';
import { reactive } from 'vue';

const useLoginForm = () => {
  const state = reactive({
    email: 'email',
    password: 'password',
  });
  const submit = () => console.log(state.email, state.password);

  return { state, submit };
};

export default {
  name: 'page-login',
  components: {
    PageLayout,
  },
  setup() {
    const { state: loginState, submit: handleSubmit } = useLoginForm();
    const handleSignup = () => console.log('SIGN UP');

    return {
      loginState,
      handleSubmit,
      handleSignup,
      console,
    };
  },
};
</script>

<style scoped lang="scss">
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
    &::v-deep(.action-btn) {
      margin: #{$spacing * 1}px 0px;
    }
  }

  &::v-deep(.divider) {
    margin-bottom: #{$spacing * 3}px;
  }
}
</style>
