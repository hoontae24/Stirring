<template>
  <el-input class="" v-bind="{ ...$props, ...$attrs }" @input="input"
    ><slot
  /></el-input>
</template>

<script>
export default {
  name: 'vue-input',
  methods: {
    input(e) {
      return this.$emit('input', e);
    },
  },
};
</script>

<style scoped lang="scss">
//
</style>
