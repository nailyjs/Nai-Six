import { Component, Setup, Vue } from 'vue-facing-decorator'
import WorkspaceTabView from './components/Tab/Tab.view'
import WorkspaceContentIndexView from './views/NewTab/Index.view'
import { TabType, useWorkspaceStore } from '@/stores/workspace.store'
import { DevelopingView } from '../SinglePage/Developing.view'
import { type StyleValue } from 'vue'
import { useServerStore } from '@/stores/server.store'
import { LoggingSchema } from './validator/Index.validator'
import UserIndexView from './views/User/Index.view'
import { useOsTheme } from 'naive-ui'

@Component({
  render(this: WorkspaceIndexView) {
    return (
      <div>
        {this.workspaceStore.tabs.map((tab) => {
          if (tab.type === TabType.Workspace) {
            return (
              <div
                v-show={this.workspaceStore.activeTab === tab.name}
                class={this.containerClass}
                style={this.containerStyle}
              >
                <WorkspaceContentIndexView />
              </div>
            )
          } else if (tab.type === TabType.Passport) {
            return (
              <div v-show={this.workspaceStore.activeTab === tab.name} class={this.containerClass}>
                <UserIndexView />
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
        <WorkspaceTabView
          class="fixed w-full bottom-0"
          style={{ backgroundColor: this.osTheme === 'dark' ? '#101014' : '#FFFFFF' }}
        />
      </div>
    )
  }
})
export default class WorkspaceIndexView extends Vue {
  @Setup(() => useWorkspaceStore())
  private readonly workspaceStore: ReturnType<typeof useWorkspaceStore>
  @Setup(() => useServerStore())
  private readonly serverStore: ReturnType<typeof useServerStore>
  @Setup(useOsTheme)
  private readonly osTheme: 'light' | 'dark'

  public containerClass = 'fixed top-0 left-0'
  public containerStyle: StyleValue = {
    margin: '1rem',
    width: 'calc(100% - 2rem)',
    height: 'calc(100% - 2rem)'
  }

  public async created() {
    if (this.serverStore.active) this.serverStore.setActiveServer(this.serverStore.active)
    const { data } = await usePassport.get('/user/logging')
    const parsedData = LoggingSchema.parse(data)
    this.workspaceStore.setUserInfo(parsedData.data.user)
  }
}
