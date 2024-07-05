import { DynamicModule, Global, Module } from "@nestjs/common";
import { RedlockModule } from "@nailyjs.nest.modules/redlock";
import { ConfigService } from "@nestjs/config";
import { Redis } from "ioredis";

@Global()
@Module({})
export class CommonRedlockModule extends RedlockModule implements RedlockModule {
  public static forRoot(): DynamicModule {
    return super.forRootAsync({
      inject: [ConfigService],
      useFactory(configService) {
        const redisConfig: Record<string, any> = configService.getOrThrow("global.datasource.redis");
        return {
          clients: [new Redis(redisConfig)],
        };
      },
    });
  }
}
