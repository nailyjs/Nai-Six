import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Cache } from "cache-manager";
import { Request } from "express";
import { map } from "rxjs";

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
    private readonly reflector: Reflector,
  ) {}

  public async intercept(context: ExecutionContext, next: CallHandler) {
    const cacheTime = this.reflector.get<number>("cacheTime", context.getHandler());
    const httpMethod = context.switchToHttp().getRequest<Request>().method;
    const cacheKey = `${httpMethod}_${context.getClass().name}_${context.getHandler().name}`;

    const cache = await this.cacheManager.store.get(cacheKey);
    if (cache && process.env.NODE_ENV !== "development") return next.handle().pipe(map(() => cache));

    return next.handle().pipe(
      map(async (data) => {
        if (cacheTime) this.cacheManager.store.set(cacheKey, data, cacheTime);
        return data;
      }),
    );
  }
}
