<template>
  <div class="root" :style="{ width: _size, height: _size }">
    <div v-for="i in [1, 2, 3]" :key="i" class="dot">
      <div :class="['pad', 'rising', `rising-${i}`]"></div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'LoadingIcon',
  props: {
    size: { type: [Number, String], default: 30 },
  },
  setup(props) {
    const _size = computed(
      () => props.size + (!isNaN(Number(props.size)) ? 'px' : ''),
    );

    return { _size };
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
