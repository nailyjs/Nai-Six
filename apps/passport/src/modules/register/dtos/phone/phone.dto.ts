import { IsInt, IsMobilePhone, IsNotEmpty, IsNumber, IsOptional, IsString, Max } from "class-validator";

export class PostRegisterPhoneCodeBodyDTO {
  /**
   * 手机号 中国大陆
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/28
   * @type {string}
   * @memberof PostRegisterPhoneCodeBodyDTO
   */
  @IsMobilePhone("zh-CN")
  @IsString()
  @IsNotEmpty()
  phone: string;

  /**
   * 用户名 可选 为空时自动生成
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/28
   * @type {string}
   * @memberof PostRegisterPhoneCodeBodyDTO
   */
  @IsOptional()
  @IsString()
  username?: string;

  /**
   * 验证码
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/28
   * @type {number}
   * @memberof PostRegisterPhoneCodeBodyDTO
   */
  @Max(999999)
  @IsInt()
  @IsNumber()
  @IsNotEmpty()
  code: number;
}
