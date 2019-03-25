<template>
  <div class="home">
    <div class="welcome">
      <div class="container">
        <span class="item fs30">STIRRING</span>
        <span class="item btn fs15 fw400" @click="$router.push({ name: 'search' })">{{text('homeText1')}}</span>
      </div>
      <div class="about item">
        <span class="fw400">{{text('homeText2')}}</span>
        <br>
        <span class="item fs15 fw600">
          <a href="#" @click="$router.push({name: 'about'})">{{text('homeText3')}}</a>
        </span>
      </div>
    </div>
    <div class="search"></div>
    <Board/>
  </div>
</template>

<script>
import Board from "@/components/Board"
import { mapGetters } from "vuex"
export default {
  name: "home",
  components: {
    Board
  },
  computed: {
    ...mapGetters(["text"])
  }
}
</script>

<style media="screen" scoped>
.home {
  position: 0px 100%;
  display: flex;
  flex-direction: column;
}
.welcome {
  height: 500px;
  margin: 20px 0;
  background-image: url("../assets/home_bg2.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  filter: grayscale(50%);

  color: aliceblue;
  text-align: center;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
span,
span * {
  font-family: Arial, "Nanum Gothic", sans-serif;
}
.container {
  margin-top: 100px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.item {
  margin: 30px 0;
}
.board {
  align-self: center;
}

.btn:hover,
.btn:active {
  cursor: pointer;
  color: aquamarine;
}
</style>
