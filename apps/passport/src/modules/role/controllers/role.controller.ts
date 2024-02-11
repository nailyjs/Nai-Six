import { PrismaService } from "@nailyjs.nest.modules/prisma";
import { Controller, Get, Query, UseInterceptors } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Auth, CommonRoleService, JwtLoginPayload, User } from "cc.naily.six.auth";
import { ResInterceptor } from "cc.naily.six.shared";
import { GetUserRolePermissionQueryDTO } from "../dtos/role/role.dto";

@ApiTags("用户角色")
@Controller("user/role")
export class RoleController {
  constructor(
    private readonly commonRoleService: CommonRoleService,
    private readonly prismaService: PrismaService,
  ) {}

  /**
   * 获取用户角色
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/10
   * @param {JwtLoginPayload} user
   * @memberof RoleController
   */
  @Get()
  @Auth()
  @UseInterceptors(ResInterceptor)
  public async getRoles(@User() user: JwtLoginPayload) {
    return this.commonRoleService.getUserRoles(user.userID);
  }

  /**
   * 获取角色详情
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/10
   * @memberof PermissionController
   */
  @Get("permission")
  @UseInterceptors(ResInterceptor)
  public async getRolePermissions(@Query() { roleID }: GetUserRolePermissionQueryDTO) {
    return this.prismaService.role.findMany({
      where: { roleID, isPublic: true },
    });
  }
}
