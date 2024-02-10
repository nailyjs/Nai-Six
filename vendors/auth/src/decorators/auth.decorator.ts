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

import { applyDecorators, createParamDecorator, ExecutionContext, SetMetadata, UseGuards } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { CommonAuthGuard, CommonAuthGuardOptional } from "../guards/common.guard";
import { Request } from "express";

/**
 * 授权装饰器
 *
 * @description 凡是需要使用`@User`装饰器的地方都得使用本装饰器。正常情况下，
 * 可以添加`@Roles`装饰器进一步限制登录用户的角色。但是当`isOptional`参数为
 * `true`时，无法使用角色装饰器`@Roles`。
 * @param {boolean} isOptional - 是否允许未登录的用户访问。默认为 false，即必须登录才能访问
 * @returns {ClassDecorator & MethodDecorator}
 * @author Zero <gczgroup@qq.com>
 * @exports
 * @since 2023
 */
export function Auth(isOptional: boolean = false): ClassDecorator & MethodDecorator {
  return applyDecorators(ApiBearerAuth(), UseGuards(isOptional ? CommonAuthGuardOptional : CommonAuthGuard));
}

export function Permissions(...permissions: string[]): ClassDecorator & MethodDecorator {
  return SetMetadata("permissions", permissions);
}

/**
 * 角色装饰器 用于标记控制器或方法必须需要的角色
 *
 * @author Zero <gczgroup@qq.com>
 * @date 2024/02/10
 * @export
 * @param {...string[]} roles - 角色列表
 * @return {(ClassDecorator & MethodDecorator)}
 */
export function Roles(...roles: string[]): ClassDecorator & MethodDecorator {
  return SetMetadata("roles", roles);
}

/**
 * 获取已登录用户信息
 *
 * @function
 * @description 用于获取已登录用户信息 必须在控制器方法的参数中使用
 * @returns {ParameterDecorator}
 */
export const User = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<Request>();
  return request.user;
});

export const Token = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<Request>();
  return request.headers.authorization.split(" ")[1];
});
