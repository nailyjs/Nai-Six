import { Module } from "@nestjs/common";
import { NailyContext } from "cc.naily.six.shared";
import { RegisterController } from "./controllers/register.controller";
import { RegisterService } from "./providers/register.service";

@Module({
  controllers: [RegisterController],
  providers: [RegisterService],
})
export class RegisterModule extends NailyContext {}
