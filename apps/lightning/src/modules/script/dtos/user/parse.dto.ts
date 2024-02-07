import { ApiProperty } from "@nestjs/swagger";

export class PostBroswerPluginUserCheckBodyDTO {
  /**
   * 内容
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/07
   * @type {string}
   * @memberof PostBroswerPluginUserCheckBodyDTO
   */
  @ApiProperty({ type: "string", format: "binary" })
  content: any;
}
