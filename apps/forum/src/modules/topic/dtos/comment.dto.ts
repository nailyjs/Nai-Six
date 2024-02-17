import { ApiProperty } from "@nestjs/swagger";
import { IsArrayObjectIdOrObjectId, IsArrayStringOrString } from "cc.naily.six.shared";
import { IsArray, IsIn, IsNumberString, IsOptional, IsString } from "class-validator";

export class GetTopicCommentQueryDTO {
  /**
   * 创建时间排序
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/17
   * @type {("asc" | "desc")}
   * @memberof GetTopicCommentQueryDTO
   */
  @IsIn(["asc", "desc"])
  @IsString()
  @IsOptional()
  @ApiProperty({ enum: ["asc", "desc"], description: "创建时间排序" })
  orderLikes?: "asc" | "desc";
  /**
   * 创建时间排序
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/17
   * @type {("asc" | "desc")}
   * @memberof GetTopicCommentQueryDTO
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
   * @memberof GetTopicCommentQueryDTO
   */
  @IsIn(["asc", "desc"])
  @IsString()
  @IsOptional()
  @ApiProperty({ enum: ["asc", "desc"], description: "创建时间排序" })
  orderUpdatedAt?: "asc" | "desc";
  /**
   * 筛选用户
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/17
   * @type {(string | string[])}
   * @memberof GetTopicCommentQueryDTO
   */
  @IsArrayObjectIdOrObjectId()
  @IsArrayStringOrString()
  @IsArray()
  @IsOptional()
  filterUser?: string | string[];
  /**
   * 限制数量
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/17
   * @type {number}
   * @memberof GetTopicCommentQueryDTO
   */
  @IsNumberString()
  @IsString()
  @IsOptional()
  take?: number;
  /**
   * 跳过数量
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/17
   * @type {number}
   * @memberof GetTopicCommentQueryDTO
   */
  @IsNumberString()
  @IsString()
  @IsOptional()
  skip?: number;
}
