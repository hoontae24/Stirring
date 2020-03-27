import element from './element-ui';
import components from './components';
import filters from './filters';

export default ({ Vue, vueOptions }) => {
  element({ Vue, vueOptions });
  components({ Vue, vueOptions });
  filters({ Vue, vueOptions });
};
