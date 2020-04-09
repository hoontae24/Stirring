export default ({ app }) => {
  const vueInstance = {
    beforeCreate() {
      this.console = console;
    },
  };

  app.mixin(vueInstance);
};
