import { Add, ArrowDown, ArrowUp, Delete } from '@vicons/carbon'
import { NButton, NDynamicInput, NTooltip } from 'naive-ui'
import type { Type } from 'naive-ui/es/button/src/interface'
import { Component, Emit, Model, Prop, TSX, Vue } from 'vue-facing-decorator'
import type { JSX } from 'vue/jsx-runtime'

interface ActionSlot {
  value: any
  index: number
  create: (index: number) => void
  remove: (index: number) => void
  move: (type: 'up' | 'down', index: number) => void
}

/**
 * 默认插槽
 *
 * @author Zero <gczgroup@qq.com>
 * @date 2024/02/22
 * @export
 * @interface DefaultSlot
 * @template T
 */
export interface DefaultSlot<T extends Object | Array<any>> {
  value: T
  index: number
}

interface Props {
  initialValue?: any
}

interface Emits {
  create?: (index: number) => any
}

@Component({
  render(this: DynamicInput) {
    function ActionButton(name: string, icon: JSX.Element, type: Type, onClick: () => void) {
      return (
        <NTooltip>
          {{
            trigger: () => (
              <NButton size="small" type={type} circle onClick={onClick}>
                {{ icon: () => icon }}
              </NButton>
            ),
            default: () => name
          }}
        </NTooltip>
      )
    }

    function ActionDynamicInput({ index, create, remove, move }: ActionSlot) {
      return (
        <div class="flex flex-col gap3" style={{ marginLeft: '10px' }}>
          {ActionButton('添加', <Add />, 'primary', () => create(index))}
          {ActionButton('删除', <Delete />, 'error', () => remove(index))}
          {ActionButton('上移', <ArrowUp />, 'info', () => move('up', index))}
          {ActionButton('下移', <ArrowDown />, 'success', () => move('down', index))}
        </div>
      )
    }
    return (
      <NDynamicInput onCreate={() => this.initialValue} v-model:value={this.inputValue}>
        {{
          default: (...args: any[]) => this.$slots.default!(...args),
          action: ActionDynamicInput
        }}
      </NDynamicInput>
    )
  }
})
export class DynamicInput extends TSX<Props, Emits>()(Vue) implements Props {
  @Model({ name: 'value' })
  inputValue?: any

  @Prop
  initialValue?: any

  @Emit('create')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onCreate(_i: number) {}
}
