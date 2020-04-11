<template>
  <keep-alive>
    <component :is="component" class="container" :style="style">
      <slot />
    </component>
  </keep-alive>
</template>

<script>
export default {
  name: 'Container',
  props: {
    component: {
      type: [Object, String],
      default: 'div',
    },
    style: [Object, String],
  },
  setup(props) {
    const style = {
      margin: '0 10%',
      maxWidth: '1440px',
      ...props.style,
    };

    return {
      style,
    };
  },
};
</script>

<style scoped lang="scss">
//
</style>
