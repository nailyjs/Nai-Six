import "uno.css";
import "./assets/main.less";

import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { createI18n } from "vue-i18n";

import router from "./router";
import AppComponent from "./App";

import "vfonts/FiraCode.css";
import { messages } from "./i18n/lang";

const app = createApp(AppComponent);

app.use(
  createI18n({
    locale: "简体中文",
    fallbackLocale: "简体中文",
    messages: messages,
  }),
);
app.use(createPinia().use(piniaPluginPersistedstate));
app.use(router);

app.mount("#app");
