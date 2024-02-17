/* eslint-disable */
export default async () => {
    const t = {};
    return { "@nestjs/swagger": { "models": [[import("./modules/topic/dtos/topic.dto"), { "GetTopicQueryDTO": { orderCreatedAt: { required: false, type: () => Object, description: "\u521B\u5EFA\u65F6\u95F4\u6392\u5E8F" }, orderUpdatedAt: { required: false, type: () => Object, description: "\u66F4\u65B0\u65F6\u95F4\u6392\u5E8F" }, filterUserID: { required: false, type: () => Object, description: "\u7528\u6237ID" } } }]], "controllers": [[import("./app.controller"), { "AppController": { "getHello": { type: Number } } }], [import("./modules/topic/controllers/topic.controller"), { "TopicController": { "getTopics": { summary: "\u83B7\u53D6\u8BDD\u9898\u5217\u8868" } } }]] } };
};