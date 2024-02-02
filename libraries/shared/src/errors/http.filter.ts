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

import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Response } from "express";
import { I18nService } from "nestjs-i18n";
import { CommonLogger } from "../modules/logger";

@Catch(HttpException)
export class CommonHttpFilter implements ExceptionFilter {
  constructor(
    private readonly i18nService: I18nService,
    private readonly commonLogger: CommonLogger,
  ) {}

  public catch(exception: HttpException, host: ArgumentsHost): void {
    this.commonLogger.setContext(CommonHttpFilter.name);

    const status = exception.getStatus();
    const msg: unknown = exception.getResponse();
    const response = host.switchToHttp().getResponse<Response>();

    if (this.isNumber(msg) || typeof msg === "number") {
      response.status(status).json({
        statusCode: status,
        code: typeof msg !== "number" ? Number(msg) : msg,
        message: this.i18nService.t(`global.errorCode.${msg}`),
        timestamp: new Date(),
      });

      return this.commonLogger.error(JSON.stringify(exception));
    }

    if (typeof msg === "string") {
      response.status(status).json({
        statusCode: status,
        code: 0,
        message: msg,
        timestamp: new Date(),
      });
      return this.commonLogger.error(JSON.stringify(exception));
    }

    if (typeof msg === "object") {
      response.status(status).json({
        statusCode: status,
        code: msg["code"] || 0,
        message: msg["message"] || exception.message,
        timestamp: new Date(),
        ...msg,
      });
      return this.commonLogger.error(JSON.stringify(exception));
    }
  }

  private isNumber<T>(value: T): boolean {
    return !Number.isNaN(Number(value));
  }
}
