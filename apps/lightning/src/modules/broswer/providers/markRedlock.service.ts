import { Injectable } from "@nestjs/common";
import { RedlockService } from "@nailyjs.nest.modules/redlock";
import { CommonLogger } from "cc.naily.six.shared";
import { LockService } from "../lock.interface";

@Injectable()
export class BrowserMarkRedlockService implements LockService {
  private readonly lockTTL = 30000; // 锁的有效期为30秒

  constructor(
    private readonly commonLogger: CommonLogger,
    private redlock: RedlockService,
  ) {
    // 设置日志上下文
    commonLogger.setContext(BrowserMarkRedlockService.name);

    // 处理锁获取失败的情况
    this.redlock.on("clientError", (err) => {
      this.commonLogger.error("A Redis error has occurred:", err);
    });
  }

  // 检查用户是否可以进行书签更新操作
  public async canFind(userID: string): Promise<boolean> {
    const resource = `locks:bookmark:${userID}`; // 锁的资源名称
    try {
      // 尝试获取锁
      const lock = await this.redlock.lock(resource, this.lockTTL);
      // 立即释放锁
      await lock.unlock();
      return true; // 返回 true 表示用户可以进行更新操作
    } catch (err) {
      return false; // 返回 false 表示用户正在进行更新操作
    }
  }

  // 添加用户到正在更新的列表中
  public async addUpdating(userID: string): Promise<void> {
    const resource = `locks:bookmark:${userID}`; // 锁的资源名称
    try {
      // 尝试获取锁
      await this.redlock.lock(resource, this.lockTTL);
      this.commonLogger.debug(`addUpdating: ${userID}`); // 记录调试信息
    } catch (err) {
      this.commonLogger.error(`Failed to acquire lock for addUpdating: ${userID}`, err); // 记录错误信息
    }
  }

  // 从正在更新的列表中移除用户
  public async removeUpdating(userID: string): Promise<void> {
    const resource = `locks:bookmark:${userID}`; // 锁的资源名称
    try {
      // 尝试获取锁
      const lock = await this.redlock.lock(resource, this.lockTTL);
      // 释放锁
      await lock.unlock();
      this.commonLogger.debug(`removeUpdating: ${userID}`); // 记录调试信息
    } catch (err) {
      this.commonLogger.error(`Failed to release lock for removeUpdating: ${userID}`, err); // 记录错误信息
    }
  }
}
