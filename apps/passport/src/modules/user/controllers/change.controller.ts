import { BadRequestException, Body, Controller, Ip, NotFoundException, Put, UseInterceptors } from "@nestjs/common";
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { User as UserEntity } from "@prisma/client";
import { Auth, JwtLoginPayload, NotPermissions, User } from "cc.naily.six.auth";
import { PrismaService } from "@nailyjs.nest.modules/prisma";
import {
  PutUserEmailBodyDTO,
  PutUserPasswordBodyDTO,
  PutUserPhoneBodyDTO,
  PutUserSayingBodyDTO,
  PutUserUsernameBodyDTO,
} from "../dtos/change/change.dto";
import { ResInterceptor } from "cc.naily.six.shared";
import { compareSync, hashSync, genSaltSync } from "bcrypt";
import { ChangeService } from "../providers/change.service";

@ApiTags("用户")
@Controller("user")
export class UserChangerController {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly changeService: ChangeService,
  ) {}

  /**
   * 修改用户名
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/02
   * @memberof UserChangerController
   */
  @Auth()
  @Put("username")
  @UseInterceptors(ResInterceptor)
  @NotPermissions("Not_Change_UserName") // 不能有不允许修改用户名的权限
  public async changeUsername(@User() user: UserEntity, @Body() { username }: PutUserUsernameBodyDTO, @Ip() ip: string) {
    const checkUsername = await this.prismaService.user.findFirst({ where: { username } });
    if (checkUsername) return 1048;
    await this.prismaService.user.update({
      where: { userID: user.userID },
      data: { username, ip },
    });
    return 1000;
  }

  /**
   * 已登录用户修改密码
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/13
   * @memberof UserChangerController
   */
  @Auth()
  @Put("password")
  @UseInterceptors(ResInterceptor)
  @NotPermissions("Not_Change_Password") // 不能有不允许修改密码的权限
  @ApiOkResponse({ description: "修改成功返回`1000`" })
  @ApiBadRequestResponse({ description: "错误码：`1007`,`1077`,`1011`,`1040`,请参照i18n码表" })
  public async changePassword(@User() user: JwtLoginPayload, @Body() body: PutUserPasswordBodyDTO, @Ip() ip: string) {
    const checkUser = await this.prismaService.user.findFirst({ where: { userID: user.userID } });
    if (!checkUser) throw new NotFoundException(1007);
    if (!checkUser.password && body.oldPassword) throw new BadRequestException(1077);
    if (checkUser.password && body.oldPassword && !compareSync(body.oldPassword, checkUser.password)) throw new BadRequestException(1078);
    const checkCode = await this.changeService.verifyCode(
      body.verifyType,
      body.verifyCode,
      body.verifyType === "email" ? checkUser.email : checkUser.phone,
    );
    if (body.verifyType === "email" && !checkCode) throw new BadRequestException(1011);
    if (body.verifyType === "phone" && !checkCode) throw new BadRequestException(1040);
    await this.prismaService.user.update({
      where: { userID: user.userID },
      data: { password: hashSync(body.newPassword, genSaltSync()), ip },
    });
    return 1000;
  }

  /**
   * 修改个性签名
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/26
   * @param {UserEntity} user
   * @param {{ saying: string }} body 修改个性签名
   * @memberof UserChangerController
   */
  @Auth()
  @Put("saying")
  @NotPermissions("Not_Change_Saying") // 不能有不允许修改个性签名的权限
  @UseInterceptors(ResInterceptor)
  public async changeSaying(@User() user: UserEntity, @Body() body: PutUserSayingBodyDTO, @Ip() ip: string) {
    await this.prismaService.user.update({
      where: { userID: user.userID, ip },
      data: { saying: body.saying },
    });
    return 1000;
  }

  /**
   * 修改邮箱
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/26
   * @param {UserEntity} user
   * @param {PutUserEmailBodyDTO} body
   * @param {string} ip
   * @memberof UserChangerController
   */
  @Auth()
  @Put("email")
  @NotPermissions("Not_Change_Email") // 不能有不允许修改邮箱的权限
  @UseInterceptors(ResInterceptor)
  public async changeEmail(@User() user: UserEntity, @Body() body: PutUserEmailBodyDTO, @Ip() ip: string) {
    const checkEmail = await this.prismaService.user.findFirst({ where: { email: body.newEmail } });
    if (checkEmail) throw new BadRequestException(1097);
    const checkCode = await this.changeService.verifyCode(body.verifyType, body.verifyCode, body.newEmail);
    if (body.verifyType === "email" && !checkCode) throw new BadRequestException(1011);
    if (body.verifyType === "phone" && !checkCode) throw new BadRequestException(1040);
    if (!checkCode) throw new BadRequestException(1011);
    await this.prismaService.user.update({
      where: { userID: user.userID },
      data: { email: body.newEmail, ip },
    });
    return 1000;
  }

  /**
   * 修改手机
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/26
   * @param {PutUserPhoneBodyDTO} body 修改手机
   * @param {UserEntity} user 当前登录用户
   * @memberof UserChangerController
   */
  @Auth()
  @Put("phone")
  @UseInterceptors(ResInterceptor)
  @NotPermissions("Not_Change_Phone") // 不能有不允许修改手机的权限
  public async changePhone(@Body() body: PutUserPhoneBodyDTO, @User() user: UserEntity) {
    const checkPhone = await this.prismaService.user.findFirst({ where: { phone: body.newPhone } });
    if (checkPhone) throw new BadRequestException(1097);
    const checkCode = await this.changeService.verifyCode(body.verifyType, body.verifyCode, body.newPhone);
    if (body.verifyType === "email" && !checkCode) throw new BadRequestException(1011);
    if (body.verifyType === "phone" && !checkCode) throw new BadRequestException(1040);
    if (!checkCode) throw new BadRequestException(1011);
    await this.prismaService.user.update({
      where: { userID: user.userID },
      data: { phone: body.newPhone },
    });
    return 1000;
  }
}
