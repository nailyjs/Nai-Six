import { Controller, Delete, Get, Query, UseInterceptors } from "@nestjs/common";
import { ApiHeader, ApiTags } from "@nestjs/swagger";
import { User as UserEntity } from "@prisma/client";
import { Auth, Token, User } from "cc.naily.six.auth";
import { PrismaService } from "@nailyjs.nest.modules/prisma";
import { ResInterceptor } from "cc.naily.six.shared";
import { GetUserQueryDTO } from "../dtos/user/user.dto";
import { JwtService } from "@nestjs/jwt";

@ApiTags("用户")
@Controller("user")
export class UserController {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

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
    const response = {
      user: await this.prismaService.user.findUnique({
        where: { userID: user.userID },
      }),
      info: {
        registerDays: Math.ceil((new Date().getTime() - user.createdAt.getTime()) / 1000 / 60 / 60 / 24),
      },
    };
    // prettier-ignore
    if (response.user.balance === null) response.user.balance = 0.00;
    return response;
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
      take: parseInt(query.take as unknown as string),
      skip: parseInt(query.skip as unknown as string),
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

  /**
   * 获取token信息
   *
   * @param {string} token
   * @return
   * @memberof UserController
   */
  @Get("token-info")
  @ApiHeader({ name: "Authorization", description: "Bearer Jwt token" })
  @UseInterceptors(ResInterceptor)
  async getTokenInfo(@Token() token: string) {
    const payload = this.jwtService.decode(token);
    return {
      payload,
      willExpireAt: new Date((payload || {}).exp * 1000),
      isExpired: (payload || {}).exp * 1000 < Date.now(),
      isVerified: await this.jwtService
        .verifyAsync(token)
        .then(() => true)
        .catch(() => false),
    };
  }
}
