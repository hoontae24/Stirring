const iconsContext = require.context(
  '@/components/icons',
  false,
  /(\w+).vue$/,
);

iconsContext.keys().forEach((fileName) => {
  const { default: component } = iconsContext(fileName) || {};
  if (!component) return;
  const pureFileName = (() => {
    try {
      return fileName
        .split('/')
        .pop()
        .replace(/\.vue$/, '');
    } catch (e) {
      return '';
    }
  })();
  exports[component.name || pureFileName] = component;
});
