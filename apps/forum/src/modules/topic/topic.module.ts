import { Module } from "@nestjs/common";
import { NailyContext } from "cc.naily.six.shared";
import { TopicController } from "./controllers/topic.controller";
import { TopicCommentController } from "./controllers/comment.controller";

@Module({
  controllers: [TopicController, TopicCommentController],
})
export class TopicModule extends NailyContext {}
