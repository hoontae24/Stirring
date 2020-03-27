const filters = {
  log: (value, ...rest) => {
    console.log('Output:', value, ...rest);
    return value;
  },

  toUpperCase: value => {
    return (value && typeof value === 'string' && value.toUpperCase()) || value;
  },

  capitalize: value => {
    return (
      (value &&
        typeof value === 'string' &&
        value.charAt(0).toUpperCase() + value.slice(1)) ||
      value
    );
  },
};

export default ({ Vue, vueOptions }) => {
  Object.entries(filters).forEach(([name, filter]) => Vue.filter(name, filter));
};
