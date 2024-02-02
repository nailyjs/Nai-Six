import { IsMobilePhone, IsNotEmpty, IsString } from "class-validator";

export class PostTransportPhoneBodyDTO {
  /**
   * 手机号
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/02
   * @type {string}
   * @memberof PostTransportPhoneBodyDTO
   */
  @IsMobilePhone("zh-CN")
  @IsString()
  @IsNotEmpty()
  phone: string;
}
