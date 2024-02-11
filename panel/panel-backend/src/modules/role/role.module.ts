import { Module } from "@nestjs/common";
import { NailyContext } from "cc.naily.six.shared";
import { RoleController } from "./controllers/role.controller";

@Module({
  controllers: [RoleController],
})
export class RoleModule extends NailyContext {}
