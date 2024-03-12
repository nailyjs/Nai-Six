import { Controller, Get, Query, UseInterceptors } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UserReceiptService } from "../providers/receipt.service";
import { Auth, JwtLoginPayload, User } from "cc.naily.six.auth";
import { ResInterceptor } from "cc.naily.six.shared";
import { GetUserReceiptQueryDTO } from "../dtos/receipt/receipt.dto";

@ApiTags("收据")
@Controller("user/receipt")
export class ReceiptController {
  constructor(private readonly userReceiptService: UserReceiptService) {}

  /**
   * 获取已登录用户的收据列表
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/11
   * @param {JwtLoginPayload} user
   * @memberof ReceiptController
   */
  @Get()
  @Auth()
  @UseInterceptors(ResInterceptor)
  public async getReceipts(@Query() query: GetUserReceiptQueryDTO, @User() user: JwtLoginPayload) {
    return await this.userReceiptService.findReceiptByUserID(user.userID, query.orderCreatedAt, query.orderUpdatedAt, query.take, query.skip);
  }

  /**
   * 根据ID获取单个收据
   *
   * @param {string} receiptID
   * @param {JwtLoginPayload} user
   * @memberof ReceiptController
   */
  @Auth()
  @Get("single")
  @UseInterceptors(ResInterceptor)
  public async getReceipt(@Query("receiptID") receiptID: string, @User() user: JwtLoginPayload) {
    return await this.userReceiptService.getReceiptByID(receiptID, user.userID);
  }
}
