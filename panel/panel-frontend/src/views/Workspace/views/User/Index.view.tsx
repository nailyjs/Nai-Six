import { useWorkspaceStore, type OperationTabOptions, TabType } from '@/stores/workspace.store'
import { Dashboard, UserMultiple } from '@vicons/carbon'
import { NIcon, NLayout, NLayoutContent, NLayoutSider, NMenu } from 'naive-ui'
import type { MenuMixedOption } from 'naive-ui/es/menu/src/interface'
import { Component, Setup, Vue, Watch } from 'vue-facing-decorator'
import { RouterView, useRouter } from 'vue-router'

@Component({
  render(this: UserIndexView) {
    return (
      <NLayout contentClass="w-screen!" contentStyle={{ height: 'calc(100vh - 39px)' }} hasSider>
        <NLayoutSider
          collapseMode="transform"
          showTrigger="bar"
          collapsedWidth={0}
          width={240}
          nativeScrollbar={false}
          bordered
        >
          <NMenu v-model:value={this.key} defaultValue={this.key} options={this.menuOptions} />
        </NLayoutSider>
        <NLayoutContent>
          <RouterView class="m6" />
        </NLayoutContent>
      </NLayout>
    )
  }
})
export default class UserIndexView extends Vue {
  @Setup(() => useWorkspaceStore())
  private readonly workspaceStore: ReturnType<typeof useWorkspaceStore>
  @Setup(useRouter)
  private readonly router: ReturnType<typeof useRouter>

  public key = 'dashboard'
  public menuOptions: MenuMixedOption[] = [
    {
      label: '仪表盘',
      key: 'dashboard',
      icon: () => <NIcon component={Dashboard} />
    },
    {
      label: '用户列表',
      key: 'user-list',
      icon: () => <NIcon component={UserMultiple} />
    }
  ]

  public created() {
    const tab = this.workspaceStore.getActiveTab() as OperationTabOptions
    if (tab.activeMenu) {
      this.key = tab.activeMenu
      this.router.push(`/workspace/user/${tab.activeMenu}`)
    } else {
      this.workspaceStore.setActiveMenu(this.key)
      if (this.workspaceStore.getActiveTab().type !== TabType.Workspace) {
        this.router.push(`/workspace/user/${this.key}`)
      }
    }
  }

  @Watch('key')
  public onKeyChange() {
    this.workspaceStore.setActiveMenu(this.key)
    this.router.push(`/workspace/user/${this.key}`)
  }
}
