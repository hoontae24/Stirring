<template>
<div class="home">
  <SearchArea class="item"></SearchArea>
  <PostsBoard class="item"></PostsBoard>
</div>
</template>

<script>
import SearchArea from '@/components/SearchArea'
import PostsBoard from '@/components/PostsBoard'
export default {
  name: 'home',
  components: {
    SearchArea,
    PostsBoard
  }
}
</script>

<style media="screen">
  .home {
    display: flex;
    flex-direction: column;
  }
</style>
