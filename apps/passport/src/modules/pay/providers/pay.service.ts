import { PrismaService } from "@nailyjs.nest.modules/prisma";
import { BadRequestException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { I18nTranslations } from "cc.naily.six.generated";
import { I18nService } from "nestjs-i18n";

@Injectable()
export class PayService {
  constructor(
    private readonly configService: ConfigService,
    private readonly i18nService: I18nService<I18nTranslations>,
    private readonly prismaService: PrismaService,
  ) {}

  public isEnabledXunhupay_Wechat() {
    return this.configService.get("global.pay.enabled").includes("Xunhupay_Wechat");
  }

  public isEnabledXunhupay_Alipay() {
    return this.configService.get("global.pay.enabled").includes("Xunhupay_Alipay");
  }

  public isEnabledWechat_Official() {
    return this.configService.get("global.pay.enabled").includes("Wechat_Official");
  }

  public isEnabled(payType: string) {
    const enabled = this.configService.get<string[]>("global.pay.enabled") || [];
    return enabled.includes(payType);
  }

  public isEnabledOrThrow(payType: string) {
    const enabled = this.configService.get<string[]>("global.pay.enabled") || [];
    if (!enabled.includes(payType))
      throw new BadRequestException({
        code: 1020,
        message: this.i18nService.t("global.errorCode.1020").replace("{}", payType),
      });
    return true;
  }

  public getPayConfiguration(payType: string) {
    if (!this.configService.get("global.pay.enabled").includes(payType)) throw new BadRequestException(1018);
    const configs = this.configService.get(`global.pay.${payType}`);
    // 如果没有enabled选项 说明是单例配置 直接返回
    if (!configs.enabled && typeof configs.enabled !== "boolean") return configs;
    // 如果有enabled选项 说明是多实例配置 返回对应实例
    return (configs.channel || [])[configs.enabled] || {};
  }

  /**
   * 生成订单号
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/11
   * @param {string} [str=""]
   * @return {number}
   * @memberof PayService
   */
  public async getOrderNo(str: string = ""): Promise<string> {
    let outTradeNo = ""; //订单号
    for (
      let i = 0;
      i < 6;
      i++ //6位随机数，用以加在时间戳后面。
    ) {
      outTradeNo += Math.floor(Math.random() * 10);
    }
    outTradeNo = str + new Date().getTime() + outTradeNo; //时间戳，用来生成订单号
    const count = await this.prismaService.userReceipt.count({
      where: { orderID: outTradeNo },
    });
    if (count !== 0) return await this.getOrderNo(str); //如果有重复的，重新生成
    return outTradeNo;
  }
}
