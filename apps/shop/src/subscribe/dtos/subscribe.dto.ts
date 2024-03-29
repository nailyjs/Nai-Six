import { ApiProperty } from "@nestjs/swagger";
import { IsArrayObjectIdOrObjectId, IsArrayStringOrString, IsObjectId } from "cc.naily.six.shared";
import { IsIn, IsNotEmpty, IsNumberString, IsOptional, IsString } from "class-validator";

export class GetSubscribeUserQueryDTO {
  /**
   * 排序创建时间
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/21
   * @type {("asc" | "desc")}
   * @memberof GetSubscribeQueryDTO
   */
  @IsIn(["asc", "desc"])
  @IsString()
  @IsOptional()
  @ApiProperty({ enum: ["asc", "desc"] })
  orderCreatedAt?: "asc" | "desc";
  /**
   * 排序更新时间
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/21
   * @type {("asc" | "desc")}
   * @memberof GetSubscribeQueryDTO
   */
  @IsIn(["asc", "desc"])
  @IsString()
  @IsOptional()
  @ApiProperty({ enum: ["asc", "desc"] })
  orderUpdatedAt?: "asc" | "desc";
  /**
   * 排序订阅剩余天数
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/21
   * @type {("asc" | "desc")}
   * @memberof GetSubscribeQueryDTO
   */
  @IsOptional()
  @IsIn(["asc", "desc"])
  @ApiProperty({ enum: ["asc", "desc"] })
  orderDay?: "asc" | "desc";
  /**
   * 过滤订阅套餐ID
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/21
   * @type {(string | string[])}
   * @memberof GetSubscribeQueryDTO
   */
  @IsArrayObjectIdOrObjectId()
  @IsArrayStringOrString()
  @IsOptional()
  @ApiProperty({ isArray: true, type: "string" })
  filterSubscribePackageID?: string | string[];

  /**
   * 获取数量
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/21
   * @type {number}
   * @memberof GetSubscribeQueryDTO
   */
  @IsNumberString()
  @IsOptional()
  take?: number;

  /**
   * 跳过数量
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/21
   * @type {number}
   * @memberof GetSubscribeQueryDTO
   */
  @IsNumberString()
  @IsOptional()
  skip?: number;
}

export class GetSubscribeUserStatusQueryDTO {
  /**
   * 过滤订阅套餐ID
   *
   * @type {string}
   * @memberof GetSubscribeUserStatusQueryDTO
   */
  @IsArrayObjectIdOrObjectId()
  @IsNotEmpty()
  subscribePackageID?: string[] | string;
}

export class PostSubscribeUserBodyDTO {
  /**
   * 套餐ID
   *
   * @type {string}
   * @memberof PostSubscribeBodyDTO
   */
  @IsObjectId()
  @IsString()
  @ApiProperty()
  packageID: string;
}

export class PutSubscribeUserBodyDTO {
  /**
   * 订阅ID
   *
   * @type {string}
   * @memberof PutSubscribeBodyDTO
   */
  @IsObjectId()
  @IsString()
  @IsNotEmpty()
  subscribeID: string;
}
