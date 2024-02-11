import { defineStore } from "pinia";

interface State {
  remoteAddress: string;
  backendAddress: string;
  loginType: 1 | 2;
  loginIdentifier: string;
  transportCountDown: number;
  jwtToken: string[];
}

export const usePassportStore = defineStore("cc_naily_panel_six_passport", {
  state(): State {
    return {
      remoteAddress: "",
      backendAddress: "",
      loginType: 1,
      loginIdentifier: "",
      transportCountDown: 60,
      jwtToken: [],
    };
  },
  actions: {},
  persist: {
    storage: localStorage,
    debug: true,
  },
});
