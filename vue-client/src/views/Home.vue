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
    {{ value }}
  </PageLayout>
</template>

<script>
import PageLayout from '@/components/layouts/PageLayout';
import { reactive } from 'vue';

export default {
  name: 'PageHome',
  components: {
    PageLayout,
  },
  setup() {
    const value = reactive('');
    console.log(value)
    return { value };
  },
};
</script>

<style scoped></style>
