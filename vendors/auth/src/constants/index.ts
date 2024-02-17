export const MustPermission = {
  Must_Admin: Symbol("Must_Admin"),
};

export const NotPermission = {
  Not_Change_UserName: Symbol("Not_Change_UserName"),
  Not_Change_Password: Symbol("Not_Change_Password"),

  Not_Create_Topic: Symbol("Not_Create_Topic"),
};

export type IMustPermission = keyof typeof MustPermission;
export const MustPermissionArray = Object.keys(MustPermission) as IMustPermission[];

export type INotPermission = keyof typeof NotPermission;
export const NotPermissionArray = Object.keys(NotPermission) as INotPermission[];

export type IPermission = IMustPermission | INotPermission;
export const PermissionArray = [...MustPermissionArray, ...NotPermissionArray] as IPermission[];
