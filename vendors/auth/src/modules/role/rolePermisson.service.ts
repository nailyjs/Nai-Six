import { PrismaService } from "@nailyjs.nest.modules/prisma";
import { Injectable } from "@nestjs/common";

@Injectable()
export class RolePermissionService {
  constructor(private readonly prismaService: PrismaService) {}
}
