import { IsNotEmpty, IsString } from "class-validator";

export class PutUserUsernameBodyDTO {
  /**
   * 新用户名
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/02
   * @type {string}
   * @memberof PutUserUsernameBodyDTO
   */
  @IsString()
  @IsNotEmpty()
  username: string;
}
