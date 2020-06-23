<template>
  <div
    class="dropzone-box"
    @dragstart.prevent.stop="setDragOver(true)"
    @dragover.prevent.stop="setDragOver(true)"
    @dragend.prevent.stop="setDragOver(false)"
    @dragleave.prevent.stop="setDragOver(false)"
    @drop.prevent.stop="handleDrop"
    @click="(!disabled || !disableClick) && inputRef.click()"
  >
    <slot :drag-over="dragOver" />
    <input
      hidden
      type="file"
      :accept="accept"
      ref="inputRef"
      :multiple="multiple"
      @change="handleChange"
    />
  </div>
</template>

<script>
import lodash from 'lodash';
import { reactive, computed, ref } from 'vue';

export default {
  name: 'Dropzone',
  props: {
    disabled: Boolean,
    disableClick: Boolean,
    multiple: Boolean,
    accept: { type: String, default: 'image/*' },
  },
  inheritAttrs: false,
  setup({ disabled, multiple }, { emit }) {
    const inputRef = ref();
    const state = reactive({ dragOver: false });

    const setDragOver = (hovered) => {
      if (disabled) return;
      state.dragOver = hovered;
    };

    const pushFiles = (_files) => {
      const files = lodash.values(_files);
      emit('change', multiple ? files : files.slice(0, 1));
    };

    const handleDrop = (e) => {
      setDragOver(false);
      if (disabled) return;
      pushFiles(e.dataTransfer.files);
    };

    const handleChange = (e) => {
      setDragOver(false);
      if (disabled) return;
      pushFiles(e.target.files);
    };

    return {
      inputRef,
      dragOver: computed(() => state.dragOver),
      setDragOver,
      handleDrop,
      handleChange,
    };
  },
};
</script>

<style scoped lang="scss">
.dropzone-box {
  position: relative;
}
</style>
