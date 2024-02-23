import { NextFunction, Request, Response } from "express";

declare global {
  namespace Express {
    interface Request {
      appInfo: {
        name: string;
      };
    }
  }
}

export function SetNailyAppInfo(appInfo: Request["appInfo"]) {
  return (req: Request, res: Response, next: NextFunction) => {
    req.appInfo = appInfo;
    next();
  };
}
