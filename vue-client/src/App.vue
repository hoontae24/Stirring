<template>
  <div id="app-top-target"></div>
  <ToolBox />
  <router-view></router-view>
</template>

<script>
import ToolBox from '@/components/ToolBox';
export default {
  name: 'App',
  components: {
    ToolBox,
  },
};
</script>

<style lang="scss">
// NOTE: TODO: sass-loader로 prependData import 할 때, body만 적용되지 않는 문제... 임시 대응
@import '@/scss/globals/_app';

#app-top-target {
  position: absolute;
  width: 0;
  height: 0;
}
</style>
