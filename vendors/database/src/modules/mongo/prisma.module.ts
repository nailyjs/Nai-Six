import { HttpStatus, Module } from "@nestjs/common";
import { PrismaModule } from "@nailyjs.nest.modules/prisma";
import { UserLoggerSubscriber } from "../../subscribers";
import { I18nService } from "nestjs-i18n";
import { I18nPath, I18nTranslations } from "cc.naily.six.generated";
import { Response } from "express";

@Module({})
export class CommonPrismaModule {
  public static forRoot() {
    return PrismaModule.forRootAsync({
      inject: [I18nService],
      useFactory(i18nService: I18nService<I18nTranslations>) {
        return {
          subscribers: [UserLoggerSubscriber],
          filters: {
            ALL(exception, host) {
              const response = host.switchToHttp().getResponse<Response>();
              return response.status(500).json({
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                code: exception.code,
                message: i18nService.t(`global.errorCode.${exception.code}` as I18nPath),
                timestamp: new Date(),
              });
            },
          },
        };
      },
    });
  }
}
