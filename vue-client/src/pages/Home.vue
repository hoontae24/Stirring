<template>
  <PageLayout style="text-align: center;">
    <LoadingIcon />
    <div class="list">
      <ColumnGrid
        :classes="{ column: 'col', row: 'row' }"
        :itemCount="state.posts.length"
        v-slot="{ column, row, columnCount }"
      >
        <Constant
          :post="state.posts[row * columnCount + column]"
          v-slot="{ post }"
        >
          <PostListItem
            v-if="post"
            :post="post"
            :href="`/post/${post.id}`"
          />
        </Constant>
      </ColumnGrid>
    </div>
    <div class="row"></div>
  </PageLayout>
</template>

<script>
import { onMounted, reactive } from 'vue';

import PageLayout from '@/components/layouts/PageLayout';
import LoadingIcon from '@/components/parts/LoadingIcon';
import ColumnGrid from '@/components/parts/ColumnGrid';
import Constant from '@/components/parts/Constant';
import PostListItem from '@/components/post/PostListItem';

import postService from '@/services/post';

export default {
  name: 'PageHome',
  components: {
    PageLayout,
    LoadingIcon,
    ColumnGrid,
    Constant,
    PostListItem,
  },
  setup() {
    const state = reactive({ posts: [] });

    onMounted(() =>
      postService.list().then(({ posts }) => (state.posts = posts)),
    );

    return { state };
  },
};
</script>

<style scoped lang="scss">
::v-deep(.col) {
  margin: 0 #{$spacing * 1}px;
}

::v-deep(.grid-row) {
  margin-bottom: #{$spacing * 2}px;
}
</style>
