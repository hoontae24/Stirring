<template>
  <router-link class="vue-link" :to="href">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  name: 'vue-link',
  props: {
    href: { type: String, default: '#' },
  },
};
</script>

<style scoped lang="scss">
.vue-link {
  text-decoration: none;
  color: #{$text-primary};

  &:hover {
    color: #{$primary};
  }
}
</style>
