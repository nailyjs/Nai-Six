import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "@nailyjs.nest.modules/prisma";
import { Prisma } from "@prisma/client";
import { randomUUID } from "crypto";

@Injectable()
export class RegisterService {
  constructor(private readonly prismaService: PrismaService) {}

  private async generateUsername(): Promise<string> {
    // 生成一个随机用户名 用户名格式为 用户 + 8位随机数
    const username = `用户${randomUUID().replace(/-/g, "").substring(0, 8)}`;
    // 检查用户名是否已经被注册
    const user = await this.prismaService.user.findFirst({ where: { username } });
    // 如果用户名已经被注册 则重新生成一个用户名
    if (user) return await this.generateUsername();
    // 如果用户名没有被注册 则返回这个用户名
    return username;
  }

  private async createUser(data: Prisma.UserCreateInput) {
    const result = await this.prismaService.user.create({
      data: {
        ...data,
        saying: "这个人很懒，什么都没留下",
      },
    });
    if (process.env.NODE_ENV === "production") {
      this.prismaService.shopSubscribe
        .create({
          data: {
            user: {
              connect: {
                userID: data.userID,
              },
            },
            days: 1,
            package: {
              connect: {
                packageID: "66a39ab83983c3ea079eb443",
              },
            },
          },
        })
        .then((v) => {
          console.log("注册添加试用资格成功:" + JSON.stringify(v));
        })
        .catch((e) => {
          console.error("注册添加试用资格失败：" + e);
        });
    }
    return result;
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
    return await this.createUser({
      username,
      phone,
      ip,
    });
  }

  public async registerByEmailPassword(email: string, username: string, ip: string) {
    // 如果没有填写用户名 则生成一个随机用户名
    if (!username) username = await this.generateUsername();
    // 检查用户名和邮箱是否已经被注册
    const checkUsername = await this.prismaService.user.findFirst({ where: { username } });
    // 检查邮箱是否已经被注册
    const checkEmail = await this.prismaService.user.findFirst({ where: { email } });
    // 如果邮箱已经被注册 则抛出异常
    if (checkEmail) throw new ForbiddenException(1049);
    // 如果用户名已经被注册 则抛出异常
    if (checkUsername) throw new ForbiddenException(1048);
    // 创建用户
    return await this.createUser({
      username,
      email,
      ip,
    });
  }
}
