import { PrismaService } from "@nailyjs.nest.modules/prisma";
import { BadRequestException, Body, Controller, Delete, Get, Patch, Post, Put, Query, UseInterceptors } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ResInterceptor } from "cc.naily.six.shared";
import { DeleteUserRoleBodyDTO, GetUserRoleQueryDTO, PatchUserRoleBodyDTO, PostUserRoleBodyDTO, PutUserRoleBodyDTO } from "../dtos/role.dto";
import { Auth, MustPermissions } from "cc.naily.six.auth";
import { Prisma } from "@prisma/client";
import { I18nService } from "nestjs-i18n";
import { I18nTranslations } from "cc.naily.six.generated";

@ApiTags("角色管理")
@Controller("user/role")
export class RoleController {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly i18nService: I18nService<I18nTranslations>,
  ) {}

  /**
   * 获取全部的角色列表
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/11
   * @memberof RoleController
   */
  @Get()
  @Auth()
  @MustPermissions("Must_Admin") // 必须有 Must_Admin 权限
  @UseInterceptors(ResInterceptor)
  public async getRoles(@Query() query: GetUserRoleQueryDTO) {
    return this.prismaService.role.findMany({
      orderBy: (() => {
        const orderBy: Prisma.RoleOrderByWithRelationInput[] = [];
        if (query.orderCreatedAt) orderBy.push({ createdAt: query.orderCreatedAt });
        if (query.orderUpdatedAt) orderBy.push({ updatedAt: query.orderUpdatedAt });
        return orderBy;
      })(),
      take: query.take,
      skip: query.skip,
    });
  }

  /**
   * 创建角色
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/10
   * @memberof RoleController
   */
  @Post()
  @Auth()
  @MustPermissions("Must_Admin") // 必须有 Must_Admin 权限
  @UseInterceptors(ResInterceptor)
  public async createRole(@Body() body: PostUserRoleBodyDTO) {
    const haveRole = await this.prismaService.role.findFirst({
      where: { roleName: body.roleName },
    });
    if (haveRole) throw new BadRequestException(1075);
    return this.prismaService.role.create({
      data: {
        roleName: body.roleName,
        roleDescription: body.roleDescription,
        isPublic: body.isPublic,
        permissions: body.permissions,
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
  @MustPermissions("Must_Admin") // 必须有 Must_Admin 权限
  @UseInterceptors(ResInterceptor)
  public async updateRole(@Body() body: PutUserRoleBodyDTO) {
    const role = await this.prismaService.role.findFirst({
      where: { roleID: body.roleID },
    });
    if (!role) throw new BadRequestException(1071);
    return this.prismaService.role.update({
      data: {
        roleName: body.roleName,
        roleDescription: body.roleDescription,
        isPublic: body.isPublic,
        permissions: body.permissions,
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
  @MustPermissions("Must_Admin") // 必须有 Must_Admin 权限
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
  @MustPermissions("Must_Admin") // 必须有 Must_Admin 权限
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
