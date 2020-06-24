<template>
  <div class="root" :style="{ width: `${fontSize}px` }">
    <div class="pad"></div>
    <div class="wrapper">
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
  position: relative;
  display: block;
}

.pad {
  padding-bottom: 100%;
}

.wrapper {
  @include absolute;
  @include flex();
}

.dot {
  flex-grow: 1;
  margin: 5%;

  .pad {
    background-color: $primary;
    border-radius: 50%;
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
