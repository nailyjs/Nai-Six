import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsNumberString, IsOptional, IsString } from "class-validator";

export class GetBroswerPluginUserQueryDTO {
  /**
   * 排序方式
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/07
   * @type {("latest" | "earliest")}
   * @memberof GetBroswerPluginUserQueryDTO
   */
  @IsOptional()
  @IsIn(["latest", "earliest"])
  @IsString()
  @ApiProperty({ enum: ["latest", "earliest"] })
  readonly orderAddTime?: "latest" | "earliest" = "latest";

  /**
   * 获取数量
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/07
   * @type {number}
   * @memberof GetBroswerPluginUserQueryDTO
   */
  @IsOptional()
  @IsNumberString()
  @IsString()
  take?: number = 10;

  /**
   * 跳过数量
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/07
   * @type {number}
   * @memberof GetBroswerPluginUserQueryDTO
   */
  @IsOptional()
  @IsNumberString()
  @IsString()
  skip?: number = 0;
}

export class DeleteBroswerPluginUserBodyDTO {
  /**
   * 插件ID
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/08
   * @type {string}
   * @memberof DeleteBroswerPluginUserBodyDTO
   */
  @IsString()
  readonly browserScriptID: string;
}
