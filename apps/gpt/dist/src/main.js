/*
 * Copyright (C) 2024 Zero naily.cc
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _metadata = /*#__PURE__*/ _interop_require_default(require("./metadata"));
const _core = require("@nestjs/core");
const _appmodule = require("./app.module");
const _config = require("@nestjs/config");
const _swagger = require("@nestjs/swagger");
const _path = require("path");
const _ccnailysixshared = require("cc.naily.six.shared");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
(async function bootstrap() {
    console.clear();
    const app = await _core.NestFactory.create(_appmodule.AppModule, {
        snapshot: true,
        logger: new _ccnailysixshared.CommonLogger(),
        cors: {
            origin: "*"
        }
    });
    app.set("trust proxy", true);
    app.setViewEngine("ejs");
    app.setBaseViewsDir((0, _path.join)(process.env.PROJECT_ROOT, "apps/gpt/views"));
    app.useLogger(await app.resolve(_ccnailysixshared.CommonLogger));
    const configService = app.get(_config.ConfigService);
    const port = configService.getOrThrow("gpt.port");
    // Swagger
    await _swagger.SwaggerModule.loadPluginMetadata(_metadata.default);
    const config = new _swagger.DocumentBuilder().setTitle("GPT").setVersion("1.0").addBearerAuth().setContact("Zero", "https://naily.cc", "1203970284@qq.com").setLicense("GPL-3.0", "https://www.gnu.org/licenses/gpl-3.0.html").build();
    const document = _swagger.SwaggerModule.createDocument(app, config);
    _swagger.SwaggerModule.setup("docs", app, document);
    await app.listen(port);
    return app;
})().then(async (app)=>{
    new _ccnailysixshared.CommonLogger("NestApplication").verbose(`GPT app is running on ${await app.getUrl()}`);
});
