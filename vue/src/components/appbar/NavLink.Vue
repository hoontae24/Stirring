<template>
  <vue-link class="nav-link" :linkTo="nav.path">
    {{ nav.label }}
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
  font-size: 18px;
}
</style>
