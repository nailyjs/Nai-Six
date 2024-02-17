"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AppModule", {
    enumerable: true,
    get: function() {
        return AppModule;
    }
});
const _common = require("@nestjs/common");
const _appcontroller = require("./app.controller");
const _ccnailysixdatabase = require("cc.naily.six.database");
const _ccnailysixshared = require("cc.naily.six.shared");
const _ccnailysixauth = require("cc.naily.six.auth");
const _core = require("@nestjs/core");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(_ccnailysixshared.LoggerMiddleware).forRoutes("*");
    }
};
AppModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _ccnailysixdatabase.CommonPrismaModule.forRoot(),
            _ccnailysixshared.CommonConfigModule.forRoot(),
            _ccnailysixshared.CommonLoggerModule.forRoot(),
            _ccnailysixshared.CommonI18nModule.forRoot(),
            _ccnailysixshared.CommonCacheModule.forRoot(),
            _ccnailysixshared.CommonThrottlerModule.forRoot(),
            _ccnailysixshared.CommonTencentCloudModule.forRoot(),
            _ccnailysixshared.CommonMailerModule.forRoot(),
            _ccnailysixshared.CommonAppStoreModule.forRoot(),
            _ccnailysixshared.CommonErrorModule.forRoot(),
            _ccnailysixauth.CommonJwtModule.forRoot()
        ],
        controllers: [
            _appcontroller.AppController
        ],
        providers: [
            {
                provide: _core.APP_GUARD,
                useClass: _ccnailysixshared.ThrottlerBehindProxyGuard
            },
            {
                provide: _core.APP_PIPE,
                useClass: _ccnailysixshared.CommonValidationPipe
            }
        ]
    })
], AppModule);
