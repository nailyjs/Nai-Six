import { Module } from "@nestjs/common";
import { NailyContext } from "cc.naily.six.shared";
import { RoleController } from "./controllers/role.controller";
import { PermissionController } from "./controllers/permission.controller";

@Module({
  controllers: [RoleController, PermissionController],
})
export class RoleModule extends NailyContext {}
