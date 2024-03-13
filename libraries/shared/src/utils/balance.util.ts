import { Injectable } from "@nestjs/common";
import { PrismaService } from "@nailyjs.nest.modules/prisma";

@Injectable()
export class BalanceUtil {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * 计算减少余额
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/22
   * @static
   * @param {number} balance 余额
   * @param {number} reduce 要减少的金额
   * @memberof BalanceUtil
   */
  public static reduceBalance(balance: number, reduce: number) {
    const result = balance - reduce;
    if (result < 0) return "NOT_ENOUGH";
    return parseFloat(result.toFixed(2));
  }

  /**
   * 计算添加余额
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/22
   * @static
   * @param {number} balance 余额
   * @param {number} add 要添加的金额
   * @memberof BalanceUtil
   */
  public static addBalance(balance: number, add: number) {
    return parseFloat((balance + add).toFixed(2));
  }

  /**
   * 添加用户余额
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/22
   * @param {string} userID 用户ID
   * @param {number} add 添加金额
   * @memberof BalanceUtil
   */
  public async addUserBalance(userID: string, add: number) {
    const user = await this.prismaService.user.findUnique({ where: { userID } });
    if (!user) return "USER_NOT_FOUND";
    const balance = BalanceUtil.addBalance(user.balance, add);
    await this.prismaService.user.update({ where: { userID }, data: { balance } });
    return balance;
  }

  /**
   * 减少用户余额
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/22
   * @param {string} userID 用户ID
   * @param {number} reduce 减少金额
   * @memberof BalanceUtil
   */
  public async reduceUserBalance(userID: string, reduce: number) {
    const user = await this.prismaService.user.findUnique({ where: { userID, isDeleted: false } });
    if (!user) return "USER_NOT_FOUND";
    const balance = BalanceUtil.reduceBalance(user.balance, reduce);
    if (balance === "NOT_ENOUGH") return "NOT_ENOUGH";
    await this.prismaService.user.update({ where: { userID }, data: { balance } });
    return balance;
  }
}
