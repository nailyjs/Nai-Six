import { Module } from "@nestjs/common";
import { NailyContext } from "cc.naily.six.shared";
import { GPTService } from "./gpt.service";
import { GPTController } from "./gpt.controller";

@Module({
  controllers: [GPTController],
  providers: [GPTService],
})
export class GPTModule extends NailyContext {}
