import { Injectable, NestMiddleware } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NextFunction, Request, Response } from "express";
import { HashUtil } from "../utils";
@Injectable()
export class ConnectorMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {}

  use(req: Request, res: Response, next: NextFunction) {
    if (req.method === "HEAD" && req.originalUrl === "/_connection") {
      const hash = this.configService.get<string>("panel.hash");
      const generatedHash = HashUtil.generateHash(hash);
      res.setHeader("X-Naily-Six-Panel-Hash", generatedHash + " " + req.appInfo.name).end();
      return;
    }
    next();
  }
}
