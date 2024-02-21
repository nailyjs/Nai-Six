import { Component, Setup, Vue } from 'vue-facing-decorator'
import { NConfigProvider, NMessageProvider, darkTheme, useOsTheme } from 'naive-ui'
import { RouterView } from 'vue-router'

@Component({
  render(this: AppComponent) {
    return (
      <NConfigProvider theme={this.osTheme === 'dark' ? darkTheme : null}>
        <NMessageProvider>
          <RouterView />
        </NMessageProvider>
      </NConfigProvider>
    )
  }
})
export default class AppComponent extends Vue {
  @Setup(() => useOsTheme())
  private osTheme: 'dark' | 'light'
}
