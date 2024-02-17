"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SubscribeModule", {
    enumerable: true,
    get: function() {
        return SubscribeModule;
    }
});
const _common = require("@nestjs/common");
const _ccnailysixshared = require("cc.naily.six.shared");
const _subscribecontroller = require("./controllers/subscribe.controller");
const _admincontroller = require("./controllers/admin.controller");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let SubscribeModule = class SubscribeModule extends _ccnailysixshared.NailyContext {
};
SubscribeModule = _ts_decorate([
    (0, _common.Module)({
        controllers: [
            _subscribecontroller.SubscribeController,
            _admincontroller.AdminSubscribeController
        ]
    })
], SubscribeModule);
