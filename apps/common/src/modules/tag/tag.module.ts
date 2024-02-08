import { Module } from "@nestjs/common";
import { NailyContext } from "cc.naily.six.shared";
import { TagController } from "./controllers/tag.controller";

@Module({
  controllers: [TagController],
})
export class TagModule extends NailyContext {}
