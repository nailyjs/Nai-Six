import { TabType, useWorkspaceStore } from '@/stores/workspace.store'
import { Add, Forum, ShoppingCart, UserAdmin } from '@vicons/carbon'
import { NCard, NGi, NGrid, NH1, NIcon, NText } from 'naive-ui'
import type { Component as IComponent } from 'vue'
import { Component, Setup, Vue } from 'vue-facing-decorator'

@Component({
  render(this: WorkspaceContentIndexView) {
    function SingleCard(title: string, icon: IComponent, onClick: () => void) {
      return (
        <NGi>
          <div class="cursor-pointer" onClick={() => onClick()}>
            <NCard size="small" hoverable contentClass="flex items-center justify-center gap3">
              <NIcon size={20} component={icon} />
              <NText>{title}</NText>
            </NCard>
          </div>
        </NGi>
      )
    }

    function renderTitle() {
      const now = new Date(),
        hour = now.getHours()
      if (hour < 6) {
        return '凌晨好'
      } else if (hour < 9) {
        return '早上好'
      } else if (hour < 12) {
        return '上午好'
      } else if (hour < 14) {
        return '中午好'
      } else if (hour < 17) {
        return '下午好'
      } else if (hour < 19) {
        return '傍晚好'
      } else if (hour < 22) {
        return '晚上好'
      } else {
        return '夜深了'
      }
    }

    return (
      <div>
        <NH1>{renderTitle()}</NH1>
        <NGrid xGap={14} yGap={14} responsive="screen" cols="2 s:5 m:6 l:7 xl:8 2xl:9">
          {SingleCard('新标签页', Add, () =>
            this.workspaceStore.addNewTab('新工作台', TabType.Workspace)
          )}
          {SingleCard('产品', ShoppingCart, () =>
            this.workspaceStore.addNewTab('产品', TabType.Shop)
          )}
          {SingleCard('用户', UserAdmin, () =>
            this.workspaceStore.addNewTab('用户', TabType.Passport)
          )}
          {SingleCard('论坛', Forum, () => this.workspaceStore.addNewTab('论坛', TabType.Forum))}
        </NGrid>
      </div>
    )
  }
})
export default class WorkspaceContentIndexView extends Vue {
  @Setup(() => useWorkspaceStore())
  private readonly workspaceStore: ReturnType<typeof useWorkspaceStore>

  public async mounted() {}
}
