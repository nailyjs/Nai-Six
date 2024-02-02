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
  GetBrowserTrackListQueryDTO: function () {
    return GetBrowserTrackListQueryDTO;
  },
  PostBrowserTrackBodyDTO: function () {
    return PostBrowserTrackBodyDTO;
  },
});
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
let GetBrowserTrackListQueryDTO = class GetBrowserTrackListQueryDTO {
  constructor() {
    /**
     * 每页数量
     *
     * @author Zero <gczgroup@qq.com>
     * @date 2024/01/28
     * @type {number}
     * @memberof GetBrowserTrackListQueryDTO
     */ this.take = 10;
    /**
     * 跳过数量
     *
     * @author Zero <gczgroup@qq.com>
     * @date 2024/01/28
     * @type {number}
     * @memberof GetBrowserTrackListQueryDTO
     */ this.skip = 0;
  }
};
_ts_decorate(
  [(0, _classvalidator.IsOptional)(), (0, _classvalidator.IsNumberString)(), _ts_metadata("design:type", Number)],
  GetBrowserTrackListQueryDTO.prototype,
  "take",
  void 0,
);
_ts_decorate(
  [(0, _classvalidator.IsOptional)(), (0, _classvalidator.IsNumberString)(), _ts_metadata("design:type", Number)],
  GetBrowserTrackListQueryDTO.prototype,
  "skip",
  void 0,
);
let PostBrowserTrackBodyDTO = class PostBrowserTrackBodyDTO {};
_ts_decorate(
  [(0, _classvalidator.IsOptional)(), _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)],
  PostBrowserTrackBodyDTO.prototype,
  "updatedAt",
  void 0,
);
_ts_decorate(
  [(0, _classvalidator.IsString)(), (0, _classvalidator.IsNotEmpty)(), _ts_metadata("design:type", String)],
  PostBrowserTrackBodyDTO.prototype,
  "webPageTitle",
  void 0,
);
_ts_decorate(
  [(0, _classvalidator.IsString)(), (0, _classvalidator.IsNotEmpty)(), _ts_metadata("design:type", String)],
  PostBrowserTrackBodyDTO.prototype,
  "webPageLink",
  void 0,
);
