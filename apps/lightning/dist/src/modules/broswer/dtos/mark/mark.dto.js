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
  GetBroswerMarkQueryDTO: function () {
    return GetBroswerMarkQueryDTO;
  },
  PostBrowserMarkBodyDTO: function () {
    return PostBrowserMarkBodyDTO;
  },
  PostBrowserMarkBodyListDTO: function () {
    return PostBrowserMarkBodyListDTO;
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
let GetBroswerMarkQueryDTO = class GetBroswerMarkQueryDTO {};
_ts_decorate(
  [(0, _classvalidator.IsNumberString)(), (0, _classvalidator.IsOptional)(), _ts_metadata("design:type", Number)],
  GetBroswerMarkQueryDTO.prototype,
  "take",
  void 0,
);
_ts_decorate(
  [(0, _classvalidator.IsNumberString)(), (0, _classvalidator.IsOptional)(), _ts_metadata("design:type", Number)],
  GetBroswerMarkQueryDTO.prototype,
  "skip",
  void 0,
);
let PostBrowserMarkBodyDTO = class PostBrowserMarkBodyDTO {};
_ts_decorate(
  [(0, _classvalidator.IsArray)(), (0, _classvalidator.IsNotEmpty)(), (0, _classvalidator.ValidateNested)(), _ts_metadata("design:type", Array)],
  PostBrowserMarkBodyDTO.prototype,
  "list",
  void 0,
);
let PostBrowserMarkBodyListDTO = class PostBrowserMarkBodyListDTO {};
_ts_decorate(
  [(0, _classvalidator.IsString)(), (0, _classvalidator.IsNotEmpty)(), _ts_metadata("design:type", String)],
  PostBrowserMarkBodyListDTO.prototype,
  "title",
  void 0,
);
_ts_decorate(
  [(0, _classvalidator.IsString)(), (0, _classvalidator.IsNotEmpty)(), _ts_metadata("design:type", String)],
  PostBrowserMarkBodyListDTO.prototype,
  "icon",
  void 0,
);
_ts_decorate(
  [(0, _classvalidator.IsString)(), (0, _classvalidator.IsNotEmpty)(), _ts_metadata("design:type", String)],
  PostBrowserMarkBodyListDTO.prototype,
  "color",
  void 0,
);
_ts_decorate(
  [(0, _classvalidator.IsString)(), (0, _classvalidator.IsNotEmpty)(), _ts_metadata("design:type", String)],
  PostBrowserMarkBodyListDTO.prototype,
  "link",
  void 0,
);
_ts_decorate(
  [(0, _classvalidator.IsInt)(), (0, _classvalidator.IsNumber)(), (0, _classvalidator.IsNotEmpty)(), _ts_metadata("design:type", Number)],
  PostBrowserMarkBodyListDTO.prototype,
  "index",
  void 0,
);
