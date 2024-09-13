import { Body, Controller, Patch, Post, Put, UseInterceptors } from "@nestjs/common";
import { ApiExcludeEndpoint, ApiTags } from "@nestjs/swagger";
import { ResInterceptor } from "cc.naily.six.shared";
import { EmailService } from "../providers/email.service";
import { PhoneService } from "../providers/phone.service";
import { PostTransportEmailBodyDTO } from "../dtos/email/email.dto";
import { PostTransportPhoneBodyDTO } from "../dtos/phone/phone.dto";
import { BlockingService } from "../classes/blocking.service";
import { BlockDTO } from "../dtos/block.dto";

@ApiTags("传输")
@Controller("transport")
export class TransportController {
  constructor(
    private readonly emailService: EmailService,
    private readonly phoneService: PhoneService,
    private readonly blockingService: BlockingService,
  ) {}

  /**
   * 发送邮箱验证码
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/02
   * @memberof TransportController
   */
  @Post("email")
  @UseInterceptors(ResInterceptor)
  public async email(@Body() body: PostTransportEmailBodyDTO) {
    const isSend = await this.emailService.sendCode(body.email);
    if (isSend) return 1012;
    return 1013;
  }

  /**
   * 发送手机验证码
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/02
   * @param {*} body
   * @memberof TransportController
   */
  @Post("sms")
  @UseInterceptors(ResInterceptor)
  public phone(@Body() body: PostTransportPhoneBodyDTO) {
    return this.phoneService.sendCode(body.phone);
  }

  @Put("block")
  @ApiExcludeEndpoint()
  @UseInterceptors(ResInterceptor)
  public async block(@Body() body: BlockDTO) {
    return this.blockingService.block(body.data);
  }

  @Patch("block")
  @ApiExcludeEndpoint()
  @UseInterceptors(ResInterceptor)
  public async unblock(@Body() body: BlockDTO) {
    return this.blockingService.unblock(body.data);
  }
}
