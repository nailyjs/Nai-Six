import { BadRequestException, Body, Controller, NotFoundException, Put, UseInterceptors } from "@nestjs/common";
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { User as UserEntity } from "@prisma/client";
import { Auth, JwtLoginPayload, NotPermissions, User } from "cc.naily.six.auth";
import { PrismaService } from "@nailyjs.nest.modules/prisma";
import { PutUserPasswordBodyDTO, PutUserUsernameBodyDTO } from "../dtos/change/change.dto";
import { ResInterceptor } from "cc.naily.six.shared";
import { compareSync, hashSync, genSaltSync } from "bcrypt";
import { EmailService } from "src/modules/transport/providers/email.service";
import { PhoneService } from "src/modules/transport/providers/phone.service";

@ApiTags("用户")
@Controller("user")
export class UserChangerController {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly emailService: EmailService,
    private readonly phoneService: PhoneService,
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
  public async changeUsername(@User() user: UserEntity, @Body() body: PutUserUsernameBodyDTO) {
    const checkUsername = await this.prismaService.user.findFirst({ where: { username: body.username } });
    if (checkUsername) return 1048;
    await this.prismaService.user.update({
      where: { userID: user.userID },
      data: {
        username: body.username,
      },
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
  public async changePassword(@User() user: JwtLoginPayload, @Body() body: PutUserPasswordBodyDTO) {
    const checkUser = await this.prismaService.user.findFirst({ where: { userID: user.userID } });
    if (!checkUser) throw new NotFoundException(1007);
    if (!checkUser.password && body.oldPassword) throw new BadRequestException(1077);
    if (checkUser.password && body.oldPassword && !compareSync(body.oldPassword, checkUser.password)) throw new BadRequestException(1078);
    if (body.verifyType === "email") {
      const checkEmail = await this.emailService.checkCode(checkUser.email, body.verifyCode);
      if (!checkEmail) throw new BadRequestException(1011);
    } else if (body.verifyType === "phone") {
      const checkPhone = await this.phoneService.checkCode(checkUser.phone, body.verifyCode);
      if (!checkPhone) throw new BadRequestException(1040);
    }
    await this.prismaService.user.update({
      where: { userID: user.userID },
      data: { password: hashSync(body.newPassword, genSaltSync()) },
    });
    return 1000;
  }
}
