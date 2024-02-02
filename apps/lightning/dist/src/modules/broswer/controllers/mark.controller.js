"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true,
});
Object.defineProperty(exports, "BrowserMarkController", {
  enumerable: true,
  get: function () {
    return BrowserMarkController;
  },
});
const _common = require("@nestjs/common");
const _markservice = require("../providers/mark.service");
const _swagger = require("@nestjs/swagger");
const _ccnailysixauth = require("cc.naily.six.auth");
const _ccnailysixshared = require("cc.naily.six.shared");
const _ccnailysixdatabase = require("cc.naily.six.database");
const _client = require("@prisma/client");
const _markdto = require("../dtos/mark/mark.dto");
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
let BrowserMarkController = class BrowserMarkController {
  /**
   * 获取书签列表
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/02
   * @return {*}
   * @memberof BrowserMarkController
   */ async getMarks(query, user) {
    if (!query.take) query.take = 10;
    if (!query.skip) query.skip = 0;
    const canFind = this.markService.canFind(user.userID);
    if (!canFind) {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(this.getMarks(query, user));
        }, 100);
      });
    }
    return this.prismaService.browserBookMark.findMany({
      take: query.take,
      skip: query.skip,
      where: {
        user: {
          userID: user.userID,
        },
      },
    });
  }
  async createMark(user, body) {
    if (!this.markService.canFind(user.userID)) throw new _common.BadRequestException(1054);
    this.markService.addUpdating(user.userID);
    await this.prismaService.browserBookMark.deleteMany({
      where: {
        user: {
          userID: user.userID,
        },
      },
    });
    await this.prismaService.browserBookMark.createMany({
      data: body.list.map((item) => {
        return {
          title: item.title,
          icon: item.icon,
          link: item.link,
          color: item.color,
          index: item.index,
          userID: user.userID,
        };
      }),
    });
    this.markService.removeUpdating(user.userID);
    return 1000;
  }
  constructor(markService, prismaService) {
    this.markService = markService;
    this.prismaService = prismaService;
  }
};
_ts_decorate(
  [
    (0, _common.Get)(),
    (0, _ccnailysixauth.Auth)(),
    (0, _common.UseInterceptors)(_ccnailysixshared.ResInterceptor),
    _ts_param(0, (0, _common.Query)()),
    _ts_param(1, (0, _ccnailysixauth.User)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [void 0, typeof _client.User === "undefined" ? Object : _client.User]),
    _ts_metadata("design:returntype", Promise),
  ],
  BrowserMarkController.prototype,
  "getMarks",
  null,
);
_ts_decorate(
  [
    (0, _ccnailysixauth.Auth)(),
    (0, _common.Post)("all"),
    (0, _common.UseInterceptors)(_ccnailysixshared.ResInterceptor),
    _ts_param(0, (0, _ccnailysixauth.User)()),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
      typeof _client.User === "undefined" ? Object : _client.User,
      typeof _markdto.PostBrowserMarkBodyDTO === "undefined" ? Object : _markdto.PostBrowserMarkBodyDTO,
    ]),
    _ts_metadata("design:returntype", Promise),
  ],
  BrowserMarkController.prototype,
  "createMark",
  null,
);
BrowserMarkController = _ts_decorate(
  [
    (0, _swagger.ApiTags)("浏览器书签"),
    (0, _common.Controller)("broswer/mark"),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
      typeof _markservice.BrowserMarkService === "undefined" ? Object : _markservice.BrowserMarkService,
      typeof _ccnailysixdatabase.PrismaService === "undefined" ? Object : _ccnailysixdatabase.PrismaService,
    ]),
  ],
  BrowserMarkController,
);
