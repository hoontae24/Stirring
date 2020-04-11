<template>
  <router-link class="vue-link" :class="color" :to="href">
    {{ value }}
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  name: 'VueLink',
  props: {
    href: { type: String, default: '#' },
    color: { type: String, default: 'text-primary' },
    value: String,
  },
  setup(props, ctx) {
    // console.log(props, ctx);
  },
};
</script>

<style scoped lang="scss">
.vue-link {
  text-decoration: none;
  color: inherit;

  &:hover {
    color: #{$primary};
  }
}

.text-primary {
  color: #{$text-primary};
}
.text-regular {
  color: #{$text-regular};
}
.text-secondary {
  color: #{$text-secondary};
}
.primary {
  color: #{$primary};
}
.success {
  color: #{$success};
}
.warning {
  color: #{$warning};
}
.danger {
  color: #{$danger};
}
.info {
  color: #{$info};
}
</style>
