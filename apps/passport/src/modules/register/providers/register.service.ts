import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "cc.naily.six.database";

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
    if (!username) username = await this.generateUsername();
    const checkUsername = await this.prismaService.user.findFirst({ where: { username } });
    const checkPhone = await this.prismaService.user.findFirst({ where: { phone } });
    if (checkPhone) throw new ForbiddenException(1049);
    if (checkUsername) throw new ForbiddenException(1048);
    return await this.prismaService.user.create({
      data: {
        username,
        phone,
        ip,
        saying: "这个人很懒，什么都没留下",
      },
    });
  }
}
