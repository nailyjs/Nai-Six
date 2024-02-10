import { IsObjectId } from "cc.naily.six.shared";
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

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
