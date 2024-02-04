import { Body, Controller, Put, UseInterceptors } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { User as UserEntity } from "@prisma/client";
import { Auth, User } from "cc.naily.six.auth";
import { PrismaService } from "@nailyjs.nest.modules/prisma";
import { PutUserUsernameBodyDTO } from "../dtos/change/change.dto";
import { ResInterceptor } from "cc.naily.six.shared";

@ApiTags("用户")
@Controller("user")
export class UserChangerController {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * 修改用户名
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/02
   * @memberof UserChangerController
   */
  @Auth()
  @Put("username")
  @UseInterceptors(ResInterceptor)
  public async changeUsername(@User() user: UserEntity, @Body() body: PutUserUsernameBodyDTO) {
    const checkUsername = await this.prismaService.user.findFirst({ where: { username: body.username } });
    if (checkUsername) return 1048;
    await this.prismaService.user.update({
      where: { userID: user.userID },
      data: {
        username: body.username,
      },
    });
    return 1000;
  }
}
