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
    <Constant name="namename" v-slot="{ name: value }">
      123{{ value }}
    </Constant>
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
          <template v-if="post">
            <IntersectionBox
              :style="{
                position: 'relative',
                width: '100%',
                paddingBottom: `${(post.resources[0].meta.height /
                  post.resources[0].meta.width) *
                  100}%`,
                backgroundColor: 'lightblue',
              }"
              v-slot="{ intersected }"
            >
              <ImageView
                v-if="intersected"
                :resourceId="post.resourceIds[0]"
                style="position: absolute; display: block; width: 100%; height: 100%"
              />
            </IntersectionBox>
          </template>
        </Constant>
      </ColumnGrid>
    </div>
    <div style="height:8000px;"></div>
  </PageLayout>
</template>

<script>
import { reactive } from 'vue';

import PageLayout from '@/components/layouts/PageLayout';
import LoadingIcon from '@/components/parts/LoadingIcon';
import ImageView from '@/components/parts/ImageView';
import ColumnGrid from '@/components/parts/ColumnGrid';
import Constant from '@/components/parts/Constant';
import IntersectionBox from '@/components/parts/IntersectionBox';

import postService from '@/services/post';
import { getApiBaseUrl } from '@/utils';

export default {
  name: 'PageHome',
  components: {
    PageLayout,
    LoadingIcon,
    ImageView,
    ColumnGrid,
    Constant,
    IntersectionBox,
  },
  setup() {
    const state = reactive({ posts: [], loaded: [] });

    postService.list().then(({ posts }) => (state.posts = posts));

    return { state, getApiBaseUrl };
  },
};
</script>

<style scoped lang="scss">
// .list {
::v-deep(.col) {
  margin: 0 #{$spacing * 1}px;
}

::v-deep(.row) {
  margin-bottom: #{$spacing * 2}px;
}
// }
</style>
