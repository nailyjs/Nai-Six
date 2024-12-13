import { Injectable, CanActivate, ExecutionContext, applyDecorators, UseGuards, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ApiHeader } from "@nestjs/swagger";
import { Request } from "express";
import { Observable } from "rxjs";

@Injectable()
export class DeveloperGuardImpl implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const developerAccessKey = request.headers["x-developer-access-key"] as string;
    if (!developerAccessKey || typeof developerAccessKey !== "string") throw new UnauthorizedException("开发者访问密钥错误");

    const configDeveloperAccessKey = this.configService.get("global.developerAccessKey");
    if (developerAccessKey !== configDeveloperAccessKey) throw new UnauthorizedException("开发者访问密钥错误");
    return true;
  }
}

export const OnlyDeveloper = () => {
  return applyDecorators(
    UseGuards(DeveloperGuardImpl),
    ApiHeader({
      name: "x-developer-access-key",
      required: true,
      description: "开发者访问密钥",
    }),
  );
};
