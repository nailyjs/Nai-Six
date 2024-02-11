import { BadRequestException, Body, Controller, Post, UseInterceptors } from "@nestjs/common";
import { ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { ResInterceptor } from "cc.naily.six.shared";
import { PostUserPayBodyDTO } from "../dtos/pay/pay.dto";
import { Auth, JwtLoginPayload, User } from "cc.naily.six.auth";
import { PayService } from "../providers/pay.service";
import { XunhupayService } from "../providers/platforms/xunhupay.service";
import { XunhupayNotify } from "../interfaces/xunhupay.interface";
import { PrismaService } from "@nailyjs.nest.modules/prisma";
import { PostUserPay201ResDTO } from "../dtos/pay/pay.res.dto";

@ApiTags("余额")
@Controller("user/pay")
export class PayController {
  constructor(
    private readonly payService: PayService,
    private readonly xunhupayService: XunhupayService,
    private readonly prismaService: PrismaService,
  ) {}

  /**
   * 充值
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/11
   * @memberof PayController
   */
  @Post()
  @Auth()
  @UseInterceptors(ResInterceptor)
  @ApiCreatedResponse({ type: PostUserPay201ResDTO })
  public async pay(@Body() body: PostUserPayBodyDTO, @User() user: JwtLoginPayload) {
    this.payService.isEnabledOrThrow(body.payType);
    if (!body.extraOptions) body.extraOptions = {};
    // 当支付类型为Wechat_Official时，必须传入`extraOptions.openid`，否则抛出400
    if (body.payType === "Wechat_Official" && !body.extraOptions.openid) throw new BadRequestException(1019);
    // 业务逻辑
    const userInstance = await this.prismaService.user.findUnique({ where: { userID: user.userID } });
    if (body.payType === "Wechat_Official") {
      return "暂不支持";
    } else {
      return await this.xunhupayService.pay(body.amount, body.payType, userInstance);
    }
  }

  /**
   * 迅虎支付回调接口
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/11
   * @param {XunhupayNotify} body
   * @memberof PayController
   */
  @Post("xunhupay/notify")
  @UseInterceptors(ResInterceptor)
  public notify(@Body() body: XunhupayNotify) {
    return this.xunhupayService.notify(body);
  }
}
