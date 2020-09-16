import { createApp } from 'vue';

import plugins from '@/plugins';
import router from '@/router';
import stores from '@/stores';
import App from '@/App';

const startApp = async () => {
  const app = createApp(App);
  plugins({ app });
  router({ app });
  await stores({ app });
  app.mount('#root');
};

startApp();
