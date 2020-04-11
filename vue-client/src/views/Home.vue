<template>
  <PageLayout>
    <button @click="inc">Clicked {{ count }} times.</button>
  </PageLayout>
</template>

<script>
import { reactive, ref } from 'vue';

import PageLayout from '@/components/layouts/PageLayout';

export default {
  name: 'PageHome',
  components: {
    PageLayout,
  },
  setup() {
    const count = ref(0);
    const inc = () => {
      console.log(count.value);
      count.value++;
    };
    return {
      count,
      inc,
    };
  },
};
</script>

<style scoped></style>
