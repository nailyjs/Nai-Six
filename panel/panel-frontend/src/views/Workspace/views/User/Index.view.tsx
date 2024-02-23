import { NMenu } from 'naive-ui'
import { Component, Vue } from 'vue-facing-decorator'

@Component({
  render() {
    return (
      <div>
        <NMenu />
      </div>
    )
  }
})
export default class UserIndexView extends Vue {}
