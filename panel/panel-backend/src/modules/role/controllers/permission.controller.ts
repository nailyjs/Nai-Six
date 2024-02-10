import { PrismaService } from "@nailyjs.nest.modules/prisma";
import { Body, Controller, Delete, ForbiddenException, Get, NotFoundException, Post, Put, Query, UseInterceptors } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Auth, Permissions, Roles } from "cc.naily.six.auth";
import { ResInterceptor, UpdatedAtEnum } from "cc.naily.six.shared";
import { GetUserPermissionQueryDTO, PostUserPermissionBodyDTO, PutUserPermissionBodyDTO } from "../dtos/permission.dto";
import { Prisma } from "@prisma/client";
import { CreatedAtEnum } from "../enums";

@ApiTags("权限管理")
@Controller("user/permission")
export class PermissionController {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * 获取已添加权限列表
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/10
   * @memberof PermissionController
   */
  @Get()
  @Auth()
  @Roles("naily_admin") // 必须是 naily_admin 角色
  @Permissions("naily_admin") // 必须有 naily_admin 权限
  @UseInterceptors(ResInterceptor)
  async getUserRolePermission(@Query() query: GetUserPermissionQueryDTO) {
    if (!query.take) query.take = 10;
    if (!query.skip) query.skip = 0;

    return this.prismaService.permission.findMany({
      take: parseInt(query.take as unknown as string),
      skip: parseInt(query.skip as unknown as string),
      orderBy: ((): Prisma.PermissionOrderByWithRelationInput[] => {
        const orderBy: Prisma.PermissionOrderByWithRelationInput[] = [];
        if (query.orderCreatedAt === CreatedAtEnum.Earliest) orderBy.push({ createdAt: "asc" });
        if (query.orderCreatedAt === CreatedAtEnum.Latest) orderBy.push({ createdAt: "desc" });
        if (query.orderUpdatedAt === UpdatedAtEnum.Earliest) orderBy.push({ updatedAt: "asc" });
        if (query.orderUpdatedAt === UpdatedAtEnum.Latest) orderBy.push({ updatedAt: "desc" });
        return orderBy;
      })(),
    });
  }

  /**
   * 创建权限
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/10
   * @return
   * @memberof PermissionController
   */
  @Post()
  @Auth()
  @Roles("naily_admin") // 必须是 naily_admin 角色
  @Permissions("naily_admin") // 必须有 naily_admin 权限
  @UseInterceptors(ResInterceptor)
  public createUserRolePermission(@Body() body: PostUserPermissionBodyDTO) {
    const havePermission = this.prismaService.permission.findUnique({
      where: { permissionName: body.permissionName },
    });
    if (havePermission) throw new ForbiddenException(1073);
    return this.prismaService.permission.create({
      data: {
        permissionName: body.permissionName,
        permissionDescription: body.permissionDescription,
        isPublic: body.isPublic,
      },
    });
  }

  /**
   * 更新权限
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/10
   * @param {PutUserPermissionBodyDTO} body
   * @memberof PermissionController
   */
  @Put()
  @Auth()
  @Roles("naily_admin") // 必须是 naily_admin 角色
  @Permissions("naily_admin") // 必须有 naily_admin 权限
  @UseInterceptors(ResInterceptor)
  public updateUserRolePermission(@Body() body: PutUserPermissionBodyDTO) {
    const havePermission = this.prismaService.permission.findUnique({
      where: { permissionID: body.permissionID },
    });
    if (!havePermission) throw new NotFoundException(1074);
    return this.prismaService.permission.update({
      where: { permissionID: body.permissionID },
      data: {
        permissionName: body.permissionName,
        permissionDescription: body.permissionDescription,
        isPublic: body.isPublic,
      },
    });
  }

  /**
   * 删除权限
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/10
   * @param {string} permissionID
   * @memberof PermissionController
   */
  @Delete()
  @Auth()
  @Roles("naily_admin") // 必须是 naily_admin 角色
  @Permissions("naily_admin") // 必须有 naily_admin 权限
  @UseInterceptors(ResInterceptor)
  public deleteUserRolePermission(@Query("permissionID") permissionID: string) {
    const havePermission = this.prismaService.permission.findUnique({
      where: { permissionID },
    });
    if (!havePermission) throw new NotFoundException(1074);
    return this.prismaService.permission.delete({
      where: { permissionID },
    });
  }
}
