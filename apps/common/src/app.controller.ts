import { Controller, Get, UseInterceptors } from "@nestjs/common";
import { ResInterceptor } from "cc.naily.six.shared";

@Controller()
export class AppController {
  /**
   * 主页
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/08
   * @return {number}
   * @memberof AppController
   */
  @Get()
  @UseInterceptors(ResInterceptor)
  getHello(): number {
    return 1000;
  }
}
