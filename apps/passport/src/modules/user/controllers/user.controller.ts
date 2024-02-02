import { Controller, Delete, Get, UseInterceptors } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { User as UserEntity } from "@prisma/client";
import { Auth, User } from "cc.naily.six.auth";
import { PrismaService } from "cc.naily.six.database";
import { ResInterceptor } from "cc.naily.six.shared";

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
    };
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
