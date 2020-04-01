<template>
  <div class="page-layout">
    <appbar v-if="!hideAppbar" :hide-menu="hideAppbarMenu" />
    <container component="main">
      <slot />
    </container>
    <backtop />
  </div>
</template>

<script>
import Appbar from '@/components/layouts/Appbar';
import Backtop from '@/components/layouts/Backtop';
import Container from '@/components/layouts/Container';

export default {
  name: 'page-layout',
  components: {
    Appbar,
    Backtop,
    Container,
  },
  props: {
    'hide-appbar': Boolean,
    'hide-appbar-menu': Boolean,
  },
};
</script>

<style scoped lang="scss">
//
</style>
