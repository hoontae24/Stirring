<template>
  <div class="layout">
    <appbar />
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
  name: 'layout',
  components: {
    Appbar,
    Backtop,
    Container,
  },
};
</script>

<style scoped lang="scss">
.layout-root {
  //
}
</style>
