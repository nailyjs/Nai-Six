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

  public generateFiveDigitNumber() {
    // 生成0到1之间的随机小数
    const randomDecimal = Math.random();
    // 将随机小数乘以90000，加上10000，得到范围在10000到99999之间的五位整数
    const fiveDigitNumber = Math.floor(randomDecimal * 90000) + 10000;
    return fiveDigitNumber;
  }

  public use(req: Request, res: Response, next: NextFunction) {
    const random = this.generateFiveDigitNumber();
    const timestamp = new Date().getTime();
    this.commonLogger.log(`${random} START ${req.method} {${req.originalUrl}} ${req.ip}`);
    this.commonLogger.debug(`${random} PARAMS: ${JSON.stringify(req.params)}`);
    this.commonLogger.debug(`${random} QUERY: ${JSON.stringify(req.query)}`);
    this.commonLogger.debug(`${random} BODY: ${JSON.stringify(req.body)}`);
    req.once("end", () => {
      this.commonLogger.log(`${random} END ${req.method} {${req.originalUrl}} ${req.ip} ${res.statusCode} <${new Date().getTime() - timestamp}ms>`);
    });
    next();
  }
}
