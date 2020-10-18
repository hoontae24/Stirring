<template>
  <PageLayout :suspense="state.loading">
    <div class="root">
      <ImageView :resourceId="post?.resourceIds?.[0]" />
      <div class="info">
        <div class="profile">
          {{ post.author.name }}
        </div>
        <div class="_grow"></div>
        <div class="action"></div>
        <div class="action"></div>
        <div class="action"></div>
      </div>
    </div>
  </PageLayout>
</template>

<script>
import { computed, onMounted, reactive } from 'vue';

import PageLayout from '@/components/layouts/PageLayout';
import ImageView from '@/components/parts/ImageView';
import postService from '@/services/post';

export default {
  name: 'PagePostDetail',
  components: { PageLayout, ImageView },
  props: { id: String },

  setup(props) {
    const state = reactive({ post: null, loading: false });

    const loadPost = async (postId) => {
      const { post } = await postService.retrieve(postId);
      state.loading = true;
      state.post = post;
    };

    onMounted(() => {
      loadPost(props.id);
    });

    return {
      state,
      post: computed(() => state.post),
    };
  },
};
</script>

<style scoped lang="scss">
.root {
  margin-top: $spacing * 2px;
}
</style>
