"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AdminSubscribeController", {
    enumerable: true,
    get: function() {
        return AdminSubscribeController;
    }
});
const _prisma = require("@nailyjs.nest.modules/prisma");
const _common = require("@nestjs/common");
const _swagger = require("@nestjs/swagger");
const _subscribedto = require("../dtos/subscribe.dto");
const _ccnailysixshared = require("cc.naily.six.shared");
const _ccnailysixauth = require("cc.naily.six.auth");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
let AdminSubscribeController = class AdminSubscribeController {
    /**
   * 创建GPT订阅套餐
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/17
   * @param {PostGPTSubscribeAdminBodyDTO} { name, description, price, days }
   * @memberof AdminSubscribeController
   */ createSubscribePackage({ name, description, price, days }) {
        return this.prismaService.gPTSubscribePackage.create({
            data: {
                name,
                description,
                price,
                days
            }
        });
    }
    /**
   * 删除GPT订阅套餐
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/17
   * @memberof AdminSubscribeController
   */ deleteSubscribePackage({ packageID }) {
        return this.prismaService.gPTSubscribePackage.deleteMany({
            where: {
                packageID
            }
        });
    }
    constructor(prismaService){
        this.prismaService = prismaService;
    }
};
_ts_decorate([
    (0, _common.Post)(),
    (0, _ccnailysixauth.Auth)(),
    (0, _ccnailysixauth.MustPermissions)("Must_Admin", "Must_GPT_Admin"),
    (0, _common.UseInterceptors)(_ccnailysixshared.ResInterceptor),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _subscribedto.PostGPTSubscribeAdminBodyDTO === "undefined" ? Object : _subscribedto.PostGPTSubscribeAdminBodyDTO
    ]),
    _ts_metadata("design:returntype", void 0)
], AdminSubscribeController.prototype, "createSubscribePackage", null);
_ts_decorate([
    (0, _common.Delete)(),
    (0, _ccnailysixauth.Auth)(),
    (0, _common.UseInterceptors)(_ccnailysixshared.ResInterceptor),
    (0, _ccnailysixauth.MustPermissions)("Must_Admin", "Must_GPT_Admin"),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _subscribedto.PostGPTSubscribeBodyDTO === "undefined" ? Object : _subscribedto.PostGPTSubscribeBodyDTO
    ]),
    _ts_metadata("design:returntype", void 0)
], AdminSubscribeController.prototype, "deleteSubscribePackage", null);
AdminSubscribeController = _ts_decorate([
    (0, _swagger.ApiTags)("管理套餐 仅管理员"),
    (0, _common.Controller)("gpt/subscribe/admin"),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _prisma.PrismaService === "undefined" ? Object : _prisma.PrismaService
    ])
], AdminSubscribeController);
