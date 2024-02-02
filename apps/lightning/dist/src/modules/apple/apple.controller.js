"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true,
});
Object.defineProperty(exports, "AppleController", {
  enumerable: true,
  get: function () {
    return AppleController;
  },
});
const _common = require("@nestjs/common");
const _appleservice = require("./apple.service");
const _ccnailysixauth = require("cc.naily.six.auth");
const _ccnailysixshared = require("cc.naily.six.shared");
const _client = require("@prisma/client");
const _appledto = require("./dtos/apple.dto");
const _nestjsi18n = require("nestjs-i18n");
const _swagger = require("@nestjs/swagger");
function _ts_decorate(decorators, target, key, desc) {
  var c = arguments.length,
    r = c < 3 ? target : desc === null ? (desc = Object.getOwnPropertyDescriptor(target, key)) : desc,
    d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if ((d = decorators[i])) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param(paramIndex, decorator) {
  return function (target, key) {
    decorator(target, key, paramIndex);
  };
}
let AppleController = class AppleController {
  /**
   * 获取苹果订阅状态
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/02
   * @param {UserEntity} user
   * @param {GetSubscribeAppleUserQueryDTO} { isSandbox }
   * @return {*}  {Promise<unknown>}
   * @memberof AppleController
   */ getUserStatus(user, { isSandbox }) {
    if (typeof isSandbox === "string") isSandbox === "true" ? true : false;
    return this.appleService.getAllSubscriptionStatuses(user.userID, isSandbox);
  }
  /**
   * 检查苹果订阅状态
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/02
   * @param {GetSubscribeAppleCheckBodyDTO} body
   * @return {*}  {Promise<unknown>}
   * @memberof AppleController
   */ async checkPay(body) {
    if (body.isSandbox === "true") return 1046;
    try {
      const data = await this.appleService.checkTransactionID(body.bundleId, body.transactionId, false);
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
   */ linkTransactionID(user, { transactionId }) {
    return this.appleService.linkTransactionID(user.userID, transactionId);
  }
  constructor(appleService, i18n, commonLogger) {
    this.appleService = appleService;
    this.i18n = i18n;
    this.commonLogger = commonLogger;
  }
};
_ts_decorate(
  [
    (0, _ccnailysixauth.Auth)(),
    (0, _common.Get)("user"),
    (0, _common.UseInterceptors)(_ccnailysixshared.ResInterceptor),
    _ts_param(0, (0, _ccnailysixauth.User)()),
    _ts_param(1, (0, _common.Query)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
      typeof _client.User === "undefined" ? Object : _client.User,
      typeof _appledto.GetSubscribeAppleUserQueryDTO === "undefined" ? Object : _appledto.GetSubscribeAppleUserQueryDTO,
    ]),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise),
  ],
  AppleController.prototype,
  "getUserStatus",
  null,
);
_ts_decorate(
  [
    (0, _common.Post)("check"),
    (0, _common.UseInterceptors)(_ccnailysixshared.ResInterceptor),
    (0, _swagger.ApiBody)({
      type: _appledto.GetSubscribeAppleCheckBodyDTO,
    }),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
      typeof _appledto.GetSubscribeAppleCheckBodyDTO === "undefined" ? Object : _appledto.GetSubscribeAppleCheckBodyDTO,
    ]),
    _ts_metadata("design:returntype", Promise),
  ],
  AppleController.prototype,
  "checkPay",
  null,
);
_ts_decorate(
  [
    (0, _ccnailysixauth.Auth)(),
    (0, _common.Post)("user/link"),
    (0, _common.UseInterceptors)(_ccnailysixshared.ResInterceptor),
    _ts_param(0, (0, _ccnailysixauth.User)()),
    _ts_param(1, (0, _common.Query)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
      typeof _client.User === "undefined" ? Object : _client.User,
      typeof _appledto.GetSubscribeAppleUserStatusDTO === "undefined" ? Object : _appledto.GetSubscribeAppleUserStatusDTO,
    ]),
    _ts_metadata("design:returntype", typeof Promise === "undefined" ? Object : Promise),
  ],
  AppleController.prototype,
  "linkTransactionID",
  null,
);
AppleController = _ts_decorate(
  [
    (0, _swagger.ApiTags)("苹果订阅"),
    (0, _common.Controller)("subscribe/apple"),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
      typeof _appleservice.AppleService === "undefined" ? Object : _appleservice.AppleService,
      typeof _nestjsi18n.I18nService === "undefined" ? Object : _nestjsi18n.I18nService,
      typeof _ccnailysixshared.CommonLogger === "undefined" ? Object : _ccnailysixshared.CommonLogger,
    ]),
  ],
  AppleController,
);
