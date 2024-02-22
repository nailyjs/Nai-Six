import { Environment, Status } from "@apple/app-store-server-library";
import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "@nailyjs.nest.modules/prisma";
import { CommonAppStoreService, CommonLogger } from "cc.naily.six.shared";

@Injectable()
export class AppleService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly commonAppStoreService: CommonAppStoreService,
    private readonly commonLogger: CommonLogger,
  ) {}

  public getAllSubscriptionStatuses(userID: string, isSandBox: boolean) {
    if (isSandBox) {
      return this.prismaService.userAppStoreSubscribe.findMany({
        where: { originalTransactionID: "2000000514154247" },
      });
    }
    return this.prismaService.userAppStoreSubscribe.findMany({
      where: { userID: "65bdb76952b3ca52c50c73db" },
    });
  }

  public async linkTransactionID(userID: string, originalTransactionID: string) {
    // 查询该originalTransactionID看看是否有
    const hasTransactionID = await this.prismaService.userAppStoreSubscribe.findFirst({
      where: { originalTransactionID },
    });
    // 如果有，判断是否是同一个用户 如果是同一个用户，返回1000  如果不是同一个用户，抛出1061
    if (hasTransactionID && hasTransactionID.userID === userID) {
      return 1000;
    } else if (hasTransactionID && hasTransactionID.userID !== userID) {
      throw new BadRequestException(1061);
    }
    // 如果没有，创建用户和transactionID的关联
    this.commonLogger.log(`链接! linkTransactionID: ${userID} ${originalTransactionID}`);
    return this.prismaService.userAppStoreSubscribe.create({
      data: {
        user: { connect: { userID } },
        originalTransactionID,
      },
    });
  }

  public checkTransactionID(bundleId: string, transactionId: string, isSandbox: boolean = false, p8Key?: string) {
    return this.commonAppStoreService
      .createClient(bundleId, isSandbox ? Environment.SANDBOX : undefined, p8Key)
      .getAllSubscriptionStatuses(transactionId, [Status.ACTIVE, Status.BILLING_GRACE_PERIOD]);
  }
}
