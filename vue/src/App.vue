<template>
  <Layout class="app">
    <router-view></router-view>
  </Layout>
</template>

<script>
import Layout from '@/components/layouts/Layout';

export default {
  name: 'app',
  components: {
    Layout,
  },
};
</script>
