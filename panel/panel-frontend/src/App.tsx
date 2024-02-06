import { Component, Setup, Vue } from "vue-facing-decorator";
import { NConfigProvider, NMessageProvider, darkTheme, useOsTheme } from "naive-ui";
import { RouterView } from "vue-router";
import { Suspense } from "vue";

@Component({
  render(this: AppComponent) {
    return (
      <NConfigProvider theme={this.theme === "dark" ? darkTheme : null}>
        <NMessageProvider>
          <Suspense>
            <RouterView />
          </Suspense>
        </NMessageProvider>
      </NConfigProvider>
    );
  },
})
export default class AppComponent extends Vue {
  @Setup(() => useOsTheme())
  theme: "light" | "dark" = "light";
}
