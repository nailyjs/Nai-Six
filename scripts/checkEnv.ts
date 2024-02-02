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

import { exec, execSync } from "child_process";
import { ListrTask } from "listr2";

function checkPnpm() {
  try {
    execSync("pnpm -v", { stdio: "ignore" });
    return true;
  } catch (error) {
    return false;
  }
}

function checkShared() {
  try {
    require("cc.naily.element.shared");
    return true;
  } catch (error) {
    return false;
  }
}

export function getEnvTasks(): ListrTask[] {
  return [
    {
      title: "Check pnpm",
      task(ctx, renderer) {
        return new Promise((resolve) => {
          if (checkPnpm()) return resolve(true);
          renderer.title = "pnpm is not installed, try to install...";
          try {
            const worker = exec("npm i -g pnpm");

            worker.on("data", function (data) {
              renderer.title = data;
            });
            worker.stderr.on("data", function (data) {
              renderer.title = data;
            });
            worker.on("close", function () {
              renderer.title = "pnpm installed";
              return resolve(true);
            });
          } catch (error) {
            renderer.title = "pnpm install failed, please install pnpm manually.";
            process.exit();
          }
        });
      },
    },
    {
      title: "Check shared package",
      task(ctx, renderer) {
        return new Promise((resolve) => {
          if (checkShared()) return resolve(true);
          renderer.title = "cc.naily.element.shared is not built. Try to build...";
          try {
            const worker = exec("pnpm run build:shared");

            worker.on("data", function (data) {
              renderer.title = data;
            });
            worker.stderr.on("data", function (data) {
              renderer.title = data;
            });
            worker.on("close", function () {
              renderer.title = "cc.naily.element.shared built";
              resolve(true);
            });
          } catch (error) {
            renderer.title = "cc.naily.element.shared build failed. Try to install...";
            try {
              const worker = exec("pnpm install");

              worker.on("data", function (data) {
                renderer.title = data;
              });
              worker.stderr.on("data", function (data) {
                renderer.title = data;
              });
              worker.on("close", function () {
                renderer.title = "cc.naily.element.shared installed";
                resolve(true);
              });
            } catch (error) {
              renderer.title = "cc.naily.element.shared install failed. Please install cc.naily.element.shared manually.";
              process.exit();
            }
          }
        });
      },
    },
  ];
}
