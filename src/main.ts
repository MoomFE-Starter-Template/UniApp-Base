import { createSSRApp } from 'vue';
import App from './App.vue';
import pinia from '@/modules/pinia/index';

import 'uno.css';
import '@/styles/styles.scss';

export function createApp() {
  const app = createSSRApp(App);

  app.use(pinia);

  return {
    app,
  };
}
