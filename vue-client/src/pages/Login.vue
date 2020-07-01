<template>
  <PageLayout hide-appbar-menu>
    <div class="card-root">
      <div class="card-header">
        로그인
      </div>
      <VueDivider class="divider" />
      <template v-if="!viewer">
        <div class="field">
          <VueInput
            full-width
            name="email"
            label="email"
            placeholder="EMAIL"
            v-model="state.email"
            @keypress="handleKeyPress"
            :inputRef="(el) => (emailRef = el)"
          />
        </div>
        <div class="field">
          <VueInput
            full-width
            name="password"
            type="password"
            label="password"
            placeholder="PASSWORD"
            v-model="state.password"
            @keypress="handleKeyPress"
            :inputRef="(el) => (passwordRef = el)"
          />
        </div>
      </template>
      <span v-if="viewer">
        {{ viewer.name }}님 로그인 되었습니다.
      </span>
      <VueDivider class="divider" />
      <template v-if="!viewer">
        <div class="_flex">
          <div class="_grow"></div>
          <VueLink class="link-item" href="#" size="smaller" disabled>
            비밀번호를 잊으셨나요?
          </VueLink>
        </div>
      </template>
      <div class="action">
        <template v-if="!viewer">
          <VueButton
            class="action-btn _block"
            full-width
            :disabled="Boolean(viewer)"
            type="primary"
            @click="handleSubmit"
          >
            로그인하기
          </VueButton>
          <VueButton
            to="/signup"
            class="action-btn _block"
            full-width
          >
            가입하기
          </VueButton>
        </template>
        <VueButton
          v-else-if="viewer"
          class="action-btn _block"
          full-width
          @click="handleLogout"
        >
          로그아웃
        </VueButton>
      </div>
    </div>
  </PageLayout>
</template>

<script>
import { reactive, ref } from 'vue';

import PageLayout from '@/components/layouts/PageLayout';
import authService from '@/services/auth';
import { useAuthStore } from '@/stores/viewer';
import { useUtilStore } from '@/stores/util';

export default {
  name: 'PageLogin',
  components: {
    PageLayout,
  },
  setup() {
    const utilStore = useUtilStore();
    const authStore = useAuthStore();
    const state = reactive({
      email: 'email',
      password: '',
    });

    const emailRef = ref(null);
    const passwordRef = ref(null);
    const handleSubmit = async () => {
      const { account, message } = await authService.login(
        state.email,
        state.password,
      );
      if (!account && message) {
        utilStore.alert(message);
      }
      if (account) {
        utilStore.alert('로그인 되었습니다.');
        authStore.setViewer(account);
      }
    };

    const handleLogout = () => {
      authStore.logout();
    };

    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        if (e.target === emailRef.value) {
          if (passwordRef.value) {
            passwordRef.value.focus();
          }
        }
        if (e.target === passwordRef.value) {
          handleSubmit();
        }
      }
    };

    return {
      viewer: authStore.getViewer(),
      state,
      emailRef,
      passwordRef,
      handleSubmit,
      handleLogout,
      handleKeyPress,
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
  padding: #{$spacing * 3}px;

  .card-header {
    font-size: xx-large;
    text-align: center;
    margin-bottom: #{$spacing * 3}px;
  }

  .field {
    margin: #{$spacing * 1}px 0px;
  }

  .action {
    &::v-deep(.action-btn) {
      margin: #{$spacing * 1}px 0px;
    }
  }

  &::v-deep(.divider) {
    margin: #{$spacing * 3}px 0px;
  }
}
</style>
