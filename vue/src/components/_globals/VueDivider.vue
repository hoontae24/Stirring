<template>
  <div class="vue-divider"></div>
</template>

<script>
export default {
  name: 'vue-divider',
};
</script>

<style scoped lang="scss">
.vue-divider {
  display: block;
  height: 1px;
  background-color: #{$divider};
  position: relative;
}
</style>
