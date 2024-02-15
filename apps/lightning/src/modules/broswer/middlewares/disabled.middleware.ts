import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express";

@Injectable()
export class DisabledMiddleware implements NestMiddleware {
  use(req: Request, res: Response) {
    res.status(500).json({
      statusCode: 500,
      code: 999,
      message: "书签功能正在维护中，请稍后再试！",
    });
  }
}
