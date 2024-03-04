import { Controller, Get, Query, SetMetadata, UseInterceptors } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ResInterceptor } from "cc.naily.six.shared";
import { CacheInterceptor } from "../interceptors/cache.interceptor";
import { PrismaService } from "@nailyjs.nest.modules/prisma";
import { GetAnalyseUserIdentifierQueryDTO } from "../dtos/user.dto";

@ApiTags("用户分析")
@Controller("analyse/user")
@UseInterceptors(CacheInterceptor)
export class UserController {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * 获取用户分析
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/03/04
   * @memberof UserController
   */
  @Get()
  @SetMetadata("cacheTime", 1000 * 60)
  @UseInterceptors(ResInterceptor)
  public async getUser() {
    return {
      user: {
        total: await this.prismaService.user.count(),
        lastDay: await this.prismaService.user.count({
          where: {
            createdAt: {
              gte: new Date(new Date().setDate(new Date().getDate() - 1)),
            },
          },
        }),
        lastTwoDay: await this.prismaService.user.count({
          where: {
            createdAt: {
              gte: new Date(new Date().setDate(new Date().getDate() - 2)),
            },
          },
        }),
        lastWeek: await this.prismaService.user.count({
          where: {
            createdAt: {
              gte: new Date(new Date().setDate(new Date().getDate() - 7)),
            },
          },
        }),
        lastTwoWeek: await this.prismaService.user.count({
          where: {
            createdAt: {
              gte: new Date(new Date().setDate(new Date().getDate() - 14)),
            },
          },
        }),
        lastMonth: await this.prismaService.user.count({
          where: {
            createdAt: {
              gte: new Date(new Date().setDate(new Date().getDate() - 30)),
            },
          },
        }),
        lastTwoMonth: await this.prismaService.user.count({
          where: {
            createdAt: {
              gte: new Date(new Date().setDate(new Date().getDate() - 60)),
            },
          },
        }),
      },
    };
  }

  /**
   * 获取用户标识分析
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/03/04
   * @param {GetAnalyseUserIdentifierQueryDTO} query 查询参数
   * @memberof UserController
   */
  @Get("identifier")
  @SetMetadata("cacheTime", 1000 * 60)
  @UseInterceptors(ResInterceptor)
  public async getUserIdentifier(@Query() query: GetAnalyseUserIdentifierQueryDTO) {
    return {
      userIdentifier: {
        total: await this.prismaService.userIdentifier.count({
          where: { loginType: query.filterLoginType, loginClient: query.filterLoginClient },
        }),
        lastDay: await this.prismaService.userIdentifier.count({
          where: {
            loginType: query.filterLoginType,
            loginClient: query.filterLoginClient,
            createdAt: {
              gte: new Date(new Date().setDate(new Date().getDate() - 1)),
            },
          },
        }),
        lastTwoDay: await this.prismaService.userIdentifier.count({
          where: {
            loginType: query.filterLoginType,
            loginClient: query.filterLoginClient,
            createdAt: {
              gte: new Date(new Date().setDate(new Date().getDate() - 2)),
            },
          },
        }),
        lastWeek: await this.prismaService.userIdentifier.count({
          where: {
            loginType: query.filterLoginType,
            loginClient: query.filterLoginClient,
            createdAt: {
              gte: new Date(new Date().setDate(new Date().getDate() - 7)),
            },
          },
        }),
        lastTwoWeek: await this.prismaService.userIdentifier.count({
          where: {
            loginType: query.filterLoginType,
            loginClient: query.filterLoginClient,
            createdAt: {
              gte: new Date(new Date().setDate(new Date().getDate() - 14)),
            },
          },
        }),
        lastMonth: await this.prismaService.userIdentifier.count({
          where: {
            loginType: query.filterLoginType,
            loginClient: query.filterLoginClient,
            createdAt: {
              gte: new Date(new Date().setDate(new Date().getDate() - 30)),
            },
          },
        }),
        lastTwoMonth: await this.prismaService.userIdentifier.count({
          where: {
            loginType: query.filterLoginType,
            loginClient: query.filterLoginClient,
            createdAt: {
              gte: new Date(new Date().setDate(new Date().getDate() - 60)),
            },
          },
        }),
      },
    };
  }
}
