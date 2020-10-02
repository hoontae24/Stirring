<template>
  <div class="root post-list-item" :style="cssVars">
    <ImageView class="image" :resourceId="resourceId" />
    <div class="overlay">
      <PostListItemInfo :post="post" />
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';

import ImageView from '@/components/parts/ImageView';
import PostListItemInfo from './PostListItemInfo';

export default {
  name: 'PostListItem',
  components: {
    ImageView,
    PostListItemInfo,
  },
  props: {
    post: { type: Object, required: true },
  },
  setup(props) {
    const cssVars = computed(() => ({
      '--post-height-ratio':
        (props.post.resources[0].meta.height /
          props.post.resources[0].meta.width) *
          100 +
        '%',
    }));
    const resourceId = computed(() => props.post.resourceIds[0]);

    return {
      resourceId,
      cssVars,
    };
  },
};
</script>

<style scoped lang="scss">
.root.post-list-item {
  position: relative;
  width: 100%;
  padding-bottom: var(--post-height-ratio);
}

.image {
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
}

.overlay {
  @include absolute(0px);
  @include flex(flex-end, null, column);

  background: $overlay-gradient;
  transition: visibility 100ms linear, opacity 100ms linear;
  visibility: hidden;
  opacity: 0;
  .root.post-list-item:hover & {
    visibility: visible;
    opacity: 1;
  }
}
</style>
