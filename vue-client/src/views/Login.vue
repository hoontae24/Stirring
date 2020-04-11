<template>
  <PageLayout hide-appbar-menu style="height: 5000px;">
    <div class="card-root">
      <div class="card-header">
        로그인
      </div>
      <!-- <div class="field">
        <vue-input
          class="input"
          label="email"
          placeholder="EMAIL"
          v-model:value="state.email"
          @focus="e => console.log('focus')"
        />
      </div>
      <div class="field">
        <vue-input
          class="input"
          type="password"
          label="password"
          placeholder="PASSWORD"
          v-model:value="state.password"
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
      {{ state.email }}
      <div class="links _flex">
        <div class="_grow"></div>
        <vue-link
          class="link-item"
          color="text-regular"
          href="#"
          :value="state.email"
        >
          비밀번호 찾기
        </vue-link>
      </div> -->
      {{ msg }}
      <input :value="msg" @input="msg = $event.target.value" />
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
  data() {
    return {
      msg: 'hello',
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
