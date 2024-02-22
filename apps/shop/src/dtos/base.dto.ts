export class BaseDTO {
  /**
   * 状态码
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/22
   * @type {number}
   * @memberof BaseDTO
   */
  statusCode: number = 200;
  /**
   * 消息
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/22
   * @type {string}
   * @memberof BaseDTO
   */
  message: string = "成功";
  /**
   * 时间戳
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/22
   * @type {Date}
   * @memberof BaseDTO
   */
  timestamp: Date;
}
