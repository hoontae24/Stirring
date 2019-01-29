<template>
  <div id="app">
    <Header></Header>
    <router-view/>
  </div>
</template>

<script>
import Text from "@/text/index.json"
import Header from "@/components/Header"

export default {
  components: {
    Header
  },
  created: function() {
    this.$store.commit("initText", Text)
  }
}
</script>

<style>
* {
  font-family: "Nunito semibold", "Noto Sans KR", sans-serif !important;
}
body {
  /* background-color: whitesmoke; */
}
</style>
