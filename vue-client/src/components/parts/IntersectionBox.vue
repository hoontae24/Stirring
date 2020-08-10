<template>
  <div class="root" ref="target">
    <slot :intersected="state.intersected" />
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue';
export default {
  name: 'IntersectionBox',
  setup() {
    const target = ref();
    const state = reactive({ intersected: false });

    const observer = new IntersectionObserver(
      (entries) =>
        (state.intersected = entries.some(
          (entry) => entry.isIntersecting,
        )),
      { threshold: 0, rootMargin: '100%' },
    );

    onMounted(() => observer.observe(target.value));

    return {
      target,
      state,
    };
  },
};
</script>

<style scoped lang="scss">
.root {
  //
}
</style>
