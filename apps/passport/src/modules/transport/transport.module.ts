import { Module } from "@nestjs/common";
import { NailyContext } from "cc.naily.six.shared";
import { EmailService } from "./providers/email.service";
import { PhoneService } from "./providers/phone.service";
import { TransportController } from "./controllers/transport.controller";
import { QrCodeController } from "./controllers/qrcode.controller";
import { QrCodeService } from "../login/providers/qrcode.service";

@Module({
  controllers: [TransportController, QrCodeController],
  providers: [EmailService, PhoneService, QrCodeService],
  exports: [EmailService, PhoneService],
})
export class TransportModule extends NailyContext {}
