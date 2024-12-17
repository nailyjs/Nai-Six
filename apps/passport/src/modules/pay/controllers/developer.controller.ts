import { PrismaService } from "@nailyjs.nest.modules/prisma";
import { Body, Controller, Post, UseInterceptors } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ResInterceptor } from "cc.naily.six.shared";
import { OnlyDeveloper } from "src/guards/developer.guard";
import { XunhupayService } from "../providers/platforms/xunhupay.service";
import { PostPayDeveloperRefundBodyDTO } from "../dtos/developer.dto";

@OnlyDeveloper()
@ApiTags("开发者")
@Controller("pay/developer")
export class PayDeveloperController {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly xunhupayService: XunhupayService,
  ) {}

  /**
   * 退款
   *
   * @date 2024-12-18
   * @author Zero <gczgroup@qq.com>
   * @memberof PayDeveloperController
   */
  @Post("refund")
  @UseInterceptors(ResInterceptor)
  public async refund(@Body() body: PostPayDeveloperRefundBodyDTO) {
    return this.xunhupayService.refund(body.userReceiptID, body.reason);
  }
}
