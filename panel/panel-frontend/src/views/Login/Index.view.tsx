import { Component, Vue } from 'vue-facing-decorator'
import { ServerView } from './Server/Index.view'
import { NStep, NSteps } from 'naive-ui'
import { LoginView } from './Login/Login.view'

@Component({
  render(this: LoginIndexView) {
    return (
      <div class="flex flex-col justify-center items-center mt20">
        <div class="w80 flex flex-col gap5">
          <NSteps current={this.stepCurrent}>
            <NStep title="服务器" description="添加服务器" />
            <NStep title="登录" description="登录管理员账户" />
          </NSteps>

          {this.stepCurrent === 1 ? <ServerView onNext={this.onNext} /> : <LoginView />}
        </div>
      </div>
    )
  }
})
export default class LoginIndexView extends Vue {
  stepCurrent = 1

  public onNext() {
    this.stepCurrent++
  }
}
