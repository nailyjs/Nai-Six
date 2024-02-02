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
import { AxiosError } from "axios";
import { I18nTranslations } from "cc.naily.six.generated";
import { Response } from "express";
import { I18nService } from "nestjs-i18n";
import { CommonLogger } from "../modules/logger";

@Catch(AxiosError)
export class CommonAxiosFilter implements ExceptionFilter {
  constructor(private readonly i18nService: I18nService<I18nTranslations>) {}

  public catch(exception: AxiosError, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse<Response>();

    response.status(500).json({
      statusCode: 500,
      code: 0,
      message: this.i18nService.t("global.errorCode.1023"),
      timestamp: new Date(),
    });

    return new CommonLogger(CommonAxiosFilter.name).error(JSON.stringify(exception));
  }
}
