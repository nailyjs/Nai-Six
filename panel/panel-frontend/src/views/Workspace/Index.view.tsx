import { Component, Setup, Vue } from 'vue-facing-decorator'
import WorkspaceTabView from './components/Tab/Tab.view'
import WorkspaceContentIndexView from './views/NewTab/Index.view'
import { useWorkspaceStore } from '@/stores/workspace.store'
import { DevelopingView } from '../SinglePage/Developing.view'

@Component({
  render(this: WorkspaceIndexView) {
    return (
      <div>
        <div class="pl4 pr4 mt4">
          {this.workspaceStore.getActiveTab().type === 'workspace' ? (
            <WorkspaceContentIndexView />
          ) : (
            <DevelopingView class="mt20" />
          )}
        </div>
        <WorkspaceTabView class="fixed w-full bottom-0 mt4" />
      </div>
    )
  }
})
export default class WorkspaceIndexView extends Vue {
  @Setup(() => useWorkspaceStore())
  private readonly workspaceStore: ReturnType<typeof useWorkspaceStore>
}
