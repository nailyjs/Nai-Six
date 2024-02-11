/*
 * Copyright (C) 2024 Zero naily.cc
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import { registerDecorator } from "class-validator";

/**
 * MaxPoint decorator. Check if the number of decimal places is less than the specified value.
 *
 * @author Zero <gczgroup@qq.com>
 * @date 2024/01/14
 * @export
 * @param {number} maxPoint
 * @return {*}  {PropertyDecorator}
 */
export function MaxPoint(maxPoint: number): PropertyDecorator;
export function MaxPoint(maxPoint: number) {
  return (target: Object, propertyKey: string) => {
    return registerDecorator({
      name: "maxPoint",
      target: target.constructor,
      propertyName: propertyKey,
      constraints: ["maxPoint", maxPoint],
      options: {
        message: `${propertyKey} must be less than ${maxPoint} decimal places`,
      },
      validator: {
        validate(value) {
          if (typeof value !== "number") return false;
          const len = value.toString().split(".").pop().length;
          return len <= maxPoint;
        },
      },
    });
  };
}
