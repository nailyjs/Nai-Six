import md5 from "md5";
import { BadRequestException, Injectable } from "@nestjs/common";
import { IPayType, PayServiceImpl } from "../../interfaces/interface.impl";
import { PayService } from "../pay.service";
import { XunhupayBody, XunhupayNotify } from "../../interfaces/xunhupay.interface";
import axios from "axios";
import { IReceiptStatus, User } from "@prisma/client";
import { UserReceiptService } from "../receipt.service";
import { PrismaService } from "@nailyjs.nest.modules/prisma";
import { CommonLogger } from "cc.naily.six.shared";

@Injectable()
export class XunhupayService implements PayServiceImpl {
  constructor(
    private readonly payService: PayService,
    private readonly userReceiptService: UserReceiptService,
    private readonly prismaService: PrismaService,
    private readonly commonLogger: CommonLogger,
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
    const databaseReceipt = await this.prismaService.userReceipt.findFirst({
      where: { userReceiptID: receipt.userReceiptID },
    });
    if (!databaseReceipt) return;
    if (databaseReceipt.receiptStatus !== IReceiptStatus.Pending) return "success";
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

  public async pay(amount: number, payType: IPayType, user: User, productName: string): Promise<any> {
    const payConfiguration = this.payService.getPayConfiguration(payType);
    const { appid, appsecret, notify_url, return_url, callback_url, gateway, id, ...rest } = payConfiguration;
    const trade_order_id = await this.payService.getOrderNo();
    const randomStr = new Date().getTime() + "-" + Math.random().toString().substring(2, 10);
    const requestBody: XunhupayBody = {
      ...rest,
      version: 1.1,
      appid: `${appid}`,
      trade_order_id: trade_order_id,
      total_fee: amount,
      time: new Date().getTime(),
      notify_url: notify_url,
      return_url: return_url,
      callback_url: callback_url,
      nonce_str: randomStr,
      attach: randomStr,
      payment: payType === "Xunhupay_Wechat" ? "wechat" : "alipay",
      title: productName,
      wap_name: productName,
    };
    const hash = this.wxPaySign(requestBody, appsecret);
    requestBody.hash = hash;
    let remoteData: any;
    try {
      const axiosRequest = {
        url: gateway,
        method: "POST",
        data: requestBody,
      };
      console.log(`axiosRequest: ${JSON.stringify(axiosRequest)}`);
      const { data } = await axios(axiosRequest);
      remoteData = data;
    } catch (error) {
      console.error(error);
      return error;
    }

    const receipt = await this.userReceiptService.createReceipt({
      payType,
      amount,
      orderID: trade_order_id,
      userID: user.userID,
      nonceStr: randomStr,
      channel: id,
    });
    return { remoteData, receipt };
  }

  public async refund(receiptID: string, reason: string) {
    const receipt = await this.prismaService.userReceipt.findUnique({
      where: { userReceiptID: receiptID },
    });
    if (!receipt) throw new BadRequestException("订单不存在");
    // 如果当前收据记录了支付渠道，则使用该渠道的支付配置；否则使用默认配置尝试退款
    const { appid, appsecret, refund_gateway } =
      typeof receipt.channel === "string"
        ? this.payService.getPayConfigurationByChannel(receipt.payType, receipt.channel)
        : this.payService.getDefaultPayConfiguration(receipt.payType);
    const requestBody = {
      appid,
      trade_order_id: receipt.orderID,
      reason,
      time: new Date().getTime(),
      nonce_str: new Date().getTime() + "-" + Math.random().toString().substring(2, 10),
    };
    const hash = this.wxPaySign(requestBody, appsecret);
    requestBody["hash"] = hash;

    let remoteData: any;
    try {
      const { data } = await axios({
        url: refund_gateway,
        method: "POST",
        data: requestBody,
      });
      remoteData = data;
    } catch (error) {
      this.commonLogger.error("退款请求发起失败", error);
      return error;
    }

    const newUserReceipt = await this.userReceiptService.setReceiptStatus(receiptID, IReceiptStatus.Refunded);
    return { remoteData, receipt: newUserReceipt };
  }
}
