export default ({ app }) => {
  const requireComponent = require.context(
    '@/components/_globals/',
    false,
    /(\w+).vue$/,
  );

  requireComponent.keys().forEach(fileName => {
    const { default: component } = requireComponent(fileName) || {};
    if (!component) return;
    app.component(component.name, component);
  });
};
