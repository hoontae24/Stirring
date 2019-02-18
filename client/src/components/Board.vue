<template>
  <div class="board">
    <md-field style="margin: 0px; ">
      <label for="sort">Sort By</label>
      <md-select v-model="sort" name="sort" id="sort" @md-selected="loadPosts(sort, count, id)">
        <md-option value="latest">The Latest</md-option>
        <md-option value="popularity">Popularity</md-option>
      </md-select>
    </md-field>
    <PostsBoard :posts="posts" :sort="sort"/>
    <md-button
      class="md-elevation-4"
      style="border: 1px solid lightblue; width: 95%; height: 50px; margin: 10px auto 30px auto;"
      @click="count += 30; loadPosts(sort, count ,id)"
    >more</md-button>
  </div>
</template>

<script>
import PostsBoard from "@/components/PostsBoard"
import { actions } from "@/mixins/actionsPosts"
export default {
  props: ["id"],
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
  mixins: [actions]
}
</script>

<style>
</style>
