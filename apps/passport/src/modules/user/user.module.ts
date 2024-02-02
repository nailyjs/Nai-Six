import { NailyContext } from "cc.naily.six.shared";
import { Module } from "@nestjs/common";
import { UserChangerController } from "./controllers/change.controller";
import { UserController } from "./controllers/user.controller";

@Module({
  controllers: [UserController, UserChangerController],
})
export class UserModule extends NailyContext {}
