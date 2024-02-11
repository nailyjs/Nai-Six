import { Body, Controller, Delete, Get, Post, Query, UseInterceptors } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { User as UserEntity } from "@prisma/client";
import { Auth, User } from "cc.naily.six.auth";
import { PrismaService } from "@nailyjs.nest.modules/prisma";
import { ResInterceptor } from "cc.naily.six.shared";
import { GetBrowserTrackListQueryDTO, PostBrowserTrackBodyDTO } from "../dtos/track/track.dto";

@ApiTags("浏览历史记录")
@Controller("broswer/track")
export class BroswerTrackController {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * 获取浏览历史记录
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/02
   * @param {GetBrowserTrackListQueryDTO} query
   * @param {UserEntity} user
   * @return {*}  {Promise<unknown>}
   * @memberof BroswerTrackController
   */
  @Get()
  @Auth()
  @UseInterceptors(ResInterceptor)
  public async getList(@Query() query: GetBrowserTrackListQueryDTO, @User() user: UserEntity): Promise<unknown> {
    if (!query.take) query.take = 10;
    if (!query.skip) query.skip = 0;
    if (!query.orderCreatedAt) query.orderCreatedAt = "desc";
    return this.prismaService.browserTrack.findMany({
      take: parseInt(query.take as unknown as string),
      skip: parseInt(query.skip as unknown as string),
      orderBy: { createdAt: query.orderCreatedAt },
      where: { user: { userID: user.userID } },
    });
  }

  /**
   * 创建浏览历史记录
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/02
   * @param {UserEntity} user
   * @param {PostBrowserTrackBodyDTO} body
   * @return {*}
   * @memberof BroswerTrackController
   */
  @Post()
  @Auth()
  @UseInterceptors(ResInterceptor)
  public create(@User() user: UserEntity, @Body() body: PostBrowserTrackBodyDTO) {
    return this.prismaService.browserTrack.create({
      data: {
        webPageTitle: body.webPageTitle,
        webPageLink: body.webPageLink,
        updatedAt: body.updatedAt,
        user: { connect: { userID: user.userID } },
      },
    });
  }

  /**
   * 删除浏览历史记录
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/02
   * @param {UserEntity} user
   * @param {string} browserTrackID
   * @memberof BroswerTrackController
   */
  @Auth()
  @Delete()
  @UseInterceptors(ResInterceptor)
  public async delete(@User() user: UserEntity, @Query("browserTrackID") browserTrackID: string) {
    return this.prismaService.browserTrack.delete({
      where: { browserTrackID, user: { userID: user.userID } },
    });
  }

  /**
   * 删除所有浏览历史记录
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/02
   * @param {UserEntity} user
   * @return {*}
   * @memberof BroswerTrackController
   */
  @Auth()
  @Delete("all")
  @UseInterceptors(ResInterceptor)
  public async deleteAll(@User() user: UserEntity) {
    return this.prismaService.browserTrack.deleteMany({
      where: { user: { userID: user.userID } },
    });
  }
}
