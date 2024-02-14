/* eslint-disable */
export default async () => {
  const t = {
    ["./modules/broswer/dtos/mark/mark.dto"]: await import("./modules/broswer/dtos/mark/mark.dto"),
    ["./modules/script/enums/health.enum"]: await import("./modules/script/enums/health.enum"),
    ["./modules/script/dtos/user/parse.res.dto"]: await import("./modules/script/dtos/user/parse.res.dto"),
  };
  return {
    "@nestjs/swagger": {
      models: [
        [
          import("./modules/broswer/dtos/mark/mark.dto"),
          {
            GetBroswerMarkQueryDTO: {
              take: { required: false, type: () => Number, description: "\u83B7\u53D6\u6761\u6570" },
              skip: { required: false, type: () => Number, description: "\u8DF3\u8FC7\u6761\u6570" },
            },
            PostBrowserMarkBodyDTO: {
              list: {
                required: true,
                type: () => [t["./modules/broswer/dtos/mark/mark.dto"].PostBrowserMarkBodyListDTO],
                description: "\u5217\u8868",
              },
            },
            PostBrowserMarkBodyListDTO: {
              title: { required: true, type: () => String, description: "\u6807\u9898" },
              icon: { required: true, type: () => String, description: "\u56FE\u6807" },
              color: { required: true, type: () => String, description: "\u989C\u8272" },
              link: { required: true, type: () => String, description: "\u94FE\u63A5" },
              index: { required: true, type: () => Number, description: "\u7D22\u5F15" },
            },
          },
        ],
        [
          import("./modules/broswer/dtos/track/track.dto"),
          {
            GetBrowserTrackListQueryDTO: {
              orderCreatedAt: { required: false, type: () => Object, description: "\u521B\u5EFA\u65F6\u95F4\u6392\u5E8F", default: "desc" },
              take: { required: false, type: () => Number, description: "\u6BCF\u9875\u6570\u91CF", default: 10 },
              skip: { required: false, type: () => Number, description: "\u8DF3\u8FC7\u6570\u91CF", default: 0 },
            },
            PostBrowserTrackBodyDTO: {
              updatedAt: { required: false, type: () => Date },
              webPageTitle: { required: true, type: () => String },
              webPageLink: { required: true, type: () => String },
            },
          },
        ],
        [
          import("./modules/apple/dtos/apple.dto"),
          {
            GetSubscribeAppleCheckBodyDTO: {
              bundleId: { required: true, type: () => String, description: "\u82F9\u679C\u5E94\u7528\u7684bundleId" },
              transactionId: { required: true, type: () => String, description: "\u82F9\u679C\u5E94\u7528\u7684transactionId" },
              isSandbox: {
                required: false,
                type: () => Object,
                description: "\u662F\u5426\u662F\u6C99\u76D2\u73AF\u5883 \u9ED8\u8BA4false",
                default: "false",
              },
            },
            GetSubscribeAppleUserStatusDTO: { transactionId: { required: true, type: () => String, description: "\u82F9\u679CtransactionId" } },
            GetSubscribeAppleUserQueryDTO: {
              isSandbox: { required: true, type: () => Object, description: "\u662F\u5426\u6C99\u76D2\u73AF\u5883", default: "false" },
            },
          },
        ],
        [
          import("./modules/script/dtos/user/parse.res.dto"),
          {
            PostBroswerPluginUserCheckDTOResDTO: {
              name: { required: false, type: () => [String] },
              description: { required: false, type: () => [String] },
              icon: { required: false, type: () => [String] },
              author: { required: false, type: () => [String] },
              license: { required: false, type: () => [String] },
              create: { required: false, type: () => [String] },
              version: { required: false, type: () => [String] },
              connect: { required: false, type: () => [String] },
              include: { required: false, type: () => [String] },
              exclude: { required: false, type: () => [String] },
              supportURL: { required: false, type: () => [String] },
              homepageURL: { required: false, type: () => [String] },
              copyright: { required: false, type: () => [String] },
              lastmodified: { required: false, type: () => [String] },
              note: { required: false, type: () => [String] },
              resource: { required: false, type: () => [String] },
              require: { required: false, type: () => [String] },
              grant: { required: false, type: () => [String] },
              namespace: { required: false, type: () => [String] },
              downloadURL: { required: false, type: () => [String] },
              updateURL: { required: false, type: () => [String] },
            },
            PostBroswerPluginUserCheckHealthDTOBodyDTO: {
              type: { required: true, type: () => Object, description: "\u4FE1\u606F\u7C7B\u578B" },
              message: { required: true, type: () => String, description: "\u4FE1\u606F", enum: t["./modules/script/enums/health.enum"].HealthEnum },
            },
            PostBroswerPluginUserCheckRawInfoResDTO: {
              info: {
                required: true,
                type: () => t["./modules/script/dtos/user/parse.res.dto"].PostBroswerPluginUserCheckDTOResDTO,
                description: "\u811A\u672C\u4FE1\u606F",
              },
            },
            PostBroswerPluginUserCheckResDTO: {
              content: { required: true, type: () => String, description: "\u5185\u5BB9 \u538B\u7F29\u540E\u7684" },
              info: {
                required: true,
                type: () => t["./modules/script/dtos/user/parse.res.dto"].PostBroswerPluginUserCheckDTOResDTO,
                description: "\u811A\u672C\u4FE1\u606F",
              },
              health: {
                required: true,
                type: () => [t["./modules/script/dtos/user/parse.res.dto"].PostBroswerPluginUserCheckHealthDTOBodyDTO],
                description: "\u5065\u5EB7\u68C0\u67E5",
              },
            },
          },
        ],
        [
          import("./modules/script/dtos/user/user.dto"),
          {
            GetBroswerPluginUserQueryDTO: {
              orderAddTime: { required: false, type: () => Object, description: "\u6392\u5E8F\u65B9\u5F0F", default: "latest" },
              take: { required: false, type: () => Number, description: "\u83B7\u53D6\u6570\u91CF", default: 10 },
              skip: { required: false, type: () => Number, description: "\u8DF3\u8FC7\u6570\u91CF", default: 0 },
            },
            DeleteBroswerPluginUserBodyDTO: { browserScriptID: { required: true, type: () => String, description: "\u63D2\u4EF6ID" } },
          },
        ],
        [
          import("./modules/script/dtos/user/parse.dto"),
          { PostBroswerPluginUserCheckBodyDTO: { content: { required: true, type: () => Object, description: "\u5185\u5BB9" } } },
        ],
        [
          import("./modules/script/dtos/store/store.dto"),
          {
            GetBroswerScriptStoreQueryDTO: {
              order: { required: false, type: () => Object, description: "\u6392\u5E8F\u65B9\u5F0F" },
              take: { required: false, type: () => Number, description: "\u5206\u9875\u5927\u5C0F" },
              skip: { required: false, type: () => Number, description: "\u8DF3\u8FC7\u6570\u91CF" },
            },
            PostBroswerPluginStoreBodyDTO: {
              content: { required: true, type: () => Object, description: "\u5185\u5BB9" },
              browserScriptStoreID: {
                required: false,
                type: () => String,
                description: "\u6D4F\u89C8\u5668\u63D2\u4EF6\u5546\u5E97\u7684\u5B58\u50A8ID \u7528\u4E8E\u66F4\u65B0\u63D2\u4EF6",
              },
            },
            DeleteBroswerPluginStoreBodyDTO: {
              browserScriptStoreID: {
                required: true,
                type: () => String,
                description: "\u6D4F\u89C8\u5668\u63D2\u4EF6\u5546\u5E97\u7684\u5B58\u50A8ID",
              },
            },
          },
        ],
      ],
      controllers: [
        [import("./app.controller"), { AppController: { getHello: { type: Number } } }],
        [
          import("./modules/broswer/controllers/mark.controller"),
          { BrowserMarkController: { getMarks: { summary: "\u83B7\u53D6\u4E66\u7B7E\u5217\u8868", type: Object }, createMark: { type: Object } } },
        ],
        [
          import("./modules/broswer/controllers/track.controller"),
          {
            BroswerTrackController: {
              getList: { summary: "\u83B7\u53D6\u6D4F\u89C8\u5386\u53F2\u8BB0\u5F55", type: Object },
              create: { summary: "\u521B\u5EFA\u6D4F\u89C8\u5386\u53F2\u8BB0\u5F55" },
              delete: { summary: "\u5220\u9664\u6D4F\u89C8\u5386\u53F2\u8BB0\u5F55" },
              deleteAll: { summary: "\u5220\u9664\u6240\u6709\u6D4F\u89C8\u5386\u53F2\u8BB0\u5F55", type: Object },
            },
          },
        ],
        [
          import("./modules/apple/apple.controller"),
          {
            AppleController: {
              getUserStatus: { summary: "\u83B7\u53D6\u82F9\u679C\u8BA2\u9605\u72B6\u6001", type: Object },
              checkPay: { summary: "\u68C0\u67E5\u82F9\u679C\u8BA2\u9605\u72B6\u6001", type: Object },
              linkTransactionID: { summary: "\u94FE\u63A5TransactionID\u5230\u82F9\u679C\u8BA2\u9605", type: Object },
            },
          },
        ],
        [
          import("./modules/script/controllers/userScript.controller"),
          {
            UserScriptController: {
              getList: { summary: "\u7528\u6237\uFF1A\u83B7\u53D6\u5DF2\u6DFB\u52A0\u7684\u63D2\u4EF6\u5217\u8868" },
              upload: { summary: "\u7528\u6237\uFF1A\u4E0A\u4F20\u63D2\u4EF6" },
              check: { summary: "\u7528\u6237\uFF1A\u83B7\u53D6\u63D2\u4EF6\u4FE1\u606F \u6267\u884C\u5065\u5EB7\u68C0\u67E5" },
              delete: { summary: "\u7528\u6237\uFF1A\u5220\u9664\u63D2\u4EF6", type: Boolean },
            },
          },
        ],
        [
          import("./modules/script/controllers/storeScript.controller"),
          {
            StoreScriptController: {
              getList: { summary: "\u83B7\u53D6\u5546\u5E97\u63D2\u4EF6\u5217\u8868" },
              createDraft: { summary: "\u521B\u5EFA\u8349\u7A3F" },
              deleteScript: { summary: "\u5220\u9664\u63D2\u4EF6" },
            },
          },
        ],
      ],
    },
  };
};
