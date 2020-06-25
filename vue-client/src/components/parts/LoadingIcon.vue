<template>
  <div
    class="root"
    :style="{
      width: `${fontSize}px`,
      height: `${fontSize}px`,
    }"
  >
    <div class="dot">
      <div class="pad rising rising-1"></div>
    </div>
    <div class="dot">
      <div class="pad rising rising-2"></div>
    </div>
    <div class="dot">
      <div class="pad rising rising-3"></div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, ref, onBeforeUnmount } from 'vue';
export default {
  name: 'LoadingIcon',
  props: {
    fontSize: { type: Number, default: 30 },
  },
  setup() {
    const interval = ref(null);
    const state = reactive({ index: 0 });
    onMounted(() => {
      interval.value = setInterval(() => {
        ++state.index;
        if (state.index > 3) clearInterval(interval.value);
      }, 110);
    });

    onBeforeUnmount(() => {
      clearInterval(interval.value);
    });
    return { state };
  },
};
</script>

<style scoped lang="scss">
.root {
  display: inline-flex;
  align-items: center;
  position: relative;
  z-index: -1;
}

.dot {
  flex-grow: 1;
  margin: 5%;

  .pad {
    position: relative;
    padding-bottom: 100%;
    background-color: $primary;
    border-radius: 50%;
    will-change: transform;
    &.rising {
      animation: rise 300ms alternate infinite;
      @keyframes rise {
        from {
          transform: translateY(20%);
        }
        to {
          transform: translateY(-50%);
        }
      }
    }
    &.rising-1 {
      animation-delay: 100ms;
    }
    &.rising-2 {
      animation-delay: 200ms;
    }
    &.rising-3 {
      animation-delay: 300ms;
    }
  }
}
</style>
