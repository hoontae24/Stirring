<template>
  <el-input v-bind="{ ...$props, ...$attrs }" v-on="events">
    <slot />
  </el-input>
</template>

<script>
export default {
  name: 'vue-input',
  props: {
    clearable: { type: Boolean, default: true },
  },
  computed: {
    events() {
      return {
        input: value => this.$emit('input', value),
        blur: e => this.$emit('blur', e),
        focus: e => this.$emit('focus', e),
        change: value => this.$emit('change', value),
        clear: () => this.$emit('focus'),
      };
    },
  },
};
</script>

<style scoped lang="scss">
//
</style>
