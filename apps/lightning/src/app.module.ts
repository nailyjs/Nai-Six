import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { CommonPrismaModule } from "cc.naily.six.database";
import {
  CommonAppStoreModule,
  CommonCacheModule,
  CommonConfigModule,
  CommonErrorModule,
  CommonI18nModule,
  CommonLoggerModule,
  CommonMailerModule,
  CommonTencentCloudModule,
  CommonThrottlerModule,
  CommonValidationPipe,
  ThrottlerBehindProxyGuard,
} from "cc.naily.six.shared";
import { CommonJwtModule } from "cc.naily.six.auth";
import { APP_GUARD, APP_PIPE } from "@nestjs/core";
import { BroswerModule } from "./modules/broswer/broswer.module";
import { AppleModule } from "./modules/apple/apple.module";

@Module({
  imports: [
    CommonPrismaModule.forRoot(),
    CommonConfigModule.forRoot(),
    CommonLoggerModule.forRoot(),
    CommonI18nModule.forRoot(),
    CommonCacheModule.forRoot(),
    CommonThrottlerModule.forRoot(),
    CommonTencentCloudModule.forRoot(),
    CommonMailerModule.forRoot(),
    CommonAppStoreModule.forRoot(),
    CommonErrorModule.forRoot(),
    CommonJwtModule.forRoot(),
    BroswerModule.register(),
    AppleModule.register(),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerBehindProxyGuard,
    },
    {
      provide: APP_PIPE,
      useClass: CommonValidationPipe,
    },
  ],
})
export class AppModule {}
