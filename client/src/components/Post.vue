<template>
  <md-card class="post">
    <md-card-header class="header">
      <div class="md-title item btn">Author</div>
      <div class="item">
        <div class="item2">
          <md-avatar>
            <i class="fas fa-heart btn"></i>
            <md-tooltip md-direction="top">Like</md-tooltip>
          </md-avatar>
        </div>
        <div class="item2">
          <md-avatar>
            <i class="fas fa-plus btn"></i>
            <md-tooltip md-direction="top">Add collections</md-tooltip>
          </md-avatar>
        </div>
        <div class="item2">
          <md-avatar>
            <i class="fas fa-arrow-down btn"></i>
            <md-tooltip md-direction="top">Download</md-tooltip>
          </md-avatar>
        </div>
      </div>
    </md-card-header>

    <md-card-media>
      <img class="image-btn" src="@/assets/bg.jpg" alt>
    </md-card-media>
  </md-card>
</template>

<script>
export default {}
</script>

<style lang="css" scoped>
/* .post {
  margin: 10px 6px;
  max-width: 600px;
  min-width: 400px;
  width: 400px;
  flex-grow: 1;
  display: inline-block;
} */
.post > .header {
  padding: 5px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.header > .item {
  box-sizing: border-box;
  display: flex;
  justify-content: flex-end;
  /* font-size: 4px; */
  text-align: center;
  vertical-align: middle;
}
.md-avatar {
  margin: 0;
}
.fas {
  /* width: 5px; */
  /* height: 5px; */

  display: inline-block;
  font-size: 1rem;
}
.header > .md-title {
  margin-top: 0px;
  margin-left: 10px;
  font-size: 1rem;
  vertical-align: top;
  text-align: start;
  /* flex-grow: 50; */
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
</style>
