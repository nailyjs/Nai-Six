import { registerDecorator } from "class-validator";
import { IPermission, PermissionArray } from "../constants";

export function IsPermissionArray(): PropertyDecorator;
export function IsPermissionArray() {
  return (target: Object, propertyKey: string) => {
    return registerDecorator({
      name: "isPermissionArray",
      target: target.constructor,
      propertyName: propertyKey,
      constraints: ["isPermissionArray"],
      options: {
        message: "permissions must be an array of strings, and each string must be a valid permission",
      },
      validator: {
        validate(value: unknown) {
          const isArray = Array.isArray(value);
          if (!isArray) return false;
          for (const item of value as unknown[]) {
            if (typeof item !== "string") return false;
            if (!PermissionArray.includes(item as IPermission)) return false;
          }
          return true;
        },
      },
    });
  };
}
