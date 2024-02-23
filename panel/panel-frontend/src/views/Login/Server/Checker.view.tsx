import { NModal } from 'naive-ui'
import { Component, TSX, Vue } from 'vue-facing-decorator'

@Component({
  render() {
    return (
      <div>
        <NModal preset="dialog" title="服务检查">
          Hello world
        </NModal>
      </div>
    )
  }
})
export default class ServerCheckerView extends TSX()(Vue) {}
