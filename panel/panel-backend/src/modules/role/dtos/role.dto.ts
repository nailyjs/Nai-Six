import { ApiProperty } from "@nestjs/swagger";
import { IsPermissionArray, MustPermissionArray, NotPermissionArray } from "cc.naily.six.auth";
import { IsObjectId } from "cc.naily.six.shared";
import { IsArray, IsBoolean, IsIn, IsNotEmpty, IsNumberString, IsOptional, IsString } from "class-validator";

export class GetUserRoleQueryDTO {
  @IsIn(["asc", "desc"])
  @IsOptional()
  @IsString()
  @ApiProperty({ description: "创建时间排序", enum: ["asc", "desc"] })
  orderCreatedAt?: "asc" | "desc";
  @IsIn(["asc", "desc"])
  @IsOptional()
  @IsString()
  @ApiProperty({ description: "更新时间排序", enum: ["asc", "desc"] })
  orderUpdatedAt?: "asc" | "desc";
  @IsOptional()
  @IsNumberString()
  take?: number;
  @IsOptional()
  @IsNumberString()
  skip?: number;
}

export class PostUserRoleBodyDTO {
  /**
   * 角色名称 (唯一)
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/10
   * @type {string}
   * @memberof PostUserRoleBodyDTO
   */
  @IsString()
  @IsNotEmpty()
  roleName: string;
  /**
   * 角色描述
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/10
   * @type {string}
   * @memberof PostUserRoleBodyDTO
   */
  @IsString()
  @IsNotEmpty()
  roleDescription: string;
  /**
   * 是否公开
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/10
   * @type {boolean}
   * @memberof PostUserRoleBodyDTO
   */
  @IsBoolean()
  @IsNotEmpty()
  isPublic: boolean;
  /**
   * 权限ID列表
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/11
   * @type {string[]}
   * @memberof PostUserRoleBodyDTO
   */
  @IsPermissionArray()
  @IsArray()
  @IsNotEmpty()
  @ApiProperty({ description: "权限ID列表", enum: [...MustPermissionArray, ...NotPermissionArray], isArray: true })
  permissions: string[];
}

export class PutUserRoleBodyDTO extends PostUserRoleBodyDTO {
  /**
   * 角色ID
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/10
   * @type {string}
   * @memberof PutUserRoleBodyDTO
   */
  @IsObjectId()
  @IsString()
  @IsNotEmpty()
  roleID: string;
}

export class PatchUserRoleBodyDTO {
  /**
   * 用户ID
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/10
   * @type {string}
   * @memberof PatchUserRoleBodyDTO
   */
  @IsObjectId()
  @IsString()
  @IsNotEmpty()
  userID: string;
  /**
   * 角色ID
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/10
   * @type {string}
   * @memberof PatchUserRoleBodyDTO
   */
  @IsObjectId()
  @IsString()
  @IsNotEmpty()
  roleID: string;
}

export class DeleteUserRoleBodyDTO {
  /**
   * 角色ID
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/10
   * @type {string}
   * @memberof DeleteUserRoleBodyDTO
   */
  roleID: string;
}
