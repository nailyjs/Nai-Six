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

  private readonly _maxReadCount = 100;
  private readonly _userLimitBucket = new Map<string, { count: number; code: number }>();

  public async checkCode(verifyData: string, code: number): Promise<boolean> {
    const cachedCode = await this.cacheManager.get(this.getRediskey(verifyData));

    // 如果Redis中没有验证码（已过期），清除Map中的记录
    if (cachedCode === undefined || cachedCode === null) {
      this._userLimitBucket.delete(verifyData);
      return false;
    }

    const isRight = cachedCode === code;
    if (!isRight) return false;

    // 限制获取验证码次数，100次（由 _maxReadCount 控制）
    // 如果超过100次，则在100次后，将验证码从redis中删除
    let currentCount = this._userLimitBucket.get(verifyData);
    if (!currentCount) {
      currentCount = { count: 0, code };
      this._userLimitBucket.set(verifyData, currentCount);
    }

    currentCount.count++;
    if (currentCount.count >= this._maxReadCount) {
      await this.deleteCode(verifyData);
      this._userLimitBucket.delete(verifyData);
      return false;
    }

    return isRight;
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
