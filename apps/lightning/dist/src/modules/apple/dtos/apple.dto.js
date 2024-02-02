"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true,
});
function _export(target, all) {
  for (var name in all)
    Object.defineProperty(target, name, {
      enumerable: true,
      get: all[name],
    });
}
_export(exports, {
  GetSubscribeAppleCheckBodyDTO: function () {
    return GetSubscribeAppleCheckBodyDTO;
  },
  GetSubscribeAppleUserQueryDTO: function () {
    return GetSubscribeAppleUserQueryDTO;
  },
  GetSubscribeAppleUserStatusDTO: function () {
    return GetSubscribeAppleUserStatusDTO;
  },
});
const _swagger = require("@nestjs/swagger");
const _classvalidator = require("class-validator");
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
let GetSubscribeAppleCheckBodyDTO = class GetSubscribeAppleCheckBodyDTO {
  constructor() {
    /**
     * 是否是沙盒环境 默认false
     *
     * @author Zero <gczgroup@qq.com>
     * @date 2024/01/31
     * @type {string}
     * @memberof GetSubscribeAppleCheckBodyDTO
     */ this.isSandbox = "false";
  }
};
_ts_decorate(
  [(0, _classvalidator.IsString)(), (0, _classvalidator.IsNotEmpty)(), _ts_metadata("design:type", String)],
  GetSubscribeAppleCheckBodyDTO.prototype,
  "bundleId",
  void 0,
);
_ts_decorate(
  [(0, _classvalidator.IsString)(), (0, _classvalidator.IsNotEmpty)(), _ts_metadata("design:type", String)],
  GetSubscribeAppleCheckBodyDTO.prototype,
  "transactionId",
  void 0,
);
_ts_decorate(
  [
    (0, _classvalidator.IsBooleanString)(),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _swagger.ApiProperty)({
      type: "string",
      default: "false",
    }),
    _ts_metadata("design:type", String),
  ],
  GetSubscribeAppleCheckBodyDTO.prototype,
  "isSandbox",
  void 0,
);
let GetSubscribeAppleUserStatusDTO = class GetSubscribeAppleUserStatusDTO {};
_ts_decorate(
  [(0, _classvalidator.IsString)(), (0, _classvalidator.IsNotEmpty)(), _ts_metadata("design:type", String)],
  GetSubscribeAppleUserStatusDTO.prototype,
  "transactionId",
  void 0,
);
let GetSubscribeAppleUserQueryDTO = class GetSubscribeAppleUserQueryDTO {
  constructor() {
    /**
     * 是否沙盒环境
     *
     * @author Zero <gczgroup@qq.com>
     * @date 2024/02/01
     * @type {boolean}
     * @memberof GetSubscribeAppleUserQueryDTO
     */ this.isSandbox = false;
  }
};
_ts_decorate(
  [(0, _classvalidator.IsBooleanString)(), (0, _classvalidator.IsString)(), (0, _classvalidator.IsOptional)(), _ts_metadata("design:type", Boolean)],
  GetSubscribeAppleUserQueryDTO.prototype,
  "isSandbox",
  void 0,
);
