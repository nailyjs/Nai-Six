import md5 from "md5";
import { Injectable } from "@nestjs/common";
import { IPayType, PayServiceImpl } from "../../interfaces/interface.impl";
import { PayService } from "../pay.service";
import { XunhupayBody, XunhupayNotify } from "../../interfaces/xunhupay.interface";
import axios from "axios";
import { IReceiptStatus, User } from "@prisma/client";
import { UserReceiptService } from "../receipt.service";
import { PrismaService } from "@nailyjs.nest.modules/prisma";

@Injectable()
export class XunhupayService implements PayServiceImpl {
  constructor(
    private readonly payService: PayService,
    private readonly userReceiptService: UserReceiptService,
    private readonly prismaService: PrismaService,
  ) {}

  public wxPaySign(params: any, key: string): string {
    const paramsArr = Object.keys(params);
    paramsArr.sort();
    const stringArr = [];
    paramsArr.map((key) => {
      stringArr.push(key + "=" + params[key]);
    });
    // 最后加上 商户Key
    let paramStr = stringArr.join("&");
    paramStr = paramStr + key;
    return md5(paramStr).toString().toLowerCase();
  }

  /**
   * 支付回调
   *
   * @see https://www.xunhupay.com/doc/api/pay.html
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/11
   * @param {XunhupayNotify} body
   * @return {Promise<"success">}
   * @memberof XunhupayService
   */
  public async notify(body: XunhupayNotify): Promise<"success"> {
    if (body.status !== "OD") return;
    const receipt = await this.userReceiptService.getReceipt(body.trade_order_id, body.attach);
    if (!receipt) return;
    await this.userReceiptService.setReceiptStatus(receipt.userReceiptID, IReceiptStatus.Success);
    const user = await this.prismaService.user.findFirst({ where: { userID: receipt.userID } });
    if (!user) return;
    await this.prismaService.user.update({
      where: { userID: receipt.userID },
      data: {
        balance: (user.balance ? user.balance : 0) + receipt.amount,
      },
    });
    return "success";
  }

  public async pay(amount: number, payType: IPayType, user: User): Promise<any> {
    const payConfiguration = this.payService.getPayConfiguration(payType);
    const { appid, appsecret, notify_url, return_url, callback_url, gateway, name } = payConfiguration;
    const trade_order_id = await this.payService.getOrderNo();
    const randomStr = new Date().getTime() + "-" + Math.random().toString().substring(2, 10);
    const requestBody: XunhupayBody = {
      version: 1.1,
      appid: `${appid}`,
      trade_order_id: trade_order_id,
      total_fee: amount,
      title: name,
      time: new Date().getTime(),
      notify_url: notify_url,
      return_url: return_url,
      callback_url: callback_url,
      nonce_str: randomStr,
      attach: randomStr,
      payment: payType === "Xunhupay_Wechat" ? "wechat" : "alipay",
      wap_name: name,
      wap_url: "https://watchrss.cn",
    };
    const hash = this.wxPaySign(requestBody, appsecret);
    requestBody.hash = hash;

    let remoteData: any;
    try {
      const { data } = await axios({
        url: gateway ? gateway : "https://api.xunhupay.com/payment/do.html",
        method: "POST",
        data: requestBody,
      });
      remoteData = data;
    } catch (error) {
      return error;
    }

    const receipt = await this.userReceiptService.createReceipt(payType, amount, trade_order_id, user.userID, randomStr);
    return { remoteData, receipt };
  }
}
