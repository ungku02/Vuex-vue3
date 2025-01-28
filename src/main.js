// import './assets/main.css'
//import bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { createApp } from 'vue'
import App from './App.vue'
import store from './stores/store';
import router from './router'

const app = createApp(App)

app.use(router)
app.use(store); 
app.mount('#app')
