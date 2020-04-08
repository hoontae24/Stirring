<template>
  <vue-link class="nav-link" color="text-regular" :href="nav.path">
    {{ nav.label || toUpperCase }}
  </vue-link>
</template>

<script>
export default {
  name: 'nav-link',
  props: ['nav'],
};
</script>

<style scoped lang="scss">
.nav-link {
  font-size: large;
  padding: #{$spacing * 0.5}px;
  margin: #{$spacing * 0.5}px;
}
</style>
