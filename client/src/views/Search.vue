<template>
  <div class="search">
    <div class="cover">
      <div class="container">
        <div class="item input" @click="$refs.text.focus()">
          <i class="icon fas fa-search btn" @click="search = $refs.text.value"></i>
          <input type="text" ref="text" @keyup.enter="search = $refs.text.value">
        </div>
        <div class="item guide" style>{{menu}}</div>
        <div class="item pop">
          <div class="item">Popular Searches:</div>
          <div class="item" @click="linkByTag('landscape')">#LANDSCAPE</div>
          <div class="item">#CITY</div>
          <div class="item">#FAMILY</div>
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
          >POSTS</span>
          <span
            :class="$route.name === 'search-authors' ? 'selected' : ''"
            class="item"
            @click="$router.push(`/search/authors`+ `?word=${search}`)"
          >AUTHORS</span>
          <span
            :class="$route.name == 'search-collections' ? 'selected' : ''"
            class="item"
            @click="$router.push(`/search/collections`+ `?word=${search}`)"
          >COLLECTIONS</span>
        </div>
        <div class="content">
          <router-view :search="search"></router-view>
        </div>
      </div>
    </md-card>
  </div>
</template>

<script>
import { EventBus } from "@/mixins/EventBus"
import { actions } from "@/mixins/actions"

export default {
  name: "search",
  data() {
    return {
      search: ""
    }
  },
  computed: {
    menu() {
      if (this.$route.name === "search-posts") return "Keywords: tags of posts"
      if (this.$route.name === "search-authors")
        return "Keywords: name, email, interests"
      if (this.$route.name === "search-collections")
        return "Keywords: title, name of authors"
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
  },
  mounted() {
    this.$refs.text.focus()
    this.$refs.text.value = this.search
  },
  watch: {
    search() {
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
  height: 300px;
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
  height: 300px;
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
  align-items: stretch;
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
.pop > .item:hover {
  cursor: pointer;
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
  .pop > .item:nth-child(1) {
    display: none;
  }
  .pop {
    justify-content: center;
    font-size: 1rem;
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