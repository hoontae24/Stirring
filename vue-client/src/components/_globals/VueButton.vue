<template>
  <VueLink v-if="routeTo" :href="routeTo.path">
    <button class="vue-button" :class="classes" v-bind="$attrs">
      <slot></slot>
    </button>
  </VueLink>
  <button v-else class="vue-button" :class="classes" v-bind="$attrs">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'VueButton',
  props: {
    fullWidth: Boolean,
    type: { type: String, default: 'default' },
    to: { type: [String, Object] },
  },
  setup(props) {
    const classes = [
      `vue-button-${props.type}`,
      {
        'full-width': props.fullWidth,
      },
    ];

    const routeTo =
      typeof props.to === 'string'
        ? { path: props.to }
        : typeof props.to === 'object'
        ? props.to
        : null;

    return { classes, routeTo };
  },
};
</script>

<style scoped lang="scss">
.vue-button {
  padding: #{$spacing * 1.5}px #{$spacing * 2.5}px;
  display: inline-flex;
  justify-content: center;
  border-style: solid;
  border-width: 1px;
  border-radius: 4px;
  cursor: pointer;
  outline: none;

  &.vue-button-default {
    border-color: #{$border-dark};
    background-color: #{$background-white};
    color: #{$text-regular};

    &:hover {
      color: #{$primary};
      background-color: #{$primary-clear};
      border-color: #{$primary-light};
    }

    &:active {
      border-color: #{$primary-dark};
      color: #{$primary-dark};
    }
  }

  &.vue-button-primary {
    border-color: #{$primary};
    background-color: #{$primary};
    color: white;

    &:hover {
      filter: brightness(1.075);
    }
    &:active {
      filter: brightness(0.925);
    }
  }
}

.full-width {
  display: flex;
  width: 100%;
}
</style>
