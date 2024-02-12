import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsNumberString, IsOptional, IsString } from "class-validator";

export class GetUserQueryDTO {
  /**
   * 根据注册时间排序
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/05
   * @type {("ASC" | "DESC")}
   * @memberof GetUserQueryDTO
   */
  @IsIn(["early", "late"])
  @IsString()
  @IsOptional()
  @ApiProperty({ enum: ["early", "late"] })
  orderRegisterTime?: "early" | "late" = "late";
  /**
   * 获取数量
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/05
   * @type {number}
   * @memberof GetUserQueryDTO
   */
  @IsOptional()
  @IsNumberString()
  take?: number;
  /**
   * 跳过数量
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/05
   * @type {number}
   * @memberof GetUserQueryDTO
   */
  @IsOptional()
  @IsNumberString()
  skip?: number;
}
