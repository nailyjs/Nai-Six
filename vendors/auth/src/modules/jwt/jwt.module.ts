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
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { CommonIdentifierService } from "./identifier.service";

@Global()
@Module({})
export class CommonJwtModule {
  /**
   * 注册JWT模块
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/08
   * @static
   * @return {DynamicModule}
   * @memberof CommonJwtModule
   */
  public static forRoot(): DynamicModule {
    return {
      imports: [
        JwtModule.registerAsync({
          inject: [ConfigService],
          global: true,
          async useFactory(configService: ConfigService) {
            const secret = configService.getOrThrow("global.jwt.secret");
            const expiresIn = configService.get("global.jwt.expiresIn");
            return {
              global: true,
              secret: secret,
              signOptions: {
                expiresIn: expiresIn ? expiresIn : "30d",
              },
            };
          },
        }),
      ],
      module: CommonJwtModule,
      providers: [CommonIdentifierService],
      exports: [CommonIdentifierService],
      global: true,
    };
  }
}
