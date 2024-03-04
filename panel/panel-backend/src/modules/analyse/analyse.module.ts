import { Module } from "@nestjs/common";
import { NailyContext } from "cc.naily.six.shared";
import { UserController } from "./controllers/user.controller";

@Module({
  controllers: [UserController],
})
export class AnalyseModule extends NailyContext {}
