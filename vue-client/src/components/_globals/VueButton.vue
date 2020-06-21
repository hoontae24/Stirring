<template>
  <VueLink v-if="routeTo" :href="routeTo.path">
    <button
      class="vue-button"
      :class="classes"
      v-bind="{ ...$attrs, disabled }"
    >
      <slot></slot>
    </button>
  </VueLink>
  <button
    v-else
    class="vue-button"
    :class="classes"
    v-bind="{ ...$attrs, disabled }"
  >
    <slot></slot>
  </button>
</template>

<script>
import { computed } from 'vue';
export default {
  name: 'VueButton',
  props: {
    fullWidth: { type: Boolean, default: false },
    type: { type: String, default: 'default' },
    disabled: { type: Boolean, default: false },
    to: { type: [String, Object] },
  },
  setup(props, { attrs }) {
    const classes = computed(() => [
      `vue-button-${props.type}`,
      {
        'full-width': props.fullWidth,
        disabled: props.disabled,
      },
    ]);

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
  outline: none;

  &:not(.disabled) {
    cursor: pointer;
  }

  &.vue-button-default {
    border-color: #{$border-color-dark};
    background-color: #{$background-white};
    color: #{$text-regular};

    &:hover:not(.disabled) {
      color: #{$primary};
      background-color: #{$primary-clear};
      border-color: #{$primary-light};
    }

    &:active:not(.disabled) {
      border-color: #{$primary-dark};
      color: #{$primary-dark};
    }
  }

  &.vue-button-primary {
    border-color: #{$primary};
    background-color: #{$primary};
    color: white;

    &:hover:not(.disabled) {
      filter: brightness(1.075);
    }
    &:active:not(.disabled) {
      filter: brightness(0.925);
    }

    &.disabled {
      border-color: #{$primary-light};
      background-color: #{$primary-light};
    }
  }
}

.full-width {
  display: flex;
  width: 100%;
}
</style>
