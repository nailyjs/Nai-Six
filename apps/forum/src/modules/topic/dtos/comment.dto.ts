import { IsArrayObjectIdOrObjectId, IsArrayStringOrString } from "cc.naily.six.shared";
import { IsArray, IsOptional } from "class-validator";

export class GetTopicCommentQueryDTO {
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
  filterUser: string | string[];
}
