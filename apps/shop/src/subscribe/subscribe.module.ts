import { Module } from "@nestjs/common";
import { SubscribeController } from "./controllers/subscribe.controller";
import { NailyContext } from "cc.naily.six.shared";
import { PackageController } from "./controllers/package.controller";

@Module({
  controllers: [SubscribeController, PackageController],
})
export class SubscribeModule extends NailyContext {}
