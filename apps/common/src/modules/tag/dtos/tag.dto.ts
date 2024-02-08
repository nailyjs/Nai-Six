import { IsIn, IsNotEmpty, IsNumberString, IsOptional, IsString } from "class-validator";
import { UpdatedAtEnum, CreatedAtEnum, UpdatedAtEnumArray, CreatedAtEnumArray, ViewEnum, ViewEnumArray } from "../enums/tag.enum";
import { ApiProperty } from "@nestjs/swagger";

export class GetTagQueryDTO {
  /**
   * 更新时间排序
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/08
   * @type {(UpdatedAtEnum | CreatedAtEnum)}
   * @memberof GetTagQueryDTO
   */
  @IsOptional()
  @IsIn(UpdatedAtEnumArray)
  @ApiProperty({ enum: UpdatedAtEnumArray })
  orderUpdatedAt?: UpdatedAtEnum;
  /**
   * 创建时间排序
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/08
   * @type {CreatedAtEnum}
   * @memberof GetTagQueryDTO
   */
  @IsOptional()
  @IsIn(CreatedAtEnumArray)
  @ApiProperty({ enum: CreatedAtEnumArray })
  orderCreatedAt?: CreatedAtEnum;
  /**
   * 浏览量排序
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/08
   * @type {ViewEnum}
   * @memberof GetTagQueryDTO
   */
  @IsOptional()
  @IsIn(ViewEnumArray)
  @ApiProperty({ enum: ViewEnumArray })
  orderViewCount?: ViewEnum;
  /**
   * 限制数量
   *
   * @default 10
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/08
   * @type {number}
   * @memberof GetTagQueryDTO
   */
  @IsOptional()
  @IsNumberString()
  @IsString()
  take?: number;
  /**
   * 跳过数量
   *
   * @default 0
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/08
   * @type {number}
   * @memberof GetTagQueryDTO
   */
  @IsOptional()
  @IsNumberString()
  @IsString()
  skip?: number;
}

export class PostTagBodyDTO {
  /**
   * 标签名称
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/08
   * @type {string}
   * @memberof PostTagBodyDTO
   */
  @IsString()
  @IsNotEmpty()
  name: string;
  /**
   * 标签描述
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/08
   * @type {string}
   * @memberof PostTagBodyDTO
   */
  @IsOptional()
  @IsString()
  description?: string;
}
