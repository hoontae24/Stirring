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
  data() {
    return {
      msg: 'heelllloo',
    };
  },
};
</script>

<style lang="scss">
html,
body {
  margin: 0px;
  padding: 0px;

  & * {
    box-sizing: border-box;
  }
}
</style>
