import { ApiProperty } from "@nestjs/swagger";
import { IsBooleanString, IsNotEmpty, IsString } from "class-validator";
import { IsOptional } from "class-validator";

export class GetSubscribeAppleCheckBodyDTO {
  /**
   * 苹果应用的bundleId
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/28
   * @type {string}
   * @memberof GetSubscribeAppleCheckBodyDTO
   */
  @IsString()
  @IsNotEmpty()
  bundleId: string;
  /**
   * 苹果应用的transactionId
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/28
   * @type {string}
   * @memberof GetSubscribeAppleCheckBodyDTO
   */
  @IsString()
  @IsNotEmpty()
  transactionId: string;

  /**
   * 是否是沙盒环境 默认false
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/31
   * @type {string}
   * @memberof GetSubscribeAppleCheckBodyDTO
   */
  @IsBooleanString()
  @IsNotEmpty()
  @ApiProperty({ type: "string", default: "false" })
  isSandbox?: "true" | "false" = "false";
}

export class GetSubscribeAppleUserStatusDTO {
  /**
   * 苹果transactionId
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/25
   * @type {string}
   * @memberof GetSubscribeAppleUserStatusDTO
   */
  @IsString()
  @IsNotEmpty()
  transactionId: string;
}

export class GetSubscribeAppleUserQueryDTO {
  /**
   * 是否沙盒环境
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/01
   * @type {boolean}
   * @memberof GetSubscribeAppleUserQueryDTO
   */
  @IsBooleanString()
  @IsString()
  @IsOptional()
  isSandbox: "true" | "false" = "false";
}
