<template>
  <div
    class="root"
    :style="{ width: parsedSize, height: parsedSize }"
  >
    <div v-for="i in safeDots" :key="i" class="item">
      <div :class="['pad']">
        <div :class="['dot', 'rising', `rising-${i}`]"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'LoadingIcon',
  props: {
    size: { type: [Number, String], default: 30 },
    dots: {
      type: Number,
      default: 3,
      validator: (value) => value > 0 && value <= 10,
    },
  },
  setup(props) {
    const parsedSize = computed(
      () => props.size + (!isNaN(Number(props.size)) ? 'px' : ''),
    );
    const safeDots = computed(() =>
      Math.min(Math.max(props.dots, 1), 10),
    );

    return { parsedSize, safeDots };
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

.item {
  flex-grow: 1;

  .pad {
    position: relative;
    padding-bottom: 100%;

    .dot {
      @include absolute(15%);
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
      &.rising-4 {
        animation-delay: 400ms;
      }
      &.rising-5 {
        animation-delay: 500ms;
      }
      &.rising-6 {
        animation-delay: 600ms;
      }
      &.rising-7 {
        animation-delay: 700ms;
      }
      &.rising-8 {
        animation-delay: 800ms;
      }
      &.rising-9 {
        animation-delay: 900ms;
      }
      &.rising-10 {
        animation-delay: 1000ms;
      }
    }
  }
}
</style>
