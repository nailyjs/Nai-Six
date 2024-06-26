import { IsCode } from "cc.naily.six.shared";
import { IsEmail, IsInt, IsMobilePhone, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

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
  @IsCode()
  @IsInt({ message: "验证码必须是数字" })
  @IsNumber()
  @IsNotEmpty()
  code: number;
}

export class PostRegisterEmailCodeBodyDTO {
  /**
   * 电子邮件地址
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/10
   * @type {string}
   * @memberof PostRegisterEmailCodeBodyDTO
   */
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;
  /**
   * 用户名 可选 为空时自动生成
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/28
   * @type {string}
   * @memberof PostRegisterEmailCodeBodyDTO
   */
  @IsOptional()
  @IsString()
  username?: string;
  /**
   * 验证码
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/10
   * @type {number}
   * @memberof PostRegisterEmailCodeBodyDTO
   */
  @IsCode()
  @IsInt()
  @IsNumber()
  @IsNotEmpty()
  code: number;
}
