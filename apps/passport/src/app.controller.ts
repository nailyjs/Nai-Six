import { Controller, Get, UseInterceptors } from "@nestjs/common";
import { ResInterceptor } from "cc.naily.six.shared";

@Controller()
export class AppController {
  @Get()
  @UseInterceptors(ResInterceptor)
  getHello() {
    return 1000;
  }
}
