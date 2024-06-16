import { PrismaService } from "@nailyjs.nest.modules/prisma";
import { Body, Controller, Delete, Post, UseInterceptors } from "@nestjs/common";
import { ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { Auth, JwtLoginPayload, User } from "cc.naily.six.auth";
import { PostMicrosoftBodyDTO } from "./microsoft.dto";
import { ResInterceptor } from "cc.naily.six.shared";

@ApiTags("微软")
@Controller("microsoft")
export class MicrosoftController {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * 绑定微软账号
   *
   * @param {JwtLoginPayload} user - 用户信息
   * @memberof MicrosoftController
   */
  @Post()
  @Auth()
  @UseInterceptors(ResInterceptor)
  @ApiCreatedResponse({ description: "返回的信息data字段是更新后的user大对象哦" })
  public async bindMicrosoft(@User() user: JwtLoginPayload, @Body() { info }: PostMicrosoftBodyDTO) {
    const userInstance = await this.prismaService.user.update({
      where: { userID: user.userID },
      data: { microsoftID: info },
    });
    return userInstance;
  }

  /**
   * 解绑微软账号
   *
   * @param {JwtLoginPayload} user - 用户信息
   * @memberof MicrosoftController
   */
  @Delete()
  @Auth()
  @UseInterceptors(ResInterceptor)
  @ApiCreatedResponse({ description: "返回的信息data字段是更新后的user大对象哦" })
  public async unbindMicrosoft(@User() user: JwtLoginPayload) {
    const userInstance = await this.prismaService.user.update({
      where: { userID: user.userID },
      data: { microsoftID: null },
    });
    return userInstance;
  }
}
