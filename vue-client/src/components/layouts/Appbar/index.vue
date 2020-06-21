<template>
  <div class="root appbar">
    <Container>
      <header class="header">
        <div class="wrapper">
          <VueLink class="logo" href="/">
            <img class="logo-img" :src="logo" alt="logo" />
          </VueLink>
          <div class="nav-wrapper" v-if="!hideMenu">
            <NavLink v-for="nav in navs" :key="nav.name" :nav="nav" />
          </div>
          <div class="_grow"></div>
          <div class="sub-nav-wapper" v-if="!hideMenu">
            <NavLink
              v-for="nav in subNavs.filter(
                (nav) =>
                  (!nav.requiredLogin ||
                    (nav.requiredLogin && viewer)) &&
                  (!nav.requiredLogout ||
                    (nav.requiredLogout && !viewer)),
              )"
              :key="nav.name"
              :nav="nav"
            />
          </div>
        </div>
      </header>
    </Container>
    <vue-divider />
  </div>
</template>

<script>
import logo from '@/assets/logo.png';
import Container from '@/components/layouts/Container';
import navs from '@/consts/navs';
import { useAuthStore } from '@/stores/viewer';

import NavLink from './NavLink';

export default {
  name: 'Appbar',
  components: {
    NavLink,
    Container,
  },
  props: {
    'hide-menu': Boolean,
  },
  setup() {
    const authStore = useAuthStore();
    const viewer = authStore.getViewer();
    return {
      viewer,
      authStore,
      logo: logo,
      navs: navs.filter((nav) => !nav.isSub),
      subNavs: navs.filter((nav) => nav.isSub),
    };
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
