import { Component, Setup, Vue } from 'vue-facing-decorator'
import { RouterView } from 'vue-router'
import {
  NConfigProvider,
  NMessageProvider,
  NScrollbar,
  darkTheme,
  useOsTheme,
  zhCN
} from 'naive-ui'

@Component({
  render(this: AppComponent) {
    return (
      <div>
        <NConfigProvider theme={this.osTheme === 'dark' ? darkTheme : null} locale={zhCN}>
          <NMessageProvider>
            <NScrollbar class="h-screen">
              <RouterView />
            </NScrollbar>
          </NMessageProvider>
        </NConfigProvider>
      </div>
    )
  }
})
export default class AppComponent extends Vue {
  @Setup(() => useOsTheme())
  private osTheme: 'dark' | 'light'
}
