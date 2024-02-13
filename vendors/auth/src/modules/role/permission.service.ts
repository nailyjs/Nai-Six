import { Inject, Injectable, forwardRef } from "@nestjs/common";
import { MustPermission, NotPermission } from "../../constants";
import { CommonRoleService } from ".";

@Injectable()
export class CommonPermissionService {
  constructor(
    @Inject(forwardRef(() => CommonRoleService))
    private readonly commonRoleService: CommonRoleService,
  ) {}

  public getAllPermissions() {
    return Object.keys({
      ...MustPermission,
      ...NotPermission,
    });
  }

  public getMustPermissions() {
    return Object.keys(MustPermission);
  }

  public getNotPermissions() {
    return Object.keys(NotPermission);
  }

  public async getUserPermissions(userID: string) {
    const roles = await this.commonRoleService.getUserRoles(userID);
    const permissions = roles.map((role) => role.permissions).flat();
    return Array.from(new Set(permissions));
  }

  public async getUserPrivatePermissions(userID: string) {
    const roles = await this.commonRoleService.getUserPrivateRoles(userID);
    const permissions = roles.map((role) => role.permissions).flat();
    return Array.from(new Set(permissions));
  }
}
