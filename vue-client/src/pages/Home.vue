<template>
  <PageLayout style="text-align: center;">
    HOME<br />
    HOME<br />
    HOME<br />
    HOME<br />
    HOME<br />
    HOME<br />
    HOME<br />
    HOME<br />
    HOME<br />
    HOME<br />
    <LoadingIcon />
    <div v-for="post in state.posts" :key="post.id">
      <img
        :src="
          `http://localhost:3001/api/resource/download/${post.resourceIds[0]}`
        "
        alt=""
        :style="{ width: '300px', height: '300px' }"
      />
      {{ post.id }}
    </div>
  </PageLayout>
</template>

<script>
import { reactive } from 'vue';

import PageLayout from '@/components/layouts/PageLayout';
import LoadingIcon from '@/components/parts/LoadingIcon';

import postService from '@/services/post';

export default {
  name: 'PageHome',
  components: {
    PageLayout,
    LoadingIcon,
  },
  setup() {
    const state = reactive({ posts: [] });

    postService.list().then(({ posts }) => (state.posts = posts));

    return { state };
  },
};
</script>

<style scoped></style>
