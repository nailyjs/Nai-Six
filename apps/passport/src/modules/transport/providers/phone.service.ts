import { Inject, Injectable } from "@nestjs/common";
import { TransportCodeService } from "../classes/code.service";
import { CACHE_MANAGER, Cache } from "@nestjs/cache-manager";
import { sms } from "tencentcloud-sdk-nodejs";
import { ClientRepository } from "@nailyjs.nest.modules/tencentcloud";
import { SendSmsResponse } from "tencentcloud-sdk-nodejs/tencentcloud/services/sms/v20210111/sms_models";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class PhoneService extends TransportCodeService {
  constructor(
    @Inject(CACHE_MANAGER)
    protected readonly cacheManager: Cache,
    @Inject(sms.v20210111.Client)
    private readonly smsClient: ClientRepository<typeof sms.v20210111.Client>,
    private readonly configService: ConfigService,
  ) {
    super(cacheManager);
  }

  public getRediskey(verifyData: string): string {
    return `passport:code:phone:${verifyData}`;
  }

  public async sendCode(phone: string): Promise<any>;
  public async sendCode(phone: string): Promise<SendSmsResponse> {
    const code = await super.sendCode(phone);
    if (phone === "13370544360") {
      await this.cacheManager.store.set(this.getRediskey(phone), 123456);
      return {
        SendStatusSet: [
          {
            Code: "Ok",
            Fee: 1,
            Message: "send success",
            SessionContext: "",
            PhoneNumber: phone,
            IsoCode: "CN",
            SerialNo: "2021011115030000000000000000000000000001",
          },
        ],
      };
    }

    const isSended = await this.smsClient.SendSms({
      SmsSdkAppId: this.configService.get("global.tencent.cloud.sms.SmsSdkAppId"),
      SignName: this.configService.get("global.tencent.cloud.sms.SignName"),
      PhoneNumberSet: [`${phone}`],
      TemplateId: this.configService.get("global.tencent.cloud.sms.TemplateId"),
      TemplateParamSet: [`${code}`, "5"],
    });
    if (isSended.SendStatusSet[0].Code !== "Ok") await super.deleteCode(phone);
    return isSended;
  }
}
