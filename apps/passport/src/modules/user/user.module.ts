import { NailyContext } from "cc.naily.six.shared";
import { Module } from "@nestjs/common";
import { UserChangerController } from "./controllers/change.controller";
import { UserController } from "./controllers/user.controller";
import { UserDataController } from "./controllers/data.controller";
import { ChangeService } from "./providers/change.service";

@Module({
  controllers: [UserController, UserChangerController, UserDataController],
  providers: [ChangeService],
})
export class UserModule extends NailyContext {}
