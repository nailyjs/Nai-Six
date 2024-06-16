import { Module } from "@nestjs/common";
import { MicrosoftController } from "./microsoft.controller";
import { NailyContext } from "cc.naily.six.shared";

@Module({
  controllers: [MicrosoftController],
})
export class MicrosoftModule extends NailyContext {}
