import { Component, Vue } from 'vue-facing-decorator'
import { ServerView } from './Server.view'
import { NStep, NSteps } from 'naive-ui'

@Component({
  render(this: IndexView) {
    return (
      <div class="flex flex-col justify-center items-center m40">
        <NSteps v-model:current={this.stepCurrent}>
          <NStep title="服务器" description="添加服务器" />
          <NStep title="登录" description="登录管理员账户" />
        </NSteps>

        {this.stepCurrent === 1 && <ServerView onNext={this.onNext} />}
      </div>
    )
  }
})
export default class IndexView extends Vue {
  stepCurrent = 1

  public onNext() {
    this.stepCurrent++
  }
}
