import { BadRequestException, Body, Controller, Delete, Get, Patch, Post, Put, Query, UseInterceptors } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ResInterceptor } from "cc.naily.six.shared";
import { GetTopicDetailQueryDTO, GetTopicQueryDTO, PostTopicBodyDTO, PutTopicBodyDTO } from "../dtos/topic.dto";
import { PrismaService } from "@nailyjs.nest.modules/prisma";
import { ForumTopicStatus, Prisma } from "@prisma/client";
import { Auth, JwtLoginPayload, User } from "cc.naily.six.auth";
import { I18nService } from "nestjs-i18n";
import { I18nTranslations } from "cc.naily.six.generated";

@ApiTags("话题")
@Controller("topic")
export class TopicController {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly i18nService: I18nService<I18nTranslations>,
  ) {}

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
    if (query.filterTagID && typeof query.filterTagID === "string") query.filterTagID = [query.filterTagID];
    return this.prismaService.forumTopic.findMany({
      orderBy: ((): Prisma.ForumTopicOrderByWithRelationInput[] => {
        const orderBy: Prisma.ForumTopicOrderByWithRelationInput[] = [];
        if (query.orderCreatedAt) orderBy.push({ createdAt: query.orderCreatedAt });
        if (query.orderUpdatedAt) orderBy.push({ updatedAt: query.orderUpdatedAt });
        if (query.orderLikeCount) orderBy.push({ likes: { _count: query.orderLikeCount } });
        if (query.orderViewCount) orderBy.push({ viewCount: query.orderViewCount });
        if (query.orderDisplayCount) orderBy.push({ displayCount: query.orderDisplayCount });
        return orderBy;
      })(),
      where: {
        authorID: { in: query.filterUserID as string[] },
        tagIDs: { hasSome: query.filterTagID as string[] },
        status: ForumTopicStatus.Published,
      },
      take: parseInt(query.take as unknown as string) || 10,
      skip: parseInt(query.skip as unknown as string) || 0,
      select: {
        topicID: true,
        createdAt: true,
        updatedAt: true,
        topicName: true,
        topicDesc: true,
        topicContent: false,
        authorID: true,
        status: true,
        tagIDs: true,
        viewCount: true,
        displayCount: true,
      },
    });
  }

  /**
   * 创建话题草稿
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/17
   * @memberof TopicController
   */
  @Post()
  @Auth()
  @UseInterceptors(ResInterceptor)
  public createTopic(@Body() body: PostTopicBodyDTO, @User() user: JwtLoginPayload) {
    if (!body.topicContent) body.topicContent = "";
    for (const tag of body.tags) {
      const tagExist = this.prismaService.tag.findUnique({ where: { tagID: tag } });
      if (!tagExist) {
        throw new BadRequestException({
          code: 1080,
          message: this.i18nService.t("global.errorCode.1080").replace("{}", tag),
        });
      }
    }
    return this.prismaService.forumTopic.create({
      data: {
        status: ForumTopicStatus.Draft,
        author: { connect: { userID: user.userID } },
        topicName: body.topicName || "",
        topicContent: body.topicContent || "",
        topicDesc: body.topicDesc || body.topicContent.slice(0, 50),
        tags: {
          connect: body.tags.map((tag) => ({ tagID: tag })),
        },
      },
    });
  }

  /**
   * 修改话题 会将话题状态改为草稿
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/17
   * @param {PostTopicBodyDTO} body
   * @param {JwtLoginPayload} user
   * @memberof TopicController
   */
  @Put()
  @Auth()
  @UseInterceptors(ResInterceptor)
  public updateTopic(@Body() body: PutTopicBodyDTO, @User() user: JwtLoginPayload) {
    const topic = this.prismaService.forumTopic.findUnique({
      where: { topicID: body.topicID, authorID: user.userID },
    });
    if (!topic) throw new BadRequestException(1079);

    if (!body.topicContent) body.topicContent = "";
    return this.prismaService.forumTopic.update({
      where: { topicID: body.topicID, authorID: user.userID },
      data: {
        status: ForumTopicStatus.Draft,
        topicName: body.topicName || "",
        topicContent: body.topicContent || "",
        topicDesc: body.topicDesc || body.topicContent.slice(0, 50),
      },
    });
  }

  /**
   * 发布话题 会将话题状态改为待审核
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/17
   * @param {PutTopicBodyDTO} body
   * @param {JwtLoginPayload} user
   * @memberof TopicController
   */
  @Patch()
  @Auth()
  @UseInterceptors(ResInterceptor)
  public publishTopic(@Body() body: PutTopicBodyDTO, @User() user: JwtLoginPayload) {
    const topic = this.prismaService.forumTopic.findUnique({
      where: { topicID: body.topicID, authorID: user.userID },
    });
    if (!topic) throw new BadRequestException(1079);
    return this.prismaService.forumTopic.update({
      where: { topicID: body.topicID, authorID: user.userID },
      data: {
        status: ForumTopicStatus.Pending,
      },
    });
  }

  /**
   * 删除话题
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/17
   * @param {PutTopicBodyDTO} body
   * @param {JwtLoginPayload} user
   * @memberof TopicController
   */
  @Delete()
  @Auth()
  @UseInterceptors(ResInterceptor)
  public async deleteTopic(@Body() body: PutTopicBodyDTO, @User() user: JwtLoginPayload) {
    const topic = this.prismaService.forumTopic.findUnique({
      where: { topicID: body.topicID, authorID: user.userID },
    });
    if (!topic) throw new BadRequestException(1079);
    return this.prismaService.forumTopic.delete({
      where: { topicID: body.topicID, authorID: user.userID },
    });
  }

  /**
   * 根据ID获取话题详情
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/17
   * @param {string} topicID
   * @memberof TopicController
   */
  @Get("detail")
  @UseInterceptors(ResInterceptor)
  public getTopicDetail(@Query() { topicID }: GetTopicDetailQueryDTO) {
    return this.prismaService.forumTopic.findUnique({ where: { topicID, status: ForumTopicStatus.Published } });
  }
}
