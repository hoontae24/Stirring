<template>
  <PageLayout>
    HOME<br />
    HOME<br />
    HOME<br />
    HOME<br />
    HOME<br />
    HOME<br />
    HOME<br />
    HOME<br />
    HOME<br />
    HOME<br />
    <input v-model="value" />

    {{ value }}<br />
    {{ value2 }}<br />
  </PageLayout>
</template>

<script>
import PageLayout from '@/components/layouts/PageLayout';
import { reactive, computed } from 'vue';

export default {
  name: 'PageHome',
  components: {
    PageLayout,
  },
  setup() {
    const value = reactive({ value: '' });
    const value2 = reactive(computed(() => value + '!!'));
    return { value, value2 };
  },
};
</script>

<style scoped></style>
