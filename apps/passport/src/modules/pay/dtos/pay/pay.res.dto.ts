import { ApiProperty } from "@nestjs/swagger";
import { IReceiptStatus } from "@prisma/client";
import { IPayType, PayTypeArray } from "../../interfaces/interface.impl";

export class PostUserPayDataReceipt201ResDTO {
  /**
   * 收据ID
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/11
   * @type {string}
   * @memberof PostUserPayDataReceipt201ResDTO
   */
  userReceiptID: string;
  /**
   * 创建时间
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/11
   * @type {Date}
   * @memberof PostUserPayDataReceipt201ResDTO
   */
  createdAt: Date;
  /**
   * 更新时间
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/11
   * @type {Date}
   * @memberof PostUserPayDataReceipt201ResDTO
   */
  updatedAt: Date;
  /**
   * 订单ID
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/11
   * @type {string}
   * @memberof PostUserPayDataReceipt201ResDTO
   */
  orderID: string;
  /**
   * 金额
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/11
   * @type {number}
   * @memberof PostUserPayDataReceipt201ResDTO
   */
  amount: number;
  /**
   * 用户ID
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/11
   * @type {string}
   * @memberof PostUserPayDataReceipt201ResDTO
   */
  userID: string;
  /**
   * 收据状态 请看schema枚举
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/11
   * @type {IReceiptStatus}
   * @memberof PostUserPayDataReceipt201ResDTO
   */
  @ApiProperty({ description: "收据状态 请看schema枚举", enum: IReceiptStatus })
  receiptStatus: IReceiptStatus;
  /**
   * 支付类型
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/11
   * @type {string}
   * @memberof PostUserPayDataReceipt201ResDTO
   */
  @ApiProperty({ description: "支付类型", enum: PayTypeArray })
  payType: IPayType;
}

export class PostUserPayData201ResDTO {
  /**
   * 远程数据。如果是迅虎，会返回迅虎的请求信息；如果是微信官方，会返回微信官方的请求信息
   *
   * 请`根据这个对象内的数据`，进行前端的进一步对接
   *
   * * 迅虎参考文档：[发起付款接口](https://www.xunhupay.com/doc/api/pay.html)
   * * 微信官方参考文档：[JSAPI支付](https://pay.weixin.qq.com/docs/merchant/apis/jsapi-payment/direct-jsons/jsapi-prepay.html)
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/11
   * @type {Record<string, any>}
   * @memberof PostUserPayData201ResDTO
   */
  remoteData: Record<string, any>;
  /**
   * 每次请求都会有收据信息，包括收据ID、创建时间、更新时间、订单ID、金额、用户ID、收据状态、支付类型等数据。
   *
   * 以后后端会添加收据检查功能：如果x小时内没有支付成功，将会自动删除掉收据。
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/11
   * @type {PostUserPayDataReceipt201ResDTO}
   * @memberof PostUserPayData201ResDTO
   */
  receipt: PostUserPayDataReceipt201ResDTO;
}

export class PostUserPay201ResDTO {
  /**
   * HTTP状态码
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/11
   * @memberof PostUserPay201ResDTO
   */
  statusCode = 200;
  /**
   * 状态消息 除非请求过程中网络请求失败才会产生其他的状态码。
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/11
   * @memberof PostUserPay201ResDTO
   */
  code = 1000;
  /**
   * 消息 除非请求过程中网络请求失败才会抛出其他错误。其余的情况，请根据`remoteData`的内容参照对应的判断
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/11
   * @memberof PostUserPay201ResDTO
   */
  message = "成功";
  /**
   * 时间戳
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/11
   * @memberof PostUserPay201ResDTO
   */
  timestamp = new Date();
  /**
   * 数据
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/11
   * @type {PostUserPayData201ResDTO}
   * @memberof PostUserPay201ResDTO
   */
  data: PostUserPayData201ResDTO;
}
