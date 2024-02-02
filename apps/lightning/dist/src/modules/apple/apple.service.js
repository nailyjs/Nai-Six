"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true,
});
Object.defineProperty(exports, "AppleService", {
  enumerable: true,
  get: function () {
    return AppleService;
  },
});
const _appstoreserverlibrary = require("@apple/app-store-server-library");
const _common = require("@nestjs/common");
const _ccnailysixdatabase = require("cc.naily.six.database");
const _ccnailysixshared = require("cc.naily.six.shared");
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
let AppleService = class AppleService {
  getAllSubscriptionStatuses(userID, isSandBox) {
    if (isSandBox) {
      return this.prismaService.userAppStoreSubscribe.findMany({
        where: {
          originalTransactionID: "2000000514154247",
        },
      });
    }
    return this.prismaService.userAppStoreSubscribe.findMany({
      where: {
        user: {
          userID,
        },
      },
    });
  }
  async linkTransactionID(userID, originalTransactionID) {
    const hasTransactionID = await this.prismaService.userAppStoreSubscribe.findFirst({
      where: {
        originalTransactionID,
      },
    });
    if (hasTransactionID) return 1000;
    return this.prismaService.userAppStoreSubscribe.create({
      data: {
        user: {
          connect: {
            userID,
          },
        },
        originalTransactionID,
      },
    });
  }
  checkTransactionID(bundleId, transactionId, isSandbox = false) {
    return this.commonAppStoreService
      .createClient(bundleId, isSandbox ? _appstoreserverlibrary.Environment.SANDBOX : undefined)
      .getAllSubscriptionStatuses(transactionId, [_appstoreserverlibrary.Status.ACTIVE, _appstoreserverlibrary.Status.BILLING_GRACE_PERIOD]);
  }
  constructor(prismaService, commonAppStoreService) {
    this.prismaService = prismaService;
    this.commonAppStoreService = commonAppStoreService;
  }
};
AppleService = _ts_decorate(
  [
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
      typeof _ccnailysixdatabase.PrismaService === "undefined" ? Object : _ccnailysixdatabase.PrismaService,
      typeof _ccnailysixshared.CommonAppStoreService === "undefined" ? Object : _ccnailysixshared.CommonAppStoreService,
    ]),
  ],
  AppleService,
);
