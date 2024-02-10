import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { JwtLoginPayload } from "../modules/jwt";
import { ObjectId } from "mongodb";
import { PrismaService } from "@nailyjs.nest.modules/prisma";
import { Reflector } from "@nestjs/core";
import { User } from "@prisma/client";
import { I18nService } from "nestjs-i18n";
import { I18nTranslations } from "cc.naily.six.generated";
import { CommonLogger } from "cc.naily.six.shared";

declare global {
  namespace Express {
    export interface Request {
      user: Record<string, any>;
    }
  }
}

@Injectable()
export class CommonAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
    private readonly i18nService: I18nService<I18nTranslations>,
    private readonly commonLogger: CommonLogger,
    private reflector: Reflector,
  ) {
    configService.getOrThrow("global.jwt.secret");
    commonLogger.setContext(CommonAuthGuard.name);
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    if (!request.headers.authorization) throw new UnauthorizedException(1016);
    const token = this.extractTokenFromHeader(request);
    if (!token) throw new ForbiddenException(1006);
    let user: User;
    try {
      const payload: JwtLoginPayload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.getOrThrow("global.jwt.secret"),
      });
      if (!ObjectId.isValid(payload.userID)) throw new ForbiddenException(1006);
      user = await this.prismaService.user.findUnique({
        where: { userID: payload.userID },
        include: { roles: { include: { permissions: true } } },
      });
      if (!user) throw new ForbiddenException(1006);
    } catch {
      throw new ForbiddenException(1006);
    }

    // 检查角色装饰器
    const roles = this.reflector.get<string[]>("roles", context.getHandler()) || [];
    // 检查权限装饰器
    const permissions = this.reflector.get<string[]>("permissions", context.getHandler()) || [];
    this.commonLogger.debug(`roles: ${JSON.stringify(roles)}, permissions: ${JSON.stringify(permissions)}`);
    if (roles.length || permissions.length) {
      const findRoles = await this.prismaService.role.findMany({
        where: { roleName: { in: roles } },
        include: { permissions: true },
      });
      if (!findRoles)
        throw new ForbiddenException({
          code: 1076,
          message: this.i18nService.t("global.errorCode.1076").replace("{}", roles.join(",")),
        });
      const findPermissions = await this.prismaService.permission.findMany({
        where: {
          permissionName: { in: permissions },
          roles: {
            some: { roleID: { in: findRoles.map((role) => role.roleID) } },
          },
        },
      });
      if (!findPermissions)
        throw new ForbiddenException({
          code: 1072,
          message: this.i18nService.t("global.errorCode.1072").replace("{}", permissions.join(",")),
        });
    }

    request.user = user;
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}

@Injectable()
export class CommonAuthGuardOptional implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    configService.getOrThrow("global.jwt.secret");
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    if (!request.headers.authorization) return true;
    const token = this.extractTokenFromHeader(request);
    if (!token) return true;

    if (token) {
      try {
        const payload: JwtLoginPayload = await this.jwtService.verifyAsync(token, {
          secret: this.configService.getOrThrow("global.jwt.secret"),
        });
        if (!ObjectId.isValid(payload.userID)) throw new ForbiddenException(1006);
        request.user = payload;
      } catch {
        return true;
      }
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}
