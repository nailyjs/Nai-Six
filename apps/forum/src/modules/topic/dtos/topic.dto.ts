import { ApiProperty } from "@nestjs/swagger";
import { IsArrayObjectIdOrObjectId, IsArrayStringOrString, IsObjectId } from "cc.naily.six.shared";
import { IsArray, IsIn, IsNotEmpty, IsNumberString, IsOptional, IsString } from "class-validator";

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
   * 点赞数排序
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/17
   * @type {("asc" | "desc")}
   * @memberof GetTopicQueryDTO
   */
  @IsIn(["asc", "desc"])
  @IsString()
  @IsOptional()
  @ApiProperty({ enum: ["asc", "desc"], description: "点赞数排序" })
  orderLikeCount?: "asc" | "desc";
  /**
   * 浏览数排序
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/17
   * @type {("asc" | "desc")}
   * @memberof GetTopicQueryDTO
   */
  @IsIn(["asc", "desc"])
  @IsString()
  @IsOptional()
  @ApiProperty({ enum: ["asc", "desc"], description: "浏览数排序" })
  orderViewCount?: "asc" | "desc";
  /**
   * 展现数排序
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/17
   * @type {("asc" | "desc")}
   * @memberof GetTopicQueryDTO
   */
  @IsIn(["asc", "desc"])
  @IsString()
  @IsOptional()
  @ApiProperty({ enum: ["asc", "desc"], description: "浏览数排序" })
  orderDisplayCount?: "asc" | "desc";
  /**
   * 筛选用户ID
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/17
   * @type {(string | string[])}
   * @memberof GetTopicQueryDTO
   */
  @IsArrayObjectIdOrObjectId()
  @IsArrayStringOrString()
  @IsOptional()
  @ApiProperty({ type: [String], description: "筛选用户ID" })
  filterUserID?: string | string[];
  /**
   * 筛选标签ID
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/17
   * @type {(string | string[])}
   * @memberof GetTopicQueryDTO
   */
  @IsArrayObjectIdOrObjectId()
  @IsArrayStringOrString()
  @IsOptional()
  @ApiProperty({ type: [String], description: "筛选标签ID" })
  filterTagID?: string | string[];
  /**
   * 限制数量
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/17
   * @type {number}
   * @memberof GetTopicQueryDTO
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
   * @memberof GetTopicQueryDTO
   */
  @IsNumberString()
  @IsString()
  @IsOptional()
  skip?: number;
}

export class PostTopicBodyDTO {
  /**
   * 话题标题 (可选)
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/17
   * @type {string}
   * @memberof PostTopicBodyDTO
   */
  @IsString()
  @IsOptional()
  topicName?: string;
  /**
   * 话题内容 (markdown) (可选)
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/17
   * @type {string}
   * @memberof PostTopicBodyDTO
   */
  @IsString()
  @IsOptional()
  topicContent?: string;
  /**
   * 话题描述 (可选) (会自动提取内容前 50 字符作为描述)
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/17
   * @type {string}
   * @memberof PostTopicBodyDTO
   */
  @IsString()
  @IsOptional()
  topicDesc?: string;
  /**
   * 话题标签 必须是已存在的标签ID
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/17
   * @type {string[]}
   * @memberof PostTopicBodyDTO
   */
  @IsArrayObjectIdOrObjectId()
  @IsArrayStringOrString()
  @IsArray()
  @IsNotEmpty()
  tags: string[];
}

export class PutTopicBodyDTO extends PostTopicBodyDTO {
  /**
   * 话题ID
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/17
   * @type {string}
   * @memberof PutTopicBodyDTO
   */
  @IsObjectId()
  @IsString()
  topicID: string;
}

export class GetTopicDetailQueryDTO {
  /**
   * 话题ID
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/17
   * @type {string}
   * @memberof GetTopicDetailQueryDTO
   */
  @IsObjectId()
  @IsString()
  topicID: string;
}
