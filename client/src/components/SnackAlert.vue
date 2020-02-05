<template>
  <div class="snackalert">
    <md-snackbar
      :md-position="'center'"
      :md-duration="duration"
      :md-active.sync="showSnackAlert"
      md-persistent
    >
      <span>{{ message | upperCase }}</span>
      <!-- <md-button class="md-primary" @click="showSnackAlert = false">OK</md-button> -->
    </md-snackbar>
  </div>
</template>

<script>
export default {
  name: "snackAlert",
  props: ["duration", "showSnackAlert", "message"]
}
</script>

<style scoped>
span {
  display: block;
  text-align: center;
  margin: auto auto;
}
</style>


