<template>
  <Appbar v-if="!hideAppbar" :hide-menu="hideAppbarMenu" />
  <Container component="main" :style="$attrs.style">
    <div
      v-if="'suspense' in $attrs && !$attrs.suspense"
      class="suspense"
    >
      <LoadingIcon />
    </div>
    <slot v-else></slot>
  </Container>
</template>

<script>
import Appbar from '@/components/layouts/Appbar';
import Container from '@/components/layouts/Container';
import LoadingIcon from '@/components/parts/LoadingIcon';

export default {
  name: 'PageLayout',
  components: {
    Appbar,
    Container,
    LoadingIcon,
  },
  props: {
    'hide-appbar': Boolean,
    'hide-appbar-menu': Boolean,
  },
};
</script>

<style scoped lang="scss">
.suspense {
  height: calc(100vh - #{$appbar-height}px);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: $spacing * 4px;
}
</style>
