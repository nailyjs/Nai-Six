import { PrismaService } from "@nailyjs.nest.modules/prisma";
import { Body, Controller, Delete, Get, Post, Query, UseInterceptors } from "@nestjs/common";
import {
  UserDeveloperAllDTO,
  UserDeveloperAllSubscribedDTO,
  UserDeveloperCreateSubscribeDTO,
  UserDeveloperDeleteSubscribeDTO,
  UserDeveloperReceiptDTO,
  UserDeveloperReceiptSingleDTO,
} from "../dtos/user/developer.dto";
import { ResInterceptor } from "cc.naily.six.shared";
import { ApiExcludeController, ApiTags } from "@nestjs/swagger";

@ApiExcludeController(false)
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
    return this.prismaService.shopSubscribe.create({
      data: {
        userID: body.userID,
        days: body.days,
        packageID: body.subscribeID,
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
   * 获取某个用户的单个订阅收据
   *
   * @param {UserDeveloperReceiptSingleDTO} query
   * @memberof UserDeveloperController
   */
  @Get("user-receipt/single")
  @UseInterceptors(ResInterceptor)
  public async getUserReceiptSingle(@Query() query: UserDeveloperReceiptSingleDTO) {
    return this.prismaService.userReceipt.findUnique({
      where: {
        userReceiptID: query.userReceiptID,
      },
    });
  }
}
