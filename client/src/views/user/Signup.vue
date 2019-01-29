<template>
  <md-field>
    <label>Type here!</label>
    <md-input v-model="type"></md-input>
    <span class="md-helper-text">Helper text</span>
  </md-field>
</template>

<script>
export default {
  data() {
    return {
      type: null
    }
  }
}
</script>

<style scoped>
</style>

