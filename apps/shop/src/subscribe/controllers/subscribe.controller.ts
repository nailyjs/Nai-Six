import { PrismaService } from "@nailyjs.nest.modules/prisma";
import { BadRequestException, Body, Controller, Delete, Get, Post, Put, Query, UseInterceptors } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Auth, JwtLoginPayload, User } from "cc.naily.six.auth";
import { ResInterceptor } from "cc.naily.six.shared";
import { GetSubscribeUserQueryDTO, GetSubscribeUserStatusQueryDTO, PostSubscribeUserBodyDTO, PutSubscribeUserBodyDTO } from "../dtos/subscribe.dto";
import { SubscribeService } from "../providers/subscribe.service";
import { readFileSync } from "fs";
import { join } from "path";
import { GetSubscribeUserStatusQueryResDTO } from "../dtos/subscribe.res.dto";

@ApiTags("用户订阅")
@Controller("subscribe/user")
export class SubscribeController {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly subscribeService: SubscribeService,
  ) {}

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
   * 获取用户订阅状态
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/22
   * @param {JwtLoginPayload} user
   * @param {GetSubscribeUserStatusQueryDTO} query
   * @memberof SubscribeController
   */
  @Auth()
  @Get("status")
  @UseInterceptors(ResInterceptor)
  @ApiOkResponse({ description: "获取成功", type: GetSubscribeUserStatusQueryResDTO })
  public async getUserSubscribeStatusBySubscribeID(@User() user: JwtLoginPayload, @Query() query: GetSubscribeUserStatusQueryDTO) {
    const [subscribes, remainDays] = await this.subscribeService.getUserSubscribeStatus(user.userID, query.subscribePackageID);
    return { subscribes, remainDays };
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
  @ApiOperation({
    summary: "创建订阅订单",
    description: readFileSync(join(process.env.PROJECT_ROOT, "apps/shop/src/subscribe/markdown/subscribe/createOrder.md")).toString(),
  })
  public async createSubscribe(@User() user: JwtLoginPayload, @Body() body: PostSubscribeUserBodyDTO) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_subscribes, days] = await this.subscribeService.getUserSubscribeStatus(user.userID, body.packageID);
    if (days > 0) throw new BadRequestException(1090);
    return this.subscribeService.createSubscribeOrder(body.packageID, user.userID);
  }

  /**
   * 续费订阅
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/22
   * @param {JwtLoginPayload} user
   * @param {PostSubscribeUserBodyDTO} body
   * @memberof SubscribeController
   */
  @Put()
  @Auth()
  @UseInterceptors(ResInterceptor)
  @ApiOperation({
    summary: "续费订阅",
    description: readFileSync(join(process.env.PROJECT_ROOT, "apps/shop/src/subscribe/markdown/subscribe/renewOrderBadRequest.md")).toString(),
  })
  public async renewSubscribe(@User() user: JwtLoginPayload, @Body() body: PutSubscribeUserBodyDTO) {
    const [subscribe, days] = await this.subscribeService.getUserSubscribeStatusBySubscribeID(user.userID, body.subscribeID);
    if (days > 0) throw new BadRequestException(1091);
    return this.subscribeService.renewSubscribeOrder(subscribe.packageID, body.subscribeID, user.userID);
  }

  /**
   * 取消订阅
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/22
   * @param {JwtLoginPayload} user
   * @param {PutSubscribeUserBodyDTO} body
   * @memberof SubscribeController
   */
  @Auth()
  @Delete()
  @UseInterceptors(ResInterceptor)
  public async cancelSubscribe(@User() user: JwtLoginPayload, @Body() body: PutSubscribeUserBodyDTO) {
    return this.subscribeService.cancelSubscribeOrder(body.subscribeID, user.userID);
  }
}
