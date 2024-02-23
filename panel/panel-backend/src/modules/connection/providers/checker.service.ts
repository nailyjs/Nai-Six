import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { HashUtil, NailyContext } from "cc.naily.six.shared";
import axios from "axios";

export interface ServiceConnection {
  port: number;
  host: string;
}

export const enum ServiceStatus {
  Up = "up", // 服务正常
  Error = "error", // 地址无效
  Fake = "fake", // 地址有效但不是有效服务
  Down = "down", // 服务不可用
}

@Injectable()
export class ConnectionCheckerService extends NailyContext {
  public readonly hash: string;
  public readonly keys: string[] = [];

  constructor(configService: ConfigService) {
    super();
    this.hash = configService.getOrThrow<string>("panel.hash");
    const configuration = ConnectionCheckerService.ymlConfigCache;
    this.keys = Object.keys(configuration)
      .filter((key) => key !== "panel")
      .filter((key) => key !== "global")
      .filter((key) => key !== "scripts")
      .filter((key) => {
        const service = configuration[key];
        return this.validateServiceConnection(service);
      });
  }

  private validateServiceConnection(service: ServiceConnection): boolean {
    if (service.host === undefined || service.port === undefined) return false;
    if (typeof service.host !== "string" || typeof service.port !== "number") return false;
    return true;
  }

  public async checkStatus(host: string, port: number): Promise<{ status: ServiceStatus; msg: string }> {
    try {
      const url = `${host.startsWith("http") ? "" : "http://"}${host}:${port}/_connection`;
      const response = await axios.head(url, { timeout: 5000 });
      const info: `${string} ${string}` = response.headers["x-naily-six-panel-hash"];
      if (response.headers["x-naily-six-panel-hash"] === undefined) return { status: ServiceStatus.Error, msg: "Hash undefined" };
      const chunk = info.split(" ");
      if (chunk.length !== 2) return { status: ServiceStatus.Error, msg: "Wrong hash format" };
      const isSuccess = HashUtil.compareHash(chunk[0], this.hash);
      return isSuccess ? { status: ServiceStatus.Up, msg: "up" } : { status: ServiceStatus.Fake, msg: "Hash compare failed" };
    } catch (error) {
      return { status: ServiceStatus.Down, msg: error.message };
    }
  }
}
