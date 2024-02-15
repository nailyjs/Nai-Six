import { IsNotEmpty, IsNumberString, IsOptional, IsString } from "class-validator";

export class GetBrowserTrackListQueryDTO {
  /**
   * 创建时间排序
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/11
   * @type {('ASC' | 'DESC')}
   * @memberof GetBrowserTrackListQueryDTO
   */
  orderCreatedAt?: "asc" | "desc" = "desc";
  /**
   * 每页数量
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/28
   * @type {number}
   * @memberof GetBrowserTrackListQueryDTO
   */
  @IsOptional()
  @IsNumberString()
  take?: number = 10;

  /**
   * 跳过数量
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/01/28
   * @type {number}
   * @memberof GetBrowserTrackListQueryDTO
   */
  @IsOptional()
  @IsNumberString()
  skip?: number = 0;
}

export class PostBrowserTrackBodyDTO {
  @IsOptional()
  updatedAt?: Date;

  @IsString()
  @IsNotEmpty()
  webPageTitle: string;
  @IsString()
  @IsNotEmpty()
  webPageLink: string;
}
