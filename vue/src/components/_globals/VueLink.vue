<template>
  <el-link class="root" v-bind="passedProps" @click="handleClick">
    <slot></slot>
  </el-link>
</template>

<script>
export default {
  name: 'vue-link',
  props: {
    underline: { type: Boolean, default: false },
    type: { type: String },
    disabled: { type: Boolean },
    icon: { type: String },
    href: { type: String }, // routing by Browser
    linkTo: { type: [String, Object] }, // routing by Vue Router
  },
  computed: {
    useRouter() {
      return Boolean(!this.href && this.linkTo);
    },
    route() {
      const { href, linkTo } = this;

      if (href) return { path: href };
      if (linkTo) {
        return typeof linkTo === 'string' ? { path: linkTo } : linkTo;
      }
      return {};
    },
    passedProps() {
      const { linkTo, ...props } = this.$props || {};
      return {
        ...props,
      };
    },
  },
  methods: {
    handleClick(e) {
      if (this.useRouter) {
        this.$router.pushRoute(this.route);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.root {
  cursor: pointer;
}
</style>
