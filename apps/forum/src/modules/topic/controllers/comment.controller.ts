import { PrismaService } from "@nailyjs.nest.modules/prisma";
import { Body, Controller, Get, UseInterceptors } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ResInterceptor } from "cc.naily.six.shared";
import { GetTopicCommentQueryDTO } from "../dtos/comment.dto";

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
    return this.prismaService.forumTopicComment.findMany({
      where: {
        authorID: {
          in: Array.isArray(body.filterUser) ? body.filterUser : [body.filterUser],
        },
      },
    });
  }
}
