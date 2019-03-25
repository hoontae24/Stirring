<template>
  <div class="home">
    <div class="welcome">
      <div class="container">
        <span class="item fs30">STIRRING</span>
        <span class="item fs15 fw400">순간을 통해 세상을 봅니다</span>
      </div>
      <div class="about item">
        <span class="fw400">이 사이트는 웹 서비스 개인 프로젝트입니다.</span>
        <br>
        <span class="item fs15 fw600">
          <a href="#" @click="$router.push({name: 'about'})">STIRRING 알아보기</a>
        </span>
      </div>
    </div>
    <div class="search"></div>
    <Board/>
  </div>
</template>

<script>
import Board from "@/components/Board"
export default {
  name: "home",
  components: {
    Board
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
  justify-content: space-between;
}
span,
span * {
  font-family: Arial, "Nanum Gothic", sans-serif;
}
.container {
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
</style>
