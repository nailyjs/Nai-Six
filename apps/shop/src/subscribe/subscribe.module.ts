import { Module } from "@nestjs/common";
import { SubscribeController } from "./controllers/subscribe.controller";
import { BalanceUtil, NailyContext } from "cc.naily.six.shared";
import { PackageController } from "./controllers/package.controller";
import { SubscribeService } from "./providers/subscribe.service";

@Module({
  controllers: [SubscribeController, PackageController],
  providers: [SubscribeService, BalanceUtil],
})
export class SubscribeModule extends NailyContext {}
