import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Max } from "class-validator";

export class PutUserUsernameBodyDTO {
  /**
   * 新用户名
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/02
   * @type {string}
   * @memberof PutUserUsernameBodyDTO
   */
  @IsString()
  @IsNotEmpty()
  username: string;
}

export class PutUserPasswordBodyDTO {
  /**
   * 旧密码（如果有旧密码，必填；如果没有，不填）
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/13
   * @type {string}
   * @memberof PutUserPasswordBodyDTO
   */
  @IsOptional()
  @IsString()
  oldPassword?: string;
  /**
   * 验证类别 `email` 邮箱 `phone` 手机
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/13
   * @type {("email" | "phone")}
   * @memberof PutUserPasswordBodyDTO
   */
  @IsIn(["email", "phone"])
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: "验证类别 `email` 邮箱 `phone` 手机", enum: ["email", "phone"] })
  verifyType: "email" | "phone";
  /**
   * 验证码
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/13
   * @type {string}
   * @memberof PutUserPasswordBodyDTO
   */
  @Max(999999)
  @IsInt()
  @IsNumber()
  @IsNotEmpty()
  verifyCode: number;
  /**
   * 新密码
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/13
   * @type {string}
   * @memberof PutUserPasswordBodyDTO
   */
  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
