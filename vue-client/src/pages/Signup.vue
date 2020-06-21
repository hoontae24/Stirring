<template>
  <PageLayout>
    <div class="card-root">
      <div class="card-header">
        계정 생성
      </div>
      <VueDivider class="divider" />
      <div class="field">
        <VueInput
          required
          full-width
          label="NAME"
          v-model="form.name"
          :helperText="error.name"
          :error="Boolean(error.name)"
        />
      </div>
      <div class="field">
        <VueInput
          required
          full-width
          type="email"
          label="EMAIL "
          v-model="form.email"
          :helperText="error.email"
          :error="Boolean(error.email)"
        />
      </div>
      <div class="field">
        <VueInput
          required
          full-width
          autocomplete="new-password"
          type="password"
          label="PASSWORD "
          v-model="form.password"
          :helperText="error.password"
          :error="Boolean(error.password)"
        />
      </div>
      <div class="field">
        <VueInput
          required
          full-width
          autocomplete="confirm-password"
          type="password"
          label="CONFIRM PASSWORD "
          v-model="form.confirmPassword"
          :helperText="error.confirmPassword"
          :error="Boolean(error.confirmPassword)"
        />
      </div>
      <VueDivider class="divider" />
      <div class="action">
        <VueButton
          full-width
          type="primary"
          :disabled="
            Boolean(
              !form.name ||
                !form.email ||
                !form.password ||
                !form.confirmPassword ||
                error.name ||
                error.email ||
                error.password ||
                error.confirmPassword,
            )
          "
          @click="submit"
        >
          가입하기
        </VueButton>
      </div>
    </div>
  </PageLayout>
</template>

<script>
import { reactive, computed } from 'vue';

import PageLayout from '@/components/layouts/PageLayout';
import authService from '@/services/auth';
import { useUtilStore } from '@/stores/util';

import {
  validateName,
  validateEmail,
  validatePassword,
} from '@/utils/account';

export default {
  name: 'PageSignup',
  components: {
    PageLayout,
  },
  props: {
    step: { type: String },
  },
  setup(props) {
    const utilStore = useUtilStore();
    const form = reactive({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
    const error = reactive({
      name: computed(() => form.name && validateName(form.name)),
      email: computed(() => form.email && validateEmail(form.email)),
      password: computed(
        () => form.password && validatePassword(form.password),
      ),
      confirmPassword: computed(
        () =>
          form.confirmPassword &&
          (form.password !== form.confirmPassword
            ? '비밀번호가 일치하지 않습니다.'
            : validatePassword(form.confirmPassword)),
      ),
    });

    const submit = async () => {
      //
      // error.email = validateEmail(form.email);
      const { message } = await authService.register(form);

      if (message) {
        utilStore.alert(message);
        return;
      }
      utilStore.alert('가입이 완료되었습니다.')
    };

    return {
      form,
      error,
      submit,
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
    margin: #{$spacing * 2}px 0px;
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
