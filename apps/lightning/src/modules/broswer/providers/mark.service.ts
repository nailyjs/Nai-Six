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

import { Injectable } from "@nestjs/common";
import { CommonLogger } from "cc.naily.six.shared";

interface IsUpdatedBookMark {
  userID: string;
}

@Injectable()
export class BrowserMarkService {
  constructor(private readonly commonLogger: CommonLogger) {
    commonLogger.setContext(BrowserMarkService.name);
  }

  private isUpdating: IsUpdatedBookMark[] = [];

  public canFind(userID: string): boolean {
    const isUpdated = this.isUpdating.find((item) => item.userID === userID);
    if (isUpdated) return false;
    return true;
  }

  public addUpdating(userID: string): void {
    this.isUpdating.push({ userID });
    this.commonLogger.debug(`addUpdating: ${userID}`);
  }

  public removeUpdating(userID: string): void {
    const index = this.isUpdating.findIndex((item) => item.userID === userID);
    this.isUpdating.splice(index, 1);
    this.commonLogger.debug(`removeUpdating: ${userID}`);
  }
}
