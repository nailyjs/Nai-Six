import "uno.css";
import "./assets/main.less";

import { createApp } from "vue";
import { createPinia } from "pinia";

import router from "./router";
import AppComponent from "./App";

import "vfonts/FiraCode.css";

const app = createApp(AppComponent);

app.use(createPinia());
app.use(router);

app.mount("#app");
