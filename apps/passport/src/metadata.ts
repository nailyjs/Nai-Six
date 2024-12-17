/* eslint-disable */
export default async () => {
    const t = {
        ["./modules/pay/dtos/pay/pay.res.dto"]: await import("./modules/pay/dtos/pay/pay.res.dto"),
        ["./modules/pay/enums/order.enum"]: await import("./modules/pay/enums/order.enum")
    };
    return { "@nestjs/swagger": { "models": [[import("./modules/login/dtos/phone/phone.dto"), { "PostLoginPhoneCodeBodyDTO": { phone: { required: true, type: () => String, description: "\u4E2D\u56FD\u5927\u9646\u624B\u673A\u53F7\n\n@author Zero <gczgroup@qq.com>\n@date 2024/01/24\n@type {string}\n@memberof PostLoginEmailCodeBodyDTO" }, code: { required: true, type: () => Number, description: "\u9A8C\u8BC1\u7801\n\n@author Zero <gczgroup@qq.com>\n@date 2024/01/24\n@type {string}\n@memberof PostLoginEmailCodeBodyDTO" }, loginType: { required: true, type: () => Object, description: "\u767B\u5F55\u8BBE\u5907\u7C7B\u578B `\u8BF7\u770Bschema\u7684enum\u6B63\u786E\u4F20\u503C`\n\n@author Zero <gczgroup@qq.com>\n@date 2024/01/24\n@type {LoginType}\n@memberof PostLoginEmailCodeBodyDTO" }, loginClient: { required: false, type: () => String, description: "\u767B\u5F55\u7684\u5BA2\u6237\u7AEF \u7528\u4E8E\u8BB0\u5F55\u54EA\u4E2AAPP/\u54EA\u79CD\u6D4F\u89C8\u5668\uFF08\u6BD4\u5982\u8C37\u6B4C\u3001\u706B\u72D0\u6D4F\u89C8\u5668\uFF09\u7B49\n\nWeb\u7AEF\u767B\u5F55\u65F6\uFF0C\u8BE5\u5B57\u6BB5\u53EF\u4EE5\u4E3A\u7A7A\n\n@author Zero <gczgroup@qq.com>\n@date 2024/01/24\n@type {string}\n@memberof PostLoginEmailCodeBodyDTO" }, loginDeviceName: { required: false, type: () => String, description: "\u767B\u5F55\u7684\u8BBE\u5907\u540D\n\nWeb\u7AEF\u767B\u5F55\u65F6\uFF0C\u8BE5\u5B57\u6BB5\u53EF\u4EE5\u4E3A\u7A7A\n\n@author Zero <gczgroup@qq.com>\n@date 2024/01/28\n@type {string}\n@memberof PostLoginPhoneCodeBodyDTO" }, identifier: { required: false, type: () => String, description: "\u8BBE\u5907\u552F\u4E00\u6807\u8BC6\u7B26\n\nWeb\u7AEF\u767B\u5F55\u65F6\uFF0C\u8BE5\u5B57\u6BB5\u53EF\u4EE5\u4E3A\u7A7A\n\n@author Zero <gczgroup@qq.com>\n@date 2024/01/24\n@type {string}\n@memberof PostLoginEmailCodeBodyDTO" } } }], [import("./modules/login/dtos/qrcode/qrcode.dto"), { "PostLoginQrcodeConfirmBodyDTO": { key: { required: true, type: () => String, description: "\u4E8C\u7EF4\u7801key\n\n@author Zero <gczgroup@qq.com>\n@date 2024/01/27\n@type {string}\n@memberof PostLoginQrcodeConfirmBodyDTO" } }, "PostLoginQrcodeBodyDTO": { key: { required: true, type: () => String, description: "\u4E8C\u7EF4\u7801key\n\n@author Zero <gczgroup@qq.com>\n@date 2024/01/27\n@type {string}\n@memberof PostLoginQrcodeBodyDTO" }, loginType: { required: true, type: () => Object, description: "\u767B\u5F55\u8BBE\u5907\u7C7B\u578B `\u8BF7\u770Bschema\u7684enum\u6B63\u786E\u4F20\u503C`\n\n@author Zero <gczgroup@qq.com>\n@date 2024/01/24\n@type {LoginType}\n@memberof PostLoginQrcodeBodyDTO" }, loginClient: { required: false, type: () => String, description: "\u767B\u5F55\u7684\u5BA2\u6237\u7AEF \u7528\u4E8E\u8BB0\u5F55\u54EA\u4E2AAPP/\u54EA\u79CD\u6D4F\u89C8\u5668\uFF08\u6BD4\u5982\u8C37\u6B4C\u3001\u706B\u72D0\u6D4F\u89C8\u5668\uFF09\u7B49\n\nWeb\u7AEF\u767B\u5F55\u65F6\uFF0C\u8BE5\u5B57\u6BB5\u53EF\u4EE5\u4E3A\u7A7A\n\n@author Zero <gczgroup@qq.com>\n@date 2024/01/24\n@type {string}\n@memberof PostLoginQrcodeBodyDTO" }, loginDeviceName: { required: false, type: () => String, description: "\u767B\u5F55\u7684\u8BBE\u5907\u540D\n\nWeb\u7AEF\u767B\u5F55\u65F6\uFF0C\u8BE5\u5B57\u6BB5\u53EF\u4EE5\u4E3A\u7A7A\n\n@author Zero <gczgroup@qq.com>\n@date 2024/01/28\n@type {string}\n@memberof PostLoginQrcodeBodyDTO" }, identifier: { required: false, type: () => String, description: "\u8BBE\u5907\u552F\u4E00\u6807\u8BC6\u7B26\n\nWeb\u7AEF\u767B\u5F55\u65F6\uFF0C\u8BE5\u5B57\u6BB5\u53EF\u4EE5\u4E3A\u7A7A\n\n@author Zero <gczgroup@qq.com>\n@date 2024/01/24\n@type {string}\n@memberof PostLoginQrcodeBodyDTO" } } }], [import("./modules/login/dtos/email/email.dto"), { "PostLoginEmailCodeBodyDTO": { email: { required: true, type: () => String, description: "\u90AE\u7BB1\n\n@author Zero <gczgroup@qq.com>\n@date 2024/01/24\n@type {string}\n@memberof PostLoginEmailCodeBodyDTO" }, code: { required: true, type: () => Number, description: "\u9A8C\u8BC1\u7801\n\n@author Zero <gczgroup@qq.com>\n@date 2024/01/24\n@type {string}\n@memberof PostLoginEmailCodeBodyDTO", minimum: 100000, maximum: 999999 }, loginType: { required: true, type: () => Object, description: "\u767B\u5F55\u8BBE\u5907\u7C7B\u578B `\u8BF7\u770Bschema\u7684enum\u6B63\u786E\u4F20\u503C`\n\n@author Zero <gczgroup@qq.com>\n@date 2024/01/24\n@type {LoginType}\n@memberof PostLoginEmailCodeBodyDTO" }, loginClient: { required: false, type: () => String, description: "\u767B\u5F55\u7684\u5BA2\u6237\u7AEF \u7528\u4E8E\u8BB0\u5F55\u54EA\u4E2AAPP/\u54EA\u79CD\u6D4F\u89C8\u5668\uFF08\u6BD4\u5982\u8C37\u6B4C\u3001\u706B\u72D0\u6D4F\u89C8\u5668\uFF09\u7B49\n\nWeb\u7AEF\u767B\u5F55\u65F6\uFF0C\u8BE5\u5B57\u6BB5\u53EF\u4EE5\u4E3A\u7A7A\n\n@author Zero <gczgroup@qq.com>\n@date 2024/01/24\n@type {string}\n@memberof PostLoginEmailCodeBodyDTO" }, loginDeviceName: { required: false, type: () => String, description: "\u767B\u5F55\u7684\u8BBE\u5907\u540D\n\nWeb\u7AEF\u767B\u5F55\u65F6\uFF0C\u8BE5\u5B57\u6BB5\u53EF\u4EE5\u4E3A\u7A7A\n\n@author Zero <gczgroup@qq.com>\n@date 2024/01/28\n@type {string}\n@memberof PostLoginEmailCodeBodyDTO" }, identifier: { required: false, type: () => String, description: "\u8BBE\u5907\u552F\u4E00\u6807\u8BC6\u7B26\n\nWeb\u7AEF\u767B\u5F55\u65F6\uFF0C\u8BE5\u5B57\u6BB5\u53EF\u4EE5\u4E3A\u7A7A\n\n@author Zero <gczgroup@qq.com>\n@date 2024/01/24\n@type {string}\n@memberof PostLoginEmailCodeBodyDTO" } } }], [import("./modules/login/dtos/microsoft/microsoft.dto"), { "PostLoginMicrosoftBodyDTO": { microsoftID: { required: true, type: () => String, description: "\u5FAE\u8F6F\u767B\u5F55\u7684ID\n\n@type {string}\n@memberof PostLoginMicrosoftBodyDTO" }, loginType: { required: true, type: () => Object, description: "\u767B\u5F55\u8BBE\u5907\u7C7B\u578B `\u8BF7\u770Bschema\u7684enum\u6B63\u786E\u4F20\u503C`\n\n@author Zero <gczgroup@qq.com>\n@date 2024/01/24\n@type {LoginType}\n@memberof PostLoginEmailCodeBodyDTO" }, loginClient: { required: false, type: () => String, description: "\u767B\u5F55\u7684\u5BA2\u6237\u7AEF \u7528\u4E8E\u8BB0\u5F55\u54EA\u4E2AAPP/\u54EA\u79CD\u6D4F\u89C8\u5668\uFF08\u6BD4\u5982\u8C37\u6B4C\u3001\u706B\u72D0\u6D4F\u89C8\u5668\uFF09\u7B49\n\nWeb\u7AEF\u767B\u5F55\u65F6\uFF0C\u8BE5\u5B57\u6BB5\u53EF\u4EE5\u4E3A\u7A7A\n\n@author Zero <gczgroup@qq.com>\n@date 2024/01/24\n@type {string}\n@memberof PostLoginEmailCodeBodyDTO" }, loginDeviceName: { required: false, type: () => String, description: "\u767B\u5F55\u7684\u8BBE\u5907\u540D\n\nWeb\u7AEF\u767B\u5F55\u65F6\uFF0C\u8BE5\u5B57\u6BB5\u53EF\u4EE5\u4E3A\u7A7A\n\n@author Zero <gczgroup@qq.com>\n@date 2024/01/28\n@type {string}\n@memberof PostLoginEmailCodeBodyDTO" }, identifier: { required: false, type: () => String, description: "\u8BBE\u5907\u552F\u4E00\u6807\u8BC6\u7B26\n\nWeb\u7AEF\u767B\u5F55\u65F6\uFF0C\u8BE5\u5B57\u6BB5\u53EF\u4EE5\u4E3A\u7A7A\n\n@author Zero <gczgroup@qq.com>\n@date 2024/01/24\n@type {string}\n@memberof PostLoginEmailCodeBodyDTO" } } }], [import("./modules/transport/dtos/email/email.dto"), { "PostTransportEmailBodyDTO": { email: { required: true, type: () => String, description: "\u90AE\u7BB1\n\n@author Zero <gczgroup@qq.com>\n@date 2024/02/02\n@type {string}\n@memberof PostTransportEmailBodyDTO" } } }], [import("./modules/transport/dtos/phone/phone.dto"), { "PostTransportPhoneBodyDTO": { phone: { required: true, type: () => String, description: "\u624B\u673A\u53F7\n\n@author Zero <gczgroup@qq.com>\n@date 2024/02/02\n@type {string}\n@memberof PostTransportPhoneBodyDTO" } } }], [import("./modules/transport/dtos/block.dto"), { "BlockDTO": { data: { required: true, type: () => String } } }], [import("./modules/register/dtos/phone/phone.dto"), { "PostRegisterPhoneCodeBodyDTO": { phone: { required: true, type: () => String, description: "\u624B\u673A\u53F7 \u4E2D\u56FD\u5927\u9646\n\n@author Zero <gczgroup@qq.com>\n@date 2024/01/28\n@type {string}\n@memberof PostRegisterPhoneCodeBodyDTO" }, username: { required: false, type: () => String, description: "\u7528\u6237\u540D \u53EF\u9009 \u4E3A\u7A7A\u65F6\u81EA\u52A8\u751F\u6210\n\n@author Zero <gczgroup@qq.com>\n@date 2024/01/28\n@type {string}\n@memberof PostRegisterPhoneCodeBodyDTO" }, code: { required: true, type: () => Number, description: "\u9A8C\u8BC1\u7801\n\n@author Zero <gczgroup@qq.com>\n@date 2024/01/28\n@type {number}\n@memberof PostRegisterPhoneCodeBodyDTO" } }, "PostRegisterEmailCodeBodyDTO": { email: { required: true, type: () => String, description: "\u7535\u5B50\u90AE\u4EF6\u5730\u5740\n\n@author Zero <gczgroup@qq.com>\n@date 2024/02/10\n@type {string}\n@memberof PostRegisterEmailCodeBodyDTO" }, username: { required: false, type: () => String, description: "\u7528\u6237\u540D \u53EF\u9009 \u4E3A\u7A7A\u65F6\u81EA\u52A8\u751F\u6210\n\n@author Zero <gczgroup@qq.com>\n@date 2024/01/28\n@type {string}\n@memberof PostRegisterEmailCodeBodyDTO" }, code: { required: true, type: () => Number, description: "\u9A8C\u8BC1\u7801\n\n@author Zero <gczgroup@qq.com>\n@date 2024/02/10\n@type {number}\n@memberof PostRegisterEmailCodeBodyDTO" } } }], [import("./modules/user/dtos/change/change.dto"), { "PutUserUsernameBodyDTO": { username: { required: true, type: () => String, description: "\u65B0\u7528\u6237\u540D\n\n@author Zero <gczgroup@qq.com>\n@date 2024/02/02\n@type {string}\n@memberof PutUserUsernameBodyDTO" } }, "PutUserPasswordBodyDTO": { oldPassword: { required: false, type: () => String, description: "\u65E7\u5BC6\u7801\uFF08\u5982\u679C\u6709\u65E7\u5BC6\u7801\uFF0C\u5FC5\u586B\uFF1B\u5982\u679C\u6CA1\u6709\uFF0C\u4E0D\u586B\uFF09\n\n@author Zero <gczgroup@qq.com>\n@date 2024/02/13\n@type {string}\n@memberof PutUserPasswordBodyDTO" }, verifyType: { required: true, type: () => Object, description: "\u9A8C\u8BC1\u7C7B\u522B `email` \u90AE\u7BB1 `phone` \u624B\u673A\n\n@author Zero <gczgroup@qq.com>\n@date 2024/02/13\n@type {(\"email\" | \"phone\")}\n@memberof PutUserPasswordBodyDTO" }, verifyCode: { required: true, type: () => Number, description: "\u9A8C\u8BC1\u7801\n\n@author Zero <gczgroup@qq.com>\n@date 2024/02/13\n@type {string}\n@memberof PutUserPasswordBodyDTO" }, newPassword: { required: true, type: () => String, description: "\u65B0\u5BC6\u7801\n\n@author Zero <gczgroup@qq.com>\n@date 2024/02/13\n@type {string}\n@memberof PutUserPasswordBodyDTO" } }, "PutUserSayingBodyDTO": { saying: { required: true, type: () => String, description: "\u4E2A\u6027\u7B7E\u540D\n\n@type {string}\n@memberof PutUserSayingBodyDTO" } }, "PutUserEmailBodyDTO": { newEmail: { required: true, type: () => String, description: "\u65B0\u90AE\u7BB1\n\n@type {string}\n@memberof PutUserEmailBodyDTO" }, verifyType: { required: true, type: () => Object, description: "\u9A8C\u8BC1\u7C7B\u522B `email` \u90AE\u7BB1 `phone` \u624B\u673A\n\n@author Zero <gczgroup@qq.com>\n@date 2024/02/13\n@type {(\"email\" | \"phone\")}\n@memberof PutUserEmailBodyDTO" }, verifyCode: { required: true, type: () => Number, description: "\u9A8C\u8BC1\u7801\n\n@author Zero <gczgroup@qq.com>\n@date 2024/02/13\n@type {string}\n@memberof PutUserEmailBodyDTO" } }, "PutUserPhoneBodyDTO": { newPhone: { required: true, type: () => String, description: "\u65B0\u624B\u673A\u53F7\n\n@type {string}\n@memberof PutUserPhoneBodyDTO" }, verifyType: { required: true, type: () => Object, description: "\u9A8C\u8BC1\u7C7B\u522B `email` \u90AE\u7BB1 `phone` \u624B\u673A\n\n@type {(\"email\" | \"phone\")}\n@memberof PutUserPhoneBodyDTO" }, verifyCode: { required: true, type: () => Number, description: "\u9A8C\u8BC1\u7801\n\n@type {string}\n@memberof PutUserPhoneBodyDTO" } } }], [import("./modules/user/dtos/user/user.dto"), { "GetUserQueryDTO": { orderRegisterTime: { required: false, type: () => Object, description: "\u6839\u636E\u6CE8\u518C\u65F6\u95F4\u6392\u5E8F\n\n@author Zero <gczgroup@qq.com>\n@date 2024/02/05\n@type {(\"ASC\" | \"DESC\")}\n@memberof GetUserQueryDTO", default: "late" }, take: { required: false, type: () => Number, description: "\u83B7\u53D6\u6570\u91CF\n\n@author Zero <gczgroup@qq.com>\n@date 2024/02/05\n@type {number}\n@memberof GetUserQueryDTO" }, skip: { required: false, type: () => Number, description: "\u8DF3\u8FC7\u6570\u91CF\n\n@author Zero <gczgroup@qq.com>\n@date 2024/02/05\n@type {number}\n@memberof GetUserQueryDTO" } } }], [import("./modules/user/dtos/user/data.dto"), { "GetUserDataQueryDTO": { key: { required: true, type: () => String, description: "\u83B7\u53D6\u7528\u6237\u6570\u636E\u7684\u952E\n\n@author Zero <gczgroup@qq.com>\n@date 2024/02/10\n@type {string}\n@memberof GetUserDataQueryDTO" } }, "PostUserDataBodyDTO": { key: { required: true, type: () => String, description: "\u8BBE\u7F6E\u7528\u6237\u6570\u636E\u7684\u952E\n\n@type {string}\n@memberof PostUserDataBodyDTO\n@author Zero <gczgroup@qq.com>\n@date 2024/02/10" }, value: { required: true, type: () => String, description: "\u8BBE\u7F6E\u7528\u6237\u6570\u636E\u7684\u503C\n\n@author Zero <gczgroup@qq.com>\n@date 2024/02/10\n@type {string}\n@memberof PostUserDataBodyDTO" }, selfDestruct: { required: false, type: () => Number, description: "\u8BBE\u7F6E\u7528\u6237\u6570\u636E\u7684\u81EA\u6BC1\u65F6\u95F4, \u5355\u4F4D\u79D2\n\n@type {number}\n@memberof PostUserDataBodyDTO" } }, "XXXUserDataBodyDTO": { s: { required: true, type: () => Number }, developerAccessKey: { required: true, type: () => String } } }], [import("./modules/user/dtos/user/developer.dto"), { "UserDeveloperAllDTO": { username: { required: true, type: () => String }, phone: { required: true, type: () => String } }, "UserDeveloperAllSubscribedDTO": { userID: { required: true, type: () => String } }, "UserDeveloperDeleteSubscribeDTO": { subscribeID: { required: true, type: () => String } }, "UserDeveloperCreateSubscribeDTO": { userID: { required: true, type: () => String }, packageID: { required: true, type: () => String } }, "UserDeveloperReceiptDTO": { userID: { required: true, type: () => String } }, "UserDeveloperReceiptSingleDTO": { orderID: { required: true, type: () => String } } }], [import("./modules/role/dtos/role/role.dto"), { "GetUserRolePermissionQueryDTO": { roleID: { required: true, type: () => String, description: "\u89D2\u8272ID\n\n@author Zero <gczgroup@qq.com>\n@date 2024/02/10\n@type {string}\n@memberof GetUserRolePermissionQueryDTO" } } }], [import("./modules/pay/dtos/pay/pay.dto"), { "PostUserPayBodyDTO": { payType: { required: true, type: () => Object, description: "\u652F\u4ED8\u7C7B\u578B \u8BF7\u770Bschema enum\u518D\u53D6\u503C\n\n@author Zero <gczgroup@qq.com>\n@date 2024/02/11\n@type {IPayType}\n@memberof PostUserPayBodyDTO" }, amount: { required: true, type: () => Number, description: "\u91D1\u989D \u5355\u4F4D\u5143\uFF0C\u5141\u8BB8\u5C0F\u6570\u70B9\u540E\u4E24\u4F4D\n\n@author Zero <gczgroup@qq.com>\n@date 2024/02/11\n@type {number}\n@memberof PostUserPayBodyDTO", minimum: 0.01 }, extraOptions: { required: false, type: () => Object, description: "\u66F4\u591A\u5145\u503C\u9009\u9879\u3002\u6BD4\u5982\u5F53\u652F\u4ED8\u7C7B\u578B\u4E3AWechat_Official\u65F6\uFF0C\u5FC5\u987B\u4F20\u5165`extraOptions.openid`\uFF0C\u5426\u5219\u4F1A\u62A5\u9519\n\n@author Zero <gczgroup@qq.com>\n@date 2024/02/11\n@type {Record<string, any>}\n@memberof PostUserPayBodyDTO" } }, "PayXunhupayQueryDTO": { payType: { required: true, type: () => Object, description: "\u652F\u4ED8\u7C7B\u578B \u8BF7\u770Bschema enum\u518D\u53D6\u503C\n\n@author Zero <gczgroup@qq.com>\n@date 2024/02/11\n@type {IPayType}\n@memberof PayXunhupayQueryDTO" }, orderID: { required: true, type: () => String, description: "\u8BA2\u5355\u53F7\n\n@type {string}\n@memberof PayXunhupayQueryDTO" } } }], [import("./modules/pay/dtos/pay/pay.res.dto"), { "PostUserPayDataReceipt201ResDTO": { userReceiptID: { required: true, type: () => String, description: "\u6536\u636EID\n\n@author Zero <gczgroup@qq.com>\n@date 2024/02/11\n@type {string}\n@memberof PostUserPayDataReceipt201ResDTO" }, createdAt: { required: true, type: () => Date, description: "\u521B\u5EFA\u65F6\u95F4\n\n@author Zero <gczgroup@qq.com>\n@date 2024/02/11\n@type {Date}\n@memberof PostUserPayDataReceipt201ResDTO" }, updatedAt: { required: true, type: () => Date, description: "\u66F4\u65B0\u65F6\u95F4\n\n@author Zero <gczgroup@qq.com>\n@date 2024/02/11\n@type {Date}\n@memberof PostUserPayDataReceipt201ResDTO" }, orderID: { required: true, type: () => String, description: "\u8BA2\u5355ID\n\n@author Zero <gczgroup@qq.com>\n@date 2024/02/11\n@type {string}\n@memberof PostUserPayDataReceipt201ResDTO" }, amount: { required: true, type: () => Number, description: "\u91D1\u989D\n\n@author Zero <gczgroup@qq.com>\n@date 2024/02/11\n@type {number}\n@memberof PostUserPayDataReceipt201ResDTO" }, userID: { required: true, type: () => String, description: "\u7528\u6237ID\n\n@author Zero <gczgroup@qq.com>\n@date 2024/02/11\n@type {string}\n@memberof PostUserPayDataReceipt201ResDTO" }, receiptStatus: { required: true, type: () => Object, description: "\u6536\u636E\u72B6\u6001 \u8BF7\u770Bschema\u679A\u4E3E\n\n@author Zero <gczgroup@qq.com>\n@date 2024/02/11\n@type {IReceiptStatus}\n@memberof PostUserPayDataReceipt201ResDTO" }, payType: { required: true, type: () => Object, description: "\u652F\u4ED8\u7C7B\u578B\n\n@author Zero <gczgroup@qq.com>\n@date 2024/02/11\n@type {string}\n@memberof PostUserPayDataReceipt201ResDTO" } }, "PostUserPayData201ResDTO": { remoteData: { required: true, type: () => Object, description: "\u8FDC\u7A0B\u6570\u636E\u3002\u5982\u679C\u662F\u8FC5\u864E\uFF0C\u4F1A\u8FD4\u56DE\u8FC5\u864E\u7684\u8BF7\u6C42\u4FE1\u606F\uFF1B\u5982\u679C\u662F\u5FAE\u4FE1\u5B98\u65B9\uFF0C\u4F1A\u8FD4\u56DE\u5FAE\u4FE1\u5B98\u65B9\u7684\u8BF7\u6C42\u4FE1\u606F\n\n\u8BF7`\u6839\u636E\u8FD9\u4E2A\u5BF9\u8C61\u5185\u7684\u6570\u636E`\uFF0C\u8FDB\u884C\u524D\u7AEF\u7684\u8FDB\u4E00\u6B65\u5BF9\u63A5\n\n* \u8FC5\u864E\u53C2\u8003\u6587\u6863\uFF1A[\u53D1\u8D77\u4ED8\u6B3E\u63A5\u53E3](https://www.xunhupay.com/doc/api/pay.html)\n* \u5FAE\u4FE1\u5B98\u65B9\u53C2\u8003\u6587\u6863\uFF1A[JSAPI\u652F\u4ED8](https://pay.weixin.qq.com/docs/merchant/apis/jsapi-payment/direct-jsons/jsapi-prepay.html)\n\n@author Zero <gczgroup@qq.com>\n@date 2024/02/11\n@type {Record<string, any>}\n@memberof PostUserPayData201ResDTO" }, receipt: { required: true, type: () => t["./modules/pay/dtos/pay/pay.res.dto"].PostUserPayDataReceipt201ResDTO, description: "\u6BCF\u6B21\u8BF7\u6C42\u90FD\u4F1A\u6709\u6536\u636E\u4FE1\u606F\uFF0C\u5305\u62EC\u6536\u636EID\u3001\u521B\u5EFA\u65F6\u95F4\u3001\u66F4\u65B0\u65F6\u95F4\u3001\u8BA2\u5355ID\u3001\u91D1\u989D\u3001\u7528\u6237ID\u3001\u6536\u636E\u72B6\u6001\u3001\u652F\u4ED8\u7C7B\u578B\u7B49\u6570\u636E\u3002\n\n\u4EE5\u540E\u540E\u7AEF\u4F1A\u6DFB\u52A0\u6536\u636E\u68C0\u67E5\u529F\u80FD\uFF1A\u5982\u679Cx\u5C0F\u65F6\u5185\u6CA1\u6709\u652F\u4ED8\u6210\u529F\uFF0C\u5C06\u4F1A\u81EA\u52A8\u5220\u9664\u6389\u6536\u636E\u3002\n\n@author Zero <gczgroup@qq.com>\n@date 2024/02/11\n@type {PostUserPayDataReceipt201ResDTO}\n@memberof PostUserPayData201ResDTO" } }, "PostUserPay201ResDTO": { statusCode: { required: true, type: () => Object, description: "HTTP\u72B6\u6001\u7801\n\n@author Zero <gczgroup@qq.com>\n@date 2024/02/11\n@memberof PostUserPay201ResDTO", default: 200 }, code: { required: true, type: () => Object, description: "\u72B6\u6001\u6D88\u606F \u9664\u975E\u8BF7\u6C42\u8FC7\u7A0B\u4E2D\u7F51\u7EDC\u8BF7\u6C42\u5931\u8D25\u624D\u4F1A\u4EA7\u751F\u5176\u4ED6\u7684\u72B6\u6001\u7801\u3002\n\n@author Zero <gczgroup@qq.com>\n@date 2024/02/11\n@memberof PostUserPay201ResDTO", default: 1000 }, message: { required: true, type: () => Object, description: "\u6D88\u606F \u9664\u975E\u8BF7\u6C42\u8FC7\u7A0B\u4E2D\u7F51\u7EDC\u8BF7\u6C42\u5931\u8D25\u624D\u4F1A\u629B\u51FA\u5176\u4ED6\u9519\u8BEF\u3002\u5176\u4F59\u7684\u60C5\u51B5\uFF0C\u8BF7\u6839\u636E`remoteData`\u7684\u5185\u5BB9\u53C2\u7167\u5BF9\u5E94\u7684\u5224\u65AD\n\n@author Zero <gczgroup@qq.com>\n@date 2024/02/11\n@memberof PostUserPay201ResDTO", default: "\u6210\u529F" }, timestamp: { required: true, type: () => Object, description: "\u65F6\u95F4\u6233\n\n@author Zero <gczgroup@qq.com>\n@date 2024/02/11\n@memberof PostUserPay201ResDTO", default: new Date() }, data: { required: true, type: () => t["./modules/pay/dtos/pay/pay.res.dto"].PostUserPayData201ResDTO, description: "\u6570\u636E\n\n@author Zero <gczgroup@qq.com>\n@date 2024/02/11\n@type {PostUserPayData201ResDTO}\n@memberof PostUserPay201ResDTO" } } }], [import("./modules/pay/dtos/receipt/receipt.dto"), { "GetUserReceiptQueryDTO": { orderCreatedAt: { required: false, description: "\u6839\u636E\u8BA2\u5355\u6392\u5E8F\u65F6\u95F4\u6392\u5E8F\n\n@author Zero <gczgroup@qq.com>\n@date 2024/02/11\n@type {UpdatedAtEnum}\n@memberof GetUserReceiptQueryDTO", enum: t["./modules/pay/enums/order.enum"].CreatedAtEnum }, orderUpdatedAt: { required: false, description: "\u6839\u636E\u8BA2\u5355\u66F4\u65B0\u65F6\u95F4\u6392\u5E8F\n\n@author Zero <gczgroup@qq.com>\n@date 2024/02/11\n@type {UpdatedAtEnum}\n@memberof GetUserReceiptQueryDTO", enum: t["./modules/pay/enums/order.enum"].UpdatedAtEnum }, take: { required: false, type: () => Number, description: "\u83B7\u53D6\u6570\u91CF\n\n@author Zero <gczgroup@qq.com>\n@date 2024/02/11\n@type {number}\n@memberof GetUserReceiptQueryDTO" }, skip: { required: false, type: () => Number, description: "\u8DF3\u8FC7\u6570\u91CF\n\n@author Zero <gczgroup@qq.com>\n@date 2024/02/11\n@type {number}\n@memberof GetUserReceiptQueryDTO" } } }], [import("./modules/pay/dtos/developer.dto"), { "PostPayDeveloperRefundBodyDTO": { reason: { required: true, type: () => String }, userReceiptID: { required: true, type: () => String } } }], [import("./modules/microsoft/microsoft.dto"), { "PostAndPutMicrosoftBodyDTO": { info: { required: true, type: () => String, description: "\u5FAE\u8F6F\u8D26\u53F7\u90AE\u7BB1\n\n@type {string}\n@memberof PostMicrosoftBodyDTO" } } }]], "controllers": [[import("./app.controller"), { "AppController": { "getHello": { summary: "\u4E3B\u9875\n\n@author Zero <gczgroup@qq.com>\n@date 2024/02/21\n@return {number}\n@memberof AppController", type: Number } } }], [import("./modules/login/controllers/login.controller"), { "LoginController": { "loginByPhoneCode": { summary: "\u624B\u673A\u53F7\u9A8C\u8BC1\u7801\u767B\u5F55\n\n@author Zero <gczgroup@qq.com>\n@date 2024/02/02" }, "loginByEmailCode": { summary: "\u90AE\u7BB1\u9A8C\u8BC1\u7801\u767B\u5F55\n\n@author Zero <gczgroup@qq.com>\n@date 2024/02/11" }, "confirmQrCode": { summary: "\u4E8C\u7EF4\u7801\u767B\u5F55\uFF1A\u786E\u8BA4\u767B\u5F55\n\n@author Zero <gczgroup@qq.com>\n@date 2024/01/31", type: Number }, "refreshQrCode": { summary: "\u4E8C\u7EF4\u7801\u767B\u5F55\uFF1A\u68C0\u67E5\u4E8C\u7EF4\u7801\u72B6\u6001\u5E76\u767B\u5F55\n\n@author Zero <gczgroup@qq.com>\n@date 2024/01/27\n@memberof LoginController" }, "loginByMicrosoft": { summary: "\u5FAE\u8F6F\u767B\u5F55\n\n@memberof LoginController" } } }], [import("./modules/login/controllers/logout.controller"), { "LogoutController": { "logout": { summary: "\u767B\u51FA\n\n@author Zero <gczgroup@qq.com>\n@date 2024/01/28", type: Number } } }], [import("./modules/transport/controllers/transport.controller"), { "TransportController": { "email": { summary: "\u53D1\u9001\u90AE\u7BB1\u9A8C\u8BC1\u7801\n\n@author Zero <gczgroup@qq.com>\n@date 2024/02/02\n@memberof TransportController", type: Object }, "phone": { summary: "\u53D1\u9001\u624B\u673A\u9A8C\u8BC1\u7801\n\n@author Zero <gczgroup@qq.com>\n@date 2024/02/02", type: Object }, "block": { type: String }, "unblock": { type: String } } }], [import("./modules/transport/controllers/qrcode.controller"), { "QrCodeController": { "getQrCode": { summary: "\u4E8C\u7EF4\u7801\u767B\u5F55\uFF1A\u83B7\u53D6\u4E8C\u7EF4\u7801\n\n@author Zero <gczgroup@qq.com>\n@date 2024/01/27\n@memberof QrCodeController" } } }], [import("./modules/register/controllers/register.controller"), { "RegisterController": { "registerByPhonePassword": { summary: "\u624B\u673A\u53F7\u9A8C\u8BC1\u7801\u6CE8\u518C\n\n@author Zero <gczgroup@qq.com>\n@date 2024/02/02" }, "registerByEmailPassword": { summary: "\u90AE\u7BB1\u9A8C\u8BC1\u7801\u6CE8\u518C\n\n@author Zero <gczgroup@qq.com>\n@date 2024/02/10" } } }], [import("./modules/user/controllers/change.controller"), { "UserChangerController": { "changeUsername": { summary: "\u4FEE\u6539\u7528\u6237\u540D\n\n@author Zero <gczgroup@qq.com>\n@date 2024/02/02\n@memberof UserChangerController", type: Object }, "changePassword": { summary: "\u5DF2\u767B\u5F55\u7528\u6237\u4FEE\u6539\u5BC6\u7801\n\n@author Zero <gczgroup@qq.com>\n@date 2024/02/13\n@memberof UserChangerController", type: Number }, "changeSaying": { summary: "\u4FEE\u6539\u4E2A\u6027\u7B7E\u540D\n\n@author Zero <gczgroup@qq.com>\n@date 2024/02/26", type: Number }, "changeEmail": { summary: "\u4FEE\u6539\u90AE\u7BB1\n\n@author Zero <gczgroup@qq.com>\n@date 2024/02/26", type: Number }, "changePhone": { summary: "\u4FEE\u6539\u624B\u673A\n\n@author Zero <gczgroup@qq.com>\n@date 2024/02/26", type: Number } } }], [import("./modules/user/controllers/user.controller"), { "UserController": { "getUser": { summary: "\u83B7\u53D6\u5DF2\u767B\u5F55\u7528\u6237\u4FE1\u606F\n\n@author Zero <gczgroup@qq.com>\n@date 2024/02/02" }, "getUserList": { summary: "\u83B7\u53D6\u7528\u6237\u5217\u8868\n\n@author Zero <gczgroup@qq.com>\n@date 2024/02/05\n@memberof UserController" }, "deleteUser": { summary: "\u6CE8\u9500\u8D26\u53F7\n\n@author Zero <gczgroup@qq.com>\n@date 2024/02/02" }, "getTokenInfo": { summary: "\u83B7\u53D6token\u4FE1\u606F" } } }], [import("./modules/user/controllers/data.controller"), { "UserDataController": { "getUserDataByKey": { summary: "\u83B7\u53D6\u7528\u6237\u6570\u636E\n\n@author Zero <gczgroup@qq.com>\n@date 2024/02/10\n@memberof UserDataController" }, "setUserDataByKey": { summary: "\u8BBE\u7F6E/\u66F4\u65B0\u7528\u6237\u6570\u636E\n\n@author Zero <gczgroup@qq.com>\n@date 2024/02/10" }, "deleteUserDataByKey": { summary: "\u5220\u9664\u7528\u6237\u6570\u636E\n\n@author Zero <gczgroup@qq.com>\n@date 2024/02/10" }, "xxx": {} } }], [import("./modules/user/controllers/developer.controller"), { "UserDeveloperController": { "getSingleUserByUsername": { summary: "\u67E5\u8BE2\u67D0\u4E2A\u7528\u6237\u540D/\u624B\u673A\u53F7\u4E0B\u7684\u6240\u6709\u7528\u6237\n\n@date 2024-12-11" }, "getSubscribed": { summary: "\u67E5\u8BE2\u67D0\u4E2A\u7528\u6237\u8BA2\u9605\u7684\u6240\u6709\u8BA2\u5355\n\n@date 2024-12-11" }, "deleteSubscribe": { summary: "\u5220\u9664\u67D0\u4E2A\u7528\u6237\u7684\u8BA2\u9605\n\n@date 2024-12-11" }, "createSubscribe": { summary: "\u624B\u52A8\u521B\u5EFA\u4E00\u4E2A\u8BA2\u9605\n\n@date 2024-12-11" }, "getUserReceipt": { summary: "\u83B7\u53D6\u67D0\u4E2A\u7528\u6237\u7684\u8BA2\u9605\u6536\u636E\n\n@date 2024-12-11" }, "getUserReceiptSingle": { summary: "\u901A\u8FC7orderID\u83B7\u53D6\u67D0\u4E2A\u7528\u6237\u7684\u5355\u4E2A\u8BA2\u9605\u6536\u636E" } } }], [import("./modules/role/controllers/role.controller"), { "RoleController": { "getRoles": { summary: "\u83B7\u53D6\u7528\u6237\u89D2\u8272\n\n@author Zero <gczgroup@qq.com>\n@date 2024/02/10" }, "getRolePermissions": { summary: "\u83B7\u53D6\u89D2\u8272\u8BE6\u60C5\n\n@author Zero <gczgroup@qq.com>\n@date 2024/02/10\n@memberof PermissionController" } } }], [import("./modules/role/controllers/permission.controller"), { "PermissionController": { "getPermissions": { summary: "\u83B7\u53D6\u6743\u9650\u5217\u8868\n\n@author Zero <gczgroup@qq.com>\n@date 2024/02/10\n@memberof PermissionController" } } }], [import("./modules/pay/controllers/pay.controller"), { "PayController": { "pay": { summary: "\u5145\u503C\n\n@author Zero <gczgroup@qq.com>\n@date 2024/02/11\n@memberof PayController", type: Object }, "notify": { summary: "\u864E\u76AE\u6912\uFF1A\u56DE\u8C03\u63A5\u53E3\n\n@author Zero <gczgroup@qq.com>\n@date 2024/02/11", type: String }, "query": { summary: "\u864E\u76AE\u6912\uFF1A\u67E5\u8BE2\u8BA2\u5355\n\n@author Zero <gczgroup@qq.com>\n@date 2024/03/13" } } }], [import("./modules/pay/controllers/receipt.controller"), { "ReceiptController": { "getReceipts": { summary: "\u83B7\u53D6\u5DF2\u767B\u5F55\u7528\u6237\u7684\u6536\u636E\u5217\u8868\n\n@author Zero <gczgroup@qq.com>\n@date 2024/02/11" }, "getReceipt": { summary: "\u6839\u636EID\u83B7\u53D6\u5355\u4E2A\u6536\u636E" } } }], [import("./modules/pay/controllers/developer.controller"), { "PayDeveloperController": { "refund": { summary: "\u9000\u6B3E\n\n@date 2024-12-18\n@author Zero <gczgroup@qq.com>\n@memberof PayDeveloperController", type: Object } } }], [import("./modules/microsoft/microsoft.controller"), { "MicrosoftController": { "bindMicrosoft": { summary: "\u7ED1\u5B9A\u5FAE\u8F6F\u8D26\u53F7" }, "updateMicrosoft": { summary: "\u66F4\u65B0\u5FAE\u8F6F\u8D26\u53F7" }, "unbindMicrosoft": { summary: "\u89E3\u7ED1\u5FAE\u8F6F\u8D26\u53F7" } } }]] } };
};