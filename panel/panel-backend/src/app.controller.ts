import { Controller, Get, Query, UseInterceptors } from "@nestjs/common";
import { Auth, JwtLoginPayload, MustPermissions, User } from "cc.naily.six.auth";
import { I18nTranslations } from "cc.naily.six.generated";
import { ResInterceptor } from "cc.naily.six.shared";
import { I18nService } from "nestjs-i18n";

@Controller()
export class AppController {
  constructor(private readonly i18nService: I18nService<I18nTranslations>) {}

  @Get()
  @UseInterceptors(ResInterceptor)
  getHello(@Query() query) {
    return {
      code: 1000,
      message: query.test ? "backend" + query.test : this.i18nService.t("global.errorCode.1000"),
    };
  }

  /**
   * 已登录用户 检查权限
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/10
   * @param {JwtLoginPayload} user
   * @memberof AppController
   */
  @Auth()
  @Get("logging")
  @MustPermissions("Must_Admin") // 必须有 Must_Admin 权限
  @UseInterceptors(ResInterceptor)
  getLogging(@User() user: JwtLoginPayload) {
    return user;
  }
}
