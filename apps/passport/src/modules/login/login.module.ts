import { Module } from "@nestjs/common";
import { NailyContext } from "cc.naily.six.shared";
import { LoginController } from "./controllers/login.controller";
import { LoginService } from "./providers/login.service";
import { LogoutController } from "./controllers/logout.controller";
import { QrCodeService } from "./providers/qrcode.service";

@Module({
  controllers: [LoginController, LogoutController],
  providers: [LoginService, QrCodeService],
})
export class LoginModule extends NailyContext {}
