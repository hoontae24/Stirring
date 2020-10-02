<template>
  <div class="info">
    <div class="item profile">
      <VueLink
        class="profile-name"
        :href="`/profile/${post.authorId}`"
      >
        {{ post.author.name }}
      </VueLink>
    </div>
    <div class="item _grow" />
    <div class="item action">
      <button
        class="icon-btn"
        @click="state.isLiked = !state.isLiked"
      >
        <component
          v-bind="actionIconCommonProps"
          :class="{ 'btn-like-liked': state.isLiked }"
          :is="state.isLiked ? 'HeartIcon' : 'HeartEmptyIcon'"
        />
      </button>
    </div>
    <div class="item action">
      <button class="icon-btn">
        <PlusIcon v-bind="actionIconCommonProps" />
      </button>
    </div>
    <div class="item action">
      <button class="icon-btn">
        <DownloadIcon v-bind="actionIconCommonProps" />
      </button>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue';

import {
  HeartIcon,
  HeartEmptyIcon,
  DownloadIcon,
  PlusIcon,
} from '@/components/icons';

export default {
  name: 'PostListItemInfo',
  components: {
    HeartIcon,
    HeartEmptyIcon,
    DownloadIcon,
    PlusIcon,
  },
  props: {
    post: { type: Object, required: true },
  },
  setup(props) {
    const state = reactive({
      isLiked: false,
    });
    const actionIconCommonProps = computed(() => ({
      fontSize: 'medium',
    }));
    return { state, actionIconCommonProps };
  },
};
</script>

<style scoped lang="scss">
.info {
  display: flex;
  align-items: center;
  padding: 0px #{$spacing * 1}px;
  color: white;
}

.info .item {
  padding: #{$spacing * 0.5}px;
}

.info .item .profile-name {
  color: inherit;
}

.icon-btn {
  padding: $spacing * 1px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: inherit;
  background-color: inherit;
  border: 0;
  border-radius: 50%;
  cursor: pointer;
}

.btn-like-liked {
  color: $liked-icon-color;
}
</style>
