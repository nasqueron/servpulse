// import './assets/main.css'; // Customize CSS
import 'foundation-sites/dist/css/foundation.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(router);

app.mount('#app');
