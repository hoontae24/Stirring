<template>
  <button class="vue-button" :class="classes" v-bind="$attrs">
    <slot />
  </button>
</template>

<script>
export default {
  name: 'vue-button',
  props: {
    fullWidth: Boolean,
  },
  setup(props) {
    const classes = { 'full-width': props.fullWidth };
    return { classes };
  },
};
</script>

<style scoped lang="scss">
.vue-button {
  padding: #{$spacing * 1.5}px #{$spacing * 2.5}px;
}
.full-width {
  width: 100%;
}
</style>
