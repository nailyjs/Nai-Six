import { createApiInstance } from "@/apis/base.api";
import { sendMailCode, sendSmsCode, validateSendMailCodeResponse } from "@/apis/passport/transport/transport.api";
import { usePassportStore } from "@/stores/passport.store";
import { NButton, NCard, NInput, NInputGroup, NTab, NTabs, useMessage } from "naive-ui";
import { Component, Emit, Setup, TSX, Vue } from "vue-facing-decorator";
import { isEmail, isMobilePhone } from "class-validator";
import { loginByEmail, validateLoginResponse } from "@/apis/passport/login/login.api";

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
          <NInput
            v-model:value={this.identifier}
            size="large"
            placeholder={this.passportStore.loginType === 1 ? this.$t("请输入手机号") : this.$t("请输入电子邮箱地址")}
          />
          <NInputGroup>
            <NInput allowInput={this.onlyAllowSixNumber} v-model:value={this.code} placeholder={this.$t("请输入验证码")} />
            <NButton
              type="primary"
              onClick={this.passportStore.loginType === 1 ? this.sendSmsCode : this.sendMailCode}
              secondary
              disabled={this.isSendingCode || this.isDisabledSendCode}
              loading={this.isSendingCode}
            >
              {this.passportStore.transportCountDown < 60 ? `${this.passportStore.transportCountDown}s` : this.$t("获取验证码")}
            </NButton>
          </NInputGroup>
          <NButton
            disabled={this.isLogining}
            loading={this.isLogining}
            onClick={this.passportStore.loginType === 1 ? this.loginByPhone : this.loginByMail}
            block
            type="primary"
          >
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
  @Setup(() => useMessage())
  public readonly message: ReturnType<typeof useMessage>;

  public identifier = "";
  public code = "";

  mounted() {
    if (this.passportStore.transportCountDown < 60) {
      this.isDisabledSendCode = true;
      const interval = setInterval(() => {
        if (this.passportStore.transportCountDown > 0) {
          this.passportStore.transportCountDown--;
        } else {
          this.isDisabledSendCode = false;
          this.passportStore.transportCountDown = 60;
          clearInterval(interval);
        }
      }, 1000);
    }
  }

  @Emit("next")
  public next() {
    return this.passportStore.loginType;
  }

  public isSendingCode = false;
  public isDisabledSendCode = false;

  public async sendSmsCode() {
    this.isSendingCode = true;
    try {
      if (!isMobilePhone(this.identifier, "zh-CN")) throw new TypeError(this.$t("请输入正确的手机号"));
      const { data } = await sendSmsCode(createApiInstance(this.passportStore.remoteAddress), this.identifier);
      validateSendMailCodeResponse(data);
      const interval = setInterval(() => {
        if (this.passportStore.transportCountDown > 0) {
          this.passportStore.transportCountDown--;
          this.isDisabledSendCode = true;
        } else {
          this.isDisabledSendCode = false;
          this.passportStore.transportCountDown = 60;
          clearInterval(interval);
        }
      }, 1000);
      this.message.success(this.$t("验证码发送成功"));
    } catch (error) {
      console.error(error);
      this.message.error("发送手机验证码失败，错误信息:" + (error as Error).message);
    } finally {
      this.isSendingCode = false;
    }
  }

  public async sendMailCode() {
    this.isSendingCode = true;
    try {
      if (!isEmail(this.identifier)) throw new TypeError(this.$t("请输入正确的邮箱"));
      const { data } = await sendMailCode(createApiInstance(this.passportStore.remoteAddress), this.identifier);
      validateSendMailCodeResponse(data);
      const interval = setInterval(() => {
        if (this.passportStore.transportCountDown > 0) {
          this.passportStore.transportCountDown--;
          this.isDisabledSendCode = true;
        } else {
          this.isDisabledSendCode = false;
          this.passportStore.transportCountDown = 60;
          clearInterval(interval);
        }
      }, 1000);
      this.message.success(this.$t("验证码发送成功"));
    } catch (error) {
      console.error(error);
      this.message.error("发送邮箱验证码失败，错误信息:" + (error as Error).message);
    } finally {
      this.isSendingCode = false;
    }
  }

  public onlyAllowSixNumber(value: string) {
    return !value || (/^\d+$/.test(value) && value.toString().length <= 6);
  }

  public isLogining = false;

  public async loginByMail() {
    try {
      const { data } = await loginByEmail(createApiInstance(this.passportStore.remoteAddress), this.identifier, parseInt(this.code));
      const validateError = validateLoginResponse(data);
      if (validateError) throw validateError.error;
      console.log(data);
    } catch (error) {
      console.error(error);
      this.message.error("登录失败，错误信息: " + (error as Error).message);
    } finally {
      this.isLogining = false;
    }
  }

  public async loginByPhone() {}
}
