import { createApp } from 'vue';
import App from "./App.vue";
const app = createApp(App);
// import './style.css'

// 0. CSS引入
// import "./css/all.css";
import "./scss/all.css";

// 1. Bootstrap 引入
import "/node_modules/bootstrap/scss/bootstrap.scss";
// import App from './App.vue'

// 2. Axios 引入
import VueAxios from "vue-axios";
import axios from 'axios';
app.use(VueAxios, axios);

// createApp(App).mount('#app')
app.mount("#app")