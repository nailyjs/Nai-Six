import { Module } from "@nestjs/common";
import { TencentCloudModule } from "@nailyjs.nest.modules/tencentcloud";
import { sms } from "tencentcloud-sdk-nodejs";
import { ConfigService } from "@nestjs/config";

@Module({})
export class CommonTencentCloudModule {
  public static forRoot() {
    return TencentCloudModule.registerAsync({
      global: true,
      clients: [
        {
          client: sms.v20210111.Client,
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => {
            const config = configService.get("global.tencent.cloud.sms") || {};
            if (!config || !config.credential)
              config.credential = {
                region: "",
                secretId: "",
                secretKey: "",
              };
            return {
              ...config,
            };
          },
        },
      ],
    });
  }
}
