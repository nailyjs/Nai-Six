"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true,
});
Object.defineProperty(exports, "BroswerModule", {
  enumerable: true,
  get: function () {
    return BroswerModule;
  },
});
const _common = require("@nestjs/common");
const _ccnailysixshared = require("cc.naily.six.shared");
const _markcontroller = require("./controllers/mark.controller");
const _markservice = require("./providers/mark.service");
const _trackcontroller = require("./controllers/track.controller");
function _ts_decorate(decorators, target, key, desc) {
  var c = arguments.length,
    r = c < 3 ? target : desc === null ? (desc = Object.getOwnPropertyDescriptor(target, key)) : desc,
    d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if ((d = decorators[i])) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let BroswerModule = class BroswerModule extends _ccnailysixshared.NailyContext {};
BroswerModule = _ts_decorate(
  [
    (0, _common.Module)({
      controllers: [_markcontroller.BrowserMarkController, _trackcontroller.BroswerTrackController],
      providers: [_markservice.BrowserMarkService],
    }),
  ],
  BroswerModule,
);
