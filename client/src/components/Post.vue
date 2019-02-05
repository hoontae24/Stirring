<template>
  <md-card class="post md-elevation-7">
    <md-card-header class="top">
      <div class="md-title item btn" style="padding: 0 auto 0 0; margin: 0;">
          <span style="margin: auto 5px;">{{ item.author.name }}</span>
          <md-tooltip md-direction="top">show details</md-tooltip>
      </div>
      <div class="item">
        <div class="item2 btn">
          <md-avatar style="margin: 0;">
            <i class="far fa-heart"></i>
            <!-- <i class="fas fa-heart red"></i> -->
            <md-tooltip md-direction="top">Like</md-tooltip>
          </md-avatar>
        </div>
        <div class="item2 btn">
          <md-avatar style="margin: 0;">
            <i class="fas fa-plus"></i>
            <!-- <i class="fas fa-plus-square green"></i> -->
            <md-tooltip md-direction="top">Add collections</md-tooltip>
          </md-avatar>
        </div>
        <div class="item2 btn">
          <md-avatar style="margin: 0;">
            <i class="fas fa-arrow-down"></i>
            <md-tooltip md-direction="top">Download</md-tooltip>
          </md-avatar>
        </div>
      </div>
    </md-card-header>

    <md-card-media>
      <img class="image-btn" :src="'http://localhost:3000/static/'+ item.data.filename ">
    </md-card-media>
  </md-card>
</template>

<script>
export default {
  props: ["item"]
}
</script>

<style lang="css" scoped>
.post {
  /* margin: 10px 6px;
  max-width: 600px;
  min-width: 400px;
  width: 400px;
  flex-grow: 1; */
  /* margin: 10px 6px;
  width: 100%;
  display: inline-block; */
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
.image-btn:hover,
.image-btn:active {
  cursor: pointer;
  filter: brightness(130%);
}
.btn:hover,
.btn:active {
  cursor: pointer;
  color: darkslategray;
  /* border: 1px solid lightgray; */
  background-color: rgba(211, 211, 211, 0.3);
  border-radius: 50%;
}

.red {
  color: red;
}
.green {
  color: green;
}
</style>
