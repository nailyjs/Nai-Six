import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "@nailyjs.nest.modules/prisma";
import { Prisma } from "@prisma/client";
import { getRandomValues } from "crypto";

@Injectable()
export class RegisterService {
  constructor(private readonly prismaService: PrismaService) {}

  private async generateUsername(): Promise<string> {
    // 生成一个随机用户名 用户名格式为 用户 + 8位随机数
    const username = `用户${getRandomValues(new Uint8Array(1)).toString().slice(0, 8)}`;
    // 检查用户名是否已经被注册
    const user = await this.prismaService.user.findFirst({ where: { username } });
    // 如果用户名已经被注册 则重新生成一个用户名
    if (user) return await this.generateUsername();
    // 如果用户名没有被注册 则返回这个用户名
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
    if (checkPhone) return;
    // 如果用户名已经被注册 则抛出异常
    if (checkUsername) return;
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
