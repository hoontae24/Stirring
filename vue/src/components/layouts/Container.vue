<template>
  <component :is="component" class="container" :style="containerStyle">
    <slot />
  </component>
</template>

<script>
export default {
  name: 'container',
  props: {
    component: {
      type: [Object, String],
      default: 'div',
    },
  },
  computed: {
    containerStyle() {
      return {
        margin: '0 10%',
        maxWidth: '1440px',
      };
    },
  },
};
</script>

<style scoped lang="scss">
//
</style>
