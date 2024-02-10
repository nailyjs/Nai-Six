import { usePassportStore } from "@/stores/passport.store";
import { NButton, NCard, NInput, NInputGroup, NTab, NTabs } from "naive-ui";
import { Component, Emit, Setup, TSX, Vue } from "vue-facing-decorator";

interface Props {}

interface Events {
  next: string;
}

@Component({
  render(this: LoginLoginView) {
    return (
      <NCard contentClass="flex flex-col w-80 gap3">
        <NTabs size="small" v-model:value={this.passportStore.loginType} type="segment">
          <NTab name={1}>{this.$t("手机")}</NTab>
          <NTab name={2}>{this.$t("邮箱")}</NTab>
        </NTabs>

        <div class="flex flex-col gap3 items-center justify-center">
          <NInput size="large" placeholder={this.passportStore.loginType === 1 ? this.$t("请输入手机号") : this.$t("请输入电子邮箱地址")} />
          <NInputGroup>
            <NInput placeholder={this.$t("请输入验证码")} />
            <NButton type="primary" secondary>
              {this.$t("获取验证码")}
            </NButton>
          </NInputGroup>
          <NButton block type="primary">
            {this.$t("登录")}
          </NButton>
        </div>
      </NCard>
    );
  },
})
export class LoginLoginView extends TSX<Props, Events>()(Vue) implements Props {
  @Setup(() => usePassportStore())
  public readonly passportStore: ReturnType<typeof usePassportStore>;

  @Emit("next")
  public next() {
    return this.passportStore.loginType;
  }

  public async login() {}
}
