import Vue from 'vue';

import router from '@/router';
import plugins from '@/plugins';
import App from '@/App';

const vueOptions = {};
router({ Vue, vueOptions });
plugins({ Vue, vueOptions });

new Vue({
  ...vueOptions,
  render: h => h(App),
}).$mount('#root');
