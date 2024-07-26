import { Inject, Injectable } from "@nestjs/common";
import { TransportCodeService } from "../classes/code.service";
import { CACHE_MANAGER, Cache } from "@nestjs/cache-manager";
import { MailerService } from "@nestjs-modules/mailer";
import { I18nService } from "nestjs-i18n";
import { I18nTranslations } from "cc.naily.six.generated";
import { CommonLogger } from "cc.naily.six.shared";

@Injectable()
export class EmailService extends TransportCodeService {
  constructor(
    @Inject(CACHE_MANAGER)
    protected readonly cacheManager: Cache,
    private readonly mailerService: MailerService,
    private readonly i18n: I18nService<I18nTranslations>,
    private readonly commonLogger: CommonLogger,
  ) {
    super(cacheManager, commonLogger);
    commonLogger.setContext(EmailService.name);
  }

  public getRediskey(verifyData: string): string {
    return `passport:code:email:${verifyData}`;
  }

  public async sendCode(email: string) {
    const code = await super.sendCode(email);
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: this.i18n.t("passport.email.template.verify"),
        html: `<div style="margin: 14px">
              <h1>${this.i18n.t("passport.email.template.verify")}</h1>
              <div>${this.i18n.t("passport.email.template.your-code-is")} ${code}</div>
              <h4>${this.i18n.t("passport.email.template.tip1")}</h4>
              <h4>${this.i18n.t("passport.email.template.tip2")}</h4><br>
              <a href="${this.i18n.t("passport.email.template.link.href")}">${this.i18n.t("passport.email.template.link.text")}</a>
            </div>`,
      });
      return code;
    } catch (error) {
      this.deleteCode(email);
      console.error(error);
      this.commonLogger.error("邮件发送失败!");
    }
  }
}
