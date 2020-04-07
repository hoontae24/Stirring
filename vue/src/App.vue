<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'app',
};
</script>

<style lang="scss">
// NOTE: TODO: sass-loader로 prependData import 할 때, body만 적용되지 않는 문제... 임시 대응
@import '@/scss/globals/_app';
</style>
