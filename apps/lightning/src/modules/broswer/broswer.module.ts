import { Module } from "@nestjs/common";
import { NailyContext } from "cc.naily.six.shared";
import { BrowserMarkController } from "./controllers/mark.controller";
import { BrowserMarkService } from "./providers/mark.service";
import { BroswerTrackController } from "./controllers/track.controller";
import { BroswerTrackService } from "./providers/track.service";

@Module({
  controllers: [BrowserMarkController, BroswerTrackController],
  providers: [BrowserMarkService, BroswerTrackService],
})
export class BroswerModule extends NailyContext {}
