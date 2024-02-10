import { PrismaService } from "@nailyjs.nest.modules/prisma";
import { Body, Controller, Delete, Get, Post, Query, UseInterceptors } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { GetUserDataQueryDTO, PostUserDataBodyDTO } from "../dtos/user/data.dto";
import { Auth, JwtLoginPayload, User } from "cc.naily.six.auth";
import { ResInterceptor } from "cc.naily.six.shared";

@ApiTags("用户数据")
@Controller("user/data")
export class UserDataController {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * 获取用户数据
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/10
   * @memberof UserDataController
   */
  @Get()
  @Auth()
  @UseInterceptors(ResInterceptor)
  public getUserDataByKey(@Query() query: GetUserDataQueryDTO, @User() user: JwtLoginPayload) {
    return this.prismaService.userData.findUnique({
      where: { userID: user.userID, userDataKey: query.key },
    });
  }

  /**
   * 设置/更新用户数据
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/10
   * @param {PostUserDataBodyDTO} body
   * @param {JwtLoginPayload} user
   * @memberof UserDataController
   */
  @Auth()
  @Post()
  @UseInterceptors(ResInterceptor)
  public setUserDataByKey(@Body() body: PostUserDataBodyDTO, @User() user: JwtLoginPayload) {
    return this.prismaService.userData.upsert({
      where: { userID: user.userID, userDataKey: body.key },
      create: { userID: user.userID, userDataKey: body.key, userDataValue: body.value },
      update: { userDataValue: body.value },
    });
  }

  /**
   * 删除用户数据
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/10
   * @param {GetUserDataQueryDTO} query
   * @param {JwtLoginPayload} user
   * @return {*}
   * @memberof UserDataController
   */
  @Auth()
  @Delete()
  @UseInterceptors(ResInterceptor)
  public deleteUserDataByKey(@Query() query: GetUserDataQueryDTO, @User() user: JwtLoginPayload) {
    return this.prismaService.userData.delete({
      where: { userID: user.userID, userDataKey: query.key },
    });
  }
}
