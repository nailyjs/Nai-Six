import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { HashUtil } from "cc.naily.six.shared";
import axios from "axios";

export interface ServiceConnection {
  port: number;
  host: string;
}

@Injectable()
export class ConnectionCheckerService {
  public readonly passport: Partial<ServiceConnection> = {} as ServiceConnection;
  public readonly common: Partial<ServiceConnection> = {} as ServiceConnection;
  public readonly forum: Partial<ServiceConnection> = {} as ServiceConnection;
  public readonly shop: Partial<ServiceConnection> = {} as ServiceConnection;
  public readonly app: Partial<ServiceConnection> = {} as ServiceConnection;
  public readonly gpt: Partial<ServiceConnection> = {} as ServiceConnection;
  public readonly lightning: Partial<ServiceConnection> = {} as ServiceConnection;
  public readonly hash: string;

  constructor(configService: ConfigService) {
    this.passport.host = configService.getOrThrow<string>("passport.host");
    this.passport.port = configService.getOrThrow<number>("passport.port");

    this.common.host = configService.getOrThrow<string>("common.host");
    this.common.port = configService.getOrThrow<number>("common.port");

    this.forum.host = configService.get<string>("forum.host");
    this.forum.port = configService.get<number>("forum.port");

    this.shop.host = configService.get<string>("shop.host");
    this.shop.port = configService.get<number>("shop.port");

    this.app.host = configService.get<string>("app.host");
    this.app.port = configService.get<number>("app.port");

    this.gpt.host = configService.get<string>("gpt.host");
    this.gpt.port = configService.get<number>("gpt.port");

    this.lightning.host = configService.get<string>("lightning.host");
    this.lightning.port = configService.get<number>("lightning.port");

    this.hash = configService.getOrThrow<string>("panel.hash");
  }

  public async checkStatus(host: string, port: number): Promise<boolean> {
    try {
      const url = `http://${host}:${port}/_connection`;
      const response = await axios.head(url, {
        timeout: 5000,
      });
      return HashUtil.compareHash(response.headers["x-naily-six-panel-hash"], this.hash);
    } catch (error) {
      return false;
    }
  }
}
