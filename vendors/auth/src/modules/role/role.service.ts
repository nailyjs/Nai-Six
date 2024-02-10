import { PrismaService } from "@nailyjs.nest.modules/prisma";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CommonRoleService {
  constructor(private readonly prismaService: PrismaService) {}

  public getRolePermissions(roleID: string) {
    return this.prismaService.role.findMany({
      where: { roleID },
    });
  }

  public getUserRoles(userID: string) {
    return this.prismaService.role.findMany({
      where: { users: { every: { userID } } },
    });
  }
}
