import { type ServerStoreItem } from '@/stores/server.store'
import { NButton, NDivider, NIcon, NLi, NText, useDialog, useMessage } from 'naive-ui'
import { Component, Emit, Setup, TSX, Vue, Watch } from 'vue-facing-decorator'
import { isURL } from 'class-validator'
import { IconInput } from '@/components/IconInput.component'
import { DynamicInput, type DefaultSlot } from '@/components/DynamicInput.component'
import axios from 'axios'
import { DefaultConnectionDataSchema } from './validator/Connection.validator'
import { Intercept } from '@/decorators/intercept.decorator'
import { AutoCompleteFilter } from './Server/errors/Index.filter'
import {
  NameSpace,
  User,
  PanelExpansion,
  AppConnectivity,
  ShoppingCart,
  Forum,
  Help
} from '@vicons/carbon'

/** @constant 初始化的服务器数据模型 */
interface ServerPreCheckItem extends ServerStoreItem {
  name: string
}

/** @constant 初始化的服务器数据 */
const ServerPreCheckInitItem: ServerPreCheckItem = {
  name: '',
  passport: '',
  backend: '',
  common: '',
  forum: ''
}

interface Emits {
  next: () => void
}

@Component({
  render(this: ServerView) {
    /** @description 动态输入默认插槽 */
    const DefaultDynamicInputSlot = ({ value }: DefaultSlot<ServerPreCheckItem>) => (
      <div class="flex flex-col gap3 w-full">
        <IconInput
          icon={() => <NameSpace />}
          v-model:value={value.name}
          label="名称"
          placeholder="必须唯一 最好不要带有空格等"
        />
        <IconInput
          v-model:value={value.backend}
          icon={() => <PanelExpansion />}
          label="面板服务地址"
          placeholder="必填 填写后会自动扫描服务"
          onChange={(v) => this.autoComplete(v as unknown as string)}
          loading={this.isFinding}
        />
        <IconInput
          v-model:value={value.passport}
          icon={() => <User />}
          label="账户服务地址"
          placeholder="必填"
        />
        <IconInput
          v-model:value={value.common}
          icon={() => <AppConnectivity />}
          label="通用服务地址"
          placeholder="必填"
        />
        <IconInput
          v-model:value={value.shop}
          icon={() => <ShoppingCart />}
          label="商店服务地址"
          placeholder="可选"
        />
        <IconInput
          v-model:value={value.forum}
          icon={() => <Forum />}
          label="论坛服务地址"
          placeholder="可选"
        />
        <NDivider />
      </div>
    )

    return (
      <div class="flex flex-col gap3">
        <DynamicInput
          initialValue={ServerPreCheckInitItem}
          v-model:value={this.preCheckServerStoreItem}
        >
          {{ default: DefaultDynamicInputSlot }}
        </DynamicInput>
        <NButton block disabled={this.nextButtonDisabled} type="primary" onClick={this.next}>
          下一步
        </NButton>
        <NDivider />
        <NButton
          text
          type="primary"
          onClick={() =>
            this.dialog.info({
              title: '帮助',
              content: () => (
                <>
                  <NLi>地址与登录信息会完全保存在浏览器, 不会上传到云端。</NLi>
                  <NLi>
                    请确保填写的地址是正确的, 并且<NText code>必须带上http://或https://</NText>,
                    否则可能会导致后续操作失败。
                  </NLi>
                  <NLi>
                    自动发现服务只能扫描面板服务地址主机上的服务, (根据您的application.yml配置文件 +
                    扫描服务状态而得出),
                    如果您的其他服务(如Passport、Shop服务等)不运行在同一台主机上,
                    自动扫描的地址可能不正确，您需要手动填写。
                  </NLi>
                  <NLi>
                    请不要使用诸如<NText code>localhost</NText>
                    <NText code>0.0.0.0</NText>之类的本地回环网址。如果需要访问本机，请使用
                    <NText code>127.0.0.1</NText>代替。
                  </NLi>
                </>
              )
            })
          }
        >
          {{ default: () => '需要帮助?', icon: () => <NIcon component={Help} /> }}
        </NButton>
      </div>
    )
  }
})
export class ServerView extends TSX<{}, Emits>()(Vue) {
  @Setup(() => useMessage())
  public message: ReturnType<typeof useMessage>
  @Setup(() => useDialog())
  public dialog: ReturnType<typeof useDialog>

  preCheckServerStoreItem: ServerPreCheckItem[] = []
  nextButtonDisabled = true
  isFinding = false

  @Intercept(new AutoCompleteFilter())
  public async autoComplete(v: string) {
    const { data } = await axios.post(`${v}/connection/check/default`)
    const parsedData = DefaultConnectionDataSchema.parse(data.data)
    const activeServer = parsedData.services
      .filter((service) => service.state.status === 'up')
      .map((service) => {
        return {
          ...service,
          host: service.host.startsWith('http') ? service.host : `http://${service.host}`
        }
      })
    if (activeServer.length === 0) return this.message.warning('未发现可用服务 您需要手动填写')
    this.dialog.info({
      title: '已自动发现服务',
      content: () => (
        <>
          {activeServer.map((server) => (
            <>
              <NText>
                {server.name} - {server.host}:{server.port}
              </NText>
              <br />
            </>
          ))}
          <NText>是否添加?</NText>
        </>
      ),
      positiveText: '添加',
      negativeText: '取消',
      onPositiveClick: () =>
        activeServer.forEach((service) => {
          const findIndex = this.preCheckServerStoreItem.findIndex((item) => item.backend === v)
          Reflect.set(
            this.preCheckServerStoreItem[findIndex],
            service.name,
            `${service.host}:${service.port}`
          )
        })
    })
  }

  @Watch('preCheckServerStoreItem', { deep: true })
  public onPreCheckServerStoreItemChange() {
    const checkRequired = this.preCheckServerStoreItem.some(
      (item) => !item.name || !item.passport || !item.backend || !item.common
    )
    const checkSameName = this.preCheckServerStoreItem.some(
      (item, index) => this.preCheckServerStoreItem.findIndex((i) => i.name === item.name) !== index
    )
    const checkIsUrl = this.preCheckServerStoreItem.some(
      (item) =>
        !isURL(item.passport) ||
        !isURL(item.backend) ||
        !isURL(item.common) ||
        (item.shop && !isURL(item.shop)) ||
        (item.forum && !isURL(item.forum))
    )
    const isPassed =
      checkRequired || checkSameName || checkIsUrl || this.preCheckServerStoreItem.length === 0
    this.nextButtonDisabled = isPassed
    return isPassed
  }

  @Emit('next')
  public next() {}
}
