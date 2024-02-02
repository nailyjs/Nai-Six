import { IsEmail, IsNotEmpty } from "class-validator";

export class PostTransportEmailBodyDTO {
  /**
   * 邮箱
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/02
   * @type {string}
   * @memberof PostTransportEmailBodyDTO
   */
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
