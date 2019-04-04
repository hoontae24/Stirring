<template>
  <div class="search">
    <div class="cover">
      <div class="container">
        <div class="item input" @click="$refs.text.focus()">
          <i class="icon fas fa-search btn" @click="search = $refs.text.value"></i>
          <input type="text" ref="text" @keyup.enter="search = $refs.text.value">
          <span class="search-btn" @click="search = $refs.text.value">{{text('search') | upperCase}}</span>
        </div>
        <div class="item guide" style>{{text(menu)}}</div>
        <div class="item pop">
          <div class="item">{{text('popularWords')}}:</div>
          <div
            class="item"
            v-for="item in popTags"
            :key="item"
            @click="linkByTag(item)"
          >#{{item | upperCase}}</div>
        </div>
      </div>
    </div>
    <md-card class="card md-elevation-1">
      <div class="result">
        <div class="menu">
          <span
            :class="$route.name === 'search-posts' ? 'selected' : ''"
            class="item"
            @click="$router.push(`/search/posts`+ `?word=${search}`)"
          >{{text('posts') | upperCase}}</span>
          <span
            :class="$route.name === 'search-authors' ? 'selected' : ''"
            class="item"
            @click="$router.push(`/search/authors`+ `?word=${search}`)"
          >{{text('authors') | upperCase}}</span>
          <span
            :class="$route.name == 'search-collections' ? 'selected' : ''"
            class="item"
            @click="$router.push(`/search/collections`+ `?word=${search}`)"
          >{{text('collections') | upperCase}}</span>
        </div>
        <div class="content">
          <router-view :search="search"></router-view>
        </div>
      </div>
    </md-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import { actions } from "@/mixins/actions"
import TagService from "@/services/TagService"

export default {
  name: "search",
  data() {
    return {
      search: "",
      popTags: []
    }
  },
  computed: {
    ...mapGetters(["text"]),
    menu() {
      if (this.$route.name === "search-posts") return "searchMenuPosts"
      if (this.$route.name === "search-authors") return "searchMenuAuthors"
      if (this.$route.name === "search-collections")
        return "searchMenuCollections"
      else return "searchMenuPosts"
    }
  },
  methods: {
    async loadPopTags() {
      const res = await TagService.getTop5()
      this.popTags = res.data.popTags
    }
  },
  created() {
    // EventBus.$on("setSearchWord", word => {
    //   this.search = word
    // })
    if (!this.$route.query.word) {
      this.$route.query.word = ""
    }
    this.search = this.$route.query.word
    this.loadPopTags()
  },
  mounted() {
    this.$refs.text.focus()
    this.$refs.text.value = this.search
  },
  watch: {
    search() {
      TagService.push(this.search)
      this.$router.push({
        path: `/search/${this.$route.name.split("-")[1]}?word=` + this.search
      })
    },
    "$route.query.word": function() {
      if (!this.$route.query.word) {
        this.$route.query.word = ""
      }
      if (this.$route.query.word || this.$route.query.word === "") {
        this.search = this.$route.query.word
        this.$refs.text.value = this.search
      }
    }
  },
  mixins: [actions]
}
</script>

<style scoped>
.cover {
  height: 400px;
  margin: 10px;
  border-radius: 1em;
  overflow: hidden;
  background-image: url("../assets/bg.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
.container {
  background-color: rgba(255, 255, 255, 0.5);
  height: 400px;
  /* margin: 50px; */
  padding: auto auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
}
.container > .item {
  width: 80%;
  margin: 10px auto;
  overflow: hidden;
}
.input {
  height: 50px;
  margin-bottom: 0;
  padding: 10px;
  border: 0;
  border-radius: 1em;
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
}
.input > span {
  font-size: 1rem;
  vertical-align: middle;
}
.input > span:hover {
  cursor: pointer;
}
.input:hover {
  cursor: text;
}
.input:active,
.input:focus-within {
  border: 1px solid steelblue;
}
.icon {
  font-size: 2em;
  align-self: center;
  margin-right: 10px;
}
input {
  font-size: 1rem;
  display: inline-block;
  border: 0;
  outline: none;
  margin: auto 0;
  flex-grow: 1;
  background-color: rgba(255, 255, 255, 0);
}
.container > .guide {
  margin-top: 0;
  padding-left: 10px;
  color: black;
}
.pop {
  display: flex;
}
.pop > .item {
  margin: 0 10px;
  align-self: center;
  color: steelblue;
}
.pop > .item:nth-child(1) {
  color: black;
}
.pop > .item:not(:nth-child(1)):hover {
  cursor: pointer;
  background-color: rgba(240, 248, 255, 0.445);
}

.card {
  margin: 10px;
  padding: 10px;
  border-radius: 1em;
  overflow: hidden;
}
.result {
  border: 1px solid lightgray;
  border-radius: 1em;
  overflow: hidden;
}
.menu {
  border-bottom: 1px solid lightgray;
  display: flex;
  align-items: center;
}
.menu > .item {
  display: inline-block;
  margin: 10px;
  padding: 5px;
  border-radius: 1em;
}
.menu > .selected {
  color: steelblue;
  background-color: mintcream;
}
/* .menu > .item:active, */
.menu > .item:hover {
  cursor: pointer;
  color: steelblue;
}

.btn {
  cursor: pointer;
}

@media screen and (max-width: 800px) {
  .cover {
    height: 200px;
    margin: 10px 2px;
  }
  .container {
    height: 200px;
  }
  .container > .item {
    width: 95%;
    margin: 10px auto;
    overflow: hidden;
  }
  .input > span {
    font-size: 0.8rem;
    vertical-align: middle;
  }
  .pop {
    justify-content: flex-start;
    font-size: 0.8rem;
    flex-wrap: wrap;
  }
  .pop > .item {
    margin: 0 5px;
  }
  .card {
    margin: 10px 2px;
    padding: 2px;
  }
  .result {
    border: none;
  }
  .menu {
    justify-content: center;
  }
  .menu > .item {
    margin: 5px;
  }
}
</style>