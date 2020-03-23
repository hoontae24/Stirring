<template>
  <div class="root">
    <div class="toolbar">
      <div class="wrapper">
        <vue-link class="logo" linkTo="/">
          <img class="logo-img" :src="logo" alt="logo" />
        </vue-link>
        <span>{{ 'Menu' | log }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import logo from '@/assets/logo.png';

export default {
  computed: { logo: () => logo },
};
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

    .logo {
      height: 100%;
      display: inline-block;
      padding: #{$spacing}px;

      .logo-img {
        height: 100%;
      }
    }
  }
}
</style>
