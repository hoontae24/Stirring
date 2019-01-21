<template>
<div id="app">
  <Header></Header>
  <router-view />
</div>
</template>

<script>
import Header from '@/components/Header'
export default {
  components: {
    Header
  }

}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  font-family: 'Nunito semibold', sans-serif !important;
  background-color: whitesmoke;
}
</style>
