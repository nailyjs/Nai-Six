import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "./app.controller";
import { CommonPrismaModule } from "cc.naily.six.database";
import {
  CommonCacheModule,
  CommonConfigModule,
  CommonErrorModule,
  CommonI18nModule,
  CommonLoggerModule,
  CommonMailerModule,
  CommonTencentCloudModule,
  CommonThrottlerModule,
  CommonValidationPipe,
  ConnectorMiddleware,
  LoggerMiddleware,
  ThrottlerBehindProxyGuard,
} from "cc.naily.six.shared";
import { CommonJwtModule } from "cc.naily.six.auth";
import { APP_GUARD, APP_PIPE } from "@nestjs/core";
import { SubscribeModule } from "./subscribe/subscribe.module";

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
    CommonErrorModule.forRoot(),
    CommonJwtModule.forRoot(),
    SubscribeModule.register(),
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
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware, ConnectorMiddleware).forRoutes("*");
  }
}
