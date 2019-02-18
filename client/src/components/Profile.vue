<template>
  <div class="profile">
    <span>{{id}}</span>
  </div>
</template>

<script>
export default {
  props: ["id"],
  created() {
    console.log("profile")
  }
}
</script>

<style scoped>
</style>


