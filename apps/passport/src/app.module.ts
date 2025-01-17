import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "./app.controller";
import { CommonPrismaModule } from "cc.naily.six.database";
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
import { LoginModule } from "./modules/login/login.module";
import { TransportModule } from "./modules/transport/transport.module";
import { APP_GUARD, APP_PIPE } from "@nestjs/core";
import { RegisterModule } from "./modules/register/register.module";
import { UserModule } from "./modules/user/user.module";
import { RoleModule } from "./modules/role/role.module";
import { PayModule } from "./modules/pay/pay.module";
import { MicrosoftModule } from "./modules/microsoft/microsoft.module";
import { ScheduleModule } from "@nestjs/schedule";

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
    ScheduleModule.forRoot(),
    LoginModule.register(),
    RegisterModule.register(),
    TransportModule.register(),
    UserModule.register(),
    PayModule.register(),
    RoleModule.register(),
    MicrosoftModule.register(),
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
