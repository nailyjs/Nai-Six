import { PrismaService } from "@nailyjs.nest.modules/prisma";
import { ForbiddenException, Injectable } from "@nestjs/common";
import { CreatedAtEnum, UpdatedAtEnum, ViewEnum } from "../enums/store.enum";
import { ScriptStatus } from "@prisma/client";

@Injectable()
export class StoreScriptService {
  constructor(private readonly prismaService: PrismaService) {}

  public getList(take: number, skip: number, order: ViewEnum | CreatedAtEnum | UpdatedAtEnum) {
    return this.prismaService.browserScriptStore.findMany({
      take,
      skip,
      orderBy: (() => {
        if (order === ViewEnum.Most) return { viewCount: "desc" };
        if (order === ViewEnum.Least) return { viewCount: "asc" };
        if (order === CreatedAtEnum.Latest) return { createdAt: "desc" };
        if (order === CreatedAtEnum.Earliest) return { createdAt: "asc" };
        if (order === UpdatedAtEnum.Latest) return { updatedAt: "desc" };
        if (order === UpdatedAtEnum.Earliest) return { updatedAt: "asc" };
        return { updatedAt: "desc" };
      })(),
    });
  }

  public async createDraft(scriptContent: string, scriptInfo: Record<string, any>, userID: string, browserScriptStoreID?: string) {
    if (!browserScriptStoreID) {
      const count = await this.prismaService.browserScriptStore.count({ where: { uploader: { userID } } });
      if (count >= 10) throw new ForbiddenException(1069);
      return this.prismaService.browserScriptStore.create({
        data: {
          uploader: {
            connect: { userID },
          },
          scriptContent,
          scriptInfo: JSON.stringify(scriptInfo),
          scriptStatus: ScriptStatus.Draft,
          viewCount: 0,
        },
      });
    } else {
      const haveAuthority = this.prismaService.browserScriptStore.findFirst({
        where: { browserScriptStoreID, uploader: { userID } },
      });
      if (!haveAuthority) throw new ForbiddenException(1068);
      return this.prismaService.browserScriptStore.update({
        where: { browserScriptStoreID },
        data: {
          scriptContent,
          scriptInfo: JSON.stringify(scriptInfo),
          scriptStatus: ScriptStatus.Draft,
          viewCount: 0,
        },
      });
    }
  }

  public deleteScript(browserScriptStoreID: string, userID: string) {
    const isOwner = this.prismaService.browserScriptStore.findFirst({
      where: { browserScriptStoreID, uploader: { userID } },
    });
    if (!isOwner) throw new ForbiddenException(1068);
    return this.prismaService.browserScriptStore.delete({
      where: { browserScriptStoreID, uploader: { userID } },
    });
  }
}
