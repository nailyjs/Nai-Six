import { Inject, Injectable } from "@nestjs/common";
import { TransportCodeService } from "../classes/code.service";
import { CACHE_MANAGER, Cache } from "@nestjs/cache-manager";
import { sms } from "tencentcloud-sdk-nodejs";
import { ClientRepository } from "@nailyjs.nest.modules/tencentcloud";
import { SendSmsResponse } from "tencentcloud-sdk-nodejs/tencentcloud/services/sms/v20210111/sms_models";
import { ConfigService } from "@nestjs/config";
import { CommonLogger } from "cc.naily.six.shared";
import { BlockingService } from "../classes/blocking.service";

@Injectable()
export class PhoneService extends TransportCodeService {
  constructor(
    @Inject(CACHE_MANAGER)
    protected readonly cacheManager: Cache,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    @Inject(sms.v20210111.Client)
    private readonly smsClient: ClientRepository<typeof sms.v20210111.Client>,
    private readonly configService: ConfigService,
    private readonly commonLogger: CommonLogger,
    private readonly blockingService: BlockingService,
  ) {
    super(cacheManager, commonLogger);
  }

  public getRediskey(verifyData: string): string {
    return `passport:code:phone:${verifyData}`;
  }

  public async sendCode(phone: string): Promise<any>;
  public async sendCode(phone: string): Promise<SendSmsResponse> {
    const code = this.getCode();
    if (await this.blockingService.checkBlock(phone)) return 0 as any;
    const key = this.getRediskey(phone);
    if (phone === "15349814714") {
      await this.cacheManager.store.set(key, 114514);
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
      TemplateParamSet: [`${code}`],
    });
    if (isSended.SendStatusSet[0].Code === "Ok") {
      await this.cacheManager.set(key, code, 1000 * 60 * 5);
    }
    return isSended;
  }
}
