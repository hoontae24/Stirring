import element from './element-ui';
import components from './components';
import filters from './filters';

export default ({ Vue, options }) => {
  element({ Vue, options });
  components({ Vue, options });
  filters({ Vue, options });
};
