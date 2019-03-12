<template>
  <div class="user" @click="$router.push(`/${user._id}`)">
    <md-card class="card">
      <div class="content">
        <div class="image">
          <img
            class="img"
            style="display: block;"
            :src="`http://${apiAddress}:${apiPort}/static/profile-images/`+ user.image "
            alt
          >
        </div>
        <div class="info">
          <div style="font-size: 2rem; margin: 5px;">{{user.name}}</div>
          <div style="display: flex;">
            <div style="margin: 5px;">Posts: {{user.posts.length}}</div>
            <div style="margin: 5px;">Followers: {{user.followers.length}}</div>
          </div>
        </div>
      </div>
      <div style="margin: 5px;" class="interests">
        Interests:
        <span
          style="margin:0px 2px; color: steelblue;"
          v-for="tag in user.interests"
          :key="tag"
          @click="$event.cancelBubble = true; linkByTag(tag)"
        >#{{tag}}</span>
      </div>
    </md-card>
  </div>
</template>

<script>
import { apiAddress, apiPort } from "@/config"
import { actions } from "@/mixins/actions"

export default {
  props: ["user"],
  data() {
    return { apiAddress, apiPort }
  },
  mixins: [actions]
}
</script>

<style scoped>
.user {
  margin: 10px;
  width: 30%;
  max-width: 40%;
  /* min-width: 400px; */
}

.card {
  border-radius: 1em;
  overflow: hidden;
  padding: 10px;
}
/* .card:active, */
.card:hover {
  cursor: pointer;
  background-color: honeydew;
}
.content {
  width: 100%;
  height: 100%;
  display: flex;
}
.image {
  margin: auto 10px;
  /* width: 100px; */
  /* height: 100px; */
  overflow: hidden;
}
.img {
  object-fit: contain;
  border-radius: 50%;
  margin: auto 0px;
  min-width: 3rem;
  min-height: 3rem;
  width: 3rem;
  height: 3rem;
}

@media screen and (max-width: 1280px) {
  .user {
    width: 45%;
    max-width: 50%;
  }
}

@media screen and (max-width: 800px) {
  .user {
    width: 100%;
    max-width: 100%;
  }
  .info > div {
    font-size: 1rem;
  }
  .interests {
    display: none;
  }
}
</style>