import { PrismaService } from "@nailyjs.nest.modules/prisma";
import { Body, Controller, Delete, Get, NotFoundException, Post, Query, UseInterceptors } from "@nestjs/common";
import {
  UserDeveloperAllDTO,
  UserDeveloperAllSubscribedDTO,
  UserDeveloperCreateSubscribeDTO,
  UserDeveloperDeleteSubscribeDTO,
  UserDeveloperOrderRefundDTO,
  UserDeveloperReceiptDTO,
  UserDeveloperReceiptSingleDTO,
  UserDeveloperUserDTO,
} from "../dtos/user/developer.dto";
import { ResInterceptor } from "cc.naily.six.shared";
import { ApiTags } from "@nestjs/swagger";
import { OnlyDeveloper } from "src/guards/developer.guard";

@OnlyDeveloper()
@ApiTags("开发者")
@Controller("user/developer")
export class UserDeveloperController {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * 查询某个用户名/手机号下的所有用户
   *
   * @date 2024-12-11
   * @param {UserDeveloperSingleUsernameDTO} query
   * @memberof UserDeveloperController
   */
  @Get("all")
  @UseInterceptors(ResInterceptor)
  public async getSingleUserByUsername(@Query() query: UserDeveloperAllDTO) {
    if (!query.username && !query.phone) throw new NotFoundException("请输入用户名或手机号");
    if (query.username && query.phone) throw new NotFoundException("只能输入用户名或手机号");
    return this.prismaService.user.findMany({
      where: {
        OR: [
          {
            username: query.username,
          },
          {
            phone: query.phone,
          },
        ],
      },
    });
  }

  /**
   * 查询某个用户订阅的所有订单
   *
   * @date 2024-12-11
   * @param {UserDeveloperAllSubscribedDTO} query
   * @memberof UserDeveloperController
   */
  @Get("all/subscribed")
  @UseInterceptors(ResInterceptor)
  public async getSubscribed(@Query() query: UserDeveloperAllSubscribedDTO) {
    return this.prismaService.shopSubscribe.findMany({
      where: {
        userID: query.userID,
      },
    });
  }

  /**
   * 删除某个用户的订阅
   *
   * @date 2024-12-11
   * @param {UserDeveloperDeleteSubscribeDTO} query
   * @memberof UserDeveloperController
   */
  @Delete("subscribe")
  @UseInterceptors(ResInterceptor)
  public async deleteSubscribe(@Query() query: UserDeveloperDeleteSubscribeDTO) {
    return this.prismaService.shopSubscribe.delete({
      where: {
        subscribeID: query.subscribeID,
      },
    });
  }

  /**
   * 手动创建一个订阅
   *
   * @date 2024-12-11
   * @param {UserDeveloperCreateSubscribeDTO} body
   * @memberof UserDeveloperController
   */
  @Post("subscribe")
  @UseInterceptors(ResInterceptor)
  public async createSubscribe(@Body() body: UserDeveloperCreateSubscribeDTO) {
    const shopPackage = await this.prismaService.shopSubscribePackage.findUnique({
      where: {
        packageID: body.packageID,
      },
    });
    if (!shopPackage) throw new NotFoundException("没有找到套餐");
    return this.prismaService.shopSubscribe.create({
      data: {
        userID: body.userID,
        days: shopPackage.days,
        packageID: body.packageID,
        isManualCreate: true,
      },
    });
  }

  /**
   * 获取某个用户的订阅收据
   *
   * @date 2024-12-11
   * @param {UserDeveloperReceiptDTO} query
   * @memberof UserDeveloperController
   */
  @Get("user-receipt")
  @UseInterceptors(ResInterceptor)
  public async getUserReceipt(@Query() query: UserDeveloperReceiptDTO) {
    return this.prismaService.userReceipt.findMany({
      where: {
        userID: query.userID,
      },
    });
  }

  /**
   * 通过orderID获取某个用户的单个订阅收据
   *
   * @param {UserDeveloperReceiptSingleDTO} query
   * @memberof UserDeveloperController
   */
  @Get("user-receipt/single")
  @UseInterceptors(ResInterceptor)
  public async getUserReceiptSingle(@Query() query: UserDeveloperReceiptSingleDTO) {
    return this.prismaService.userReceipt.findMany({
      where: {
        orderID: query.orderID,
      },
    });
  }

  /**
   * 将某个订单设置为已退款
   *
   * @date 2025-01-21
   * @param {UserDeveloperOrderRefundDTO} body
   * @memberof UserDeveloperController
   */
  @Post("order/refund")
  @UseInterceptors(ResInterceptor)
  public async refundOrder(@Body() body: UserDeveloperOrderRefundDTO) {
    return this.prismaService.userReceipt.updateMany({
      where: {
        orderID: body.orderID,
      },
      data: {
        receiptStatus: "Refunded",
      },
    });
  }

  /**
   * 获取某个用户
   *
   * @date 2025-03-02
   * @param {UserDeveloperUserDTO} query
   * @memberof UserDeveloperController
   */
  @Get("user")
  @UseInterceptors(ResInterceptor)
  public async getUser(@Query() query: UserDeveloperUserDTO) {
    return this.prismaService.user.findUnique({
      where: {
        userID: query.userID,
      },
    });
  }
}
