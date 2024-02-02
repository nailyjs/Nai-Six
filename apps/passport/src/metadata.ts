/* eslint-disable */
export default async () => {
  const t = {};
  return {
    "@nestjs/swagger": {
      models: [
        [
          import("./modules/login/dtos/phone/phone.dto"),
          {
            PostLoginPhoneCodeBodyDTO: {
              phone: { required: true, type: () => String, description: "\u90AE\u7BB1" },
              code: { required: true, type: () => Number, description: "\u9A8C\u8BC1\u7801", minimum: 100000, maximum: 999999 },
              loginType: {
                required: true,
                type: () => Object,
                description: "\u767B\u5F55\u8BBE\u5907\u7C7B\u578B `\u8BF7\u770Bschema\u7684enum\u6B63\u786E\u4F20\u503C`",
              },
              loginClient: {
                required: false,
                type: () => String,
                description:
                  "\u767B\u5F55\u7684\u5BA2\u6237\u7AEF \u7528\u4E8E\u8BB0\u5F55\u8BBE\u5907/\u6D4F\u89C8\u5668\n\nWeb\u7AEF\u767B\u5F55\u65F6\uFF0C\u8BE5\u5B57\u6BB5\u53EF\u4EE5\u4E3A\u7A7A",
              },
              loginDeviceName: {
                required: false,
                type: () => String,
                description: "\u767B\u5F55\u7684\u8BBE\u5907\u540D\n\nWeb\u7AEF\u767B\u5F55\u65F6\uFF0C\u8BE5\u5B57\u6BB5\u53EF\u4EE5\u4E3A\u7A7A",
              },
              identifier: {
                required: false,
                type: () => String,
                description:
                  "\u8BBE\u5907\u552F\u4E00\u6807\u8BC6\u7B26\n\nWeb\u7AEF\u767B\u5F55\u65F6\uFF0C\u8BE5\u5B57\u6BB5\u53EF\u4EE5\u4E3A\u7A7A",
              },
            },
          },
        ],
        [
          import("./modules/login/dtos/qrcode/qrcode.dto"),
          {
            PostLoginQrcodeConfirmBodyDTO: { key: { required: true, type: () => String, description: "\u4E8C\u7EF4\u7801key" } },
            PostLoginQrcodeBodyDTO: {
              key: { required: true, type: () => String, description: "\u4E8C\u7EF4\u7801key" },
              loginType: {
                required: true,
                type: () => Object,
                description: "\u767B\u5F55\u8BBE\u5907\u7C7B\u578B `\u8BF7\u770Bschema\u7684enum\u6B63\u786E\u4F20\u503C`",
              },
              loginClient: {
                required: false,
                type: () => String,
                description:
                  "\u767B\u5F55\u7684\u5BA2\u6237\u7AEF \u7528\u4E8E\u8BB0\u5F55\u8BBE\u5907/\u6D4F\u89C8\u5668\n\nWeb\u7AEF\u767B\u5F55\u65F6\uFF0C\u8BE5\u5B57\u6BB5\u53EF\u4EE5\u4E3A\u7A7A",
              },
              loginDeviceName: {
                required: false,
                type: () => String,
                description: "\u767B\u5F55\u7684\u8BBE\u5907\u540D\n\nWeb\u7AEF\u767B\u5F55\u65F6\uFF0C\u8BE5\u5B57\u6BB5\u53EF\u4EE5\u4E3A\u7A7A",
              },
              identifier: {
                required: false,
                type: () => String,
                description:
                  "\u8BBE\u5907\u552F\u4E00\u6807\u8BC6\u7B26\n\nWeb\u7AEF\u767B\u5F55\u65F6\uFF0C\u8BE5\u5B57\u6BB5\u53EF\u4EE5\u4E3A\u7A7A",
              },
            },
          },
        ],
        [
          import("./modules/transport/dtos/email/email.dto"),
          { PostTransportEmailBodyDTO: { email: { required: true, type: () => String, description: "\u90AE\u7BB1" } } },
        ],
        [
          import("./modules/transport/dtos/phone/phone.dto"),
          { PostTransportPhoneBodyDTO: { phone: { required: true, type: () => String, description: "\u624B\u673A\u53F7" } } },
        ],
        [
          import("./modules/register/dtos/phone/phone.dto"),
          {
            PostRegisterPhoneCodeBodyDTO: {
              phone: { required: true, type: () => String, description: "\u624B\u673A\u53F7 \u4E2D\u56FD\u5927\u9646" },
              username: {
                required: false,
                type: () => String,
                description: "\u7528\u6237\u540D \u53EF\u9009 \u4E3A\u7A7A\u65F6\u81EA\u52A8\u751F\u6210",
              },
              code: { required: true, type: () => Number, description: "\u9A8C\u8BC1\u7801", maximum: 999999 },
            },
          },
        ],
        [
          import("./modules/user/dtos/change/change.dto"),
          { PutUserUsernameBodyDTO: { username: { required: true, type: () => String, description: "\u65B0\u7528\u6237\u540D" } } },
        ],
      ],
      controllers: [
        [import("./app.controller"), { AppController: { getHello: { type: Number } } }],
        [
          import("./modules/login/controllers/login.controller"),
          {
            LoginController: {
              loginByPhoneCode: { summary: "\u624B\u673A\u53F7\u9A8C\u8BC1\u7801\u767B\u5F55" },
              confirmQrCode: { summary: "\u4E8C\u7EF4\u7801\u767B\u5F55\uFF1A\u786E\u8BA4\u767B\u5F55", type: Number },
              refreshQrCode: { summary: "\u4E8C\u7EF4\u7801\u767B\u5F55\uFF1A\u68C0\u67E5\u4E8C\u7EF4\u7801\u72B6\u6001\u5E76\u767B\u5F55" },
            },
          },
        ],
        [
          import("./modules/transport/controllers/transport.controller"),
          {
            TransportController: {
              email: { summary: "\u53D1\u9001\u90AE\u7BB1\u9A8C\u8BC1\u7801", type: Object },
              phone: { summary: "\u53D1\u9001\u624B\u673A\u9A8C\u8BC1\u7801", type: Object },
            },
          },
        ],
        [
          import("./modules/transport/controllers/qrcode.controller"),
          { QrCodeController: { getQrCode: { summary: "\u4E8C\u7EF4\u7801\u767B\u5F55\uFF1A\u83B7\u53D6\u4E8C\u7EF4\u7801" } } },
        ],
        [import("./modules/login/controllers/logout.controller"), { LogoutController: { logout: { summary: "\u767B\u51FA", type: Number } } }],
        [
          import("./modules/register/controllers/register.controller"),
          { RegisterController: { registerByPhonePassword: { summary: "\u624B\u673A\u53F7\u9A8C\u8BC1\u7801\u6CE8\u518C" } } },
        ],
        [
          import("./modules/user/controllers/change.controller"),
          { UserChangerController: { changeUsername: { summary: "\u4FEE\u6539\u7528\u6237\u540D", type: Object } } },
        ],
        [
          import("./modules/user/controllers/user.controller"),
          {
            UserController: {
              getUser: { summary: "\u83B7\u53D6\u5DF2\u767B\u5F55\u7528\u6237\u4FE1\u606F" },
              deleteUser: { summary: "\u6CE8\u9500\u8D26\u53F7" },
            },
          },
        ],
      ],
    },
  };
};
