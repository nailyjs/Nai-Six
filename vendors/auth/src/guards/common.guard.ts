import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { JwtLoginPayload } from "../modules/jwt";
import { ObjectId } from "mongodb";
import { PrismaService } from "@nailyjs.nest.modules/prisma";

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
  ) {
    configService.getOrThrow("global.jwt.secret");
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    if (!request.headers.authorization) throw new UnauthorizedException(1016);
    const token = this.extractTokenFromHeader(request);
    if (!token) throw new ForbiddenException(1006);
    try {
      const payload: JwtLoginPayload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.getOrThrow("global.jwt.secret"),
      });
      if (!ObjectId.isValid(payload.userID)) throw new ForbiddenException(1006);
      const user = await this.prismaService.user.findUnique({
        where: { userID: payload.userID },
      });
      if (!user) throw new ForbiddenException(1006);
      request.user = user;
    } catch {
      throw new ForbiddenException(1006);
    }
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
