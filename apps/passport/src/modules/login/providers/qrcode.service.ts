import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Inject, Injectable } from "@nestjs/common";
import { Cache } from "cache-manager";
import { randomUUID } from "crypto";

@Injectable()
export class QrCodeService {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  private generateQrCodeKey() {
    return randomUUID();
  }

  private getQrCodeKey(key: string) {
    return `login:qrcode:${key}`;
  }

  public async createQrCode(): Promise<string> {
    const key = this.generateQrCodeKey();
    await this.cacheManager.store.set(this.getQrCodeKey(key), "pending", 1000 * 60 * 5);
    return key;
  }

  public getQrCode(key: string): Promise<"pending">;
  public getQrCode(key: string): Promise<string>;
  public getQrCode(key: string): Promise<undefined>;
  public getQrCode(key: string) {
    return this.cacheManager.store.get(this.getQrCodeKey(key));
  }

  public setQrCode(key: string, userID: string): Promise<void> {
    return this.cacheManager.store.set(this.getQrCodeKey(key), `${userID}`, 1000 * 60 * 5);
  }
}
