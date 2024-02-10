import { NStep, NSteps } from "naive-ui";
import { Component, Setup, Vue } from "vue-facing-decorator";
import LoginServerView from "./Login/Server";
import I18nComponent from "@/components/i18n/i18n";
import { LoginLoginView } from "./Login/Login";
import { usePassportStore } from "@/stores/passport.store";

@Component({
  render(this: LoginView) {
    return (
      <div id="naily_login" class="h-screen w-screen flex flex-col justify-center items-center">
        <div class="flex flex-col gap3 justify-center items-center">
          <div class="w-full flex flex-col gap3 justify-center items-center">
            <NSteps current={this.step_current}>
              <NStep title={this.$t("服务器")} description={this.$t("添加服务器以登录")} />
              <NStep title={this.$t("登录")} description={this.$t("登录您的账户")} />
            </NSteps>
            {this.step_current === 1 ? (
              <LoginServerView onNext={() => this.step_current++} />
            ) : (
              <LoginLoginView
                onNext={(url) => {
                  console.log(url);
                }}
              />
            )}
          </div>
          <I18nComponent />
        </div>
      </div>
    );
  },
})
export default class LoginView extends Vue {
  @Setup(() => usePassportStore())
  public readonly passportStore: ReturnType<typeof usePassportStore>;

  public step_current = 1;

  public async login() {}
}
