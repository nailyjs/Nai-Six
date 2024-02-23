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
            <NCard hoverable contentClass="flex flex-col items-center justify-center gap3">
              <NIcon size={50} component={icon} />
              <NText>{title}</NText>
            </NCard>
          </div>
        </NGi>
      )
    }

    return (
      <>
        <NH1>您好</NH1>
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
      </>
    )
  }
})
export default class WorkspaceContentIndexView extends Vue {
  @Setup(() => useWorkspaceStore())
  private workspaceStore: ReturnType<typeof useWorkspaceStore>
}
