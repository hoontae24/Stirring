<template>
  <div class="root">
    <div class="toolbar">
      <div class="wrapper">
        <span>LOGO</span>
        <span>Menu</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.root {
  position: -webkit-sticky;
  position: sticky;
  top: 0px;

  .toolbar {
    height: #{$appbar-height}px;
    background-color: #ffffffaa;
  }

  .wrapper {
    height: 100%;
    padding: #{$spacing * 1}px;
    display: flex;
    align-items: center;
  }
}
</style>
