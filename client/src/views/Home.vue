<template>
  <div class="home">
    <!-- <div class="item mode">
      <md-card style="padding: 30px; margin: 10px;">
        <md-field style="margin: 0px; ">
          <label for="sort">Sort By</label>
          <md-select v-model="sort" name="sort" id="sort" @md-selected="loadPosts(sort, count)">
            <md-option value="latest">The Latest</md-option>
            <md-option value="popularity">Popularity</md-option>
          </md-select>
        </md-field>
      </md-card>
    </div>
    <PostsBoard class="item board" v-bind:posts="posts" :sort="sort"></PostsBoard>
    <md-button
      class="md-elevation-4"
      style="border: 1px solid lightblue; width: 95%; height: 50px; margin: 10px auto 30px auto;"
      @click="count += 30; loadPosts(sort, count)"
    >more</md-button>-->
    <Board/>
  </div>
</template>

<script>
import Board from "@/components/Board"
export default {
  name: "home",
  components: {
    Board
  }
}
</script>

<style media="screen" scoped>
.home {
  position: 0px 100%;
  display: flex;
  flex-direction: column;
}
.board {
  align-self: center;
}
</style>
