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
import { CommonLogger } from "./logger.service";
import { createLogger, format, transports as WinstonTransports } from "winston";
import { consoleFormat } from "./console.format";
import { join } from "path";

function loggerPath(level: string) {
  return join("log", process.env.NODE_ENV ? process.env.NODE_ENV : "", `${level}.log`);
}

export const LOGGER = createLogger({
  level: "debug",
  transports: [
    // 打印
    new WinstonTransports.Console({
      format: format.combine(format.timestamp(), consoleFormat),
    }),
    // JSON
    new WinstonTransports.File({
      filename: loggerPath("all"),
      format: format.combine(format.timestamp(), format.json()),
    }),
    new WinstonTransports.File({
      filename: loggerPath("info"),
      level: "info",
      format: format.combine(format.timestamp(), format.json()),
    }),
    new WinstonTransports.File({
      filename: loggerPath("error"),
      level: "error",
      format: format.combine(format.timestamp(), format.json()),
    }),
    new WinstonTransports.File({
      filename: loggerPath("verbose"),
      level: "verbose",
      format: format.combine(format.timestamp(), format.json()),
    }),
    new WinstonTransports.File({
      filename: loggerPath("warn"),
      level: "warn",
      format: format.combine(format.timestamp(), format.json()),
    }),
    new WinstonTransports.File({
      filename: loggerPath("debug"),
      level: "debug",
      format: format.combine(format.timestamp(), format.json()),
    }),
  ],
});

@Global()
@Module({})
export class CommonLoggerModule {
  /**
   * 全局日志模块
   *
   * @returns {DynamicModule}
   * @memberof CommonLoggerModule
   * @static
   * @author Zero <gczgroup@qq.com>
   * @since 2024
   */
  public static async forRoot(): Promise<DynamicModule> {
    return {
      module: CommonLoggerModule,
      global: true,
      providers: [CommonLogger],
      exports: [CommonLogger],
    };
  }
}
