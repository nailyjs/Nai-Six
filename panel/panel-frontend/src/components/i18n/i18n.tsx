import { useMetaStore } from "@/stores/meta.store";
import { NSelect } from "naive-ui";
import { Component, Prop, Setup, TSX, Vue } from "vue-facing-decorator";

interface Props {
  type?: "icon" | "select";
}

@Component({
  render(this: I18nComponent) {
    return (
      <>
        {this.type === "icon" ? (
          <></>
        ) : (
          <NSelect
            defaultValue={this.$i18n.locale}
            size="small"
            onUpdate:value={(value) => {
              this.$i18n.locale = value;
              this.metaStore.locale = value;
            }}
            options={this.$i18n.availableLocales.map((item) => ({
              key: item,
              value: item,
              label: item,
            }))}
          />
        )}
      </>
    );
  },
})
export default class I18nComponent extends TSX<Props>()(Vue) implements Props {
  @Prop()
  type?: "icon" | "select";

  @Setup(() => useMetaStore())
  public metaStore: ReturnType<typeof useMetaStore>;
}
