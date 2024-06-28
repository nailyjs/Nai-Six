import { PrismaService } from "@nailyjs.nest.modules/prisma";
import { Injectable } from "@nestjs/common";
import { IReceiptStatus, Prisma } from "@prisma/client";
import { IPayType } from "../interfaces/interface.impl";
import { CreatedAtEnum, UpdatedAtEnum } from "../enums/order.enum";

@Injectable()
export class UserReceiptService {
  constructor(private readonly prismaService: PrismaService) {}

  public async createReceipt(payType: IPayType, amount: number, orderID: string, userID: string, nonceStr?: string) {
    const data = await this.prismaService.userReceipt.create({
      data: { receiptStatus: IReceiptStatus.Pending, user: { connect: { userID } }, amount, payType, orderID, nonceStr },
    });
    delete data.nonceStr;
    return data;
  }

  public getReceipt(orderID: string, nonceStr: string) {
    return this.prismaService.userReceipt.findFirst({ where: { orderID, nonceStr } });
  }

  public getReceiptByID(userReceiptID: string, userID: string) {
    return this.prismaService.userReceipt.findFirst({ where: { userReceiptID, userID } });
  }

  public async findReceiptByUserID(userID: string, orderCreatedAt: CreatedAtEnum, orderUpdatedAt: UpdatedAtEnum, take: number, skip: number) {
    const data = await this.prismaService.userReceipt.findMany({
      where: { userID },
      take: take ? parseInt((take || "").toString()) || 10 : undefined,
      skip: skip ? parseInt((skip || "").toString()) || 0 : undefined,
      orderBy: ((): Prisma.UserReceiptOrderByWithRelationInput[] => {
        const orderBy: Prisma.UserReceiptOrderByWithRelationInput[] = [];
        if (orderCreatedAt === CreatedAtEnum.Earliest) orderBy.push({ createdAt: "asc" });
        if (orderCreatedAt === CreatedAtEnum.Latest) orderBy.push({ createdAt: "desc" });
        if (orderUpdatedAt === UpdatedAtEnum.Earliest) orderBy.push({ updatedAt: "asc" });
        if (orderUpdatedAt === UpdatedAtEnum.Latest) orderBy.push({ updatedAt: "desc" });
        return orderBy;
      })(),
    });
    return data.map((item) => {
      return {
        ...item,
        nonceStr: undefined,
      };
    });
  }

  public setReceiptStatus(userReceiptID: string, status: IReceiptStatus) {
    return this.prismaService.userReceipt.update({
      where: { userReceiptID },
      data: { receiptStatus: status },
    });
  }
}
