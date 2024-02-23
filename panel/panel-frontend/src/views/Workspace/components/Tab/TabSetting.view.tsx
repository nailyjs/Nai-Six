import { IconInput } from '@/components/IconInput.component'
import { useWorkspaceStore } from '@/stores/workspace.store'
import { NameSpace } from '@vicons/carbon'
import { NButton, NModal, useMessage } from 'naive-ui'
import { Component, Model, Setup, TSX, Vue } from 'vue-facing-decorator'

interface Props {
  show?: boolean
}

@Component({
  render(this: TabSettingView) {
    return (
      <NModal v-model:show={this.isShowModal} title="页面设置" preset="dialog">
        {{
          default: () => (
            <div class="mt5">
              <IconInput
                v-model:value={this.newTabName}
                fontSize="font-size-3.5"
                iconSize="medium"
                icon={() => <NameSpace />}
                label="当前页面名称"
              />
            </div>
          ),
          action: () => (
            <NButton type="primary" size="small" onClick={() => this.save()}>
              保存
            </NButton>
          )
        }}
      </NModal>
    )
  }
})
export default class TabSettingView extends TSX<Props>()(Vue) {
  @Setup(() => useWorkspaceStore())
  private readonly workspaceStore: ReturnType<typeof useWorkspaceStore>

  @Setup(() => useMessage())
  private readonly message: ReturnType<typeof useMessage>

  @Model({ name: 'show', type: Boolean })
  public isShowModal = false

  public newTabName = ''

  public mounted() {
    this.newTabName = this.workspaceStore.activeTab
  }

  public save() {
    if (
      !this.workspaceStore.haveTab(this.newTabName) ||
      this.newTabName === this.workspaceStore.activeTab
    ) {
      this.workspaceStore.setActiveTabName(this.workspaceStore.activeTab, this.newTabName)
      this.isShowModal = false
    } else {
      this.message.error('页面名称已存在')
      throw new Error()
    }
  }
}
