import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { NailyContext } from "cc.naily.six.shared";
import { BrowserMarkController } from "./controllers/mark.controller";
import { BrowserMarkLockService, BrowserMarkVersionService } from "./providers/mark.service";
import { BroswerTrackController } from "./controllers/track.controller";
import { BroswerTrackService } from "./providers/track.service";
import { DisabledMiddleware } from "./middlewares/disabled.middleware";

@Module({
  controllers: [BrowserMarkController, BroswerTrackController],
  providers: [BrowserMarkLockService, BrowserMarkVersionService, BroswerTrackService],
})
export class BroswerModule extends NailyContext implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // prettier-ignore
    consumer.apply(DisabledMiddleware)
      .exclude("/broswer/mark/v2")
      .exclude("/broswer/mark/all/v2")
      .forRoutes(BrowserMarkController);
  }
}
