import { ApiProperty } from "@nestjs/swagger";
import { IsArrayObjectIdOrObjectId, IsArrayStringOrString, MaxPoint } from "cc.naily.six.shared";
import { IsBooleanString, IsIn, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString } from "class-validator";

export class GetSubscribePackageQueryDTO {
  /**
   * 排序创建时间
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/21
   * @type {("asc" | "desc")}
   * @memberof GetSubscribePackageQueryDTO
   */
  @IsOptional()
  @IsString()
  @IsIn(["asc", "desc"])
  @ApiProperty({ enum: ["asc", "desc"] })
  orderCreatedAt?: "asc" | "desc";
  /**
   * 排序更新时间
   *
   * @type {("asc" | "desc")}
   * @memberof GetSubscribePackageQueryDTO
   */
  @IsOptional()
  @IsString()
  @IsIn(["asc", "desc"])
  @ApiProperty({ enum: ["asc", "desc"] })
  orderUpdatedAt?: "asc" | "desc";
  /**
   * 排序订阅天数
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/21
   * @type {("asc" | "desc")}
   * @memberof GetSubscribePackageQueryDTO
   */
  @IsOptional()
  @IsString()
  @IsIn(["asc", "desc"])
  @ApiProperty({ enum: ["asc", "desc"] })
  orderDay?: "asc" | "desc";
  /**
   * 排序价格
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/21
   * @type {("asc" | "desc")}
   * @memberof GetSubscribePackageQueryDTO
   */
  @IsOptional()
  @IsString()
  @IsIn(["asc", "desc"])
  @ApiProperty({ enum: ["asc", "desc"] })
  orderPrice?: "asc" | "desc";
  /**
   * 过滤是否在售
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/21
   * @type {boolean}
   * @memberof GetSubscribePackageQueryDTO
   */
  @IsOptional()
  @IsBooleanString()
  @IsString()
  filterIsOnSale?: boolean;
  /**
   * 过滤作者用户ID
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/21
   * @type {string}
   * @memberof GetSubscribePackageQueryDTO
   */
  @IsOptional()
  @IsArrayObjectIdOrObjectId()
  @IsArrayStringOrString()
  @ApiProperty({ isArray: true, type: "string" })
  filterAuthorUserID?: string | string[];
  /**
   * 获取数量
   *
   * @type {number}
   * @memberof GetSubscribePackageQueryDTO
   */
  @IsOptional()
  @IsNumberString()
  take?: number;

  /**
   * 跳过数量
   *
   * @type {number}
   * @memberof GetSubscribePackageQueryDTO
   */
  @IsOptional()
  @IsNumberString()
  skip?: number;
}

export class PostSubscribePackageBodyDTO {
  /**
   * 套餐名称
   *
   * @type {string}
   * @memberof PostSubscribePackageBodyDTO
   */
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;
  /**
   * 套餐天数
   *
   * @type {number}
   * @memberof PostSubscribePackageBodyDTO
   */
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  days: number;
  /**
   * 套餐价格 允许小数后两位
   *
   * @type {number}
   * @memberof PostSubscribePackageBodyDTO
   */
  @MaxPoint(2)
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  price: number;
  /**
   * 作者用户ID
   *
   * @type {string}
   * @memberof PostSubscribePackageBodyDTO
   */
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description?: string;
}
