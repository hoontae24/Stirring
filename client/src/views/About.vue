<template>
  <div class="about">
    <div class="container">
      <div class="item title">
        <h1 style="margin: 20px 0 10px 0;">About</h1>
      </div>
      <div class="divider item"></div>
      <div class="item">
        <h2>"STIRRING ver.1":</h2>
        <h3 style="margin-bottom: 2px;">개요</h3>1. 사진 등의 데이터를 자유롭게 공유하는 웹 서비스입니다. (개발 참조 모델:
        <a
          href="https://unsplash.com/"
          target="_blank"
        >Unsplash.com</a>,
        <a href="https://pixabay.com/" target="_blank">Pixabay.com</a>)
        <br>2. STIRRING은 웹 서비스에 대한 이해와 개발역량 향상을 목적으로 하는 개인 프로젝트입니다.
        <br>3. Vue.js / Node.js 등 대표적인 웹 프레임워크를 이용하여 웹 서비스를 구현합니다.
        <h3 style="margin-bottom: 2px;">기술 스택</h3>Vue.js, Vuex, Vue-router, Vue-marterial, Axios, Node.js, Express, MongoDB, Mongoose, JWT, Multer, Nodemailer
        <h3 style="margin-bottom: 2px;">상세 참조</h3>
        <a href="https://github.com/Mounc/Stirring" target="_blank">Github</a>,
        <a href="#">Project Description</a>
        <h3 style="margin-bottom: 2px;">추가 개발 요소</h3>1. Google Vision API를 이용한 자동 태그 부여
        <br>2. 기존 로컬 서버를 클라우드 기반 서비스로 제공
        <br>3. 사용자 간의 편의를 위한 메시징 서비스
        <br>4. 동영상 포맷의 서비스
      </div>
      <div class="divider item"></div>
      <div class="item">
        <h3>
          "Developer": () =>
          <a href="https://github.com/Mounc/About" target="_blank">김태훈</a>
        </h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.about {
  width: 80%;
  max-width: 1500px;
  padding: 20px 0;
}

.container {
  border: 1px solid black;
  border-radius: 0.5em;
  background-color: white;
  padding: 0px 20px;

  display: flex;
  flex-direction: column;
}

.item {
  margin: 10px 0;
}
.divider {
  /* margin: 5px 0; */
  border: 0.5px solid lightslategray;
}

@media screen and (max-width: 800px) {
  .about {
    width: 98%;
    padding: 10px 0;
  }
}
</style>