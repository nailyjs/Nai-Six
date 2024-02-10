import { IsNotEmpty, IsString } from "class-validator";

export class GetUserDataQueryDTO {
  /**
   * 获取用户数据的键
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/10
   * @type {string}
   * @memberof GetUserDataQueryDTO
   */
  @IsString()
  @IsNotEmpty()
  key: string;
}

export class PostUserDataBodyDTO {
  /**
   * 设置用户数据的键
   *
   * @type {string}
   * @memberof PostUserDataBodyDTO
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/10
   */
  @IsString()
  @IsNotEmpty()
  key: string;
  /**
   * 设置用户数据的值
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/10
   * @type {string}
   * @memberof PostUserDataBodyDTO
   */
  value: string;
}
