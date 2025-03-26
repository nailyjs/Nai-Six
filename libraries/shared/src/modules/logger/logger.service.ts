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

import { ConsoleLogger, ConsoleLoggerOptions, Inject, Injectable, Scope } from "@nestjs/common";
import { LoggerService } from "@nestjs/common/services/logger.service";
import { LOGGER } from "./logger.module";
import { ConfigService } from "@nestjs/config";
import { AsyncClient, Content, LogGroup, LogItem, PutLogsRequest } from "tencentcloud-cls-sdk-js";

@Injectable({ scope: Scope.DEFAULT })
export class CommonLogger extends ConsoleLogger implements LoggerService {
  private readonly cls?: AsyncClient;
  private readonly clsTopic: string;

  constructor(@Inject(ConfigService) configServiceOrContext?: ConfigService | string, options?: ConsoleLoggerOptions) {
    super(typeof configServiceOrContext === "string" ? configServiceOrContext : undefined, options);

    if (configServiceOrContext instanceof ConfigService) {
      const clsConfig = configServiceOrContext.get("global.tencent.cloud.cls");
      if (!clsConfig) return;
      this.cls = new AsyncClient({
        endpoint: configServiceOrContext.getOrThrow("global.tencent.cloud.cls.endpoint") || "",
        retry_times: Number(configServiceOrContext.get("global.tencent.cloud.cls.retry_times") || 10),
        secretId: configServiceOrContext.getOrThrow("global.tencent.cloud.cls.secretId") || "",
        secretKey: configServiceOrContext.getOrThrow("global.tencent.cloud.cls.secretKey") || "",
        sourceIp: configServiceOrContext.get("global.tencent.cloud.cls.sourceIp") || "127.0.0.1",
      });
      this.clsTopic = configServiceOrContext.getOrThrow("global.tencent.cloud.cls.topic") || "默认话题";
    }
  }

  private async add<Message>(context: string, message: Message) {
    if (!this.cls || !this.clsTopic) return;
    context = context ? context : this.context ? this.context : "Other";

    try {
      const item = new LogItem();
      item.setTime(Math.floor(Date.now() / 1000));

      if (typeof message === "object") {
        if (Array.isArray(message)) {
          item.pushBack(new Content(context, String(this.getConsoleMessage(message))));
        } else {
          for (const key in message) {
            item.pushBack(new Content(key, String(message[key])));
          }
        }
      } else {
        item.pushBack(new Content(context, String(message)));
      }

      const loggroup = new LogGroup();
      loggroup.addLogs(item);
      const request = new PutLogsRequest(this.clsTopic, loggroup);
      await this.cls.PutLogs(request);
    } catch (error) {
      this.error("发送日志到腾讯云日志服务失败", error);
      console.error(error);
    }
  }

  private getConsoleMessage<Message>(message: Message) {
    try {
      return JSON.stringify(message);
    } catch (error) {
      return message;
    }
  }

  log<Message>(message: Message, context?: string) {
    LOGGER.info({
      message: typeof message === "object" ? this.getConsoleMessage(message) : String(message),
      context: this.context ? this.context : context,
    });
    this.add(this.context ? this.context : context, message);
  }

  warn<Message>(message: Message, context?: string) {
    LOGGER.warn({
      message: typeof message === "object" ? this.getConsoleMessage(message) : String(message),
      context: this.context ? this.context : context,
    });
    this.add(this.context ? this.context : context, message);
  }

  verbose<Message>(message: Message, context?: string) {
    LOGGER.verbose({
      message: typeof message === "object" ? this.getConsoleMessage(message) : String(message),
      context: this.context ? this.context : context,
    });
    this.add(this.context ? this.context : context, message);
  }

  error<Message>(message: Message, context?: string) {
    LOGGER.error({
      message: typeof message === "object" ? this.getConsoleMessage(message) : String(message),
      context: this.context ? this.context : context,
    });
    if (JSON.stringify(message).includes("发送日志到")) return;
    this.add(this.context ? this.context : context, message);
  }

  fatal<Message>(message: Message, context?: string) {
    LOGGER.error({
      message: typeof message === "object" ? this.getConsoleMessage(message) : String(message),
      context: this.context ? this.context : context,
    });
    this.add(this.context ? this.context : context, message);
  }

  debug<Message>(message: Message, context?: string) {
    LOGGER.debug({
      message: typeof message === "object" ? this.getConsoleMessage(message) : String(message),
      context: this.context ? this.context : context,
    });
    this.add(this.context ? this.context : context, message);
  }
}
