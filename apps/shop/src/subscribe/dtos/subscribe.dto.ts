import { ApiProperty } from "@nestjs/swagger";
import { IsArrayObjectIdOrObjectId, IsArrayStringOrString } from "cc.naily.six.shared";
import { IsIn, IsNumberString, IsOptional, IsString } from "class-validator";

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

export class PostSubscribeUserBodyDTO {
  /**
   * 套餐ID
   *
   * @type {string}
   * @memberof PostSubscribeBodyDTO
   */
  @IsString()
  @ApiProperty()
  packageID: string;
}
