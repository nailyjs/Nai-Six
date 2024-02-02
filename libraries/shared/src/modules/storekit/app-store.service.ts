import { Injectable } from "@nestjs/common";
import { AppStoreServerAPIClient, Environment } from "@apple/app-store-server-library";
import { ConfigService } from "@nestjs/config";
import { existsSync, readFileSync } from "fs";
import { join } from "path";
import { CommonLogger } from "../logger";

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

  getSigningKey() {
    if (process.env.NODE_ENV && existsSync(join(process.env.PROJECT_ROOT, `public/${process.env.NODE_ENV}/apple_store.p8`))) {
      return readFileSync(join(process.env.PROJECT_ROOT, `public/${process.env.NODE_ENV}/apple_store.p8`)).toString();
    } else if (existsSync(join(process.env.PROJECT_ROOT, "public/apple_store.p8"))) {
      return readFileSync(join(process.env.PROJECT_ROOT, "public/apple_store.p8")).toString();
    } else {
      throw new Error("apple_store.p8 not found");
    }
  }

  createClient(bundleId: string, env?: Environment) {
    const signingKey = this.getSigningKey();
    const keyId = this.configService.getOrThrow<string>("global.apple.storekit.keyId");
    const issuerId = this.configService.getOrThrow<string>("global.apple.storekit.issuerId");
    const environment = env ? env : this.configService.getOrThrow<Environment>("global.apple.storekit.environment");

    return new AppStoreServerAPIClient(signingKey, keyId, issuerId, bundleId, environment);
  }
}
