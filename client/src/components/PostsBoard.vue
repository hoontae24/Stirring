<template >
  <div class="board row">
    <div class="column" v-for="posts in resizePosts" :key="resizePosts.indexOf(posts)">
      <Post v-for="post in posts" :key="post._id" :item="post" :collections="collections"/>
    </div>
  </div>
</template>

<script>
import Post from "@/components/Post"
import CollectionService from "@/services/CollectionService"
import { EventBus } from "@/mixins/EventBus"

export default {
  props: ["posts", "sort"],
  components: { Post },
  data() {
    return {
      windowWidth: window.innerWidth,
      collections: []
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
      // 각 칼럼의 높이를 구해서 가장 낮은 칼럼에 추가하기
      this.posts.forEach(item => {
        let heightSum = new Array(resizeP.length).fill(0)
        resizeP.forEach((column, index) => {
          column.forEach(p => {
            heightSum[index] +=
              p.data.resolution.height / p.data.resolution.width
          })
        })
        // console.log(heightSum)
        col = heightSum.indexOf(Math.min(...heightSum))
        // console.log(col)
        resizeP[col].push(item)
        // if (col === resizeP.length) col = 0
      })
      return resizeP
    }
  },
  methods: {
    loadCollections() {
      if (!this.$store.state.userInfo.isLogined) {
        this.collections = []
        return
      }
      CollectionService.getByAuthor(this.$store.state.userInfo.user._id)
        .then(res => {
          if (!res.data.success) throw new Error("Failed to load collections")
          this.collections = res.data.collections
        })
        .catch(err => {
          console.log(err.message)
        })
    }
  },
  created() {
    EventBus.$on("loadCollections", () => {
      this.loadCollections()
    })
    this.loadCollections()
  }
}
</script>

<style lang="css" scoped>
.board {
  margin-bottom: 50px;
  width: 97%;
  display: flex;
  flex-wrap: wrap;
  /* justify-content: space-around; */
}
.row {
  display: flex;
  flex-wrap: wrap;
  padding: 0 4px;
  align-items: flex-start;
}

/* Create four equal columns that sits next to each other */
.column {
  flex: 25%;
  max-width: 40%;
  padding: 0 4px;
  margin: 0 5px;

  display: inline;
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
  .board {
    margin-bottom: 50px;
    width: 99%;
    display: flex;
    flex-wrap: wrap;
    /* justify-content: space-around; */
  }
  .column {
    padding: 0 1px;
    margin: 0 1px;
    flex: 100%;
    max-width: 100%;
  }
}
</style>
