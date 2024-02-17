import { Controller, Get, Query, UseInterceptors } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ResInterceptor } from "cc.naily.six.shared";
import { GetTopicQueryDTO } from "../dtos/topic.dto";
import { PrismaService } from "@nailyjs.nest.modules/prisma";
import { Prisma } from "@prisma/client";

@ApiTags("话题")
@Controller("topic")
export class TopicController {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * 获取话题列表
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/17
   * @memberof TopicController
   */
  @Get()
  @UseInterceptors(ResInterceptor)
  public getTopics(@Query() query: GetTopicQueryDTO) {
    if (query.filterUserID && typeof query.filterUserID === "string") query.filterUserID = [query.filterUserID];
    return this.prismaService.forumTopic.findMany({
      orderBy: ((): Prisma.ForumTopicOrderByWithRelationInput[] => {
        const orderBy: Prisma.ForumTopicOrderByWithRelationInput[] = [];
        if (query.orderCreatedAt) orderBy.push({ createdAt: query.orderCreatedAt });
        if (query.orderUpdatedAt) orderBy.push({ updatedAt: query.orderUpdatedAt });
        return orderBy;
      })(),
      where: {
        authorID: { in: query.filterUserID as string[] },
      },
    });
  }
}
