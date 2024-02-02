import { Module } from "@nestjs/common";
import { NailyContext } from "cc.naily.six.shared";
import { RegisterController } from "./controllers/register.controller";
import { RegisterService } from "./providers/register.service";
import { TransportModule } from "../transport/transport.module";

@Module({
  imports: [TransportModule],
  controllers: [RegisterController],
  providers: [RegisterService],
})
export class RegisterModule extends NailyContext {}
