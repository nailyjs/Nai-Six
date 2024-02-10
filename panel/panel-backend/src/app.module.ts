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
  LoggerMiddleware,
} from "cc.naily.six.shared";
import { CommonPrismaModule } from "cc.naily.six.database";
import { CommonJwtModule, CommonRoleModule } from "cc.naily.six.auth";
import { RoleModule } from "./modules/role/role.module";

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
    RoleModule.register(),
  ],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
}
