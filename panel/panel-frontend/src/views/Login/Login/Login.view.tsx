import { IconInput } from '@/components/IconInput.component'
import { Email, Password, Phone } from '@vicons/carbon'
import { NButton, NIcon, NInput, NInputGroup, NTab, NTabs, useMessage } from 'naive-ui'
import { Component, Setup, Vue } from 'vue-facing-decorator'
import { TransportEmailSchema, TransportPhoneSchema } from '../validator/Transport.validator'
import { Intercept } from '@/decorators/intercept.decorator'
import { LoginFilter, LoginSendCodeFilter } from './errors/Login.filter'
import { LoginByPhoneSchema } from './validator/Login.validator'
import { useServerStore } from '@/stores/server.store'
import { useRouter } from 'vue-router'

@Component({
  render(this: LoginView) {
    return (
      <div>
        <NTabs type="segment" v-model:value={this.loginType}>
          <NTab name="phone" label="手机" />
          <NTab name="email" label="邮箱" />
        </NTabs>
        <div class="mt5 flex flex-col gap5">
          <IconInput
            v-model:value={this.phoneOrEmail}
            inputProps={{ type: 'tel' }}
            placeholder={`请输入${this.loginType === 'phone' ? '手机号' : '电子邮箱地址'}`}
            icon={() => <NIcon component={this.loginType === 'phone' ? Phone : Email} />}
          />
          <NInputGroup>
            <div class="flex items-center w-full gap3">
              <NIcon size="large" component={Password} />
              <NInput v-model:value={this.verifyCode} placeholder="请输入验证码" maxlength={6} />
            </div>
            <NButton
              type="primary"
              secondary
              loading={this.isSendingCode}
              disabled={this.isSendingCode || this.isForceDisabledSendCode}
              onClick={() =>
                this.loginType === 'phone' ? this.sendPhoneCode() : this.sendEmailCode()
              }
            >
              获取验证码
            </NButton>
          </NInputGroup>
          <NButton
            onClick={() => (this.loginType === 'phone' ? this.loginByPhone() : null)}
            type="primary"
            loading={this.isLoginning}
            disabled={this.isLoginning}
          >
            登录
          </NButton>
        </div>
      </div>
    )
  }
})
export class LoginView extends Vue {
  @Setup(useMessage)
  public message: ReturnType<typeof useMessage>
  @Setup(() => useServerStore())
  public serverStore: ReturnType<typeof useServerStore>
  @Setup(() => useRouter())
  public router: ReturnType<typeof useRouter>

  public loginType: 'phone' | 'email' = 'phone'
  public isLoginning = false
  public isSendingCode = false
  public isForceDisabledSendCode = false

  public phoneOrEmail = ''
  public verifyCode = ''

  @Intercept(new LoginSendCodeFilter())
  public async sendPhoneCode() {
    const { data } = await usePassport.post('/transport/sms', {
      phone: this.phoneOrEmail
    })
    const parsedData = TransportPhoneSchema.parse(data)
    if (parsedData.data.SendStatusSet[0].Code === 'Ok') {
      this.message.success('验证码发送成功')
    }
  }

  @Intercept(new LoginSendCodeFilter())
  public async sendEmailCode() {
    const { data } = await usePassport.post('/transport/email', {
      email: this.phoneOrEmail
    })
    TransportEmailSchema.parse(data)
    this.message.success('验证码发送成功')
  }

  @Intercept(new LoginFilter())
  public async loginByPhone() {
    const { data } = await usePassport.post('/login/phone/code', {
      loginType: 'Panel',
      phone: this.phoneOrEmail,
      code: parseInt(this.verifyCode),
      loginClient: window.navigator.userAgent,
      loginDeviceName: window.navigator.platform ?? window.navigator.userAgent,
      identifier: `panel-frontend-${window.location.origin}`
    })
    const parsedData = LoginByPhoneSchema.parse(data)
    this.serverStore.setAccessToken(parsedData.data.access_token)
    this.message.success('登录成功')
    this.router.push('/workspace')
  }
}
