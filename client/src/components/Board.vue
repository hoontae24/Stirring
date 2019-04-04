<template>
  <div class="board">
    <div>
      <md-field style="margin: 0 0 0 5%; width: 200px; display:none;">
        <label for="sort">{{text('sort')}}</label>
        <md-select
          class="sort"
          v-model="sort"
          name="sort"
          id="sort"
          @md-selected="posts=[]; loadPosts({sort, count: {new:$store.state.count.new, old: 0}, authorId: id, likes, search})"
        >
          <md-option value="latest">{{text('latest')}}</md-option>
          <md-option value="popularity">{{text('popularity')}}</md-option>
        </md-select>
      </md-field>
      <div class="radio" style="margin: 0 auto; text-align: center;">
        <md-radio v-model="sort" value="latest">{{text('latest')}}</md-radio>
        <md-radio v-model="sort" value="popularity" class="md-primary">{{text('popularity')}}</md-radio>
      </div>
      <PostsBoard :posts="posts" :sort="sort"/>
      <md-button
        class="md-elevation-4"
        style="border: 1px solid lightblue; width: 95%; height: 50px; margin: 0px 2.5% 30px 2.5%;"
        @click="more"
      >{{text('more')}}</md-button>
    </div>
  </div>
</template>

<script>
import PostsBoard from "@/components/PostsBoard"
import { actions } from "@/mixins/actions"
import { mapGetters, mapMutations } from "vuex"
export default {
  props: ["id", "likes", "search"],
  components: {
    PostsBoard
  },
  data() {
    return {
      sort: "latest", // default: latest, options: popularity
      posts: [],
      scroll: null
    }
  },
  computed: {
    ...mapGetters(['text']),
    count() {
      return this.$store.state.count
    },
    max() {
      return document.body.scrollHeight
    },
    now() {
      return window.scrollY + window.innerHeight
    }
  },
  methods: {
    ...mapMutations(["addCount"]),
    more() {
      this.addCount()
      this.loadPosts({
        sort: this.sort,
        count: this.count,
        authorId: this.id,
        likes: this.likes,
        search: this.search
      })
    }
  },
  created() {
    this.$store.commit("resetCount")
    // this.loadPosts({
    //   sort: this.sort,
    //   count: this.count,
    //   authorId: this.id,
    //   likes: this.likes,
    //   search: this.search
    // })
  },
  watch: {
    id() {
      this.posts = []
      this.loadPosts({
        sort: this.sort,
        count: this.count,
        authorId: this.id,
        likes: this.likes,
        search: this.search
      })
    },
    search() {
      this.posts = []
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
@media screen and (max-width: 800px) {
  .board {
    margin: 10px auto;
    margin-top: -10px;
  }
  .radio {
    height: 40px;
  }
  .md-radio-label {
    font-size: 0.5rem;
  }
}
</style>
