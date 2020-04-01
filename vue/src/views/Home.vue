<template>
  <page-layout class="page-home">
    {{ title }}
    <el-button>elbutton</el-button>
    <div style="height:2000px; border: 1px solid red;">1</div>
  </page-layout>
</template>

<script>
import PageLayout from '@/components/layouts/PageLayout';

export default {
  name: 'page-home',
  components: {
    PageLayout,
  },
  data() {
    return {
      title: 'Stirring',
    };
  },
};
</script>

<style scoped></style>
