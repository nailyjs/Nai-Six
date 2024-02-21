import { type ServerStoreItem } from '@/stores/server.store'
import { NButton, NDynamicInput, NInput } from 'naive-ui'
import type { Type } from 'naive-ui/es/button/src/interface'
import { Component, Emit, TSX, Vue } from 'vue-facing-decorator'

interface ServerPreCheckItem extends ServerStoreItem {
  name: string
}

interface Emit {
  next: () => void
}

@Component({
  render(this: ServerView) {
    function DefaultDynamicInput({ value }: { value: ServerPreCheckItem; index: number }) {
      return (
        <div class="flex flex-col gap3">
          <NInput v-model:value={value.name} placeholder="请填写名称 必须唯一" />
          <NInput v-model:value={value.passport} placeholder="请填写账户服务地址" />
          <NInput v-model:value={value.backend} placeholder="请填写面板服务地址" />
        </div>
      )
    }

    return (
      <>
        <NDynamicInput
          onRemove={this.onRemove}
          onCreate={this.onCreate}
          v-model:value={this.preCheckServerStoreItem}
        >
          {{ default: DefaultDynamicInput, 'create-button-default': () => '添加服务地址' }}
        </NDynamicInput>
        <div>{JSON.stringify(this.preCheckServerStoreItem)}</div>
        <NButton block disabled={this.nextButtonDisabled} type="primary">
          下一步
        </NButton>
      </>
    )
  }
})
export class ServerView extends TSX<{}, Emit>()(Vue) {
  preCheckServerStoreItem: ServerPreCheckItem[] = []
  nextButtonDisabled = true

  public onCreate(): ServerPreCheckItem {
    if (this.nextButtonDisabled) this.nextButtonDisabled = false
    return {
      name: '',
      passport: '',
      backend: ''
    }
  }

  public onRemove() {
    if (this.preCheckServerStoreItem.length === 0) this.nextButtonDisabled = true
  }

  @Emit('next')
  public next() {}

  public checker() {}
}
