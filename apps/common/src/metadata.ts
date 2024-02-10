/* eslint-disable */
export default async () => {
  const t = {
    ["./modules/tag/enums/tag.enum"]: await import("./modules/tag/enums/tag.enum"),
  };
  return {
    "@nestjs/swagger": {
      models: [
        [
          import("./modules/tag/dtos/tag.dto"),
          {
            GetTagQueryDTO: {
              orderUpdatedAt: {
                required: false,
                description: "\u66F4\u65B0\u65F6\u95F4\u6392\u5E8F",
                enum: t["./modules/tag/enums/tag.enum"].UpdatedAtEnum,
              },
              orderCreatedAt: {
                required: false,
                description: "\u521B\u5EFA\u65F6\u95F4\u6392\u5E8F",
                enum: t["./modules/tag/enums/tag.enum"].CreatedAtEnum,
              },
              orderViewCount: { required: false, description: "\u6D4F\u89C8\u91CF\u6392\u5E8F", enum: t["./modules/tag/enums/tag.enum"].ViewEnum },
              take: { required: false, type: () => Number, description: "\u9650\u5236\u6570\u91CF" },
              skip: { required: false, type: () => Number, description: "\u8DF3\u8FC7\u6570\u91CF" },
            },
            PostTagBodyDTO: {
              name: { required: true, type: () => String, description: "\u6807\u7B7E\u540D\u79F0" },
              description: { required: false, type: () => String, description: "\u6807\u7B7E\u63CF\u8FF0" },
            },
            GetTagSearchQueryDTO: { keywords: { required: true, type: () => String, description: "\u5173\u952E\u8BCD" } },
          },
        ],
        [
          import("./modules/tag/dtos/tag.res.dto"),
          {
            PostTagResDTO: {
              tagID: { required: true, type: () => String, description: "\u6807\u7B7EID" },
              createdAt: { required: true, type: () => Date, description: "\u521B\u5EFA\u65F6\u95F4" },
              updatedAt: { required: true, type: () => Date, description: "\u66F4\u65B0\u65F6\u95F4" },
              tagName: { required: true, type: () => String, description: "\u6807\u7B7E\u540D\u79F0" },
            },
          },
        ],
      ],
      controllers: [
        [import("./app.controller"), { AppController: { getHello: { summary: "\u4E3B\u9875", type: Number } } }],
        [
          import("./modules/tag/controllers/tag.controller"),
          {
            TagController: {
              getTags: { summary: "\u83B7\u53D6\u6807\u7B7E\u5217\u8868" },
              createTag: { summary: "\u521B\u5EFA\u6807\u7B7E" },
              searchTag: { summary: "\u641C\u7D22\u6807\u7B7E" },
            },
          },
        ],
      ],
    },
  };
};