import { defineStore } from "pinia";

interface State {
  remoteAddress: string;
  backendAddress: string;
  loginType: 1 | 2;
  loginIdentifier: string;
}

export const usePassportStore = defineStore("cc_naily_panel_six_passport", {
  state(): State {
    return {
      remoteAddress: "",
      backendAddress: "",
      loginType: 1,
      loginIdentifier: "",
    };
  },
  actions: {},
  persist: {
    storage: localStorage,
    debug: true,
  },
});
