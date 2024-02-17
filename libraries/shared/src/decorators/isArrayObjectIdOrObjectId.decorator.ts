import { registerDecorator } from "class-validator";
import { ObjectId } from "mongodb";

export function IsArrayObjectIdOrObjectId(): PropertyDecorator;
export function IsArrayObjectIdOrObjectId() {
  return (target: Object, propertyKey: string) => {
    return registerDecorator({
      name: "isArrayObjectIdOrObjectId",
      target: target.constructor,
      propertyName: propertyKey,
      constraints: ["isArrayObjectIdOrObjectId"],
      options: {
        message: `${propertyKey} must be a valid id or an array of ids`,
      },
      validator: {
        validate(value: unknown) {
          if (typeof value === "string") return ObjectId.isValid(value);
          if (Array.isArray(value)) return value.every((item) => ObjectId.isValid(item));
          return false;
        },
      },
    });
  };
}
