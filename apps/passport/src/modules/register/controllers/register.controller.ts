import { Body, Controller, Ip, Post, Res, UseInterceptors } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CommonLogger, ResInterceptor } from "cc.naily.six.shared";
import { RegisterService } from "../providers/register.service";
import { PhoneService } from "src/modules/transport/providers/phone.service";
import { PostRegisterEmailCodeBodyDTO, PostRegisterPhoneCodeBodyDTO } from "../dtos/phone/phone.dto";
import { Response } from "express";

@ApiTags("注册")
@Controller("register")
export class RegisterController {
  constructor(
    private readonly commonLogger: CommonLogger,
    private readonly registerService: RegisterService,
    private readonly phoneService: PhoneService,
  ) {
    commonLogger.setContext(RegisterController.name);
  }

  /**
   * 手机号验证码注册
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/02
   * @param {*} body
   * @param {string} ip
   * @memberof RegisterController
   */
  @Post("phone/code")
  @UseInterceptors(ResInterceptor)
  public async registerByPhonePassword(@Body() body: PostRegisterPhoneCodeBodyDTO, @Ip() ip: string, @Res() res: Response) {
    res.status(201).send({
      statusCode: 1000,
      code: 1000,
      message: "成功",
    });
    console.log("!!!!1");
    await this.phoneService.checkCode(body.phone, body.code);
    console.log("@@@@@2");
    const user = await this.registerService.registerByPhonePassword(body.phone, body.username, ip);
    this.commonLogger.log(`用户注册成功 ${JSON.stringify(user)}`);
    return { user };
  }

  @Post("phone/code2")
  @UseInterceptors(ResInterceptor)
  public async registerByPhonePassword2(@Body() body: PostRegisterPhoneCodeBodyDTO, @Ip() ip: string) {
    await this.phoneService.checkCode(body.phone, body.code);
    const user = await this.registerService.registerByPhonePassword(body.phone, body.username, ip);
    this.commonLogger.log(`用户注册成功 ${JSON.stringify(user)}`);
    return { user };
  }

  /**
   * 邮箱验证码注册
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/10
   * @param {PostRegisterPhoneCodeBodyDTO} body
   * @param {string} ip
   * @memberof RegisterController
   */
  @Post("email/code")
  @UseInterceptors(ResInterceptor)
  public async registerByEmailPassword(@Body() body: PostRegisterEmailCodeBodyDTO, @Ip() ip: string) {
    await this.phoneService.checkCode(body.email, body.code);
    const user = await this.registerService.registerByEmailPassword(body.email, body.username, ip);
    this.commonLogger.log(`用户注册成功 ${JSON.stringify(user)}`);
    return { user };
  }
}
