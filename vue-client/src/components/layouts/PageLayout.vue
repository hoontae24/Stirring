<template>
  <Appbar v-if="!hideAppbar" :hide-menu="hideAppbarMenu" />
  <Container component="main" :style="$attrs.style">
    <slot></slot>
  </Container>
</template>

<script>
import Appbar from '@/components/layouts/Appbar';
import Container from '@/components/layouts/Container';

export default {
  name: 'PageLayout',
  components: {
    Appbar,
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
