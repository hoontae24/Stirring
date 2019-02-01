<template>
  <div class="app">
    <Header></Header>
    <router-view/>
  </div>
</template>

<script>
import Header from "@/components/Header"

export default {
  components: {
    Header
  }
}
</script>

<style>
* {
  font-family: "Nunito semibold", "Noto Sans KR", sans-serif ;
}
</style>
