<template>
  <PageLayout hide-appbar-menu style="height: 5000px;">
    <div class="card-root">
      <div class="card-header">
        로그인
      </div>
      <div class="field">
        <VueInput
          class="input"
          label="email"
          placeholder="EMAIL"
          v-model="state.email"
        />
      </div>
      <div class="field">
        <VueInput
          class="input"
          type="password"
          label="password"
          placeholder="PASSWORD"
          v-model="state.password"
        />
      </div>
      <VueDivider class="divider"></VueDivider>
      <div class="action">
        <VueButton
          class="action-btn _block"
          full-width
          type="primary"
          @click="handleSubmit"
        >
          로그인하기
        </VueButton>
        <VueButton class="action-btn _block" full-width @click="handleSignup">
          가입하기
        </VueButton>
      </div>
      <div class="links _flex">
        <div class="_grow"></div>
        <vue-link class="link-item" color="text-regular" href="#">
          비밀번호 찾기
        </vue-link>
      </div>
    </div>
  </PageLayout>
</template>

<script>
import PageLayout from '@/components/layouts/PageLayout';
import { reactive, ref } from 'vue';

export default {
  name: 'PageLogin',
  components: {
    PageLayout,
  },
  setup() {
    const state = reactive({
      email: 'email',
      password: '',
    });

    const handleSubmit = () => console.log(state);

    return {
      state,
      handleSubmit,
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
