import { Body, Controller, Get, Post, Query, UseFilters, UseInterceptors } from "@nestjs/common";
import { AppleService } from "./apple.service";
import { Auth, User } from "cc.naily.six.auth";
import { CommonAppStoreService, CommonLogger, ResInterceptor } from "cc.naily.six.shared";
import { User as UserEntity } from "@prisma/client";
import { GetSubscribeAppleCheckBodyDTO, GetSubscribeAppleUserQueryDTO, GetSubscribeAppleUserStatusDTO } from "./dtos/apple.dto";
import { I18nService } from "nestjs-i18n";
import { I18nTranslations } from "cc.naily.six.generated";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { Environment } from "@apple/app-store-server-library";
import { CheckPayFilter } from "./errors/checkPay.filter";

@ApiTags("苹果订阅")
@Controller("subscribe/apple")
export class AppleController {
  constructor(
    private readonly appleService: AppleService,
    private readonly i18n: I18nService<I18nTranslations>,
    private readonly commonLogger: CommonLogger,
    private readonly commonAppStoreService: CommonAppStoreService,
  ) {}

  /**
   * 获取苹果订阅状态
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/02
   * @param {UserEntity} user
   * @param {GetSubscribeAppleUserQueryDTO} { isSandbox }
   * @return {Promise<unknown>}
   * @memberof AppleController
   */
  @Auth()
  @Get("user")
  @UseInterceptors(ResInterceptor)
  // @UseGuards(RandomFailOneGuard)
  public getUserStatus(@User() user: UserEntity, @Query() { isSandbox }: GetSubscribeAppleUserQueryDTO): Promise<unknown> {
    let isSandboxLower: boolean;
    if (typeof isSandbox === "string") {
      if (isSandbox === "true") isSandboxLower = true;
      if (isSandbox === "false") isSandboxLower = false;
    }
    return this.appleService.getAllSubscriptionStatuses(user.userID, isSandboxLower);
  }

  /**
   * 检查苹果订阅状态
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/02
   * @param {GetSubscribeAppleCheckBodyDTO} body
   * @return {*}  {Promise<unknown>}
   * @memberof AppleController
   */
  @Post("check")
  @UseFilters(CheckPayFilter)
  @UseInterceptors(ResInterceptor)
  @ApiBody({ type: GetSubscribeAppleCheckBodyDTO })
  public async checkPay(@Body() body: GetSubscribeAppleCheckBodyDTO): Promise<unknown> {
    if (body.isSandbox === "true") return 1046;
    const { isMock } = this.commonAppStoreService.getConfiguration(body.p8Key, body.isSandbox ? Environment.SANDBOX : undefined);
    if (body.transactionId && body.bundleId && isMock) {
      return {
        code: 1046,
        message: this.i18n.t("global.errorCode.1046"),
        data: {},
      };
    }
    try {
      const data = await this.appleService.checkTransactionID(body.bundleId, body.transactionId, false, body.p8Key);
      if (data.data.length === 0) {
        return {
          code: 1044,
          message: this.i18n.t("global.errorCode.1044"),
          data,
        };
      } else {
        return {
          code: 1046,
          message: this.i18n.t("global.errorCode.1046"),
          data,
        };
      }
    } catch (error) {
      this.commonLogger.setContext(AppleController.name);
      this.commonLogger.error("苹果订阅检查失败！！！");
      console.error(error);
      if (error && error.apiError && error.apiError === 4040010) {
        return {
          code: 1053,
          message: this.i18n.t("global.errorCode.1053"),
          data: error,
        };
      }
      return {
        code: 1045,
        message: this.i18n.t("global.errorCode.1045"),
        data: error,
      };
    }
  }

  /**
   * 链接TransactionID到苹果订阅
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/02
   * @param {UserEntity} user
   * @param {GetSubscribeAppleUserStatusDTO} { transactionId }
   * @return {*}  {Promise<unknown>}
   * @memberof AppleController
   */
  @Auth()
  @Post("user/link")
  @UseInterceptors(ResInterceptor)
  public linkTransactionID(@User() user: UserEntity, @Query() { transactionId }: GetSubscribeAppleUserStatusDTO): Promise<unknown> {
    return this.appleService.linkTransactionID(user.userID, transactionId);
  }
}
