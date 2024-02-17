"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    GetGPTSubscribeQueryDTO: function() {
        return GetGPTSubscribeQueryDTO;
    },
    PostGPTSubscribeAdminBodyDTO: function() {
        return PostGPTSubscribeAdminBodyDTO;
    },
    PostGPTSubscribeBodyDTO: function() {
        return PostGPTSubscribeBodyDTO;
    }
});
const _swagger = require("@nestjs/swagger");
const _ccnailysixshared = require("cc.naily.six.shared");
const _classvalidator = require("class-validator");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let GetGPTSubscribeQueryDTO = class GetGPTSubscribeQueryDTO {
};
_ts_decorate([
    (0, _classvalidator.IsIn)([
        "desc",
        "asc"
    ]),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    (0, _swagger.ApiProperty)({
        enum: [
            "desc",
            "asc"
        ],
        description: "订阅订单创建时间排序",
        default: "desc"
    }),
    _ts_metadata("design:type", String)
], GetGPTSubscribeQueryDTO.prototype, "orderCreatedAt", void 0);
let PostGPTSubscribeBodyDTO = class PostGPTSubscribeBodyDTO {
};
_ts_decorate([
    (0, _ccnailysixshared.IsObjectId)(),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _classvalidator.IsString)(),
    _ts_metadata("design:type", String)
], PostGPTSubscribeBodyDTO.prototype, "packageID", void 0);
let PostGPTSubscribeAdminBodyDTO = class PostGPTSubscribeAdminBodyDTO {
};
_ts_decorate([
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsNotEmpty)(),
    _ts_metadata("design:type", String)
], PostGPTSubscribeAdminBodyDTO.prototype, "name", void 0);
_ts_decorate([
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsNotEmpty)(),
    _ts_metadata("design:type", String)
], PostGPTSubscribeAdminBodyDTO.prototype, "description", void 0);
_ts_decorate([
    (0, _classvalidator.IsNumber)(),
    (0, _classvalidator.IsNotEmpty)(),
    _ts_metadata("design:type", Number)
], PostGPTSubscribeAdminBodyDTO.prototype, "price", void 0);
_ts_decorate([
    (0, _classvalidator.IsNumber)(),
    (0, _classvalidator.IsNotEmpty)(),
    _ts_metadata("design:type", Number)
], PostGPTSubscribeAdminBodyDTO.prototype, "days", void 0);
