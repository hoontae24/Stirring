import { createApp } from 'vue';

import router from '@/router';
import plugins from '@/plugins';
import App from '@/App';

const app = createApp(App);
plugins({ app });
router({ app });
app.mount('#root');
