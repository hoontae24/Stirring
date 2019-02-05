<template>
  <div class="home">
    <div class="search-area">
      <div class="item">
        <md-field class="item1">
          <label>Search Here.</label>
          <md-input v-model="searchWord"></md-input>
        </md-field>
        <i class="btn item1 fas fa-search"></i>
      </div>
    </div>
    <PostsBoard class="item board" v-bind:posts="posts"></PostsBoard>
  </div>
</template>

<script>
import PostsBoard from "@/components/PostsBoard"
import PostService from "@/services/PostService"
export default {
  name: "home",
  components: {
    PostsBoard
  },
  data() {
    return {
      searchWord: null,
      posts: []
    }
  },
  watch: {
    searchWord() {}
  },
  created() {
    PostService.getAll()
      .then(res => {
        if (!res.data.success) return
        this.posts = res.data.posts
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>

<style media="screen">
.home {
  position: 0px 100%;
  display: flex;
  flex-direction: column;
}
.search-area {
  width: auto;
  margin: 50px 100px;
  padding: 20px;
  border: 1px solid lightgray;
  text-align: center;

  display: flex;
  flex-direction: column;
  align-items: center;
}
.search-area > .item {
  margin: 10px;
  width: auto;
  min-width: 300px;

  display: flex;
}
.item1 {
  flex-grow: 1;
}
.fas {
  font-size: 2rem;
  align-self: center;
  margin: 10px;
}
.btn:hover,
.btn:active {
  cursor: pointer;
  color: darkslategray;
}
.board {
  align-self: center;
}
</style>
