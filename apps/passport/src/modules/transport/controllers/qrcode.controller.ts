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

import { Controller, Get, UseInterceptors } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ResInterceptor } from "cc.naily.six.shared";
import { QrCodeService } from "src/modules/login/providers/qrcode.service";

@ApiTags("传输")
@Controller("transport/qrcode")
export class QrCodeController {
  constructor(private readonly qrcodeService: QrCodeService) {}

  /**
   * 二维码登录：获取二维码
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/27
   * @memberof QrCodeController
   */
  @Get()
  @UseInterceptors(ResInterceptor)
  public async getQrCode() {
    return {
      qrcode_key: await this.qrcodeService.createQrCode(),
    };
  }
}
