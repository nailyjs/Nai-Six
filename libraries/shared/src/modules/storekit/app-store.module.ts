import { DynamicModule, Module } from "@nestjs/common";
import { AppleAppStoreModule } from "@nailyjs.nest.modules/app-store";
import { CommonAppStoreService } from "./app-store.service";
import { object } from "joi";

@Module({})
export class CommonAppStoreModule {
  public static validate(configObject: Record<string, any>) {
    return object({
      apple: object({
        storekit: object({
          keyId: object().required(),
          issuerId: object().required(),
          environment: object().valid("Sandbox", "Production", "Xcode", "LocalTesting").required(),
        }),
      }),
    }).validate(configObject);
  }

  public static forRoot(): DynamicModule {
    return {
      module: CommonAppStoreModule,
      imports: [AppleAppStoreModule.forCustomService()],
      providers: [CommonAppStoreService],
      global: true,
      exports: [CommonAppStoreService],
    };
  }
}
