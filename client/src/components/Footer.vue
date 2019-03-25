<template>
  <div class="footer">
    <div class="container">
      <div class="logo">
        <a href="/">
          <div class="image"></div>
        </a>
      </div>
      <div class="divider large"></div>
      <div class="wrapper">
        <div class="item">
          <span>{{text('copyright')}}</span>
        </div>
        <div class="divider"></div>
        <div class="item">
          <span
            class="btn"
            @click="navigateTo('mailto:kadr8941@gmail.com?Subject=Stirring%20opinions')"
          >{{text('hostEmail')}}</span>
        </div>
        <div class="divider"></div>
        <div class="item">
          <span class="btn" @click="$router.push({name: 'about'})">{{text('about')}}</span>
        </div>
        <div class="divider"></div>
        <div class="item">
          <span
            class="btn"
            @click="navigateTo('https://github.com/Mounc/Stirring', 'new')"
          >{{text('github')}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  computed: {
    ...mapGetters(["text"])
  },
  methods: {
    navigateTo(url, open) {
      if (open) window.open(url)
      else location.href = url
    }
  }
}
</script>

<style scoped>
.footer {
  width: 100%;

  border-top: 1px solid lightgray;
  background-color: white;
}
.container {
  /* height: 80px; */
  padding: 25px;

  display: flex;
  align-items: stretch;
  justify-content: space-around;
}
.logo {
  /* flex-grow: 1; */
  width: 100px;
  display: flex;
  align-items: center;
}
.logo > a {
  width: 100px;
  margin: auto auto;
}
.image {
  width: 100px;
  height: 35px;
  margin: auto auto;
  background-image: url("../assets/logo.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}
.image:hover {
  cursor: pointer;
}
.divider {
  width: 1px;
  border: 1px solid black;
}

.wrapper {
  /* flex-grow: 3; */
  display: flex;
  justify-content: center;
  align-items: center;
}
.wrapper > .item {
  margin: 0px 10px;
}
.item > span,
.item > span:active,
.item > span:hover {
  color: black;
}
.btn {
  cursor: pointer;
}
@media screen and (max-width: 800px) {
  .container {
    padding: 10px;
    flex-direction: column;
    align-items: center;
  }
  .wrapper {
    flex-grow: 3;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
  .wrapper > .item {
    margin: 5px 0;
  }
  .divider {
    display: block;
    margin: 3px 0;
  }
  .btn {
    text-decoration: underline;
  }
}
</style>