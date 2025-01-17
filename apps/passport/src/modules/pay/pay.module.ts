import { DynamicModule, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NailyContext } from "cc.naily.six.shared";
import Joi from "joi";
import { PayTypeArray } from "./interfaces/interface.impl";
import { PayService } from "./providers/pay.service";
import { PayController } from "./controllers/pay.controller";
import { XunhupayService } from "./providers/platforms/xunhupay.service";
import { UserReceiptService } from "./providers/receipt.service";
import { ReceiptController } from "./controllers/receipt.controller";
import { PayDeveloperController } from "./controllers/developer.controller";

@Module({})
export class PayModule extends NailyContext {
  private static validate(configObject: Record<string, any>) {
    const XunhupaySchema = Joi.object({
      name: Joi.string().required(),
      appid: Joi.string().required(),
      appsecret: Joi.string().required(),
      notify_url: Joi.string().required(),
      return_url: Joi.string().required(),
      callback_url: Joi.string().required().description("支付成功后跳转地址"),
      gateway: Joi.string(),
    }).strict(false);

    const Schema = Joi.object({
      enabled: Joi.array()
        .items(Joi.string().valid(...PayTypeArray))
        .default([])
        .required(),
      Xunhupay_Wechat: Joi.alternatives().try(
        XunhupaySchema,
        Joi.object({
          enabled: Joi.number(),
          channel: Joi.array().items(XunhupaySchema),
        }),
      ),
      Xunhupay_Alipay: XunhupaySchema,
      Wechat_Official: Joi.object().strict(false),
    });
    const { error } = Schema.validate(configObject);
    if (error) throw error;
  }

  public static register(): DynamicModule {
    const configService = new ConfigService(super.ymlConfigCache);
    const pay = configService.get("global.pay");
    this.validate(pay);

    return {
      module: this,
      global: true,
      controllers: [PayController, ReceiptController, PayDeveloperController],
      providers: [PayService, XunhupayService, UserReceiptService],
    };
  }
}
