import { BadRequestException, Body, Controller, Get, Post, Query, UseInterceptors } from "@nestjs/common";
import { BrowserMarkService } from "../providers/mark.service";
import { ApiTags } from "@nestjs/swagger";
import { Auth, User } from "cc.naily.six.auth";
import { ResInterceptor } from "cc.naily.six.shared";
import { PrismaService } from "cc.naily.six.database";
import { User as UserEntity } from "@prisma/client";
import { GetBroswerMarkQueryDTO, PostBrowserMarkBodyDTO } from "../dtos/mark/mark.dto";

@ApiTags("浏览器书签")
@Controller("broswer/mark")
export class BrowserMarkController {
  constructor(
    private readonly markService: BrowserMarkService,
    private readonly prismaService: PrismaService,
  ) {}

  /**
   * 获取书签列表
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/02
   * @return {*}
   * @memberof BrowserMarkController
   */
  @Get()
  @Auth()
  @UseInterceptors(ResInterceptor)
  public async getMarks(@Query() query: GetBroswerMarkQueryDTO, @User() user: UserEntity) {
    if (!query.take) query.take = 10;
    if (!query.skip) query.skip = 0;
    const canFind = this.markService.canFind(user.userID);
    if (!canFind) {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(this.getMarks(query, user));
        }, 100);
      });
    }
    return this.prismaService.browserBookMark.findMany({
      take: parseInt(query.take as unknown as string),
      skip: parseInt(query.skip as unknown as string),
      where: {
        user: { userID: user.userID },
      },
    });
  }

  @Auth()
  @Post("all")
  @UseInterceptors(ResInterceptor)
  public async createMark(@User() user: UserEntity, @Body() body: PostBrowserMarkBodyDTO) {
    if (!this.markService.canFind(user.userID)) throw new BadRequestException(1054);
    this.markService.addUpdating(user.userID);
    await this.prismaService.browserBookMark.deleteMany({
      where: {
        user: { userID: user.userID },
      },
    });
    await this.prismaService.browserBookMark.createMany({
      data: body.list.map((item) => {
        return {
          title: item.title,
          icon: item.icon,
          link: item.link,
          color: item.color,
          index: item.index,
          userID: user.userID,
        };
      }),
    });
    this.markService.removeUpdating(user.userID);
    return 1000;
  }
}
