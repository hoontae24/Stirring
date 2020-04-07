<template>
  <div class="root appbar">
    <container>
      <header class="header">
        <div class="wrapper">
          <vue-link class="logo" href="/">
            <img class="logo-img" :src="logo" alt="logo" />
          </vue-link>
          <div class="nav-wrapper" v-if="!hideMenu">
            <nav-link v-for="nav in navs" :key="nav.name" :nav="nav" />
          </div>
          <div class="_grow"></div>
          <div class="sub-nav-wapper" v-if="!hideMenu">
            <nav-link v-for="nav in subNavs" :key="nav.name" :nav="nav" />
          </div>
        </div>
      </header>
    </container>
    <vue-divider />
  </div>
</template>

<script>
import { navs } from '@/consts';
import logo from '@/assets/logo.png';
import Container from '@/components/layouts/Container';

import NavLink from './NavLink';

export default {
  components: {
    NavLink,
    Container,
  },
  props: {
    'hide-menu': Boolean,
  },
  computed: {
    logo: () => logo,
    navs: () => navs.filter(nav => !nav.isSub),
    subNavs: () => navs.filter(nav => nav.isSub),
  },
};
</script>

<style scoped lang="scss">
.root.appbar {
  position: -webkit-sticky;
  position: sticky;
  top: 0px;

  .header {
    height: #{$appbar-height}px;
    background-color: #ffffffee;

    .wrapper {
      height: 100%;
      padding: #{$spacing * 1}px;
      display: flex;
      align-items: center;

      &::v-deep(.logo) {
        height: 100%;
        display: inline-block;
        padding: #{$spacing}px 0px;

        .logo-img {
          height: 100%;
        }
      }
    }
  }
}
</style>
