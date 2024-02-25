import { Component, Setup, Vue } from 'vue-facing-decorator'
import WorkspaceTabView from './components/Tab/Tab.view'
import WorkspaceContentIndexView from './views/NewTab/Index.view'
import { useWorkspaceStore } from '@/stores/workspace.store'
import { DevelopingView } from '../SinglePage/Developing.view'
import { type StyleValue } from 'vue'
import { useServerStore } from '@/stores/server.store'

@Component({
  render(this: WorkspaceIndexView) {
    return (
      <div>
        {this.workspaceStore.tabs.map((tab) => {
          if (tab.type === 'workspace') {
            return (
              <div
                v-show={this.workspaceStore.activeTab === tab.name}
                class={this.containerClass}
                style={this.containerStyle}
              >
                <WorkspaceContentIndexView />
              </div>
            )
          } else {
            return (
              <div
                v-show={this.workspaceStore.activeTab === tab.name}
                class={this.containerClass}
                style={this.containerStyle}
              >
                <DevelopingView />
              </div>
            )
          }
        })}
        <WorkspaceTabView class="fixed w-full bottom-0 mt4" />
      </div>
    )
  }
})
export default class WorkspaceIndexView extends Vue {
  @Setup(() => useWorkspaceStore())
  private readonly workspaceStore: ReturnType<typeof useWorkspaceStore>
  @Setup(() => useServerStore())
  private serverStore: ReturnType<typeof useServerStore>

  public containerClass = 'fixed top-0 left-0'
  public containerStyle: StyleValue = {
    margin: '1rem',
    width: 'calc(100% - 2rem)',
    height: 'calc(100% - 2rem)'
  }

  public async created() {
    if (this.serverStore.active) {
      this.serverStore.setActiveServer(this.serverStore.active)
    }
    const { data } = await usePassport.get('/user/logging')
  }
}
