import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "./app.controller";
import {
  CommonCacheModule,
  CommonConfigModule,
  CommonI18nModule,
  CommonLoggerModule,
  CommonMailerModule,
  CommonTencentCloudModule,
  CommonThrottlerModule,
  CommonValidationPipe,
  LoggerMiddleware,
  ThrottlerBehindProxyGuard,
  CommonErrorModule,
  ConnectorMiddleware,
} from "cc.naily.six.shared";
import { CommonJwtModule, CommonRoleModule } from "cc.naily.six.auth";
import { CommonPrismaModule } from "cc.naily.six.database";
import { APP_GUARD, APP_PIPE } from "@nestjs/core";
import { TopicModule } from "./modules/topic/topic.module";

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
    CommonJwtModule.forRoot(),
    CommonErrorModule.forRoot(),
    CommonRoleModule.forRoot(),
    TopicModule.register(),
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
