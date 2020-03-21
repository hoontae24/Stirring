<template>
  <div class="home">
    {{ title }}
    <el-button>elbutton</el-button>
    <div style="height:2000px; border: 1px solid red;">1</div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      title: 'Stirring',
    };
  },
};
</script>

<style scoped></style>
