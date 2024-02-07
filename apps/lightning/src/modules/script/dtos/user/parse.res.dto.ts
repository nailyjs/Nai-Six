import { HealthEnum, HealthTypeEnum } from "../../enums/health.enum";
import { ApiProperty } from "@nestjs/swagger";

export class PostBroswerPluginUserCheckDTOResDTO {
  name?: string[];
  description?: string[];
  icon?: string[];
  author?: string[];
  license?: string[];
  create?: string[];
  version?: string[];
  connect?: string[];
  include?: string[];
  exclude?: string[];
  supportURL?: string[];
  homepageURL?: string[];
  copyright?: string[];
  lastmodified?: string[];
  note?: string[];
  resource?: string[];
  require?: string[];
  grant?: string[];
  namespace?: string[];
  downloadURL?: string[];
  updateURL?: string[];
}

export class PostBroswerPluginUserCheckHealthDTOBodyDTO {
  /**
   * 信息类型
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/08
   * @type {("error" | "warning")}
   * @enum {HealthTypeEnum}
   * @memberof PostBroswerPluginUserCheckHealthDTOBodyDTO
   */
  @ApiProperty({ enum: HealthTypeEnum })
  type: "error" | "warning";
  /**
   * 信息
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/08
   * @type {HealthEnum}
   * @memberof PostBroswerPluginUserCheckHealthDTOBodyDTO
   */
  message: HealthEnum;
}

export class PostBroswerPluginUserCheckRawInfoResDTO {
  /**
   * 脚本信息
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/07
   * @type {PostBroswerPluginUserCheckDTOResDTO}
   * @memberof PostBroswerPluginUserCheckResDTO
   */
  readonly info: PostBroswerPluginUserCheckDTOResDTO;
}

export class PostBroswerPluginUserCheckResDTO {
  /**
   * 内容 压缩后的
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/07
   * @type {string}
   * @memberof PostBroswerPluginUserCheckResDTO
   */
  readonly content: string;
  /**
   * 脚本信息
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/07
   * @type {PostBroswerPluginUserCheckDTOResDTO}
   * @memberof PostBroswerPluginUserCheckResDTO
   */
  readonly info: PostBroswerPluginUserCheckDTOResDTO;
  /**
   * 健康检查
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/08
   * @type {PostBroswerPluginUserCheckHealthDTOBodyDTO[]}
   * @memberof PostBroswerPluginUserCheckResDTO
   */
  readonly health: PostBroswerPluginUserCheckHealthDTOBodyDTO[];
}
