import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "./app.controller";
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
  LoggerMiddleware,
  ThrottlerBehindProxyGuard,
} from "cc.naily.six.shared";
import { CommonPrismaModule } from "cc.naily.six.database";
import { CommonJwtModule, CommonRoleModule } from "cc.naily.six.auth";
import { RoleModule } from "./modules/role/role.module";
import { APP_GUARD, APP_PIPE } from "@nestjs/core";
import { ConnectionModule } from "./modules/connection/connection.module";
import { AnalyseModule } from "./modules/analyse/analyse.module";

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
    ConnectionModule.register(),
    RoleModule.register(),
    AnalyseModule.register(),
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
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
}
