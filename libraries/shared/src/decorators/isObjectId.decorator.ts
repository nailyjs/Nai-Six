import { registerDecorator } from "class-validator";
import { isObjectId } from "../utils";

/**
 * Is MongoDB ObjectId Decorator
 *
 * @author Zero <gczgroup@qq.com>
 * @date 2024/02/10
 * @export
 * @return {PropertyDecorator}
 */
export function IsObjectId(): PropertyDecorator;
export function IsObjectId() {
  return (target: Object, propertyKey: string) => {
    return registerDecorator({
      name: "isObjectId",
      target: target.constructor,
      propertyName: propertyKey,
      constraints: ["isObjectId"],
      options: {
        message: `${propertyKey} is not a valid ObjectId`,
      },
      validator: {
        validate(value) {
          return isObjectId(value);
        },
      },
    });
  };
}
