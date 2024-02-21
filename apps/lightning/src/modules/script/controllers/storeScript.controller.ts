import { Body, Controller, Delete, Get, Post, Query, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from "@nestjs/swagger";
import { ResInterceptor } from "cc.naily.six.shared";
import { StoreScriptService } from "../providers/store.service";
import { DeleteBroswerPluginStoreBodyDTO, GetBroswerScriptStoreQueryDTO, PostBroswerPluginStoreBodyDTO } from "../dtos/store/store.dto";
import { Auth, JwtLoginPayload, User } from "cc.naily.six.auth";
import { ScriptParserService } from "../providers/parse.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { ScriptFileService } from "../providers/file.service";

@ApiTags("插件 商店")
@UseInterceptors(ResInterceptor)
@Controller("broswer/plugin/store")
export class StoreScriptController {
  constructor(
    private readonly scriptParserService: ScriptParserService,
    private readonly storeScriptService: StoreScriptService,
    private readonly scriptFileService: ScriptFileService,
  ) {}

  /**
   * 获取商店插件列表
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/08
   * @param {GetBroswerScriptStoreQueryDTO} query
   * @memberof StoreScriptController
   */
  @Get()
  @UseInterceptors(ResInterceptor)
  public async getList(@Query() query: GetBroswerScriptStoreQueryDTO) {
    if (!query.take) query.take = 10;
    if (!query.skip) query.skip = 0;
    const data = await this.storeScriptService.getList(
      parseInt(query.take as unknown as string),
      parseInt(query.skip as unknown as string),
      query.order,
    );
    return data.map((item) => ({
      ...item,
      scriptInfo: JSON.parse(item.scriptInfo),
    }));
  }

  /**
   * 创建草稿
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/08
   * @memberof StoreScriptController
   */
  @Post()
  @Auth()
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FileInterceptor("content"))
  @ApiBody({ type: PostBroswerPluginStoreBodyDTO })
  @ApiOperation({ summary: "创建草稿", description: "创建草稿时：如果已登录但是没有传id，会创建一个新草稿。草稿数量最多10个" })
  public async createDraft(
    @UploadedFile() content: Express.Multer.File,
    @User() user: JwtLoginPayload,
    @Body("browserScriptStoreID") browserScriptStoreID?: string,
  ) {
    const [serverPath, clear] = this.scriptFileService.addCacheScript(content.originalname, content.buffer);
    const analyse = await this.scriptParserService.parse(serverPath, content.buffer.toString());
    const data = await this.storeScriptService.createDraft(analyse.content, analyse.info, user.userID, browserScriptStoreID);
    clear();
    return data;
  }

  /**
   * 删除插件
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/08
   * @param {DeleteBroswerPluginStoreBodyDTO} body
   * @memberof StoreScriptController
   */
  @Auth()
  @Delete()
  public async deleteScript(@Body() body: DeleteBroswerPluginStoreBodyDTO, @User() user: JwtLoginPayload) {
    return this.storeScriptService.deleteScript(body.browserScriptStoreID, user.userID);
  }
}
