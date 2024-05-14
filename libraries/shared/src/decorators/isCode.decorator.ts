import { registerDecorator } from "class-validator";

export function IsCode(): PropertyDecorator;
export function IsCode() {
  return (target: Object, propertyKey: string) => {
    return registerDecorator({
      name: "isCode",
      target: target.constructor,
      propertyName: propertyKey,
      constraints: ["isCode"],
      options: {
        message: `${propertyKey} 必须是六位数字`,
      },
      validator: {
        validate(value: unknown) {
          if (typeof value === "string") return /^\d{6}$/.test(value);
          if (typeof value === "number") return /^\d{6}$/.test(value.toString());
          return false;
        },
      },
    });
  };
}
