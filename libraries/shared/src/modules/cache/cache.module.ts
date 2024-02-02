/*
 * Copyright (C) 2024 Zero naily.cc
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import { DynamicModule, Global, Module } from "@nestjs/common";
import { CacheModule } from "@nestjs/cache-manager";
import { ConfigService } from "@nestjs/config";
import { RedisOptions } from "ioredis";
import { redisStore } from "cache-manager-ioredis-yet";

@Global()
@Module({})
export class CommonCacheModule extends CacheModule implements CacheModule {
  /**
   * 注册缓存模块
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/08
   * @static
   * @return {DynamicModule}
   * @memberof CommonCacheModule
   */
  public static forRoot(): DynamicModule {
    return CacheModule.registerAsync<RedisOptions>({
      inject: [ConfigService],
      isGlobal: true,
      async useFactory(configService: ConfigService) {
        const redisConfig: Record<string, any> = configService.getOrThrow("global.datasource.redis");
        return {
          isGlobal: true,
          ...redisConfig,
          store: await redisStore({
            ...redisConfig,
          }),
        };
      },
    });
  }
}
