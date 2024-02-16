import { PrismaService } from "@nailyjs.nest.modules/prisma";
import { Injectable } from "@nestjs/common";

@Injectable()
export class BroswerTrackService {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * 删除用户浏览记录 100 条之后的所有记录
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/14
   * @param {string} userID 用户ID
   * @memberof BroswerTrackService
   */
  public async deleteGreaterThanOneHundred(userID: string) {
    // 找到100条之后所有的浏览记录
    const findAll = await this.prismaService.browserTrack.findMany({
      where: { userID },
      orderBy: { createdAt: "desc" },
      skip: 100,
    });
    // 找到所有的浏览记录的ID
    const ids = findAll.map((item) => item.browserTrackID);
    // 删除所有的浏览记录
    await this.prismaService.browserTrack.deleteMany({
      where: { browserTrackID: { in: ids } },
    });
  }
}
