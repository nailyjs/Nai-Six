import { NailyContext } from "cc.naily.six.shared";
import { Module } from "@nestjs/common";
import { UserChangerController } from "./controllers/change.controller";
import { UserController } from "./controllers/user.controller";
import { UserDataController } from "./controllers/data.controller";

@Module({
  controllers: [UserController, UserChangerController, UserDataController],
})
export class UserModule extends NailyContext {}
