"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SubscribeController", {
    enumerable: true,
    get: function() {
        return SubscribeController;
    }
});
const _prisma = require("@nailyjs.nest.modules/prisma");
const _common = require("@nestjs/common");
const _swagger = require("@nestjs/swagger");
const _ccnailysixauth = require("cc.naily.six.auth");
const _ccnailysixshared = require("cc.naily.six.shared");
const _subscribedto = require("../dtos/subscribe.dto");
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
let SubscribeController = class SubscribeController {
    /**
   * 获取用户GPT订阅订单列表
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/17
   * @memberof SubscribeController
   */ getUserSubscribeStatus(query, user) {
        if (!query.orderCreatedAt) query.orderCreatedAt = "desc";
        return this.prismaService.gPTSubscribe.findMany({
            where: {
                userID: user.userID
            },
            orderBy: {
                createdAt: query.orderCreatedAt
            }
        });
    }
    /**
   * 获取GPT订阅套餐列表
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/17
   * @memberof SubscribeController
   */ getSubscribePackage() {
        return this.prismaService.gPTSubscribePackage.findMany();
    }
    /**
   * 订阅GPT
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/17
   * @param {JwtLoginPayload} user
   * @memberof SubscribeController
   */ async subscribe(body, user) {
        const packageInstance = await this.prismaService.gPTSubscribePackage.findUnique({
            where: {
                packageID: body.packageID
            }
        });
        if (!packageInstance) throw new _common.BadRequestException(1084);
        return this.prismaService.gPTSubscribe.create({
            data: {
                userID: user.userID,
                days: packageInstance.days,
                packageID: packageInstance.packageID
            }
        });
    }
    /**
   * 获取用户GPT订阅天数
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/17
   * @param {JwtLoginPayload} user
   * @memberof SubscribeController
   */ async getSubscribeStatus(user) {
        const allSubscribe = await this.prismaService.gPTSubscribe.findMany({
            where: {
                userID: user.userID
            }
        });
        const totalDays = allSubscribe.map((item)=>{
            if (item.createdAt.getTime() + item.days * 24 * 60 * 60 * 1000 > Date.now()) {
                return item.days;
            } else {
                return 0;
            }
        });
        return {
            totalDays: totalDays.reduce((prev, curr)=>prev + curr, 0)
        };
    }
    constructor(prismaService){
        this.prismaService = prismaService;
    }
};
_ts_decorate([
    (0, _common.Get)(),
    (0, _ccnailysixauth.Auth)(),
    (0, _common.UseInterceptors)(_ccnailysixshared.ResInterceptor),
    _ts_param(0, (0, _common.Query)()),
    _ts_param(1, (0, _ccnailysixauth.User)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _subscribedto.GetGPTSubscribeQueryDTO === "undefined" ? Object : _subscribedto.GetGPTSubscribeQueryDTO,
        typeof _ccnailysixauth.JwtLoginPayload === "undefined" ? Object : _ccnailysixauth.JwtLoginPayload
    ]),
    _ts_metadata("design:returntype", void 0)
], SubscribeController.prototype, "getUserSubscribeStatus", null);
_ts_decorate([
    (0, _common.Get)("package"),
    (0, _common.UseInterceptors)(_ccnailysixshared.ResInterceptor),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", void 0)
], SubscribeController.prototype, "getSubscribePackage", null);
_ts_decorate([
    (0, _common.Post)(),
    (0, _ccnailysixauth.Auth)(),
    (0, _common.UseInterceptors)(_ccnailysixshared.ResInterceptor),
    _ts_param(0, (0, _common.Body)()),
    _ts_param(1, (0, _ccnailysixauth.User)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _subscribedto.PostGPTSubscribeBodyDTO === "undefined" ? Object : _subscribedto.PostGPTSubscribeBodyDTO,
        typeof _ccnailysixauth.JwtLoginPayload === "undefined" ? Object : _ccnailysixauth.JwtLoginPayload
    ]),
    _ts_metadata("design:returntype", Promise)
], SubscribeController.prototype, "subscribe", null);
_ts_decorate([
    (0, _ccnailysixauth.Auth)(),
    (0, _common.Get)("status"),
    (0, _common.UseInterceptors)(_ccnailysixshared.ResInterceptor),
    _ts_param(0, (0, _ccnailysixauth.User)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _ccnailysixauth.JwtLoginPayload === "undefined" ? Object : _ccnailysixauth.JwtLoginPayload
    ]),
    _ts_metadata("design:returntype", Promise)
], SubscribeController.prototype, "getSubscribeStatus", null);
SubscribeController = _ts_decorate([
    (0, _swagger.ApiTags)("订阅"),
    (0, _common.Controller)("gpt/subscribe"),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _prisma.PrismaService === "undefined" ? Object : _prisma.PrismaService
    ])
], SubscribeController);
