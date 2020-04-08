<template>
  <input
    :class="{ 'full-width': fullWidth }"
    v-bind="{ ...$props, ...$attrs }"
  />
</template>

<script>
export default {
  name: 'vue-input',
  props: {
    clearable: { type: Boolean, default: true },
    fullWidth: { type: Boolean, default: true },
  },
};
</script>

<style scoped lang="scss">
.full-width {
  display: block;
  width: 100%;
}
</style>
