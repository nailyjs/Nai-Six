import { Module } from "@nestjs/common";
import { NailyContext } from "cc.naily.six.shared";
import { LoginController } from "./controllers/login.controller";
import { LoginService } from "./providers/login.service";
import { TransportModule } from "../transport/transport.module";
import { LogoutController } from "./controllers/logout.controller";
import { QrCodeService } from "./providers/qrcode.service";

@Module({
  imports: [TransportModule],
  controllers: [LoginController, LogoutController],
  providers: [LoginService, QrCodeService],
})
export class LoginModule extends NailyContext {}
