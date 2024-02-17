import { PrismaService } from "@nailyjs.nest.modules/prisma";
import { BadRequestException, Body, Controller, Delete, Get, Ip, Post, Query, UseInterceptors } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ResInterceptor } from "cc.naily.six.shared";
import { DeleteTopicCommentBodyDTO, GetTopicCommentQueryDTO, PostTopicCommentBodyDTO } from "../dtos/comment.dto";
import { Prisma } from "@prisma/client";
import { CacheInterceptor, CacheTTL } from "@nestjs/cache-manager";
import { Auth, JwtLoginPayload, User } from "cc.naily.six.auth";

@ApiTags("话题评论")
@CacheTTL(1000 * 10)
@Controller("topic/comment")
@UseInterceptors(CacheInterceptor)
export class TopicCommentController {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * 获取话题评论
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/17
   * @param {GetTopicCommentQueryDTO} query
   * @memberof TopicCommentController
   */
  @Get()
  @UseInterceptors(ResInterceptor)
  public getComments(@Query() query: GetTopicCommentQueryDTO) {
    if (!query.filterUserID) query.filterUserID = [];
    if (query.filterUserID && typeof query.filterUserID === "string") query.filterUserID = [query.filterUserID];
    return this.prismaService.forumTopicComment.findMany({
      orderBy: ((): Prisma.ForumTopicCommentOrderByWithRelationInput[] => {
        const orderBy: Prisma.ForumTopicCommentOrderByWithRelationInput[] = [];
        if (query.orderLikes) orderBy.push({ likes: { _count: query.orderLikes } });
        if (query.orderCreatedAt) orderBy.push({ createdAt: query.orderCreatedAt });
        if (query.orderUpdatedAt) orderBy.push({ updatedAt: query.orderUpdatedAt });
        return orderBy;
      })(),
      where: {
        authorID: { in: query.filterUserID as string[] },
        parentID: query.parentID,
        topicID: query.topicID,
      },
      take: parseInt(query.take as unknown as string) || 10,
      skip: parseInt(query.skip as unknown as string) || 0,
    });
  }

  /**
   * 创建话题评论
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/17
   * @param {PostTopicCommentBodyDTO} body
   * @param {JwtLoginPayload} user
   * @memberof TopicCommentController
   */
  @Post()
  @Auth()
  @UseInterceptors(ResInterceptor)
  public createComment(@Body() body: PostTopicCommentBodyDTO, @User() user: JwtLoginPayload, @Ip() ip: string) {
    const haveTopic = this.prismaService.forumTopic.findUnique({ where: { topicID: body.topicID } });
    if (!haveTopic) throw new BadRequestException(1082);
    const haveParent = this.prismaService.forumTopicComment.findUnique({ where: { forumTopicCommentID: body.parentID } });
    if (body.parentID && !haveParent) throw new BadRequestException(1081);
    return this.prismaService.forumTopicComment.create({
      data: {
        content: body.content,
        topicID: body.topicID,
        parentID: body.parentID,
        authorID: user.userID,
        ip,
      },
    });
  }

  /**
   * 删除话题评论
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/17
   * @param {string} commentID
   * @param {JwtLoginPayload} user
   * @memberof TopicCommentController
   */
  @Auth()
  @Delete()
  @UseInterceptors(ResInterceptor)
  public async deleteComment(@Body() { commentID }: DeleteTopicCommentBodyDTO, @User() user: JwtLoginPayload) {
    const haveComment = await this.prismaService.forumTopicComment.findUnique({ where: { forumTopicCommentID: commentID } });
    if (!haveComment) throw new BadRequestException(1081);
    if (haveComment.authorID !== user.userID) throw new BadRequestException(1083);
    return this.prismaService.forumTopicComment.delete({ where: { forumTopicCommentID: commentID } });
  }
}
