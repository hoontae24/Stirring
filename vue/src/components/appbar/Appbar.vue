<template>
  <div class="root">
    <div class="toolbar">
      <div class="wrapper">
        <vue-link class="logo" linkTo="/">
          <img class="logo-img" :src="logo" alt="logo" />
        </vue-link>
        <div class="nav-wrapper">
          <nav-link v-for="nav in navs" :key="nav.name" :nav="nav" />
        </div>
        <div class="_grow"></div>
        <div class="sub-nav-wapper">
          <nav-link v-for="nav in subNavs" :key="nav.name" :nav="nav" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { navs } from '@/consts';
import logo from '@/assets/logo.png';
import NavLink from './NavLink';

export default {
  components: {
    NavLink,
  },
  computed: {
    logo: () => logo,
    navs: () => navs.filter(nav => !nav.isSub),
    subNavs: () => navs.filter(nav => nav.isSub),
  },
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
