import { ApiProperty } from "@nestjs/swagger";
import { ILoginType } from "@prisma/client";
import { IsIn, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class GetAnalyseUserIdentifierQueryDTO {
  /**
   * 过滤登录类型
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/03/04
   * @type {ILoginType}
   * @memberof GetAnalyseUserIdentifierDTO
   */
  @IsIn(Object.values(ILoginType))
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ enum: ILoginType })
  filterLoginType: ILoginType;
  /**
   * 过滤登录客户端
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/03/04
   * @type {string}
   * @memberof GetAnalyseUserIdentifierQueryDTO
   */
  @IsString()
  @IsOptional()
  filterLoginClient?: string;
}
