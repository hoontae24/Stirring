import { createApp } from 'vue';

import plugins from '@/plugins';
import router from '@/router';
import stores from '@/stores';
import App from '@/App';

(function startApp() {
  const app = createApp(App);
  plugins({ app });
  router({ app });
  stores({ app });
  app.mount('#root');
})();
