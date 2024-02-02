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

import { DynamicModule, Module } from "@nestjs/common";
import { ThrottlerModule } from "@nestjs/throttler";
import { ConfigService } from "@nestjs/config";

@Module({})
export class CommonThrottlerModule {
  /**
   * 注册限流模块
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/08
   * @static
   * @return {DynamicModule}
   * @memberof CommonThrottlerModule
   */
  public static forRoot(): DynamicModule {
    return ThrottlerModule.forRootAsync({
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        return [
          {
            ttl: configService.get("global.throttler.ttl") ? configService.get("global.throttler.ttl") : 60000,
            limit: configService.get("global.throttler.limit") ? configService.get("global.throttler.limit") : 300,
          },
        ];
      },
    });
  }
}
