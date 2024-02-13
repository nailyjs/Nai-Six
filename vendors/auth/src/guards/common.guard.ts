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
import { IMustPermission, INotPermission, IPermission } from "..";

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
      this.commonLogger.debug("JWT payload: " + JSON.stringify(payload));
      if (!ObjectId.isValid(payload.userID)) throw new ForbiddenException(1006);
      user = await this.prismaService.user.findFirst({
        where: { userID: payload.userID },
      });
      if (!user) throw new ForbiddenException(1006);
    } catch {
      throw new ForbiddenException(1006);
    }

    // 必须要有的权限
    const mustPermissions = this.reflector.get<IMustPermission[]>("must_permissions", context.getHandler()) || [];
    // 不能有的权限
    const notPermissions = this.reflector.get<INotPermission[]>("not_permissions", context.getHandler()) || [];
    // 用户的所有角色的权限
    let userRolesPermissions: IPermission[] = [];
    if (!user.roleIDs) user.roleIDs = [];
    // 获取用户的所有角色的权限
    for (const roleID of user.roleIDs) {
      const role = await this.prismaService.role.findUnique({
        where: { roleID },
      });
      if (!role) continue;
      userRolesPermissions.push(...(role.permissions as IPermission[]));
    }
    // 去重
    userRolesPermissions = [...new Set(userRolesPermissions)];
    // 检查权限是否有
    for (const permission of notPermissions) {
      // 如果用户有权限
      if (userRolesPermissions.includes(permission)) {
        throw new ForbiddenException({
          code: 1076, // 权限禁止
          message: this.i18nService.t("global.errorCode.1076").replace("{}", `{${permission}}`),
        });
      }
    }
    // 检查权限是否无
    for (const permission of mustPermissions) {
      // 如果用户没有权限
      if (!userRolesPermissions.includes(permission)) {
        throw new ForbiddenException({
          code: 1072, // 权限不足
          message: this.i18nService.t("global.errorCode.1072").replace("{}", `{${permission}}`),
        });
      }
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
