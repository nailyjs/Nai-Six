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

import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { CommonLogger } from "./logger.service";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly commonLogger: CommonLogger) {
    commonLogger.setContext(`Request`);
  }

  public generateTenDigitNumber() {
    // 生成0到1之间的随机小数
    const randomDecimal = Math.random();
    // 将随机小数乘以9000000000，加上1000000000，得到范围在1000000000到9999999999之间的十位整数
    const tenDigitNumber = Math.floor(randomDecimal * 9000000000) + 1000000000;
    return tenDigitNumber;
  }

  public use(req: Request, res: Response, next: NextFunction) {
    const random = this.generateTenDigitNumber();
    const timestamp = new Date().getTime();
    this.commonLogger.log(`${random} START ${req.method} {${req.originalUrl}} ${req.ip}`);
    this.commonLogger.debug(`${random} PARAMS: ${JSON.stringify(req.params)}`);
    this.commonLogger.debug(`${random} QUERY: ${JSON.stringify(req.query)}`);
    this.commonLogger.debug(`${random} BODY: ${JSON.stringify(req.body)}`);
    res.setHeader("X-Response-Id", random);
    req.once("close", () => {
      this.commonLogger.log(`${random} END ${req.method} {${req.originalUrl}} ${req.ip} ${res.statusCode} <${new Date().getTime() - timestamp}>ms`);
    });
    next();
  }
}
