"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true,
});
Object.defineProperty(exports, "BroswerTrackController", {
  enumerable: true,
  get: function () {
    return BroswerTrackController;
  },
});
const _common = require("@nestjs/common");
const _swagger = require("@nestjs/swagger");
const _client = require("@prisma/client");
const _ccnailysixauth = require("cc.naily.six.auth");
const _ccnailysixdatabase = require("cc.naily.six.database");
const _ccnailysixshared = require("cc.naily.six.shared");
const _trackdto = require("../dtos/track/track.dto");
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
let BroswerTrackController = class BroswerTrackController {
  /**
   * 获取浏览历史记录
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/02
   * @param {GetBrowserTrackListQueryDTO} query
   * @param {UserEntity} user
   * @return {*}  {Promise<unknown>}
   * @memberof BroswerTrackController
   */ async getList(query, user) {
    if (!query.take) query.take = 10;
    if (!query.skip) query.skip = 0;
    return this.prismaService.browserTrack.findMany({
      take: query.take,
      skip: query.skip,
      where: {
        user: {
          userID: user.userID,
        },
      },
    });
  }
  /**
   * 创建浏览历史记录
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/02
   * @param {UserEntity} user
   * @param {PostBrowserTrackBodyDTO} body
   * @return {*}
   * @memberof BroswerTrackController
   */ create(user, body) {
    return this.prismaService.browserTrack.create({
      data: {
        webPageTitle: body.webPageTitle,
        webPageLink: body.webPageLink,
        updatedAt: body.updatedAt,
        user: {
          connect: {
            userID: user.userID,
          },
        },
      },
    });
  }
  /**
   * 删除浏览历史记录
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/02
   * @param {UserEntity} user
   * @param {string} browserTrackID
   * @memberof BroswerTrackController
   */ async delete(user, browserTrackID) {
    return this.prismaService.browserTrack.delete({
      where: {
        browserTrackID,
        user: {
          userID: user.userID,
        },
      },
    });
  }
  /**
   * 删除所有浏览历史记录
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/02
   * @param {UserEntity} user
   * @return {*}
   * @memberof BroswerTrackController
   */ async deleteAll(user) {
    return this.prismaService.browserTrack.deleteMany({
      where: {
        user: {
          userID: user.userID,
        },
      },
    });
  }
  constructor(prismaService) {
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
    _ts_metadata("design:paramtypes", [
      typeof _trackdto.GetBrowserTrackListQueryDTO === "undefined" ? Object : _trackdto.GetBrowserTrackListQueryDTO,
      typeof _client.User === "undefined" ? Object : _client.User,
    ]),
    _ts_metadata("design:returntype", Promise),
  ],
  BroswerTrackController.prototype,
  "getList",
  null,
);
_ts_decorate(
  [
    (0, _common.Post)(),
    (0, _ccnailysixauth.Auth)(),
    (0, _common.UseInterceptors)(_ccnailysixshared.ResInterceptor),
    _ts_param(0, (0, _ccnailysixauth.User)()),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
      typeof _client.User === "undefined" ? Object : _client.User,
      typeof _trackdto.PostBrowserTrackBodyDTO === "undefined" ? Object : _trackdto.PostBrowserTrackBodyDTO,
    ]),
    _ts_metadata("design:returntype", void 0),
  ],
  BroswerTrackController.prototype,
  "create",
  null,
);
_ts_decorate(
  [
    (0, _ccnailysixauth.Auth)(),
    (0, _common.Delete)(),
    (0, _common.UseInterceptors)(_ccnailysixshared.ResInterceptor),
    _ts_param(0, (0, _ccnailysixauth.User)()),
    _ts_param(1, (0, _common.Query)("browserTrackID")),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [typeof _client.User === "undefined" ? Object : _client.User, String]),
    _ts_metadata("design:returntype", Promise),
  ],
  BroswerTrackController.prototype,
  "delete",
  null,
);
_ts_decorate(
  [
    (0, _ccnailysixauth.Auth)(),
    (0, _common.Delete)("all"),
    (0, _common.UseInterceptors)(_ccnailysixshared.ResInterceptor),
    _ts_param(0, (0, _ccnailysixauth.User)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [typeof _client.User === "undefined" ? Object : _client.User]),
    _ts_metadata("design:returntype", Promise),
  ],
  BroswerTrackController.prototype,
  "deleteAll",
  null,
);
BroswerTrackController = _ts_decorate(
  [
    (0, _swagger.ApiTags)("浏览历史记录"),
    (0, _common.Controller)("broswer/track"),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [typeof _ccnailysixdatabase.PrismaService === "undefined" ? Object : _ccnailysixdatabase.PrismaService]),
  ],
  BroswerTrackController,
);
