import { Component, Prop, Setup, TSX, Vue } from 'vue-facing-decorator'
import { NTabs, NTab, NButton, NIcon } from 'naive-ui'
import { TabType, useWorkspaceStore } from '@/stores/workspace.store'
import { Settings } from '@vicons/carbon'
import TabSettingView from './TabSetting.view'
import type { StyleValue } from 'vue'

interface Props {
  class?: string | Record<string, boolean>
  style?: string | StyleValue
}

@Component({
  render(this: WorkspaceTabView) {
    return (
      <div class={this.class} style={this.style}>
        <TabSettingView v-model:show={this.isShowModal} />
        <NTabs
          size="small"
          v-model:value={this.workspaceStore.activeTab}
          type="card"
          closable={true}
          placement="bottom"
          addable={true}
          onAdd={() => this.workspaceStore.addNewTab('新工作台', TabType.Workspace)}
          onClose={(name) => this.workspaceStore.removeTab(name)}
        >
          {{
            default: () =>
              this.workspaceStore.tabs.map((tab) => (
                <NTab name={tab.name} closable={this.workspaceStore.tabs.length !== 1} />
              )),
            suffix: () => (
              <NButton
                class="mr2.5"
                circle
                size="tiny"
                type="primary"
                onClick={() => this.onClickSetting()}
              >
                {{ icon: () => <NIcon component={Settings} /> }}
              </NButton>
            )
          }}
        </NTabs>
      </div>
    )
  }
})
export default class WorkspaceTabView extends TSX<Props>()(Vue) implements Props {
  @Setup(() => useWorkspaceStore())
  private readonly workspaceStore: ReturnType<typeof useWorkspaceStore>

  @Prop
  public class: string | Record<string, boolean>

  @Prop
  public style: string | StyleValue

  public isShowModal = false

  onClickSetting() {
    this.isShowModal = true
  }
}
