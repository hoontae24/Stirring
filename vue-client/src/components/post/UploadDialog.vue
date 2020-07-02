<template>
  <VueDialog :open="open" @close="handleClose">
    <template v-slot:header>사진 올리기</template>
    <Dropzone
      v-if="!state.previews.length"
      multiple
      :disabled="state.loading"
      @change="(files) => (state.files = state.files.concat(files))"
      v-slot="{ 'drag-over': dragOver }"
    >
      <div class="image" :class="{ 'drag-over': dragOver }">
        IMAGE HERE
      </div>
    </Dropzone>
    <img
      v-for="preview in state.previews"
      :key="preview"
      class="preview"
      :src="preview"
    />
    <template v-slot:footer>
      <VueButton :style="{ float: 'left' }" @click="state.files = []">
        초기화
      </VueButton>
      <VueButton @click="handleClose">취소</VueButton>
      <VueButton type="primary" @click="handleSubmit">확인</VueButton>
    </template>
  </VueDialog>
</template>

<script>
import { reactive, watchEffect } from 'vue';

import Dropzone from '@/components/parts/Dropzone';

import postService from '@/services/post';
import { useUtilStore } from '@/stores/util';
import { getImageDataFromFile } from '@/utils';

export default {
  name: 'UploadDialog',
  components: { Dropzone },
  inheritAttrs: false,
  props: {
    open: { type: Boolean, require: true, default: false },
  },
  setup(props, { emit }) {
    const utilStore = useUtilStore();
    const state = reactive({
      files: [],
      previews: [],
      loading: false,
    });

    const handleClose = () => emit('close');
    const handleSubmit = async () => {
      const formData = new FormData();
      state.files.forEach((file) => formData.append('files', file));
      const res = await postService.create(formData);
      if (res.message) {
        utilStore.alert(res.message);
        return;
      }
      utilStore.alert('사진이 업로드 되었습니다.');
      handleClose();
    };

    watchEffect(() => {
      if (props.open) {
        state.files = [];
        state.loading = false;
      }
    });
    watchFileForPreview(state);
    return {
      state,
      handleClose,
      handleSubmit,
    };
  },
};

const watchFileForPreview = (state) =>
  watchEffect(() => {
    if (state.files.length) {
      state.loading = true;
    }
    return Promise.all(state.files.map(getImageDataFromFile))
      .then((results) => (state.previews = results))
      .then(() => (state.loading = false));
  });
</script>

<style scoped lang="scss">
.image {
  @include flex;
  width: 600px;
  max-width: 100%;
  height: 250px;

  border: 2px dashed $border-color-dark;
  color: $text-regular;
  cursor: pointer;

  &.drag-over {
    background-color: $primary-clear;
    border: 2px solid $primary-light;
  }
}

.preview {
  display: block;
  width: 100%;
  max-height: 70vh;
  margin: auto;
  padding: #{$spacing}px;
  object-fit: contain;
}
</style>
