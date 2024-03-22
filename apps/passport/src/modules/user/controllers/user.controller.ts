import { Controller, Delete, Get, Query, UseInterceptors } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { User as UserEntity } from "@prisma/client";
import { Auth, User } from "cc.naily.six.auth";
import { PrismaService } from "@nailyjs.nest.modules/prisma";
import { ResInterceptor } from "cc.naily.six.shared";
import { GetUserQueryDTO } from "../dtos/user/user.dto";

@ApiTags("用户")
@Controller("user")
export class UserController {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * 获取已登录用户信息
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/02
   * @param {UserEntity} user
   * @memberof UserController
   */
  @Auth()
  @Get("logging")
  @UseInterceptors(ResInterceptor)
  public async getUser(@User() user: UserEntity) {
    return {
      user: await this.prismaService.user.findUnique({
        where: { userID: user.userID },
      }),
      info: {
        registerDays: Math.ceil((new Date().getTime() - user.createdAt.getTime()) / 1000 / 60 / 60 / 24),
      },
    };
  }

  /**
   * 获取用户列表
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/05
   * @memberof UserController
   */
  @Get()
  @UseInterceptors(ResInterceptor)
  public async getUserList(@Query() query: GetUserQueryDTO) {
    if (!query.take) query.take = 10;
    if (!query.skip) query.skip = 0;
    if (!query.orderRegisterTime) query.orderRegisterTime = "late";
    let users = await this.prismaService.user.findMany({
      take: query.take,
      skip: query.skip,
      orderBy: {
        createdAt: query.orderRegisterTime === "early" ? "asc" : "desc",
      },
    });
    users = users.map((item) => {
      item.password = undefined;
      item.balance = parseFloat((item.balance || 0).toFixed(2));
      return item;
    });
    return { users };
  }

  /**
   * 注销账号
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/02
   * @param {UserEntity} user
   * @memberof UserController
   */
  @Auth()
  @Delete()
  @UseInterceptors(ResInterceptor)
  public async deleteUser(@User() user: UserEntity) {
    await this.prismaService.userIdentifier.deleteMany({
      where: { userID: user.userID },
    });
    await this.prismaService.userAppStoreSubscribe.deleteMany({
      where: { userID: user.userID },
    });
    await this.prismaService.browserBookMark.deleteMany({
      where: { userID: user.userID },
    });
    await this.prismaService.browserTrack.deleteMany({
      where: { userID: user.userID },
    });
    return await this.prismaService.user.update({
      where: { userID: user.userID },
      data: { isDeleted: true, phone: null, email: null },
    });
  }
}
