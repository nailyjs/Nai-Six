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

import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { I18nTranslations } from "cc.naily.six.generated";
import { Response } from "express";
import { I18nService } from "nestjs-i18n";
import { CommonLogger } from "../modules/logger";

@Catch(Error)
export class CommonUnknownFilter implements ExceptionFilter {
  constructor(private readonly i18nService: I18nService<I18nTranslations>) {}

  public catch(exception: Error, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    const responseMessage = {
      statusCode: 500,
      code: 999,
      message: this.i18nService.t(`global.errorCode.999`),
      timestamp: new Date(),
    };

    console.error(exception);
    new CommonLogger("UnknownErrorFilter").error(`有未处理的错误被兜底 已经处理成500错误抛出 ${exception}`);
    new CommonLogger("UnknownErrorFilter").error(`响应 ${JSON.stringify(responseMessage)}`);
    response.status(500).json(responseMessage);
  }
}
