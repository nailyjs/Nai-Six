import { Environment, Status } from "@apple/app-store-server-library";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "cc.naily.six.database";
import { CommonAppStoreService } from "cc.naily.six.shared";

@Injectable()
export class AppleService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly commonAppStoreService: CommonAppStoreService,
  ) {}

  public getAllSubscriptionStatuses(userID: string, isSandBox: boolean) {
    if (isSandBox) {
      return this.prismaService.userAppStoreSubscribe.findMany({
        where: { originalTransactionID: "2000000514154247" },
      });
    }
    return this.prismaService.userAppStoreSubscribe.findMany({
      where: {
        user: { userID },
      },
    });
  }

  public async linkTransactionID(userID: string, originalTransactionID: string) {
    const hasTransactionID = await this.prismaService.userAppStoreSubscribe.findFirst({
      where: { originalTransactionID },
    });
    if (hasTransactionID) return 1000;
    return this.prismaService.userAppStoreSubscribe.create({
      data: {
        user: { connect: { userID } },
        originalTransactionID,
      },
    });
  }

  public checkTransactionID(bundleId: string, transactionId: string, isSandbox: boolean = false) {
    return this.commonAppStoreService
      .createClient(bundleId, isSandbox ? Environment.SANDBOX : undefined)
      .getAllSubscriptionStatuses(transactionId, [Status.ACTIVE, Status.BILLING_GRACE_PERIOD]);
  }
}
