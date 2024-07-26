import { CACHE_MANAGER, Cache } from "@nestjs/cache-manager";
import { Inject, Injectable } from "@nestjs/common";
import { CommonLogger } from "cc.naily.six.shared";

@Injectable()
export abstract class TransportCodeService {
  constructor(
    @Inject(CACHE_MANAGER)
    protected readonly cacheManager: Cache,
    private readonly loggerService: CommonLogger,
  ) {}

  public abstract getRediskey(verifyData: string): string;

  public async sendCode(verifyData: string): Promise<number>;
  public async sendCode(verifyData: string): Promise<number> {
    const code = this.getCode();
    const key = this.getRediskey(verifyData);
    await this.cacheManager.set(key, code, 1000 * 60 * 5);
    return code;
  }

  public async checkCode(verifyData: string, code: number): Promise<boolean> {
    return (await this.cacheManager.get(this.getRediskey(verifyData))) === code;
  }

  public deleteCode(verifyData: string): Promise<void> {
    return this.cacheManager.del(this.getRediskey(verifyData));
  }

  protected getCode() {
    const code = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000);
    this.loggerService.log(`监听到验证码已发出：${code}`);
    return code;
  }
}
