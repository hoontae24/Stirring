<template>
  <page-layout>
    {{ state.title }}
    <div style="height:2000px; border: 1px solid red;">1</div>
  </page-layout>
</template>

<script>
import { reactive } from 'vue';

import PageLayout from '@/components/layouts/PageLayout';

export default {
  name: 'page-home',
  components: {
    PageLayout,
  },
  setup() {
    const state = reactive({
      title: 'Stirring',
    });
    return {
      state,
    };
  },
};
</script>

<style scoped></style>
