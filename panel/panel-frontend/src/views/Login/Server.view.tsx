import { type ServerStoreItem } from '@/stores/server.store'
import { NButton, NDivider } from 'naive-ui'
import { Component, Emit, TSX, Vue, Watch } from 'vue-facing-decorator'
import { isURL } from 'class-validator'
import { IconInput } from '@/components/IconInput.component'
import {
  NameSpace,
  User,
  PanelExpansion,
  AppConnectivity,
  ShoppingCart,
  Forum
} from '@vicons/carbon'
import { DynamicInput, type DefaultSlot } from '@/components/DynamicInput.component'

/** @constant 初始化的服务器数据模型 */
interface ServerPreCheckItem extends ServerStoreItem {
  name: string
}

/** @constant 初始化的服务器数据 */
const ServerPreCheckInitItem: ServerPreCheckItem = {
  name: '',
  passport: '',
  backend: '',
  common: '',
  forum: ''
}

interface Emits {
  next: () => void
}

@Component({
  render(this: ServerView) {
    /** @description 动态输入默认插槽 */
    const DefaultDynamicInputSlot = ({ value }: DefaultSlot<ServerPreCheckItem>) => (
      <div class="flex flex-col gap3 w-full">
        <IconInput
          icon={() => <NameSpace />}
          v-model:value={value.name}
          label="名称"
          placeholder="必须唯一"
        />
        <IconInput
          v-model:value={value.passport}
          icon={() => <User />}
          label="账户服务地址"
          placeholder="必填"
        />
        <IconInput
          v-model:value={value.backend}
          icon={() => <PanelExpansion />}
          label="面板服务地址"
          placeholder="必填"
        />
        <IconInput
          v-model:value={value.common}
          icon={() => <AppConnectivity />}
          label="通用服务地址"
          placeholder="必填"
        />
        <IconInput
          v-model:value={value.shop}
          icon={() => <ShoppingCart />}
          label="商店服务地址"
          placeholder="可选"
        />
        <IconInput
          v-model:value={value.forum}
          icon={() => <Forum />}
          label="论坛服务地址"
          placeholder="可选"
        />
        <NDivider />
      </div>
    )

    return (
      <div class="flex flex-col gap3">
        <DynamicInput
          initialValue={ServerPreCheckInitItem}
          v-model:value={this.preCheckServerStoreItem}
        >
          {{ default: DefaultDynamicInputSlot }}
        </DynamicInput>
        <NButton block disabled={this.nextButtonDisabled} type="primary" onClick={this.next}>
          下一步
        </NButton>
      </div>
    )
  }
})
export class ServerView extends TSX<{}, Emits>()(Vue) {
  preCheckServerStoreItem: ServerPreCheckItem[] = []
  nextButtonDisabled = true

  @Watch('preCheckServerStoreItem', { deep: true })
  public onPreCheckServerStoreItemChange() {
    const checkRequired = this.preCheckServerStoreItem.some(
      (item) => !item.name || !item.passport || !item.backend || !item.common
    )
    const checkSameName = this.preCheckServerStoreItem.some(
      (item, index) => this.preCheckServerStoreItem.findIndex((i) => i.name === item.name) !== index
    )
    const checkIsUrl = this.preCheckServerStoreItem.some(
      (item) =>
        !isURL(item.passport) ||
        !isURL(item.backend) ||
        !isURL(item.common) ||
        (item.shop && !isURL(item.shop)) ||
        (item.forum && !isURL(item.forum))
    )
    this.nextButtonDisabled =
      checkRequired || checkSameName || checkIsUrl || this.preCheckServerStoreItem.length === 0
  }

  @Emit('next')
  public next() {}
}
