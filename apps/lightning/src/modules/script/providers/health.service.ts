import { Injectable } from "@nestjs/common";
import { PostBroswerPluginUserCheckDTOResDTO, PostBroswerPluginUserCheckHealthDTOBodyDTO } from "../dtos/user/parse.res.dto";
import { HealthEnum, HealthTypeEnum } from "../enums/health.enum";

@Injectable()
export class ScriptHealthService {
  /**
   * 检查脚本是否支持浏览器
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/07
   * @param {Record<keyof PostBroswerPluginUserCheckDTOResDTO, string[]>} info
   * @return {*}  {boolean}
   * @memberof ScriptParserService
   */
  public checkHealth(info: Record<keyof PostBroswerPluginUserCheckDTOResDTO, string[]>): PostBroswerPluginUserCheckHealthDTOBodyDTO[] {
    const questionList: PostBroswerPluginUserCheckHealthDTOBodyDTO[] = [];

    if (info.grant && Array.isArray(info.grant)) {
      if (info.grant.includes("GM_registerMenuCommand")) {
        questionList.push({ type: HealthTypeEnum.Error, message: HealthEnum.NO_GM_registerMenuCommand });
      }
    }
    return questionList;
  }
}
