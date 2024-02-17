import { registerDecorator } from "class-validator";

export function IsArrayStringOrString(): PropertyDecorator;
export function IsArrayStringOrString() {
  return (target: Object, propertyKey: string) => {
    return registerDecorator({
      name: "isArrayStringOrString",
      target: target.constructor,
      propertyName: propertyKey,
      constraints: ["isArrayStringOrString"],
      options: {
        message: `${propertyKey} must be a string or an array of strings`,
      },
      validator: {
        validate(value: unknown) {
          if (typeof value === "string") return true;
          if (Array.isArray(value)) return value.every((item) => typeof item === "string");
          return false;
        },
      },
    });
  };
}
