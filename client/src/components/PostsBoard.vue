<template >
  <div class="board row">
    <div class="column" v-for="posts in resizePosts" :key="resizePosts.indexOf(posts)">
      <Post v-for="post in posts" :key="post._id" :item="post"/>
    </div>
  </div>
</template>

<script>
import Post from "./Post"
export default {
  props: ["posts"],
  components: { Post },
  data() {
    return {
      windowWidth: window.innerWidth
    }
  },
  beforeCreate() {
    this.$nextTick(() => {
      window.addEventListener("resize", () => {
        this.windowWidth = window.innerWidth
      })
    })
  },
  computed: {
    resizePosts() {
      // 800:2, 1280:3
      let resizeP = [[]]
      if (this.windowWidth > 800) resizeP = [[], []]
      if (this.windowWidth > 1280) resizeP = [[], [], []]
      let col = 0
      this.posts.forEach(item => {
        resizeP[col++].push(item)
        if (col === resizeP.length) col = 0
      })
      return resizeP
    }
  }
}
</script>

<style lang="css" scoped>
.board {
  margin-bottom: 50px;
  width: 90%;
  display: flex;
  flex-wrap: wrap;
  /* justify-content: space-around; */
}
.row {
  display: flex;
  flex-wrap: wrap;
  padding: 0 4px;
}

/* Create four equal columns that sits next to each other */
.column {
  flex: 25%;
  max-width: 40%;
  padding: 0 4px;
  margin: 0 5px;
}

.column .post {
  margin-top: 15px;
  vertical-align: middle;
}

@media screen and (max-width: 1280px) {
  .column {
    flex: 45%;
    max-width: 50%;
  }
}

/* Responsive layout - makes the two columns stack on top of each other instead of next to each other */
@media screen and (max-width: 800px) {
  .column {
    flex: 100%;
    max-width: 100%;
  }
}
</style>
