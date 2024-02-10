import { fileURLToPath, URL } from "node:url";
import UnoCSS from "unocss/vite";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { presetUno } from "@unocss/preset-uno";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "0.0.0.0",
  },
  plugins: [
    vue({
      script: {
        babelParserPlugins: ["decorators", "jsx"],
      },
    }),
    vueJsx({
      babelPlugins: [["@babel/plugin-proposal-decorators", { version: "2023-05" }]],
    }),
    UnoCSS({
      presets: [presetUno()],
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
