<template>
  <div
    class="grid-root"
    :class="classes && classes.root"
    ref="containerRef"
  >
    <div
      v-for="(col, columnIdx) in state.columns"
      :key="columnIdx"
      class="grid-column"
      :class="classes && classes.column"
      :style="{ width: `calc(100% / ${state.columns.length})` }"
    >
      <div
        v-for="(row, rowIdx) in col"
        :key="row"
        class="grid-row"
        :class="classes && classes.row"
      >
        <slot
          :column="columnIdx"
          :row="rowIdx"
          :columnCount="state.columns.length"
          :rowCount="col.length"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {
  ref,
  reactive,
  computed,
  onMounted,
  onBeforeUnmount,
} from 'vue';
import { range } from 'lodash';

const getElementWidth = (el) => {
  if (el) {
    if (el.getClientRects) {
      const rect = (el.getClientRects() || [])[0];
      return rect.width;
    }
    return el.clientWidth;
  }
};

export default {
  name: 'ColumnGrid',
  props: {
    classes: Object,
    itemCount: Number,
  },
  setup(props) {
    // refs
    const containerRef = ref();

    // states
    const state = reactive({
      containerWidth:
        typeof window !== 'undefined' ? window.innerWidth : 1280,
      columns: computed(() => {
        const columnCount =
          state.containerWidth > 1000
            ? 3
            : state.containerWidth > 600
            ? 2
            : 1;
        return range(0, columnCount).map((col) =>
          range(0, props.itemCount / columnCount).map(
            (row) => row * columnCount + col,
          ),
        );
      }),
    });

    // handlers
    const setContainerWidth = (width) => {
      return (state.containerWidth = width);
    };

    const handleResize = () => {
      return setContainerWidth(getElementWidth(containerRef.value));
    };

    // lifecycles
    onMounted(() => {
      setContainerWidth(getElementWidth(containerRef.value));
      window.addEventListener('resize', handleResize);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('resize', handleResize);
    });

    return {
      state,
      containerWidth: state.containerWidth,
      columns: state.columns,
      containerRef,
    };
  },
};
</script>

<style scoped lang="scss">
.grid-root {
  display: flex;
  justify-content: space-evenly;
}
</style>
