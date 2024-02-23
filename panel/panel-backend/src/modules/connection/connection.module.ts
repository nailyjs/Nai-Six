import { Module } from "@nestjs/common";
import { NailyContext } from "cc.naily.six.shared";
import { ConnectionController } from "./controllers/connection.controller";
import { ConnectionCheckerService } from "./providers/checker.service";

@Module({
  controllers: [ConnectionController],
  providers: [ConnectionCheckerService],
})
export class ConnectionModule extends NailyContext {}
