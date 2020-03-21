import Vue from 'vue';

import router from '@/router';
import plugins from '@/plugins';
import App from '@/App';

const options = {};
router({ Vue, options });
plugins({ Vue, options });

new Vue({
  ...options,
  render: h => h(App),
}).$mount('#root');
