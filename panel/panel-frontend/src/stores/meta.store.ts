import { defineStore } from "pinia";

export const useMetaStore = defineStore("cc_naily_panel_six_meta", {
  state: () => {
    return {
      locale: "简体中文",
    };
  },
  persist: {
    storage: localStorage,
    debug: true,
  },
});
