import { ApiProperty } from "@nestjs/swagger";
import { ILoginType } from "@prisma/client";
import { LoginType } from "cc.naily.six.auth";
import { IsIn, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class PostLoginMicrosoftBodyDTO {
  /**
   * 微软登录的ID
   *
   * @type {string}
   * @memberof PostLoginMicrosoftBodyDTO
   */
  @IsString()
  @IsNotEmpty()
  readonly microsoftID: string;
  /**
   * 登录设备类型 `请看schema的enum正确传值`
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/24
   * @type {LoginType}
   * @memberof PostLoginEmailCodeBodyDTO
   */
  @IsIn(LoginType)
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ enum: LoginType })
  readonly loginType: ILoginType;
  /**
   * 登录的客户端 用于记录哪个APP/哪种浏览器（比如谷歌、火狐浏览器）等
   *
   * Web端登录时，该字段可以为空
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/24
   * @type {string}
   * @memberof PostLoginEmailCodeBodyDTO
   */
  @IsOptional()
  @IsString()
  readonly loginClient?: string;
  /**
   * 登录的设备名
   *
   * Web端登录时，该字段可以为空
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/28
   * @type {string}
   * @memberof PostLoginEmailCodeBodyDTO
   */
  @IsOptional()
  @IsString()
  readonly loginDeviceName?: string;
  /**
   * 设备唯一标识符
   *
   * Web端登录时，该字段可以为空
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/24
   * @type {string}
   * @memberof PostLoginEmailCodeBodyDTO
   */
  @IsOptional()
  @IsString()
  identifier?: string;
}
