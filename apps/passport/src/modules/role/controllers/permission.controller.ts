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
    return {
      not: Object.keys(NotPermission),
      must: Object.keys(MustPermission),
    };
  }
}
