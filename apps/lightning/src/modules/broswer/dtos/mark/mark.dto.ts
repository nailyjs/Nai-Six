import { IsArray, IsInt, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, ValidateNested } from "class-validator";

export class GetBroswerMarkQueryDTO {
  /**
   * 获取条数
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/02
   * @type {number}
   * @memberof GetBroswerMarkQueryDTO
   */
  @IsNumberString()
  @IsOptional()
  take?: number;
  /**
   * 跳过条数
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/02
   * @type {number}
   * @memberof GetBroswerMarkQueryDTO
   */
  @IsNumberString()
  @IsOptional()
  skip?: number;
}

export class PostBrowserMarkBodyDTO {
  /**
   * 列表
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/29
   * @type {PostBrowserMarkBodyListDTO[]}
   * @memberof PostBrowserMarkBodyDTO
   */
  @IsArray()
  @IsNotEmpty()
  @ValidateNested()
  list: PostBrowserMarkBodyListDTO[];
}

export class PostBrowserMarkBodyListDTO {
  /**
   * 标题
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/28
   * @type {string}
   * @memberof PostBrowserMarkBodyDTO
   */
  @IsString()
  @IsNotEmpty()
  title: string;
  /**
   * 图标
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/28
   * @type {string}
   * @memberof PostBrowserMarkBodyDTO
   */
  @IsString()
  @IsNotEmpty()
  icon: string;
  /**
   * 颜色
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/28
   * @type {string}
   * @memberof PostBrowserMarkBodyDTO
   */
  @IsString()
  @IsNotEmpty()
  color: string;
  /**
   * 链接
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/28
   * @type {string}
   * @memberof PostBrowserMarkBodyDTO
   */
  @IsString()
  @IsNotEmpty()
  link: string;
  /**
   * 索引
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/28
   * @type {number}
   * @memberof PostBrowserMarkBodyDTO
   */
  @IsInt()
  @IsNumber()
  @IsNotEmpty()
  index: number;
}
