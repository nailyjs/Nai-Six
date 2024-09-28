import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import { CommonIdentifierService, ILoginPayload, JwtLoginPayload } from "cc.naily.six.auth";
import { PrismaService } from "@nailyjs.nest.modules/prisma";
import { PhoneService } from "src/modules/transport/providers/phone.service";
import { EmailService } from "src/modules/transport/providers/email.service";
import { CommonLogger } from "cc.naily.six.shared";

@Injectable()
export class LoginService {
  constructor(
    private readonly identifierService: CommonIdentifierService,
    private readonly phoneService: PhoneService,
    private readonly emailService: EmailService,
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly loggerService: CommonLogger,
  ) {
    prismaService.$use(async (params, next) => {
      const before = Date.now();
      const result = await next(params);
      const after = Date.now();
      this.loggerService.debug(
        `Query ${params.model}.${params.action} took ${after - before}ms is Run In Transaction: ${params.runInTransaction}`,
        LoginService.name,
      );
      return result;
    });
  }

  private getJwtToken(user: User, loginPayload: ILoginPayload) {
    if (!user) throw new NotFoundException(1007);
    if (user.isDeleted) throw new NotFoundException(1056);
    return this.jwtService.sign({
      userID: user.userID,
      loginType: loginPayload.loginType,
      loginMethod: loginPayload.loginMethod,
      loginClient: loginPayload.loginClient,
      identifier: loginPayload.identifier,
    } satisfies JwtLoginPayload);
  }

  private updateIp(loginPayload: ILoginPayload, user: User) {
    return this.prismaService.user.update({
      where: { userID: user.userID },
      data: { ip: loginPayload.loginIP },
    });
  }

  public async loginByPhoneCode(phone: string, code: number, loginPayload: ILoginPayload) {
    const user = await this.prismaService.user.findFirst({ where: { phone } });
    const access_token = this.getJwtToken(user, loginPayload);
    const isRight = await this.phoneService.checkCode(phone, code);
    if (!isRight) throw new NotFoundException(1040);
    const identifier = await this.identifierService.renewIdentifier(user, loginPayload);
    if (identifier === "ERROR") throw new BadRequestException(1039);
    user.password = undefined;
    return {
      user,
      identifier,
      access_token,
    };
  }

  public async loginByEmailCode(email: string, code: number, loginPayload: ILoginPayload) {
    const user = await this.prismaService.user.findFirst({ where: { email } });
    const access_token = this.getJwtToken(user, loginPayload);
    const isRight = await this.emailService.checkCode(email, code);
    if (!isRight) throw new NotFoundException(1011);
    const identifier = await this.identifierService.renewIdentifier(user, loginPayload);
    if (identifier === "ERROR") throw new BadRequestException(1039);
    user.password = undefined;
    return {
      user,
      identifier,
      access_token,
    };
  }

  public async loginByQrCode(user: User, loginPayload: ILoginPayload) {
    if (!user) throw new NotFoundException(1007);
    user = await this.updateIp(loginPayload, user);
    const access_token = this.getJwtToken(user, loginPayload);
    const identifier = await this.identifierService.renewIdentifier(user, loginPayload);
    if (identifier === "ERROR") throw new BadRequestException(1039);
    user.password = undefined;
    return {
      user,
      identifier,
      access_token,
    };
  }

  public async loginByMicrosoft(user: User, loginPayload: ILoginPayload) {
    user = await this.updateIp(loginPayload, user);
    const access_token = this.getJwtToken(user, loginPayload);
    const identifier = await this.identifierService.renewIdentifier(user, loginPayload);
    if (identifier === "ERROR") throw new BadRequestException(1039);
    user.password = undefined;
    return {
      user,
      identifier,
      access_token,
    };
  }
}
