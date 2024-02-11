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

import { DynamicModule, Injectable } from "@nestjs/common";
import { CommonLogger } from "./logger";
import { existsSync, readFileSync } from "fs";
import { join } from "path";
import { load } from "js-yaml";

@Injectable()
export abstract class NailyContext {
  private static _cache: Record<string | symbol, any>;

  /**
   * 获取配置文件
   *
   * @author Zero <gczgroup@qq.com>
   * @since 2024
   * @return {(Record<string | symbol, any>)}
   * @memberof CommonConfigModule
   */
  protected static get ymlConfigCache(): Record<string | symbol, any> {
    if (!this._cache) this._cache = this.getYmlConfigDynamic() || {};
    return this._cache;
  }

  /**
   * 获取配置文件
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/08
   * @static
   * @return {(Record<string | symbol, any>)}
   * @memberof CommonConfigModule
   */
  public static getYmlConfigDynamic(): Record<string | symbol, any> {
    // 判断环境变量中是否有配置文件路径
    if (process.env.CONFIG_PATH) {
      if (!existsSync(process.env.CONFIG_PATH)) {
        new CommonLogger(NailyContext.name).warn(`CONFIG_PATH ${process.env.CONFIG_PATH} not found`);
      } else {
        new CommonLogger(NailyContext.name).log(`Use ${process.env.CONFIG_PATH} file`);
        return load(readFileSync(process.env.CONFIG_PATH, "utf8"));
      }
    }

    // 判断是否有application-*.yml文件
    if (process.env.NODE_ENV && existsSync(join(process.env.RESOURCE_ROOT, `application-${process.env.NODE_ENV}.yml`))) {
      new CommonLogger(NailyContext.name).log(`Use application-${process.env.NODE_ENV}.yml file`);
      return load(readFileSync(join(process.env.RESOURCE_ROOT, `application-${process.env.NODE_ENV}.yml`), "utf8"));
    }

    // 判断是否有application.yml文件
    if (existsSync(join(process.env.RESOURCE_ROOT, "application.yml"))) {
      new CommonLogger(NailyContext.name).log(`Use application.yml file`);
      return load(readFileSync(join(process.env.RESOURCE_ROOT, "application.yml"), "utf8"));
    }

    // 什么都没有，报错
    new CommonLogger(NailyContext.name).error(
      "No application.yml or application-*.yml file found, please at least create an empty application.yml file in resources folder.",
    );
    throw new Error("No application.yml or application-*.yml file found, please at least create an empty application.yml file in resources folder.");
  }

  /**
   * 注册模块
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/08
   * @static
   * @return {DynamicModule}
   * @memberof BusinessModule
   */
  public static register(): DynamicModule | Promise<DynamicModule> {
    return {
      module: this as any,
      global: true,
    };
  }
}
