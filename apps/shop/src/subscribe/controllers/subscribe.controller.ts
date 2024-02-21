import { PrismaService } from "@nailyjs.nest.modules/prisma";
import { BadRequestException, Body, Controller, Get, Post, Query, UseInterceptors } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Auth, JwtLoginPayload, User } from "cc.naily.six.auth";
import { ResInterceptor } from "cc.naily.six.shared";
import { GetSubscribeUserQueryDTO, PostSubscribeUserBodyDTO } from "../dtos/subscribe.dto";

@ApiTags("订阅")
@Controller("subscribe/user")
export class SubscribeController {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * 获取用户订阅订单列表
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/21
   * @memberof SubscribeController
   */
  @Get()
  @Auth()
  @UseInterceptors(ResInterceptor)
  public getUserSubscribeStatus(@Query() query: GetSubscribeUserQueryDTO, @User() user: JwtLoginPayload) {
    if (!query.take) query.take = 10;
    if (!query.skip) query.skip = 0;
    return this.prismaService.shopSubscribe.findMany({
      where: {
        userID: user.userID,
        packageID: {
          in: query.filterSubscribePackageID
            ? Array.isArray(query.filterSubscribePackageID)
              ? query.filterSubscribePackageID
              : [query.filterSubscribePackageID]
            : undefined,
        },
      },
      orderBy: {
        createdAt: query.orderCreatedAt || undefined,
        updatedAt: query.orderUpdatedAt || undefined,
        days: query.orderDay || undefined,
      },
      take: parseInt(query.take as unknown as string) || 10,
      skip: parseInt(query.skip as unknown as string) || 0,
    });
  }

  /**
   * 创建订阅订单
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/21
   * @param {JwtLoginPayload} user
   * @param {PostSubscribeBodyDTO} body
   * @memberof SubscribeController
   */
  @Post()
  @Auth()
  @UseInterceptors(ResInterceptor)
  public async createSubscribe(@User() user: JwtLoginPayload, @Body() body: PostSubscribeUserBodyDTO) {
    const packageInfo = await this.prismaService.shopSubscribePackage.findUnique({
      where: { packageID: body.packageID },
    });
    if (!packageInfo) throw new BadRequestException(1084);
    if (!packageInfo.isOnSale) throw new BadRequestException(1086);
    return this.prismaService.shopSubscribe.create({
      data: {
        days: packageInfo.days,
        package: {
          connect: {
            packageID: body.packageID,
          },
        },
        user: {
          connect: {
            userID: user.userID,
          },
        },
      },
    });
  }
}
