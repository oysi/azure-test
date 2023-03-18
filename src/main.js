import { createApp } from 'vue'
// import VueCookies from "vue-cookies"
import App from './App.vue'
import router from './router'

import './assets/main.css'

// Vue.use(VueCookies);



const app = createApp(App)


// app.use(require("vue-cookies"));
app.use(router);

app.mount('#app');
