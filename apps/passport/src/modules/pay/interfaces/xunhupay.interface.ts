export interface XunhupayBody {
  version: 1.1;
  appid: string;
  trade_order_id: string;
  total_fee: number;
  title: string;
  time: number;
  notify_url: string;
  return_url: string;
  callback_url: string;
  nonce_str: any;
  hash?: any;
  type?: "WAP";
  payment: "wechat" | "alipay";
  wap_name: string;
  wap_url: string;
  attach: string;
}

export interface XunhupayNotify {
  /**
   * 商户订单号
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/13
   * @type {string}
   * @memberof XunhupayNotify
   */
  trade_order_id: string;
  /**
   * 	订单支付金额
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/13
   * @type {number}
   * @memberof XunhupayNotify
   */
  total_fee: number;
  /**
   * 交易号
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/13
   * @type {string}
   * @memberof XunhupayNotify
   */
  transaction_id: string;
  /**
   * 虎皮椒内部订单号
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/13
   * @type {string}
   * @memberof XunhupayNotify
   */
  open_order_id: string;
  /**
   * 	订单标题
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/13
   * @type {string}
   * @memberof XunhupayNotify
   */
  order_title: string;
  /**
   * 	订单状态
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/13
   * @type {"OD"}
   * @memberof XunhupayNotify
   */
  status: "OD";
  /**
   * 	插件ID
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/13
   * @type {string}
   * @memberof XunhupayNotify
   */
  plugins: string;
  /**
   * 备注
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/13
   * @type {string}
   * @memberof XunhupayNotify
   */
  attach: string;
  /**
   * 支付渠道ID
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/13
   * @type {string}
   * @memberof XunhupayNotify
   */
  appid: string;
  /**
   * 时间戳
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/13
   * @type {string}
   * @memberof XunhupayNotify
   */
  time: string;
  /**
   * 随机字符串
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/13
   * @type {string}
   * @memberof XunhupayNotify
   */
  nonce_str: string;
  /**
   * 	签名
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/13
   * @type {string}
   * @memberof XunhupayNotify
   */
  hash: string;
}
