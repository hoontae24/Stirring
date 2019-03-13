<template>
  <md-card class="post md-elevation-2">
    <md-card-header class="top">
      <div
        class="md-title item btn"
        style="padding: 0 auto 0 0; margin: 0;"
        @click="$router.push(`/${item.author.id}`)"
      >
        <span style="margin: auto 5px;">{{ item.author.name }}</span>
        <md-tooltip md-direction="top">Show Profile</md-tooltip>
      </div>
      <div class="item">
        <div class="item2 btn" @click="actionLike(isLike(item), item)">
          <md-avatar style="margin: 0;">
            <i class="fas fa-heart red" v-if="isLike(item)"></i>
            <i class="far fa-heart" v-else></i>
            <md-tooltip md-direction="top" v-if="isLike(item)">Liked</md-tooltip>
            <md-tooltip md-direction="top" v-else>Like</md-tooltip>
          </md-avatar>
        </div>
        <div class="item2 btn" @click="showCollections(item)">
          <md-avatar style="margin: 0;">
            <i class="fas fa-star green" v-if="isCollected(item, collections)"></i>
            <i class="far fa-star" v-else></i>
            <md-tooltip md-direction="top">Add collections</md-tooltip>
          </md-avatar>
        </div>
        <div class="item2 btn" @click="actionDownload(item)">
          <md-avatar style="margin: 0;">
            <i class="fas fa-arrow-down"></i>
            <md-tooltip md-direction="top">Download</md-tooltip>
          </md-avatar>
        </div>
      </div>
    </md-card-header>

    <md-card-media>
      <img
        class="image-btn"
        :src="`http://${apiAddress}:${apiPort}/static/posts/`+ item.data.filename "
        @click="$router.push(`/posts/${item._id}`);"
      >
    </md-card-media>
  </md-card>
</template>

<script>
import { apiAddress, apiPort } from "@/config"
import { actions } from "@/mixins/actions"
import { mapGetters } from "vuex"
export default {
  props: ["item", "collections"],
  computed: {
    ...mapGetters(["isLike"])
  },
  data() {
    return {
      apiAddress: apiAddress,
      apiPort: apiPort
    }
  },

  mixins: [actions]
}
</script>

<style lang="css" scoped>
.post {
  border-radius: 1em;
}
.post > .top {
  padding: 5px;
  padding-left: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.top > .item {
  box-sizing: border-box;
  display: flex;
  justify-content: flex-end;
  /* font-size: 4px; */
  text-align: center;
  vertical-align: middle;
  font-size: 1rem;
}
.md-avatar {
  margin: 0;
}
i {
  /* width: 5px; */
  /* height: 5px; */

  display: inline-block;
  font-size: 1.5rem;
}
.image-btn {
  border-radius: 1em;
}
/* .image-btn:active, */
.image-btn:hover {
  cursor: pointer;
  filter: brightness(110%);
}
/* .btn:active, */
.btn:hover {
  cursor: pointer;
  color: darkslategray;
  /* border: 1px solid lightgray; */
  background-color: rgba(211, 211, 211, 0.3);
  border-radius: 1em;
}

.red {
  color: red;
}
.green {
  color: green;
}

@media screen and (max-width: 800px) {
  .md-tooltip {
    display: none;
  }
}
</style>
