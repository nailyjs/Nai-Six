export interface LockService {
  /**
   * 检查是否可以查询。
   *
   * @description `BrowserMarkLockService`为sync；`BrowserMarkRedlockService`为async
   *
   * @param {string} userID
   * @return {boolean}
   * @memberof LockService
   */
  canFind(userID: string): boolean | Promise<boolean>;
  /**
   * 添加`更新中`状态
   *
   * @param {string} userID
   * @memberof LockService
   */
  addUpdating(userID: string): void;
  /**
   * 移除`更新中`状态
   *
   * @param {string} userID
   * @memberof LockService
   */
  removeUpdating(userID: string): void;
}
