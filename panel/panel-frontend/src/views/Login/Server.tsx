import { checkBackendAddressResponse } from "@/apis/backend/Home.api";
import { createApiInstance } from "@/apis/base.api";
import { checkPassportAddressResponse } from "@/apis/passport/Home.api";
import { usePassportStore } from "@/stores/passport.store";
import { NButton, NCard, NInput, NText, useDialog } from "naive-ui";
import { Component, Emit, Setup, TSX, Vue } from "vue-facing-decorator";

interface Props {}

interface Events {
  next: string;
}

@Component({
  render(this: LoginServerView) {
    return (
      <NCard class="min-w-80">
        <div class="flex flex-col gap3 items-center justify-center">
          <NInput v-model:value={this.passportStore.remoteAddress} size="large" placeholder={this.$t("请输入验证服务地址")} />
          <NInput v-model:value={this.passportStore.backendAddress} size="large" placeholder={this.$t("请输入面板服务地址")} />
          <NText>{this.$t("我们会检测您填写的地址的状态，以便您登录。")}</NText>
          <NButton onClick={this.detectServer} disabled={this.isDetecting} loading={this.isDetecting} size="large" block type="primary">
            {this.isDetecting ? this.$t("正在检测中") : this.$t("检测服务器")}
          </NButton>
        </div>
      </NCard>
    );
  },
})
export default class LoginServerView extends TSX<Props, Events>()(Vue) implements Props {
  @Setup(() => useDialog())
  dialog: ReturnType<typeof useDialog>;
  @Setup(() => usePassportStore())
  passportStore: ReturnType<typeof usePassportStore>;
  public isDetecting = false;

  @Emit("next")
  public next() {
    return this.passportStore.remoteAddress;
  }

  public async detectServer() {
    try {
      this.isDetecting = true;
      const random = Math.random().toString(36).substring(7);
      const apiInstance = createApiInstance();
      const [passportAddress, backendAddress] = await Promise.all([
        apiInstance.get(this.passportStore.remoteAddress, {
          params: { test: random },
        }),
        apiInstance.get(this.passportStore.backendAddress, {
          params: { test: random },
        }),
      ]);
      const { error: passportError } = checkPassportAddressResponse(passportAddress.data);
      if (passportError) throw new Error(this.$t("您填入的API不是账户后端服务的API地址,请检查账户手段服务地址是否正确"));
      const backend = checkBackendAddressResponse(backendAddress.data, random);
      if (backend.error) throw new Error(this.$t("您填入的API不是面板后端服务的API地址,请检查面板后端服务地址是否正确"));
      this.next();
    } catch (error) {
      console.error(error);
      const err = error as Error;
      this.dialog.error({ title: this.$t("检测失败请检查地址是否正确"), content: err.message });
    } finally {
      this.isDetecting = false;
    }
  }
}
