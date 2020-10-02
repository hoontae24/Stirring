<template>
  <i class="vue-icon" :class="[`icon-font-size-${fontSize}`]" />
</template>

<script>
export default {
  name: 'Icon',
  props: {
    fontSize: { type: String, default: 'default' },
  },
};
</script>

<style lang="scss" scoped>
.vue-icon {
  display: inline-block;
  text-align: center;
}
.icon-font-size-default {
  width: 1rem;
  height: 1rem;
  font-size: 1rem;
}
.icon-font-size-medium {
  width: 1.5rem;
  height: 1.5rem;
  font-size: 1.5rem;
}
.icon-font-size-large {
  width: 2rem;
  height: 2rem;
  font-size: 2rem;
}
</style>
