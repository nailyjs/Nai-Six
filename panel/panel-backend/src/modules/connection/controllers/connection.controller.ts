import { Controller, Post, UseInterceptors } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ResInterceptor } from "cc.naily.six.shared";
import { ConnectionCheckerService } from "../providers/checker.service";

@ApiTags("连接")
@Controller("connection")
export class ConnectionController {
  constructor(private readonly checkerService: ConnectionCheckerService) {}

  /**
   * 检查连接
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/23
   * @memberof ConnectionController
   */
  @Post("check")
  @UseInterceptors(ResInterceptor)
  public async checkConnection() {
    return {
      passport: {
        status: await this.checkerService.checkStatus(this.checkerService.passport.host, this.checkerService.passport.port),
        info: this.checkerService.passport,
      },
      common: {
        status: await this.checkerService.checkStatus(this.checkerService.common.host, this.checkerService.common.port),
        info: this.checkerService.common,
      },
      forum: {
        status: await this.checkerService.checkStatus(this.checkerService.forum.host, this.checkerService.forum.port),
        info: this.checkerService.forum,
      },
      shop: {
        status: await this.checkerService.checkStatus(this.checkerService.shop.host, this.checkerService.shop.port),
        info: this.checkerService.shop,
      },
      app: {
        status: await this.checkerService.checkStatus(this.checkerService.app.host, this.checkerService.app.port),
        info: this.checkerService.app,
      },
      gpt: {
        status: await this.checkerService.checkStatus(this.checkerService.gpt.host, this.checkerService.gpt.port),
        info: this.checkerService.gpt,
      },
      lightning: {
        status: await this.checkerService.checkStatus(this.checkerService.lightning.host, this.checkerService.lightning.port),
        info: this.checkerService.lightning,
      },
    };
  }
}
