<template>
  <el-button class="vue-button" :class="classes" v-bind="$attrs" v-on="events">
    <slot />
  </el-button>
</template>

<script>
export default {
  name: 'vue-button',
  props: {
    'full-width': Boolean,
  },
  computed: {
    classes() {
      return {
        'full-width': this.fullWidth,
      };
    },
    events() {
      return {
        click: e => this.$emit('click', e),
      };
    },
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
