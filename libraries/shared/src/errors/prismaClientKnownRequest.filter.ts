import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { Response } from "express";
import { CommonLogger } from "../modules/logger/logger.service";
import { I18nService } from "nestjs-i18n";
import { I18nTranslations } from "cc.naily.six.generated";

@Catch(Prisma.PrismaClientKnownRequestError)
export class CommonPrismaClientKnownRequestErrorFilter implements ExceptionFilter {
  constructor(
    private readonly commonLogger: CommonLogger,
    private readonly i18nService: I18nService<I18nTranslations>,
  ) {
    commonLogger.setContext(CommonPrismaClientKnownRequestErrorFilter.name);
  }

  public catch(error: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    console.error(error);
    this.commonLogger.error(`Prisma 数据库请求错误: ${error.message}`);
    response.status(500).json({
      statusCode: 500,
      code: 1059,
      message: `${this.i18nService.t("global.errorCode.1059")}: ${error.message}`,
      data: JSON.parse(JSON.stringify(error)),
    });
  }
}
