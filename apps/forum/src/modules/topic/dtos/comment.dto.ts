import { ApiProperty } from "@nestjs/swagger";
import { IsArrayObjectIdOrObjectId, IsArrayStringOrString, IsObjectId } from "cc.naily.six.shared";
import { IsArray, IsIn, IsNotEmpty, IsNumberString, IsOptional, IsString } from "class-validator";

export class GetTopicCommentQueryDTO {
  /**
   * 话题ID
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/17
   * @type {string}
   * @memberof GetTopicCommentQueryDTO
   */
  @IsObjectId()
  @IsString()
  @IsNotEmpty()
  topicID: string;
  /**
   * 通过父评论ID查询该评论的子评论
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/17
   * @type {string}
   * @memberof GetTopicCommentQueryDTO
   */
  @IsObjectId()
  @IsString()
  @IsOptional()
  parentID?: string;
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
  @ApiProperty({ type: [String], description: "筛选用户" })
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

export class PostTopicCommentBodyDTO {
  /**
   * 话题ID
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/17
   * @type {string}
   * @memberof PostTopicCommentBodyDTO
   */
  @IsObjectId()
  @IsString()
  @IsNotEmpty()
  topicID: string;
  /**
   * 父评论ID 如果有则为该父评论的子评论
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/17
   * @type {string}
   * @memberof PostTopicCommentBodyDTO
   */
  @IsObjectId()
  @IsString()
  @IsNotEmpty()
  parentID?: string;
  /**
   * 评论内容
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/17
   * @type {string}
   * @memberof PostTopicCommentBodyDTO
   */
  @IsString()
  @IsNotEmpty()
  content: string;
}

export class DeleteTopicCommentBodyDTO {
  /**
   * 评论ID
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/17
   * @type {string}
   * @memberof DeleteTopicCommentBodyDTO
   */
  @IsObjectId()
  @IsString()
  @IsNotEmpty()
  commentID: string;
}
