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

import { format } from "winston";
import { TransformableInfo } from "logform";
import { cyan, cyanBright, green, greenBright, magenta, magentaBright, red, redBright, yellow, yellowBright } from "chalk";

export const consoleFormat = format.printf((info: TransformableInfo) => {
  const { level, message, context } = info;
  const timestamp = new Date().toLocaleString();
  const pid = process.pid;
  const formattedLevel = level.toUpperCase();
  const label = "Naily";
  if (level === "error") {
    return `${red(`[${label}] ${pid}  -`)} ${timestamp}   ${red(`${formattedLevel} ${redBright(context ? `[${context}]` : "")} ${message}`)}`;
  } else if (level === "info") {
    return `${green(`[${label}] ${pid}  -`)} ${timestamp}    ${green(`${formattedLevel} ${greenBright(context ? `[${context}]` : "")} ${message}`)}`;
  } else if (level === "debug") {
    return `${cyan(`[${label}] ${pid}  -`)} ${timestamp}    ${cyan(`${formattedLevel}  ${cyanBright(context ? `[${context}]` : "")} ${message}`)}`;
  } else if (level === "warn") {
    return `${yellow(`[${label}] ${pid}  -`)} ${timestamp}    ${yellow(
      `${formattedLevel} ${yellowBright(context ? `[${context}]` : "")} ${message}`,
    )}`;
  } else if (level === "verbose") {
    return `${magenta(`[${label}] ${pid}  -`)} ${timestamp} ${magenta(
      `${formattedLevel} ${magentaBright(context ? `[${context}]` : "")} ${message}`,
    )}`;
  } else {
    return `${green(`[${label}] ${pid}  -`)} ${timestamp}    ${green(`${formattedLevel}  ${greenBright(context ? `[${context}]` : "")} ${message}`)}`;
  }
});
