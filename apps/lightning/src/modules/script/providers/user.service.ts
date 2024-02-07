import { PrismaService } from "@nailyjs.nest.modules/prisma";
import { BadRequestException, Injectable } from "@nestjs/common";
import { PostBroswerPluginUserCheckResDTO } from "../dtos/user/parse.res.dto";
import { ScriptStatus } from "@prisma/client";

@Injectable()
export class UserScriptService {
  constructor(private readonly prismaService: PrismaService) {}

  public getList(userID: string, take: number, skip: number, orderAddTime: "latest" | "earliest" = "latest") {
    return this.prismaService.browserScriptStore.findMany({
      orderBy: { createdAt: orderAddTime === "earliest" ? "asc" : "desc" },
      where: { uploader: { userID }, scriptStatus: ScriptStatus.Published },
      select: {
        browserScriptStoreID: true,
        createdAt: true,
        updatedAt: true,
        scriptInfo: true,
        scriptContent: false,
      },
      take,
      skip,
    });
  }

  public create(userID: string, parsed: PostBroswerPluginUserCheckResDTO) {
    return this.prismaService.browserScript.create({
      data: {
        user: { connect: { userID } },
        scriptContent: parsed.content,
        scriptInfo: JSON.stringify(parsed.info),
      },
    });
  }

  public async delete(userID: string, browserScriptID: string) {
    const script = await this.prismaService.browserScript.findFirst({
      where: { browserScriptID, user: { userID } },
    });
    if (!script) throw new BadRequestException(1064);
    await this.prismaService.browserScript.delete({ where: { browserScriptID } });
    return true;
  }
}
