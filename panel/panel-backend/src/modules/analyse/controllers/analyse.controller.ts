import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("分析")
@Controller("analyse")
export class AnalyseController {
  @Get()
  public async getAnalyse() {}
}
