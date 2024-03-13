import { PrismaService } from "@nailyjs.nest.modules/prisma";
import { BadRequestException, Injectable } from "@nestjs/common";
import { ShopSubscribe } from "@prisma/client";
import { BalanceUtil } from "cc.naily.six.shared";

@Injectable()
export class SubscribeService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly balanceUtil: BalanceUtil,
  ) {}

  /**
   * 续费订阅订单
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/22
   * @param {string} packageID 套餐ID
   * @param {string} subscribeID 订阅ID
   * @param {string} userID 用户ID
   * @memberof SubscribeService
   */
  public async renewSubscribeOrder(packageID: string, subscribeID: string, userID: string) {
    // 获取套餐信息
    const packageInfo = await this.prismaService.shopSubscribePackage.findUnique({
      where: { packageID },
    });
    // 如果套餐不存在 或者 套餐不在销售中状态 则抛出异常
    if (!packageInfo) throw new BadRequestException(1084);
    if (!packageInfo.isOnSale) throw new BadRequestException(1086);
    // 根据用户ID、套餐ID、订阅ID查找唯一订单数据
    const lastOrder = await this.prismaService.shopSubscribe.findFirst({
      where: { userID, packageID, subscribeID },
      orderBy: { createdAt: "desc" },
    });
    // 如果订单不存在则抛出异常
    if (!lastOrder) throw new BadRequestException(1092);
    const data = await this.prismaService.shopSubscribe.update({
      where: { userID, packageID, subscribeID },
      data: {
        days: packageInfo.days,
        user: { connect: { userID } },
        package: { connect: { packageID } },
        updatedAt: new Date(),
      },
    });
    // 如果存在, 则查找并更新用户余额
    const isSuccess = await this.balanceUtil.reduceUserBalance(userID, packageInfo.price);
    // 如果扣款失败则抛出系统异常
    if (!isSuccess) throw new BadRequestException(999);
    // 如果余额不足则抛出异常
    if (isSuccess === "NOT_ENOUGH") throw new BadRequestException(1031);
    // 如果用户不存在则抛出异常
    if (isSuccess === "USER_NOT_FOUND") throw new BadRequestException(1007);
    // 更新订单数据
    return data;
  }

  public async createSubscribeOrder(packageID: string, userID: string) {
    const packageInfo = await this.prismaService.shopSubscribePackage.findUnique({
      where: { packageID },
    });
    if (!packageInfo) throw new BadRequestException(1084);
    if (!packageInfo.isOnSale) throw new BadRequestException(1086);
    const userInstance = await this.prismaService.user.findFirst({
      where: { userID },
    });
    const reduced = BalanceUtil.reduceBalance(userInstance.balance, packageInfo.price);
    if (reduced === "NOT_ENOUGH") throw new BadRequestException(1031);
    const data = await this.prismaService.shopSubscribe.create({
      data: {
        days: packageInfo.days,
        package: {
          connect: { packageID },
        },
        user: {
          connect: { userID },
        },
      },
    });
    await this.prismaService.user.update({
      data: { balance: reduced },
      where: { userID },
    });
    return data;
  }

  /**
   * 获取用户订阅状态
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/22
   * @param {string} userID 用户ID
   * @param {string} subscribePackageID 订阅套餐ID
   * @return {Promise<[ShopSubscribe[], number]>}
   * @memberof SubscribeService
   */
  public async getUserSubscribeStatus(userID: string, subscribePackageID: string[]): Promise<[ShopSubscribe[], number]> {
    let subscribes = await this.prismaService.shopSubscribe.findMany({
      where: {
        userID: userID,
        packageID: {
          in: subscribePackageID,
        },
      },
    });
    // 过滤掉过期的订阅
    subscribes = subscribes.filter((subscribeItem) => {
      return subscribeItem.updatedAt.getTime() + subscribeItem.days * 24 * 60 * 60 * 1000 > new Date().getTime();
    });
    // 计算剩余天数
    let days = 0;
    for (const subscribeItem of subscribes) {
      // 剩余天数 = 订阅订单更新时间 + 订阅天数 - 当前时间
      days += subscribeItem.updatedAt.getTime() + subscribeItem.days * 24 * 60 * 60 * 1000 - new Date().getTime();
    }
    // 转换为天数 1天 = 24 * 60 * 60 * 1000毫秒
    days = Math.floor(days / (24 * 60 * 60 * 1000));
    // 如果剩余天数小于0则返回0
    if (days < 0) days = 0;
    return [subscribes, days];
  }

  /**
   * 获取单个订阅用户的订阅状态
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/22
   * @param {string} userID
   * @param {string} subscribeID
   * @return {Promise<[ShopSubscribe, number]>}
   * @memberof SubscribeService
   */
  public async getUserSubscribeStatusBySubscribeID(userID: string, subscribeID: string): Promise<[ShopSubscribe, number]> {
    const subscribe = await this.prismaService.shopSubscribe.findUnique({
      where: { subscribeID, userID },
    });
    if (!subscribe) throw new BadRequestException(1087);
    let days = 0;
    if (subscribe.updatedAt.getTime() + subscribe.days * 24 * 60 * 60 * 1000 > new Date().getTime()) {
      days = subscribe.updatedAt.getTime() + subscribe.days * 24 * 60 * 60 * 1000 - new Date().getTime();
    }
    days = Math.floor(days / (24 * 60 * 60 * 1000));
    if (days < 0) days = 0;
    return [subscribe, days];
  }

  public async cancelSubscribeOrder(subscribeID: string, userID: string) {
    const isExist = await this.prismaService.shopSubscribe.findFirst({
      where: { subscribeID, userID },
    });
    if (!isExist) throw new BadRequestException(1053);
    return this.prismaService.shopSubscribe.delete({
      where: { subscribeID, userID },
    });
  }
}
