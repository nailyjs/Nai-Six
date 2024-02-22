import { BaseDTO } from "src/dtos/base.dto";

export class GetSubscribeUserStatusDataSubscribesQueryResDTO {
  /**
   * 订阅订单ID
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/22
   * @type {string}
   * @memberof GetSubscribeUserStatusDataSubscribesQueryResDTO
   */
  subscribeID: string;
  /**
   * 订阅订单创建时间
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/22
   * @type {Date}
   * @memberof GetSubscribeUserStatusDataSubscribesQueryResDTO
   */
  createdAt: Date;
  /**
   * 订阅订单更新时间
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/22
   * @type {Date}
   * @memberof GetSubscribeUserStatusDataSubscribesQueryResDTO
   */
  updatedAt: Date;
  /**
   * 用户ID
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/22
   * @type {string}
   * @memberof GetSubscribeUserStatusDataSubscribesQueryResDTO
   */
  userID: string;
  /**
   * 剩余天数
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/22
   * @type {number}
   * @memberof GetSubscribeUserStatusDataSubscribesQueryResDTO
   */
  days: number;
  /**
   * 订阅套餐ID
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/22
   * @type {string}
   * @memberof GetSubscribeUserStatusDataSubscribesQueryResDTO
   */
  packageID: string;
}

export class GetSubscribeUserStatusDataQueryResDTO {
  /**
   * 全部订阅订单总的剩余天数 判断是否过期只需要判断这个字段为0即可
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/22
   * @type {number}
   * @memberof GetSubscribeUserStatusDataQueryResDTO
   */
  remainDays: number;
  /**
   * 返回的是`未过期的`订阅订单列表
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/22
   * @type {any[]}
   * @memberof GetSubscribeUserStatusDataQueryResDTO
   */
  subscribes: GetSubscribeUserStatusDataSubscribesQueryResDTO[];
}

export class GetSubscribeUserStatusQueryResDTO extends BaseDTO {
  data: GetSubscribeUserStatusDataQueryResDTO;
}
