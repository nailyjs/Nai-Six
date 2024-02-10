import { ApiProperty } from "@nestjs/swagger";
import { CreatedAtEnum, CreatedAtEnumArray, UpdatedAtEnum, UpdatedAtEnumArray } from "../enums";
import { IsBoolean, IsIn, IsNotEmpty, IsNumberString, IsOptional, IsString } from "class-validator";
import { IsObjectId } from "cc.naily.six.shared";

export class GetUserPermissionQueryDTO {
  /**
   * 创建时间 排序方式
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/10
   * @type {CreatedAtEnum}
   * @memberof GetUserPermissionQueryDTO
   */
  @IsIn(CreatedAtEnumArray)
  @IsString()
  @ApiProperty({ enum: CreatedAtEnum })
  orderCreatedAt: CreatedAtEnum;
  /**
   * 更新时间 排序方式
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/10
   * @type {UpdatedAtEnum}
   * @memberof GetUserPermissionQueryDTO
   */
  @IsIn(UpdatedAtEnumArray)
  @IsString()
  @ApiProperty({ enum: UpdatedAtEnum })
  orderUpdatedAt: UpdatedAtEnum;
  /**
   * 每页数量
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/10
   * @type {number}
   * @memberof GetUserPermissionBodyDTO
   */
  @IsOptional()
  @IsNumberString()
  take?: number;
  /**
   * 跳过数量
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/10
   * @type {number}
   * @memberof GetUserPermissionBodyDTO
   */
  @IsOptional()
  @IsNumberString()
  skip?: number;
}

export class PostUserPermissionBodyDTO {
  /**
   * 权限名称
   *
   * @type {string}
   * @memberof PostUserPermissionBodyDTO
   */
  @IsString()
  @IsNotEmpty()
  permissionName: string;
  /**
   * 权限描述
   *
   * @type {string}
   * @memberof PostUserPermissionBodyDTO
   */
  @IsString()
  @IsNotEmpty()
  permissionDescription: string;
  /**
   * 是否公开
   *
   * @type {boolean}
   * @memberof PostUserPermissionBodyDTO
   */
  @IsBoolean()
  @IsNotEmpty()
  isPublic: boolean;
}

export class PutUserPermissionBodyDTO extends PostUserPermissionBodyDTO {
  /**
   * 权限ID
   *
   * @type {string}
   * @memberof PutUserPermissionBodyDTO
   */
  @IsObjectId()
  @IsString()
  @IsNotEmpty()
  permissionID: string;
}
