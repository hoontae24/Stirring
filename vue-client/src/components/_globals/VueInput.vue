<template>
  <input
    :class="{ 'full-width': fullWidth }"
    v-bind="{ ...$attrs }"
    :value="value"
    @input="$attrs['onUpdate:value']($event.target.value)"
  />
</template>

<script>
export default {
  name: 'VueInput',
  props: {
    clearable: { type: Boolean, default: true },
    fullWidth: { type: Boolean, default: true },
    value: String,
  },
};
</script>

<style scoped lang="scss">
.full-width {
  display: block;
  width: 100%;
}
</style>
