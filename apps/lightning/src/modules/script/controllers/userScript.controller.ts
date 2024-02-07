import { BadRequestException, Body, Controller, Delete, Get, Post, Query, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ApiBody, ApiConsumes, ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { UserScriptService } from "../providers/user.service";
import { Auth, JwtLoginPayload, User } from "cc.naily.six.auth";
import { DeleteBroswerPluginUserBodyDTO, GetBroswerPluginUserQueryDTO } from "../dtos/user/user.dto";
import { ResInterceptor } from "cc.naily.six.shared";
import { ScriptParserService } from "../providers/parse.service";
import { PostBroswerPluginUserCheckBodyDTO } from "../dtos/user/parse.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { writeFileSync } from "fs";
import { PostBroswerPluginUserCheckRawInfoResDTO, PostBroswerPluginUserCheckResDTO } from "../dtos/user/parse.res.dto";
import { I18nService } from "nestjs-i18n";
import { I18nTranslations } from "cc.naily.six.generated";
import { ScriptFileService } from "../providers/file.service";

@ApiTags("插件 用户")
@UseInterceptors(ResInterceptor)
@Controller("broswer/plugin/user")
export class UserScriptController {
  constructor(
    private readonly userScriptService: UserScriptService,
    private readonly parserService: ScriptParserService,
    private readonly scriptFileService: ScriptFileService,
    private readonly i18nService: I18nService<I18nTranslations>,
  ) {}

  /**
   * 用户：获取已添加的插件列表
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/07
   * @memberof ScriptController
   */
  @Get()
  @Auth()
  public async getList(@Query() query: GetBroswerPluginUserQueryDTO, @User() user: JwtLoginPayload) {
    if (!query.take) query.take = 10;
    if (!query.skip) query.skip = 0;
    const data = await this.userScriptService.getList(
      user.userID,
      parseInt(query.take as unknown as string),
      parseInt(query.skip as unknown as string),
      query.orderAddTime,
    );
    return data.map((item) => ({
      ...item,
      scriptInfo: JSON.parse(item.scriptInfo),
    }));
  }

  /**
   * 用户：上传插件
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/07
   * @memberof ScriptController
   */
  @Auth()
  @Post("upload")
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FileInterceptor("content"))
  @ApiBody({ type: PostBroswerPluginUserCheckBodyDTO })
  @ApiCreatedResponse({ type: PostBroswerPluginUserCheckResDTO })
  public async upload(@UploadedFile() content: Express.Multer.File, @User() user: JwtLoginPayload) {
    const [serverPath, unlink] = this.scriptFileService.addCacheScript(content.originalname, content.buffer, user.userID);
    const parsed = await this.parserService.parse(serverPath, content.buffer.toString());
    if (!parsed.content) throw new BadRequestException(1063);
    if (Object.keys(parsed).length === 0) throw new BadRequestException(1062);
    const script = await this.userScriptService.create(user.userID, parsed);
    unlink();
    return script;
  }

  /**
   * 用户：获取插件信息 执行健康检查
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/07
   * @memberof ScriptController
   */
  @Post("check")
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FileInterceptor("content"))
  @ApiBody({ type: PostBroswerPluginUserCheckBodyDTO })
  @ApiCreatedResponse({ type: PostBroswerPluginUserCheckRawInfoResDTO })
  public async check(@UploadedFile() content: Express.Multer.File) {
    const [serverPath, clear] = this.scriptFileService.addCacheScript(content.originalname, content.buffer);
    writeFileSync(serverPath, content.buffer);
    const { info, health } = await this.parserService.parse(serverPath, content.buffer.toString());
    if (Object.keys(info).length === 0) throw new BadRequestException(1062);
    clear();
    return {
      code: health.length === 0 ? 1066 : 1065,
      message: health.length === 0 ? this.i18nService.t("global.errorCode.1066") : this.i18nService.t("global.errorCode.1065"),
      data: { info, health },
    };
  }

  /**
   * 用户：删除插件
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/08
   * @param {DeleteBroswerPluginUserBodyDTO} body
   * @param {JwtLoginPayload} user
   * @memberof UserScriptController
   */
  @Auth()
  @Delete()
  @UseInterceptors(ResInterceptor)
  public async delete(@Body() body: DeleteBroswerPluginUserBodyDTO, @User() user: JwtLoginPayload) {
    return this.userScriptService.delete(body.browserScriptID, user.userID);
  }
}
