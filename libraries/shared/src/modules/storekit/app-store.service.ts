import { Injectable } from "@nestjs/common";
import { AppStoreServerAPIClient, Environment } from "@apple/app-store-server-library";
import { ConfigService } from "@nestjs/config";
import { existsSync, readFileSync } from "fs";
import { join } from "path";
import { CommonLogger } from "../logger";

interface Configuration {
  signingKey: string;
  keyId: string;
  issuerId: string;
  environment: Environment;
  isMock?: boolean;
}

@Injectable()
export class CommonAppStoreService {
  constructor(
    private readonly configService: ConfigService,
    private readonly commonLogger: CommonLogger,
  ) {
    commonLogger.setContext(CommonAppStoreService.name);
    commonLogger.log("请求配置读取成功: " + JSON.stringify(configService.get("global.apple.storekit")));
    const environment = configService.get<Environment>("global.apple.storekit.environment");
    if (environment === Environment.SANDBOX) {
      commonLogger.warn("Apple StoreKit is running in SANDBOX mode");
    } else if (environment === Environment.PRODUCTION) {
      commonLogger.warn("Apple StoreKit is running in PRODUCTION mode");
    } else if (environment === Environment.LOCAL_TESTING) {
      commonLogger.warn("Apple StoreKit is running in LOCAL_TESTING mode");
    } else if (environment === Environment.XCODE) {
      commonLogger.warn("Apple StoreKit is running in XCODE mode");
    } else {
      commonLogger.error("Apple StoreKit is running in UNKNOWN mode");
    }
  }

  public getSigningKey(p8Key: string = "") {
    if (
      process.env.NODE_ENV &&
      existsSync(join(process.env.PROJECT_ROOT, `public/${process.env.NODE_ENV}/apple_store${p8Key ? `_${p8Key}` : ""}.p8`))
    ) {
      return readFileSync(join(process.env.PROJECT_ROOT, `public/${process.env.NODE_ENV}/apple_store${p8Key ? `_${p8Key}` : ""}.p8`)).toString();
    } else if (existsSync(join(process.env.PROJECT_ROOT, `public/apple_store${p8Key ? `_${p8Key}` : ""}.p8`))) {
      return readFileSync(join(process.env.PROJECT_ROOT, `public/apple_store${p8Key ? `_${p8Key}` : ""}.p8`)).toString();
    }
  }

  public getConfiguration(p8Key: string = "", env?: Environment): Configuration {
    const signingKey = this.getSigningKey(p8Key);
    const keyId = this.configService.getOrThrow<string>(`global.apple.${p8Key ? `storekitMultiple.${p8Key}` : "storekit"}.keyId`);
    const issuerId = this.configService.getOrThrow<string>(`global.apple.${p8Key ? `storekitMultiple.${p8Key}` : "storekit"}.issuerId`);
    const environment = env
      ? env
      : this.configService.getOrThrow<Environment>(`global.apple.${p8Key ? `storekitMultiple.${p8Key}` : "storekit"}.environment`);
    let isMock = this.configService.get<boolean>(`global.apple.${p8Key ? `storekitMultiple.${p8Key}` : "storekit"}.isMock`);
    if (isMock === undefined || isMock === null) isMock = false;

    return { signingKey, keyId, issuerId, environment, isMock };
  }

  private readonly clients: Map<Configuration, AppStoreServerAPIClient> = new Map();

  createClient(bundleId: string, env?: Environment, p8Key?: string) {
    const { signingKey, keyId, issuerId, environment } = this.getConfiguration(p8Key, env);
    const config = { signingKey, keyId, issuerId, environment };
    if (this.clients.has(config)) return this.clients.get(config);
    const client = new AppStoreServerAPIClient(signingKey, keyId, issuerId, bundleId, environment);
    this.clients.set(config, client);
    return client;
  }
}
