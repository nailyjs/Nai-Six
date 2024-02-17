import { Module } from "@nestjs/common";
import { NailyContext } from "cc.naily.six.shared";
import { TopicController } from "./controllers/topic.controller";

@Module({
  controllers: [TopicController],
})
export class TopicModule extends NailyContext {}
