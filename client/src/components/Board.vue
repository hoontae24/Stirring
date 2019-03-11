<template>
  <div class="board">
    <div
      v-if="!posts.length"
      style="margin: 50px auto; font-size: 2rem; color: gray; text-align: center;"
    >There is No Post.</div>
    <div v-else>
      <md-field style="margin: 0 0 0 5%; width: 200px; display:none;">
        <label for="sort">Sort By</label>
        <md-select
          class="sort"
          v-model="sort"
          name="sort"
          id="sort"
          @md-selected="loadPosts({sort, count, authorId: id, likes, search})"
        >
          <md-option value="latest">The Latest</md-option>
          <md-option value="popularity">Popularity</md-option>
        </md-select>
      </md-field>
      <div style="margin: 0 auto; text-align: center;">
        <md-radio v-model="sort" value="latest">The Latest</md-radio>
        <md-radio v-model="sort" value="popularity" class="md-primary">Popularity</md-radio>
      </div>
      <PostsBoard :posts="posts" :sort="sort"/>
      <md-button
        class="md-elevation-4"
        style="border: 1px solid lightblue; width: 95%; height: 50px; margin: 10px 2.5% 30px 2.5%;"
        @click="count += 30; loadPosts({sort, count , authorId: id, likes, search})"
      >more</md-button>
    </div>
  </div>
</template>

<script>
import PostsBoard from "@/components/PostsBoard"
import { actions } from "@/mixins/actions"
import { EventBus } from "@/mixins/EventBus"
export default {
  props: ["id", "likes", "search"],
  components: {
    PostsBoard
  },
  data() {
    return {
      sort: "latest", // default: latest, options: popularity
      count: 30,
      posts: []
    }
  },
  created() {
    this.loadPosts({
      sort: this.sort,
      count: this.count,
      authorId: this.id,
      likes: this.likes,
      search: this.search
    })
  },
  watch: {
    id() {
      this.loadPosts({
        sort: this.sort,
        count: this.count,
        authorId: this.id,
        likes: this.likes,
        search: this.search
      })
    },
    search() {
      this.loadPosts({
        sort: this.sort,
        count: this.count,
        authorId: this.id,
        likes: this.likes,
        search: this.search
      })
    }
  },
  mixins: [actions]
}
</script>

<style>
.board {
  margin: 10px auto;
}
</style>
