<template>
  <div class="backtop" :class="{ show: state.show }" @click="handleClick">
    TOP
  </div>
</template>

<script>
import { reactive, onMounted, onBeforeUnmount } from 'vue';

export default {
  name: 'Backtop',
  setup(props, { emit }) {
    const state = reactive({
      show: false,
    });

    // const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    const scrollToTop = () => {
      const target = document.querySelector('#app-top-target');
      target && target.scrollIntoView();
    };
    const handleScroll = () => (state.show = window.scrollY > 80);
    const handleClick = e => {
      scrollToTop();
      emit('click', e);
    };

    onMounted(() => {
      if (typeof window !== 'undefined') {
        window.addEventListener('scroll', handleScroll);
      }
    });
    onBeforeUnmount(() => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('scroll', handleScroll);
      }
    });

    return {
      state,
      handleClick,
    };
  },
};
</script>

<style scoped lang="scss">
.backtop {
  position: fixed;
  right: 40px;
  bottom: 40px;
  visibility: hidden;
}

.show {
  visibility: visible;
}
</style>
