import { Controller, Get, UseInterceptors } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { MustPermission, NotPermission } from "cc.naily.six.auth";
import { ResInterceptor } from "cc.naily.six.shared";

@ApiTags("用户权限")
@Controller("user/permission")
export class PermissionController {
  /**
   * 获取权限列表
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/10
   * @memberof PermissionController
   */
  @Get()
  @UseInterceptors(ResInterceptor)
  public async getPermissions() {
    const must = {};
    for (const key in MustPermission) {
      must[key] = MustPermission[key].description;
    }
    const not = {};
    for (const key in NotPermission) {
      not[key] = NotPermission[key].description;
    }
    return {
      permissions: { must, not },
    };
  }
}
