import { PrismaService } from "@nailyjs.nest.modules/prisma";
import { BadRequestException, Body, Controller, Get, Post, Query, UseInterceptors } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Auth, JwtLoginPayload, User } from "cc.naily.six.auth";
import { ResInterceptor } from "cc.naily.six.shared";
import { GetGPTSubscribeQueryDTO, PostGPTSubscribeBodyDTO } from "../dtos/subscribe.dto";

@ApiTags("订阅")
@Controller("gpt/subscribe")
export class SubscribeController {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * 获取用户GPT订阅订单列表
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/17
   * @memberof SubscribeController
   */
  @Get()
  @Auth()
  @UseInterceptors(ResInterceptor)
  public getUserSubscribeStatus(@Query() query: GetGPTSubscribeQueryDTO, @User() user: JwtLoginPayload) {
    if (!query.orderCreatedAt) query.orderCreatedAt = "desc";
    return this.prismaService.gPTSubscribe.findMany({
      where: { userID: user.userID },
      orderBy: { createdAt: query.orderCreatedAt },
    });
  }

  /**
   * 获取GPT订阅套餐列表
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/17
   * @memberof SubscribeController
   */
  @Get("package")
  @UseInterceptors(ResInterceptor)
  public getSubscribePackage() {
    return this.prismaService.gPTSubscribePackage.findMany();
  }

  /**
   * 订阅GPT
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/17
   * @param {JwtLoginPayload} user
   * @memberof SubscribeController
   */
  @Post()
  @Auth()
  @UseInterceptors(ResInterceptor)
  public async subscribe(@Body() body: PostGPTSubscribeBodyDTO, @User() user: JwtLoginPayload) {
    const packageInstance = await this.prismaService.gPTSubscribePackage.findUnique({
      where: { packageID: body.packageID },
    });
    if (!packageInstance) throw new BadRequestException(1084);
    return this.prismaService.gPTSubscribe.create({
      data: {
        userID: user.userID,
        days: packageInstance.days,
        packageID: packageInstance.packageID,
      },
    });
  }

  /**
   * 获取用户GPT订阅天数
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/17
   * @param {JwtLoginPayload} user
   * @memberof SubscribeController
   */
  @Auth()
  @Get("status")
  @UseInterceptors(ResInterceptor)
  public async getSubscribeStatus(@User() user: JwtLoginPayload) {
    const allSubscribe = await this.prismaService.gPTSubscribe.findMany({
      where: { userID: user.userID },
    });
    const totalDays = allSubscribe.map((item) => {
      if (item.createdAt.getTime() + item.days * 24 * 60 * 60 * 1000 > Date.now()) {
        return item.days;
      } else {
        return 0;
      }
    });
    return {
      totalDays: totalDays.reduce((prev, curr) => prev + curr, 0),
    };
  }
}
