import { BadRequestException, Body, Controller, Ip, Post, UseInterceptors } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { LoginService } from "../providers/login.service";
import { ResInterceptor } from "cc.naily.six.shared";
import { PostLoginPhoneCodeBodyDTO } from "../dtos/phone/phone.dto";
import { Auth, User } from "cc.naily.six.auth";
import { User as UserEntity } from "@prisma/client";
import { PrismaService } from "@nailyjs.nest.modules/prisma";
import { QrCodeService } from "../providers/qrcode.service";
import { PostLoginQrcodeBodyDTO, PostLoginQrcodeConfirmBodyDTO } from "../dtos/qrcode/qrcode.dto";
import { PostLoginEmailCodeBodyDTO } from "../dtos/email/email.dto";

@ApiTags("登录")
@Controller("login")
export class LoginController {
  constructor(
    private readonly loginService: LoginService,
    private readonly prismaService: PrismaService,
    private readonly qrcodeService: QrCodeService,
  ) {}

  /**
   * 手机号验证码登录
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/02
   * @param {*} body
   * @param {string} ip
   * @memberof LoginController
   */
  @Post("phone/code")
  @UseInterceptors(ResInterceptor)
  public loginByPhoneCode(@Body() body: PostLoginPhoneCodeBodyDTO, @Ip() ip: string) {
    return this.loginService.loginByPhoneCode(body.phone, body.code, {
      identifier: body.identifier,
      loginClient: body.loginClient,
      loginType: body.loginType,
      loginMethod: "PhoneCode",
      loginDeviceName: body.loginDeviceName,
      loginIP: ip,
    });
  }

  /**
   * 邮箱验证码登录
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/11
   * @param {PostLoginEmailCodeBodyDTO} body
   * @param {string} ip
   * @memberof LoginController
   */
  @Post("email/code")
  @UseInterceptors(ResInterceptor)
  public loginByEmailCode(@Body() body: PostLoginEmailCodeBodyDTO, @Ip() ip: string) {
    return this.loginService.loginByEmailCode(body.email, body.code, {
      identifier: body.identifier,
      loginClient: body.loginClient,
      loginType: body.loginType,
      loginMethod: "EmailCode",
      loginDeviceName: body.loginDeviceName,
      loginIP: ip,
    });
  }

  /**
   * 二维码登录：确认登录
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/31
   * @param {PostLoginQrcodeConfirmBodyDTO} body
   * @param {UserEntity} user
   * @memberof LoginController
   */
  @Auth()
  @Post("qrcode/confirm")
  @UseInterceptors(ResInterceptor)
  public async confirmQrCode(@Body() body: PostLoginQrcodeConfirmBodyDTO, @User() user: UserEntity) {
    await this.qrcodeService.setQrCode(`${body.key}`, user.userID);
    return 1000;
  }

  /**
   * 二维码登录：检查二维码状态并登录
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/27
   * @memberof LoginController
   */
  @Post("qrcode/refresh")
  @UseInterceptors(ResInterceptor)
  public async refreshQrCode(@Body() body: PostLoginQrcodeBodyDTO, @Ip() ip: string) {
    const checkStatus = await this.qrcodeService.getQrCode(`${body.key}`);
    if (!checkStatus) throw new BadRequestException(1041);
    if (checkStatus === "pending") throw new BadRequestException(1042);
    return this.loginService.loginByQrCode(await this.prismaService.user.findUnique({ where: { userID: checkStatus } }), {
      identifier: body.identifier,
      loginClient: body.loginClient,
      loginType: body.loginType,
      loginMethod: "QrCode",
      loginDeviceName: body.loginDeviceName,
      loginIP: ip,
    });
  }
}
