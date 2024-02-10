import { Component, Setup, Vue } from "vue-facing-decorator";
import { NConfigProvider, NDialogProvider, NMessageProvider, darkTheme, useOsTheme } from "naive-ui";
import { RouterView } from "vue-router";
import { Suspense } from "vue";

@Component({
  render(this: AppComponent) {
    return (
      <NConfigProvider theme={this.theme === "dark" ? darkTheme : null}>
        <NMessageProvider>
          <NDialogProvider>
            <Suspense>
              <RouterView />
            </Suspense>
          </NDialogProvider>
        </NMessageProvider>
      </NConfigProvider>
    );
  },
})
export default class AppComponent extends Vue {
  @Setup(() => useOsTheme())
  theme: "light" | "dark" = "light";
}
