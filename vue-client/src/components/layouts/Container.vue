<template>
  <keep-alive>
    <component :is="component" class="container" :style="passedStyle">
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
    const passedStyle = {
      margin: '0 10%',
      maxWidth: '1440px',
      ...props.style,
    };

    return {
      passedStyle,
    };
  },
};
</script>

<style scoped lang="scss">
//
</style>
