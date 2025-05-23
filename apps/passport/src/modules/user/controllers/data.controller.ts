import { PrismaService } from "@nailyjs.nest.modules/prisma";
import { BadRequestException, Body, Controller, Delete, Get, Post, Query, UseInterceptors } from "@nestjs/common";
import { ApiExcludeEndpoint, ApiTags } from "@nestjs/swagger";
import { GetUserDataQueryDTO, PostUserDataBodyDTO, XXXUserDataBodyDTO } from "../dtos/user/data.dto";
import { Auth, JwtLoginPayload, User } from "cc.naily.six.auth";
import { CommonLogger, ResInterceptor } from "cc.naily.six.shared";
import { SchedulerRegistry } from "@nestjs/schedule";
import { ConfigService } from "@nestjs/config";

@ApiTags("用户数据")
@Controller("user/data")
export class UserDataController {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly logger: CommonLogger,
    private readonly configService: ConfigService,
  ) {}

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
  public async getUserDataByKey(@Query() query: GetUserDataQueryDTO, @User() user: JwtLoginPayload) {
    const haveData = await this.prismaService.userData.findUnique({
      where: { userID: user.userID, userDataKey: query.key },
    });
    if (!haveData) throw new BadRequestException(1089);
    return haveData;
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
  public async setUserDataByKey(@Body() body: PostUserDataBodyDTO, @User() user: JwtLoginPayload) {
    const result = await this.prismaService.userData.upsert({
      where: { userID: user.userID, userDataKey: body.key },
      create: { userID: user.userID, userDataKey: body.key, userDataValue: body.value },
      update: { userDataValue: body.value },
    });

    if (this.schedulerRegistry.getTimeouts().includes(`user-data-${user.userID}-${body.key}`))
      this.schedulerRegistry.deleteTimeout(`user-data-${user.userID}-${body.key}`);
    if (typeof body.selfDestruct === "number" && body.selfDestruct >= 0) {
      const timer = setTimeout(() => {
        this.prismaService.userData
          .delete({
            where: { userID: user.userID, userDataKey: body.key },
          })
          .then(() => this.logger.debug(`用户数据 ${user.userID}-${body.key} 已自动销毁`));
      }, body.selfDestruct * 1000);

      this.logger.debug(`用户数据 ${user.userID}-${body.key} 已设置自动销毁时间为 ${body.selfDestruct} 秒`);
      this.schedulerRegistry.addTimeout(`user-data-${user.userID}-${body.key}`, timer);
    }

    return result;
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
  public async deleteUserDataByKey(@Query() query: GetUserDataQueryDTO, @User() user: JwtLoginPayload) {
    const haveData = await this.prismaService.userData.findUnique({
      where: { userID: user.userID, userDataKey: query.key },
    });
    if (!haveData) throw new BadRequestException(1089);
    this.schedulerRegistry.deleteTimeout(`user-data-${user.userID}-${query.key}`);
    return this.prismaService.userData.delete({
      where: { userID: user.userID, userDataKey: query.key },
    });
  }

  @Post("xxx")
  @UseInterceptors(ResInterceptor)
  @ApiExcludeEndpoint(process.env.NODE_ENV === "production")
  public xxx(@Body() { s, developerAccessKey }: XXXUserDataBodyDTO) {
    const realDeveloperAccessKey = this.configService.get("global.developerAccessKey") || this.configService.get("global.jwt.secret");
    if (developerAccessKey !== realDeveloperAccessKey) throw new BadRequestException(1001);
    return this.prismaService.userData
      .deleteMany({
        where: {
          // 当前key为cookiePickCode时
          userDataKey: "cookiePickCode",
          // 且当前时间 - createDate >= s秒
          createdAt: { lte: new Date(Date.now() - s * 1000) },
        },
      })
      .then((value) => ({ count: value.count }));
  }
}
