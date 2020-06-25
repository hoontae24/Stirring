<template>
  <PageLayout style="text-align: center;">
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
    <input v-model="value.value" />

    {{ value.value }}<br />
    {{ value2 }}<br />
    <LoadingIcon />
  </PageLayout>
</template>

<script>
import { reactive, computed } from 'vue';

import PageLayout from '@/components/layouts/PageLayout';
import LoadingIcon from '@/components/parts/LoadingIcon';

export default {
  name: 'PageHome',
  components: {
    PageLayout,
    LoadingIcon,
  },
  setup() {
    const value = reactive({ value: '' });
    const value2 = computed(() => value.value + '!!');
    return { value, value2 };
  },
};
</script>

<style scoped></style>
