import { PrismaService } from "@nailyjs.nest.modules/prisma";
import { BadRequestException, Body, Controller, Delete, Patch, Post, Put, UseInterceptors } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ResInterceptor } from "cc.naily.six.shared";
import { DeleteUserRoleBodyDTO, PatchUserRoleBodyDTO, PostUserRoleBodyDTO, PutUserRoleBodyDTO } from "../dtos/role.dto";
import { Auth, Permissions, Roles } from "cc.naily.six.auth";

@ApiTags("角色管理")
@Controller("user/role")
export class RoleController {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * 创建角色
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/10
   * @memberof RoleController
   */
  @Post()
  @Auth()
  @Roles("naily_admin") // 必须是 naily_admin 角色
  @Permissions("naily_admin") // 必须有 naily_admin 权限
  @UseInterceptors(ResInterceptor)
  public async createRole(@Body() body: PostUserRoleBodyDTO) {
    const haveRole = await this.prismaService.role.findUnique({
      where: { roleName: body.roleName },
    });
    if (haveRole) throw new BadRequestException(1075);
    return this.prismaService.role.create({
      data: {
        roleName: body.roleName,
        roleDescription: body.roleDescription,
        isPublic: body.isPublic,
      },
    });
  }

  /**
   * 更新角色
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/10
   * @param {PutUserRoleBodyDTO} body
   * @memberof RoleController
   */
  @Put()
  @Auth()
  @Roles("naily_admin") // 必须是 naily_admin 角色
  @Permissions("naily_admin") // 必须有 naily_admin 权限
  @UseInterceptors(ResInterceptor)
  public async updateRole(@Body() body: PutUserRoleBodyDTO) {
    const role = await this.prismaService.role.findUnique({
      where: { roleID: body.roleID },
    });
    if (!role) throw new BadRequestException(1071);
    return this.prismaService.role.update({
      data: {
        roleName: body.roleName,
        roleDescription: body.roleDescription,
        isPublic: body.isPublic,
      },
      where: { roleID: body.roleID },
    });
  }

  /**
   * 更新某用户的角色
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/10
   * @memberof RoleController
   */
  @Patch()
  @UseInterceptors(ResInterceptor)
  public updateUserRole(@Body() { roleID, userID }: PatchUserRoleBodyDTO) {
    return this.prismaService.user.update({
      include: { roles: true },
      where: { userID },
      data: {
        roles: {
          connect: { roleID },
        },
      },
    });
  }

  /**
   * 删除角色
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/10
   * @param {DeleteUserRoleBodyDTO} body
   * @memberof RoleController
   */
  @Auth()
  @Delete()
  @Roles("naily_admin") // 必须是 naily_admin 角色
  @Permissions("naily_admin") // 必须有 naily_admin 权限
  @UseInterceptors(ResInterceptor)
  public async deleteRole(@Body() body: DeleteUserRoleBodyDTO) {
    const haveRole = await this.prismaService.role.findUnique({
      where: { roleID: body.roleID },
    });
    if (!haveRole) throw new BadRequestException(1071);
    return this.prismaService.role.deleteMany({
      where: { roleID: body.roleID },
    });
  }
}
