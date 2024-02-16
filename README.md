# Naily V6 复活版

![Recommend Node.js 18+](https://img.shields.io/badge/Recommend%20Node.js-18+-green.svg)
![File Count](https://img.shields.io/github/directory-file-count/nailyjs/Nai-Six)
![GPL 3.0](https://img.shields.io/github/license/nailyjs/Nai-Six)
![Last Commit](https://img.shields.io/github/last-commit/nailyjs/Nai-Six)
![Commit Activity](https://img.shields.io/github/commit-activity/m/nailyjs/Nai-Six)

---

![cc.naily.element.passport version](https://img.shields.io/github/package-json/v/nailyjs/Nai-Six?filename=apps%2Fpassport%2Fpackage.json&label=cc.naily.element.passport)
![cc.naily.element.shop version](https://img.shields.io/github/package-json/v/nailyjs/Nai-Six?filename=apps%2Fshop%2Fpackage.json&label=cc.naily.element.shop)
![cc.naily.element.generated version](https://img.shields.io/github/package-json/v/nailyjs/Nai-Six?filename=libraries%2Fgenerated%2Fpackage.json&label=cc.naily.element.generated)
![cc.naily.element.shared version](https://img.shields.io/github/package-json/v/nailyjs/Nai-Six?filename=libraries%2Fshared%2Fpackage.json&label=cc.naily.element.shared)
![cc.naily.element.swagger version](https://img.shields.io/github/package-json/v/nailyjs/Nai-Six?filename=libraries%2Fswagger%2Fpackage.json&label=cc.naily.element.swagger)
![cc.naily.element.validator version](https://img.shields.io/github/package-json/v/nailyjs/Nai-Six?filename=libraries%2Fswagger%2Fpackage.json&label=cc.naily.element.validator)
![cc.naily.element.auth version](https://img.shields.io/github/package-json/v/nailyjs/Nai-Six?filename=vendors%2Fauth%2Fpackage.json&label=cc.naily.element.auth)
![cc.naily.element.database version](https://img.shields.io/github/package-json/v/nailyjs/Nai-Six?filename=vendors%2Fauth%2Fpackage.json&label=cc.naily.element.database)

## Buff

- 🥣 `pnpm` （只能使用pnpm,其他没法装齐依赖） + `changeset` + `link-staged` + `monorepo`
- 🍕 `husky` + `commitlint`
- 🪣 `nest.js` + `express` 全家桶
- 🧁 `prisma` + `MongoDB分片集群` + `redis` 数据库
- 🍩 `swagger` + `openapi` 接口文档
- 🍿 `vitest` 单元测试
- 🍭 `docker` 部署 (developing)
- 🍬 `upyun` 对接静态资源
- 🍪 `JWT` 登录授权
- 🍫 `throttler` 全局节流阀
- 🍿 `i18n` 多语言
- 🍭 `swc` 加速TypeScript编译
- 🍩 `微信官方支付`/`虎皮椒支付`对接

## 提示

配置文件在[resources/application.yml](resources/application.yml)，支持类似springboot一样的区分生产/开发环境配置：

- `application.yml` 默认配置用这个
- `application-development.yml` 开发环境配置
- `application-production.yml` 生产环境配置

`pnpm dev:xxx`采用development配置，`pnpm start:xxx`采用production配置。
