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
import { join } from "path";
import { ConfigService } from "@nestjs/config";
import { AcceptLanguageResolver, I18nModule, QueryResolver } from "nestjs-i18n";

@Module({})
export class CommonI18nModule {
  /**
   * 注册国际化模块
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/08
   * @static
   * @return {DynamicModule}
   * @memberof CommonI18nModule
   */
  public static forRoot(): DynamicModule {
    return I18nModule.forRootAsync({
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        const defaultLanguage = configService.get("global.defaultLanguage");
        return {
          fallbackLanguage: defaultLanguage ? defaultLanguage : "zh",
          loaderOptions: {
            path: join(process.env.RESOURCE_ROOT, "/i18n/"),
            watch: true,
          },
          typesOutputPath: join(process.env.PROJECT_ROOT, "libraries/generated/src/i18n.generated.ts"),
        };
      },
      resolvers: [
        AcceptLanguageResolver,
        {
          use: QueryResolver,
          options: ["lang", "locale"],
        },
      ],
    });
  }
}
