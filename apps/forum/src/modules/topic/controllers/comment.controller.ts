import { PrismaService } from "@nailyjs.nest.modules/prisma";
import { Body, Controller, Get, UseInterceptors } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ResInterceptor } from "cc.naily.six.shared";
import { GetTopicCommentQueryDTO } from "../dtos/comment.dto";
import { Prisma } from "@prisma/client";

@ApiTags("话题评论")
@Controller("topic/comment")
export class TopicCommentController {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * 获取话题评论
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/17
   * @param {*} body
   * @memberof TopicCommentController
   */
  @Get()
  @UseInterceptors(ResInterceptor)
  public getComments(@Body() body: GetTopicCommentQueryDTO) {
    if (body.filterUser && typeof body.filterUser === "string") body.filterUser = [body.filterUser];
    return this.prismaService.forumTopicComment.findMany({
      orderBy: ((): Prisma.ForumTopicCommentOrderByWithRelationInput[] => {
        const orderBy: Prisma.ForumTopicCommentOrderByWithRelationInput[] = [];
        if (body.orderLikes) orderBy.push({ likes: { _count: body.orderLikes } });
        if (body.orderCreatedAt) orderBy.push({ createdAt: body.orderCreatedAt });
        if (body.orderUpdatedAt) orderBy.push({ updatedAt: body.orderUpdatedAt });
        return orderBy;
      })(),
      where: {
        authorID: { in: body.filterUser as string[] },
      },
      take: parseInt(body.take as unknown as string) || 10,
      skip: parseInt(body.skip as unknown as string) || 0,
    });
  }
}
