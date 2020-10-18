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
            :href="`/post/${post.id}`"
            :post="post"
            :liked="!!state.postLikeDict[post.id]"
            @like="() => toggleLike(post.id)"
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
import { useAuthStore } from '@/stores/viewer';

import postService from '@/services/post';
import actionService from '@/services/action';

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
    const state = reactive({ posts: [], postLikeDict: {} });
    const authStore = useAuthStore();
    const viewer = authStore.getViewer();

    const toggleLike = async (postId) => {
      const postLiked = !!state.postLikeDict[postId];
      if (!postLiked) {
        state.postLikeDict[postId] = true;
        await actionService.create({
          type: 'ACTION_TYPE_POST_LIKE',
          targetId: postId,
          targetKind: 'Post',
        });
      } else {
        state.postLikeDict[postId] = false;
        const target = await getLikeAction(postId);
        if (target) {
          await actionService.destroy(target.id);
        }
      }
    };

    const isLiked = async (postId) =>
      Boolean(await getLikeAction(postId));

    const getLikeAction = async (postId) =>
      actionService
        .list({
          type: 'ACTION_TYPE_POST_LIKE',
          actorId: viewer?.id,
          targetId: postId,
          targetKind: 'Post',
          deletedAt: null,
        })
        .then(
          ({ actions }) =>
            Array.isArray(actions) &&
            actions.length > 0 &&
            actions.find((a) => a && a.deletedAt === null),
        );

    onMounted(() =>
      postService
        .list()
        .then(({ posts }) => (state.posts = posts) && posts)
        .then(async (posts) =>
          Promise.all(
            // TODO: Post 하나씩이 아닌 묶어서 Like 확인하는 로직으로 변경되어야 함.
            posts.map(
              async (post) =>
                (state.postLikeDict[post.id] = await isLiked(
                  post.id,
                )),
            ),
          ),
        ),
    );

    return { state, toggleLike };
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
