import { PrismaService } from "@nailyjs.nest.modules/prisma";
import { BadRequestException, Body, Controller, Get, Post, Query, UseInterceptors } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { GetTagQueryDTO, PostTagBodyDTO } from "../dtos/tag.dto";
import { UpdatedAtEnum, CreatedAtEnum, ViewEnum } from "../enums/tag.enum";
import { ResInterceptor } from "cc.naily.six.shared";
import { PostTagResDTO } from "../dtos/tag.res.dto";
import { Prisma } from "@prisma/client";
import { CacheInterceptor, CacheTTL } from "@nestjs/cache-manager";

@CacheTTL(10000)
@ApiTags("标签")
@Controller("tag")
@UseInterceptors(CacheInterceptor)
export class TagController {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * 获取标签列表
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/08
   * @param {GetTagQueryDTO} query
   * @memberof TagController
   */
  @Get()
  @UseInterceptors(ResInterceptor)
  async getTags(@Query() query: GetTagQueryDTO) {
    if (!query.take) query.take = 10;
    if (!query.skip) query.skip = 0;
    return this.prismaService.tag.findMany({
      take: parseInt(query.take as unknown as string),
      skip: parseInt(query.skip as unknown as string),
      orderBy: ((): Prisma.TagOrderByWithRelationInput[] => {
        const order: Prisma.TagOrderByWithRelationInput[] = [];
        if (query.orderUpdatedAt === UpdatedAtEnum.Latest) order.push({ updatedAt: "desc" });
        if (query.orderUpdatedAt === UpdatedAtEnum.Earliest) order.push({ updatedAt: "asc" });
        if (query.orderCreatedAt === CreatedAtEnum.Latest) order.push({ createdAt: "desc" });
        if (query.orderCreatedAt === CreatedAtEnum.Earliest) order.push({ createdAt: "asc" });
        if (query.orderViewCount === ViewEnum.More) order.push({ tagViewCount: "desc" });
        if (query.orderViewCount === ViewEnum.Less) order.push({ tagViewCount: "asc" });
        return order;
      })(),
    });
  }

  /**
   * 创建标签
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/08
   * @memberof TagController
   */
  @Post()
  @UseInterceptors(ResInterceptor)
  @ApiResponse({ type: PostTagResDTO })
  public async createTag(@Body() body: PostTagBodyDTO) {
    const hasTag = await this.prismaService.tag.findUnique({ where: { tagName: body.name } });
    if (hasTag) throw new BadRequestException(1070);
    return this.prismaService.tag.create({
      data: { tagName: body.name, tagDescription: body.description },
    });
  }
}
