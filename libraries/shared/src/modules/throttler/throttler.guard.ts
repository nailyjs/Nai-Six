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

import { ThrottlerException as ParentThrottlerException, ThrottlerGuard } from "@nestjs/throttler";
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { ThrottlerLimitDetail } from "@nestjs/throttler/dist/throttler.guard.interface";
import { CommonLogger } from "../logger";
import { Request } from "express";

class ThrottlerException extends ParentThrottlerException {
  constructor(errorCode: number) {
    super(errorCode as unknown as string);
  }
}

@Injectable()
export class ThrottlerBehindProxyGuard extends ThrottlerGuard implements CanActivate {
  protected async getTracker(req: Request): Promise<string> {
    return req.ips.length ? req.ips[0] : req.ip; // individualize IP extraction to meet your own needs
  }

  protected async throwThrottlingException(context: ExecutionContext, throttlerLimitDetail: ThrottlerLimitDetail): Promise<void> {
    const errorMessage = await super.getErrorMessage(context, throttlerLimitDetail);
    new CommonLogger("ThrottlerException").error(errorMessage);
    throw new ThrottlerException(1014);
  }
}
