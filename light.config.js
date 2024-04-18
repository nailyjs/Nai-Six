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

/** @type {import("pm2").Proc} */
module.exports = {
  /** @type {import("pm2").StartOptions[]} */
  apps: [
    {
      name: "six-Lightning",
      script: "./resources/dist/apps/lightning/main.js",
      env: {
        NODE_ENV: "production",
        NEW_RELIC_PROXY_URL: "http://127.0.0.1:7890",
        NEW_RELIC_APP_NAME: "Lightning-prod",
        NEW_RELIC_LICENSE_KEY: "30c6e1159de302142061d99430fdf1dcFFFFNRAL",
      },
    },
    {
      name: "six-Passport",
      script: "./resources/dist/apps/passport/main.js",
      env: {
        NODE_ENV: "production",
        NEW_RELIC_PROXY_URL: "http://127.0.0.1:7890",
      },
    },
    {
      name: "six-shop",
      script: "./resources/dist/apps/shop/main.js",
      env: {
        NODE_ENV: "production",
        NEW_RELIC_PROXY_URL: "http://127.0.0.1:7890",
      },
    },
    {
      name: "six-Common",
      script: "./resources/dist/apps/common/main.js",
      env: {
        NODE_ENV: "production",
        NEW_RELIC_PROXY_URL: "http://127.0.0.1:7890",
      },
    },
  ],
  exec_mode: "cluster",
  combine_logs: true,
};
