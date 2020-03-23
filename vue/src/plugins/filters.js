const filters = {
  log: (value, ...rest) => console.log('Output:', value, ...rest) || value,
};

export default ({ Vue, options }) => {
  Object.entries(filters).forEach(([name, filter]) => Vue.filter(name, filter));
};
