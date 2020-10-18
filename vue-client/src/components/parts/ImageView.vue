<template>
  <img v-if="state.loaded" class="image-view-root" :src="src" />
  <div v-else class="fallback"></div>
</template>

<script>
import { reactive, watch } from 'vue';

import { getApiBaseUrl } from '@/utils';
import { onLoad } from '@/utils/hooks';

export default {
  name: 'ImageView',
  props: {
    resourceId: { type: String, required: true },
  },
  setup(props, ctx) {
    // props
    const baseUrl = getApiBaseUrl();
    const src = `${baseUrl}/resource/download/${props.resourceId}`;

    // states
    const state = reactive({ loaded: false });

    // effects
    onLoad(src, () => (state.loaded = true));
    watch(state, ({ loaded }) => ctx.emit('load', loaded));

    return {
      state,
      src,
    };
  },
};
</script>

<style scoped lang="scss">
.image-view-root {
  display: inline-block;
  max-width: 100%;
  object-fit: contain;
}

.fallback {
  @include loading-wave();
}
</style>
