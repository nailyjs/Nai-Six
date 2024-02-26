import { NH1 } from 'naive-ui'
import { Component, Vue } from 'vue-facing-decorator'

@Component({
  render(this: UserDashboardView) {
    return (
      <div>
        <NH1>仪表盘</NH1>
      </div>
    )
  }
})
export default class UserDashboardView extends Vue {}
