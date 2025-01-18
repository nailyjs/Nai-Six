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
 */

import metadata from "./metadata";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { join } from "path";
import { CommonLogger, SetNailyAppInfo } from "cc.naily.six.shared";
import { writeFileSync } from "fs";

(async function bootstrap() {
  console.clear();
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    snapshot: true,
    logger: new CommonLogger(),
    cors: {
      origin: (_origin, callback) => callback(null, true),
      credentials: true,
      allowedHeaders: ["Content-Type", "Authorization", "Accept", "Accept-Language", "Origin"],
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      preflightContinue: false,
      optionsSuccessStatus: 200,
    },
  });
  app.set("trust proxy", true);
  app.setViewEngine("ejs");
  app.setBaseViewsDir(join(process.env.PROJECT_ROOT, "apps/passport/views"));
  app.useLogger(await app.resolve(CommonLogger));
  app.use(SetNailyAppInfo({ name: "passport" }));
  const configService = app.get(ConfigService);
  const port = configService.getOrThrow("passport.port");
  const enableSwagger = configService.get<boolean>("global.swagger") ?? true;

  // Swagger
  await SwaggerModule.loadPluginMetadata(metadata);

  const config = new DocumentBuilder()
    .setTitle("Passport")
    .setVersion("1.0")
    .addBearerAuth()
    .setContact("Zero", "https://naily.cc", "1203970284@qq.com")
    .setLicense("GPL-3.0", "https://www.gnu.org/licenses/gpl-3.0.html")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  writeFileSync(join(process.env.PROJECT_ROOT, "resources/docs/passport.json"), JSON.stringify(document));
  if (enableSwagger)
    SwaggerModule.setup("docs", app, document, {
      jsonDocumentUrl: "docs/swagger.json",
      yamlDocumentUrl: "docs/swagger.yml",
    });
  await app.listen(port);
  return app;
})().then(async (app) => {
  new CommonLogger("NestApplication").verbose(`Passport app is running on ${await app.getUrl()}`);
});
