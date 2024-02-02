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
import { APP_FILTER } from "@nestjs/core";
import { CommonHttpFilter, CommonUnknownFilter } from "../../errors";
import { CommonAxiosFilter } from "../../errors/axios.filter";

@Module({})
export class CommonErrorModule {
  /**
   * 注册全局错误拦截器
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/08
   * @static
   * @return {*}  {DynamicModule}
   * @memberof CommonErrorModule
   */
  public static forRoot(): DynamicModule {
    return {
      module: CommonErrorModule,
      providers: [
        {
          provide: APP_FILTER,
          useClass: CommonUnknownFilter,
        },
        {
          provide: APP_FILTER,
          useClass: CommonHttpFilter,
        },
        {
          provide: APP_FILTER,
          useClass: CommonAxiosFilter,
        },
      ],
    };
  }
}
