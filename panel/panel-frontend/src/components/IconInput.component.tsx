import { NIcon, NInput, NText } from 'naive-ui'
import { Component, Emit, Model, Prop, TSX, Vue } from 'vue-facing-decorator'
import type { JSX } from 'vue/jsx-runtime'

interface Props {
  icon: () => JSX.Element
  placeholder?: string
  value?: string
  label?: string
  fontSize?: string
  iconSize?: string
  loading?: boolean
}

interface Emits {
  change?: (value: string) => void
}

@Component({
  render(this: IconInput) {
    return (
      <div>
        {this.label ? (
          <div class="flex flex-col gap1">
            <div class="flex items-center gap1">
              <NIcon size={this.iconSize} component={this.icon()} />
              <NText class={this.fontSize ? this.fontSize : 'font-size-3'}>{this.label}</NText>
            </div>
            <NInput
              v-model:value={this.inputValue}
              placeholder={this.placeholder}
              onChange={this.onChange}
              loading={this.loading}
            />
          </div>
        ) : (
          <div class="flex items-center gap3">
            <NIcon size="large" component={this.icon()} />
            <NInput
              v-model:value={this.inputValue}
              placeholder={this.placeholder}
              onChange={this.onChange}
              loading={this.loading}
            />
          </div>
        )}
      </div>
    )
  }
})
export class IconInput extends TSX<Props, Emits>()(Vue) implements Props {
  @Prop
  icon: () => JSX.Element

  @Prop
  placeholder: string

  @Prop
  label?: string

  @Prop
  fontSize?: string

  @Prop
  iconSize?: string

  @Prop
  loading?: boolean

  @Model({ name: 'value' })
  inputValue?: string

  @Emit('change')
  onChange(value: string) {
    return value
  }
}
