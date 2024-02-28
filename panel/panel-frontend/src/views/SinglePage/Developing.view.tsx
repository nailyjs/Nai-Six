import { NResult } from 'naive-ui'
import { Component, Prop, TSX, Vue } from 'vue-facing-decorator'

interface Props {
  class?: string | Record<string, boolean>
}

@Component({
  render(this: DevelopingView) {
    return (
      <div>
        <NResult
          class={this.class}
          status="info"
          title="页面开发中"
          description="在这个年代，信息就是金钱，金钱就是信息"
        />
      </div>
    )
  }
})
export class DevelopingView extends TSX<Props>()(Vue) {
  @Prop
  public class: string | Record<string, boolean>
}
