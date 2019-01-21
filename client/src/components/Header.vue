<template>
  <div id="header">
    <div id="logo" class="btn" @click="routeTo('home')">
      <img alt="Vue logo" src="@/assets/logo.png">
    </div>
    <div id="nav">
      <div
      v-for="nav in navs"
        class="item btn"
        :key="nav.text"
        @click="routeTo(nav.route)"
        >
        {{ nav.text }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      navs: [
        { text: 'SEARCH', route: 'search' },
        { text: 'UPLOAD', route: 'upload' },
        { text: 'LOGIN', route: 'login' },
        { text: 'SIGNUP', route: 'signup' }
      ]
    }
  },
  methods: {
    routeTo (route) {
      this.$router.push({name: route})
    }
  }
}
</script>

<style lang="css" scoped>
#header  {
  font-family: 'Nunito', Helvetica, Arial, sans-serif;
  background-color: white;
  width: 99%;
  height: 70px;
  position: fixed;
  margin: 0;
  padding: 0px 10px 0px 10px;
  border-bottom: 1px solid lightgrey;

  display: flex;
  justify-content: space-between;
}
#header * {
  background-color: white;
}
#logo {
  width: auto;
  height: 100%;
  align-self: center;
  padding: 0px;
  margin: 0px;

  display: flex;
  justify-content: center;
  align-items: center;
}
img {
  height: 80%;
}
#nav{
  display: flex;
  margin-right: 10px;
}
.item {
  align-self: center;
  padding: 15px 10px;
}
.btn:hover, .btn:active {
  cursor: pointer;
  font-weight: 400;
  color: Steelblue;
}

@media (max-width: 580px) {
  #header {
    font-family: 'Nunito', Helvetica, Arial, sans-serif;

    height: 50px;
    margin: 0;
    padding: 0px 5px;

  }
  #logo {
    width: auto;
    height: 100%;
    align-self: center;
    padding: 0px;
    margin: 0px;

    display: flex;
    justify-content: center;
    align-items: center;
  }
  img {
    height: 60%;
    width: auto;
  }
}
</style>
