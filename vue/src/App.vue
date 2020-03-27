<template>
  <div class="app">
    <Appbar />
    <router-view></router-view>
  </div>
</template>

<script>
import Appbar from '@/components/Appbar';

export default {
  name: 'app',
  components: {
    Appbar,
  },
};
</script>
