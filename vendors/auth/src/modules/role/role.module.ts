import { DynamicModule, Module } from "@nestjs/common";
import { CommonRoleService } from ".";

@Module({})
export class CommonRoleModule {
  public static forRoot(): DynamicModule {
    return {
      module: CommonRoleModule,
      global: true,
      providers: [CommonRoleService],
      exports: [CommonRoleService],
    };
  }
}
