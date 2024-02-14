import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "@nailyjs.nest.modules/prisma";
import { Prisma } from "@prisma/client";

@Injectable()
export class RegisterService {
  constructor(private readonly prismaService: PrismaService) {}

  private async generateUsername(): Promise<string> {
    const username = `用户${Math.floor(Math.random() * (99999999 - 100000 + 1) + 1000000)}`;
    const user = await this.prismaService.user.findFirst({ where: { username } });
    if (user) return await this.generateUsername();
    return username;
  }

  public async registerByPhonePassword(phone: string, username: string, ip: string) {
    // 如果没有填写用户名 则生成一个随机用户名
    if (!username) username = await this.generateUsername();
    // 检查用户名和手机号是否已经被注册
    const checkUsername = await this.prismaService.user.findFirst({ where: { username } });
    // 检查手机号是否已经被注册
    const checkPhone = await this.prismaService.user.findFirst({ where: { phone } });
    // 如果手机号已经被注册 则抛出异常
    if (checkPhone) throw new ForbiddenException(1049);
    // 如果用户名已经被注册 则抛出异常
    if (checkUsername) throw new ForbiddenException(1048);
    // 创建用户
    return await this.prismaService.user.create({
      data: {
        username,
        phone,
        ip,
        saying: "这个人很懒，什么都没留下",
      },
    });
  }

  public async registerByEmailPassword(email: string, username: string, ip: string) {
    if (!username) username = await this.generateUsername();
    const checkUsername = await this.prismaService.user.findFirst({ where: { username } });
    const checkEmail = await this.prismaService.user.findFirst({ where: { email } });
    if (checkEmail) throw new ForbiddenException(1049);
    if (checkUsername) throw new ForbiddenException(1048);
    return await this.prismaService.user.create({
      data: {
        username,
        email,
        ip,
        saying: "这个人很懒，什么都没留下",
      } as Prisma.XOR<Prisma.UserCreateInput, Prisma.UserUncheckedCreateInput>,
    });
  }
}
