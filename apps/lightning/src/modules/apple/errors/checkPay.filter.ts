import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { I18nTranslations } from "cc.naily.six.generated";
import { Response } from "express";
import { I18nService } from "nestjs-i18n";

@Catch(TypeError)
export class CheckPayFilter implements ExceptionFilter {
  constructor(private readonly i18n: I18nService<I18nTranslations>) {}

  catch(exception: TypeError | Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof TypeError) {
      response.status(400).json({
        statusCode: 400,
        code: 1094,
        message: this.i18n.t("global.errorCode.1094"),
        timestamp: new Date(),
      });
    }
  }
}
