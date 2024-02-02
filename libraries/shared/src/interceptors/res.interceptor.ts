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

import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { I18nPath, I18nTranslations } from "cc.naily.six.generated";
import { I18nService } from "nestjs-i18n";
import { map } from "rxjs";

@Injectable()
export class ResInterceptor implements NestInterceptor {
  constructor(private readonly i18nService: I18nService<I18nTranslations>) {}

  private isNumber(value: unknown): boolean {
    return !Number.isNaN(Number(value));
  }

  public intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      map((d) => {
        if (typeof d === "object" && (typeof d.statusCode === "number" || typeof d.message === "string" || typeof d.code === "number")) {
          return {
            statusCode: typeof d.statusCode === "number" ? d.statusCode : 200,
            code: typeof d.code === "number" ? d.code : 0,
            message: typeof d.message === "number" ? d.message : "OK",
            timestamp: new Date(),
            ...d,
          };
        } else if (typeof d === "object") {
          return {
            statusCode: 200,
            code: 1000,
            message: this.i18nService.t("global.errorCode.1000"),
            timestamp: new Date(),
            data: d,
          };
        } else if ((typeof d === "string" && this.isNumber(d)) || typeof d === "number") {
          const message = this.i18nService.t(`global.errorCode.${d}` as I18nPath);
          return {
            statusCode: 200,
            code: Number(d),
            message: message ? message : this.i18nService.t("global.errorCode.1000"),
            timestamp: new Date(),
          };
        } else if (typeof d === "string") {
          return {
            statusCode: 200,
            code: 1000,
            message: d,
            timestamp: new Date(),
          };
        }
      }),
    );
  }
}
