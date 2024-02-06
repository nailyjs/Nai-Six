import { NButton, NH1, NInput } from "naive-ui";
import { Component, Vue } from "vue-facing-decorator";

@Component({
  render() {
    return (
      <div id="naily_login">
        <div class="flex flex-col h-lg justify-center items-center">
          <div class="flex flex-col gap3 min-w-65">
            <NH1 class="m0 p0">登录</NH1>
            <NInput size="large" placeholder="请输入用户名" />
            <NInput size="large" placeholder="请输入密码" />
            <NButton size="large" block type="primary">
              登录
            </NButton>
          </div>
        </div>
      </div>
    );
  },
})
export default class LoginView extends Vue {}
