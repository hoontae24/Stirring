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
          <button @click="state.uploadDialogOpen = true">
            upload {{ state.uploadDialogOpen }}
          </button>
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
    <UploadDialog
      :open="state.uploadDialogOpen"
      @close="state.uploadDialogOpen = false"
    >
    </UploadDialog>
  </div>
</template>

<script>
import { reactive } from 'vue';

import Container from '@/components/layouts/Container';
import UploadDialog from '@/components/post/UploadDialog';
import NavLink from './NavLink';

import logo from '@/assets/logo.png';
import navs from '@/consts/navs';
import { useAuthStore } from '@/stores/viewer';

export default {
  name: 'Appbar',
  components: {
    NavLink,
    Container,
    UploadDialog,
  },
  props: {
    'hide-menu': Boolean,
  },
  setup() {
    const authStore = useAuthStore();
    const viewer = authStore.getViewer();

    const state = reactive({
      uploadDialogOpen: false,
    });
    return {
      viewer,
      authStore,
      logo: logo,
      navs: navs.filter((nav) => !nav.isSub),
      subNavs: navs.filter((nav) => nav.isSub),
      state,
    };
  },
};
</script>

<style scoped lang="scss">
.root.appbar {
  position: -webkit-sticky;
  position: sticky;
  top: 0px;
  z-index: #{$z-index-appBar};

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
