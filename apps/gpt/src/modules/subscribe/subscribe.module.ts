import { Module } from "@nestjs/common";
import { NailyContext } from "cc.naily.six.shared";
import { SubscribeController } from "./controllers/subscribe.controller";
import { AdminSubscribeController } from "./controllers/admin.controller";

@Module({
  controllers: [SubscribeController, AdminSubscribeController],
})
export class SubscribeModule extends NailyContext {}
