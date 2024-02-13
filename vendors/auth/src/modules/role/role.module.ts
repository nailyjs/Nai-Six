import { DynamicModule, Module } from "@nestjs/common";
import { CommonRoleService } from ".";
import { CommonPermissionService } from "./permission.service";

@Module({})
export class CommonRoleModule {
  public static forRoot(): DynamicModule {
    return {
      module: CommonRoleModule,
      global: true,
      providers: [CommonPermissionService, CommonRoleService],
      exports: [CommonRoleService, CommonPermissionService],
    };
  }
}
