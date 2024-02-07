import { IsIn, IsNumberString, IsOptional, IsString } from "class-validator";
import { CreatedAtEnum, CreatedAtEnumArray, UpdatedAtEnum, UpdatedAtEnumArray, ViewEnum, ViewEnumArray } from "../../enums/store.enum";
import { ApiProperty } from "@nestjs/swagger";

export class GetBroswerScriptStoreQueryDTO {
  /**
   * 排序方式
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/08
   * @type {ViewEnum}
   * @memberof GetBroswerScriptStoreQueryDTO
   * @default ViewEnum.Least
   */
  @IsOptional()
  @IsIn([...ViewEnumArray, ...UpdatedAtEnumArray, ...CreatedAtEnumArray])
  @ApiProperty({ enum: [...ViewEnumArray, ...UpdatedAtEnumArray, ...CreatedAtEnumArray] })
  order?: ViewEnum | UpdatedAtEnum | CreatedAtEnum;
  /**
   * 分页大小
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/08
   * @type {number}
   * @memberof GetBroswerScriptStoreQueryDTO
   */
  @IsOptional()
  @IsNumberString()
  @IsString()
  take?: number;

  /**
   * 跳过数量
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/08
   * @type {number}
   * @memberof GetBroswerScriptStoreQueryDTO
   */
  @IsOptional()
  @IsNumberString()
  @IsString()
  skip?: number;
}

export class PostBroswerPluginStoreBodyDTO {
  /**
   * 内容
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/07
   * @type {string}
   * @memberof PostBroswerPluginStoreBodyDTO
   */
  @ApiProperty({ type: "string", format: "binary" })
  content: any;
  /**
   * 浏览器插件商店的存储ID 用于更新插件
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/08
   * @type {string}
   * @memberof PostBroswerPluginStoreBodyDTO
   */
  @IsOptional()
  @IsString()
  browserScriptStoreID?: string;
}

export class DeleteBroswerPluginStoreBodyDTO {
  /**
   * 浏览器插件商店的存储ID
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/08
   * @type {string}
   * @memberof DeleteBroswerPluginStoreBodyDTO
   */
  @IsString()
  browserScriptStoreID: string;
}
