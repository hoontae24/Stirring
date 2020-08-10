<template>
  <VueLink class="nav-link" color="text-regular" :href="nav.path">
    {{ nav.label }}
  </VueLink>
</template>

<script>
export default {
  name: 'NavLink',
  props: ['nav'],
};
</script>

<style scoped lang="scss">
.nav-link {
  font-weight: 500;
  padding: #{$spacing * 0.5}px;
  margin: #{$spacing * 0.5}px;
}
</style>
