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

import { ConsoleLogger, Injectable, Scope } from "@nestjs/common";
import { LoggerService } from "@nestjs/common/services/logger.service";
import { LOGGER } from "./logger.module";

@Injectable({ scope: Scope.TRANSIENT })
export class CommonLogger extends ConsoleLogger implements LoggerService {
  log<Message>(message: Message, context?: string) {
    LOGGER.info({
      message,
      context: this.context ? this.context : context,
    });
  }

  warn<Message>(message: Message, context?: string) {
    LOGGER.warn({
      message,
      context: this.context ? this.context : context,
    });
  }

  verbose<Message>(message: Message, context?: string) {
    LOGGER.verbose({
      message,
      context: this.context ? this.context : context,
    });
  }

  error<Message>(message: Message, context?: string) {
    LOGGER.error({
      message,
      context: this.context ? this.context : context,
    });
  }

  fatal<Message>(message: Message, context?: string) {
    LOGGER.error({
      message,
      context: this.context ? this.context : context,
    });
  }

  debug<Message>(message: Message, context?: string) {
    LOGGER.debug({
      message,
      context: this.context ? this.context : context,
    });
  }
}
