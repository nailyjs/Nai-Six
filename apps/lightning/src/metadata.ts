/* eslint-disable */
export default async () => {
  const t = {
    ["./modules/broswer/dtos/mark/mark.dto"]: await import("./modules/broswer/dtos/mark/mark.dto"),
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
              isSandbox: { required: true, type: () => Boolean, description: "\u662F\u5426\u6C99\u76D2\u73AF\u5883", default: false },
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
      ],
    },
  };
};
