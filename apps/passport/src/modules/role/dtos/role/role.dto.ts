import { IsObjectId } from "cc.naily.six.shared";
import { IsNotEmpty, IsString } from "class-validator";

export class GetUserRolePermissionQueryDTO {
  /**
   * 角色ID
   *
   * @author Zero <gczgroup@qq.com>
   * @date 2024/02/10
   * @type {string}
   * @memberof GetUserRolePermissionQueryDTO
   */
  @IsObjectId()
  @IsString()
  @IsNotEmpty()
  roleID: string;
}
