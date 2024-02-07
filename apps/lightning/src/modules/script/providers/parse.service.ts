import { Injectable } from "@nestjs/common";
import { rollup } from "rollup";
import terser from "@rollup/plugin-terser";
import { PostBroswerPluginUserCheckDTOResDTO, PostBroswerPluginUserCheckResDTO } from "../dtos/user/parse.res.dto";
import { ScriptHealthService } from "./health.service";

/**
 * 脚本解析服务
 *
 * @author Zero <gczgroup@qq.com>
 * @date 2024/02/07
 * @export
 * @class ScriptParserService
 */
@Injectable()
export class ScriptParserService {
  constructor(private readonly scriptHealthService: ScriptHealthService) {}

  private parseHeader(script: string): string;
  private parseHeader(script: string): "EMPTY";
  private parseHeader(script: string): string {
    // 使用正则表达式匹配头部注释
    const headerRegex = /\/\/ ==UserScript==[\s\S]*?\/\/ ==\/UserScript==/g;
    const match = script.match(headerRegex);
    return match ? match[0] : "EMPTY";
  }

  /**
   * 解析用户脚本元数据
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/07
   * @private
   * @param {string} script
   * @return {Record<string, string[]>}
   * @memberof ScriptParserService
   */
  private parseUserScript(script: string): Record<string, string[]>;
  /**
   * 解析用户脚本元数据
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/07
   * @private
   * @param {string} script
   * @return {*}  {Record<keyof PostBroswerPluginUserCheckDTOResDTO, string[]>}
   * @memberof ScriptParserService
   */
  private parseUserScript(script: string): Record<keyof PostBroswerPluginUserCheckDTOResDTO, string[]>;
  private parseUserScript(script: string): Record<string, string[]> {
    const metaData: Record<string, string[]> = {};
    const regex = /\/\/\s*@(\w+)\s+(.+)/g;
    let match: RegExpExecArray;
    while ((match = regex.exec(script)) !== null) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_exclude, key, value] = match;
      if (!metaData[key]) {
        metaData[key] = [];
      }
      metaData[key].push(value);
    }
    return metaData;
  }

  /**
   * 压缩脚本
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/07
   * @private
   * @param {string} path
   * @return {*}  {Promise<string>}
   * @memberof ScriptParserService
   */
  private async minify(path: string): Promise<string> {
    const bundler = await rollup({
      plugins: [terser()],
      input: path,
    });
    const { output } = await bundler.generate({});
    const [{ code }] = output;
    return code;
  }

  /**
   * 解析脚本
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/07
   * @param {string} filePath
   * @param {string} str
   * @return {*}  {Promise<PostBroswerPluginUserCheckResDTO>}
   * @memberof ScriptParserService
   */
  public async parse(filePath: string, str: string): Promise<PostBroswerPluginUserCheckResDTO> {
    const content = await this.minify(filePath);
    const header = this.parseHeader(str);
    if (header === "EMPTY") return { info: {}, content, health: [] };
    const info = this.parseUserScript(header);
    const health = this.scriptHealthService.checkHealth(info);
    return { info, content, health };
  }
}
