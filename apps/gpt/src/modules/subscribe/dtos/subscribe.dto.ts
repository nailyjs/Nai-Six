import { ApiProperty } from "@nestjs/swagger";
import { IsObjectId } from "cc.naily.six.shared";
import { IsIn, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class GetGPTSubscribeQueryDTO {
  /**
   * 订阅订单创建时间排序
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/17
   * @type {("desc" | "asc")}
   * @memberof GetGPTSubscribeQueryDTO
   */
  @IsIn(["desc", "asc"])
  @IsString()
  @IsOptional()
  @ApiProperty({ enum: ["desc", "asc"], description: "订阅订单创建时间排序", default: "desc" })
  orderCreatedAt?: "desc" | "asc";
}

export class PostGPTSubscribeBodyDTO {
  /**
   * 套餐ID
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/17
   * @type {string}
   * @memberof PostGPTSubscribeBodyDTO
   */
  @IsObjectId()
  @IsNotEmpty()
  @IsString()
  packageID: string;
}

export class PostGPTSubscribeAdminBodyDTO {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  description: string;
  @IsNumber()
  @IsNotEmpty()
  price: number;
  @IsNumber()
  @IsNotEmpty()
  days: number;
}
