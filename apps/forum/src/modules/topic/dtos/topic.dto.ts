import { ApiProperty } from "@nestjs/swagger";
import { IsArrayObjectIdOrObjectId, IsArrayStringOrString } from "cc.naily.six.shared";
import { IsIn, IsOptional, IsString } from "class-validator";

export class GetTopicQueryDTO {
  /**
   * 创建时间排序
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/17
   * @type {("asc" | "desc")}
   * @memberof GetTopicQueryDTO
   */
  @IsIn(["asc", "desc"])
  @IsString()
  @IsOptional()
  @ApiProperty({ enum: ["asc", "desc"], description: "创建时间排序" })
  orderCreatedAt?: "asc" | "desc";
  /**
   * 更新时间排序
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/17
   * @type {("asc" | "desc")}
   * @memberof GetTopicQueryDTO
   */
  @IsIn(["asc", "desc"])
  @IsString()
  @IsOptional()
  @ApiProperty({ enum: ["asc", "desc"], description: "更新时间排序" })
  orderUpdatedAt?: "asc" | "desc";
  /**
   * 用户ID
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/17
   * @type {(string | string[])}
   * @memberof GetTopicQueryDTO
   */
  @IsArrayObjectIdOrObjectId()
  @IsArrayStringOrString()
  @IsOptional()
  @ApiProperty({ type: [String], description: "用户ID" })
  filterUserID?: string | string[];
}
