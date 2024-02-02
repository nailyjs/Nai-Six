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

import { applyDecorators, createParamDecorator, ExecutionContext, UseGuards } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { CommonAuthGuard, CommonAuthGuardOptional } from "../guards/common.guard";
import { Request } from "express";

/**
 * 授权装饰器
 *
 * @function
 * @description 凡是需要使用`@User`装饰器的地方都得使用本装饰器。
 * @param {boolean} isOptional - 是否允许未登录的用户访问。默认为 false，即必须登录才能访问
 * @returns {ClassDecorator & MethodDecorator}
 * @author Zero <gczgroup@qq.com>
 * @since 2024
 */
export function Auth(isOpotional: boolean = false): ClassDecorator & MethodDecorator {
  return applyDecorators(ApiBearerAuth(), UseGuards(isOpotional ? CommonAuthGuardOptional : CommonAuthGuard));
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
