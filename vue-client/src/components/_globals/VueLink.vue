<template>
  <router-link
    class="vue-link"
    :class="[`color-${color}`, `size-${size}`]"
    v-bind="$attrs"
    :to="href"
  >
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  name: 'VueLink',
  props: {
    href: { type: String, default: '#' },
    color: { type: String, default: 'info' },
    size: { type: String, default: 'default' },
    disabled: { type: Boolean, default: false },
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

  &.size {
    &-default {
      font-size: initial;
    }
    &-large {
      font-size: large;
    }
    &-small {
      font-size: small;
    }
    &-smaller {
      font-size: smaller;
    }
  }
}

.color {
  &-text-primary {
    color: #{$text-primary};
  }
  &-text-regular {
    color: #{$text-regular};
  }
  &-text-secondary {
    color: #{$text-secondary};
  }
  &-primary {
    color: #{$primary};
  }
  &-success {
    color: #{$success};
  }
  &-warning {
    color: #{$warning};
  }
  &-danger {
    color: #{$danger};
  }
  &-info {
    color: #{$info};
  }
}
</style>
