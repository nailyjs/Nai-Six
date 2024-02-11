/* eslint-disable */
export default async () => {
  const t = {
    ["./modules/role/enums/index"]: await import("./modules/role/enums/index"),
  };
  return {
    "@nestjs/swagger": {
      models: [
        [
          import("./modules/role/dtos/role.dto"),
          {
            GetUserRoleQueryDTO: {
              orderCreatedAt: { required: false, type: () => Object },
              orderUpdatedAt: { required: false, type: () => Object },
              take: { required: false, type: () => Number },
              skip: { required: false, type: () => Number },
            },
            PostUserRoleBodyDTO: {
              roleName: { required: true, type: () => String, description: "\u89D2\u8272\u540D\u79F0 (\u552F\u4E00)" },
              roleDescription: { required: true, type: () => String, description: "\u89D2\u8272\u63CF\u8FF0" },
              isPublic: { required: true, type: () => Boolean, description: "\u662F\u5426\u516C\u5F00" },
              permissions: { required: true, type: () => [String], description: "\u6743\u9650ID\u5217\u8868" },
            },
            PutUserRoleBodyDTO: { roleID: { required: true, type: () => String, description: "\u89D2\u8272ID" } },
            PatchUserRoleBodyDTO: {
              userID: { required: true, type: () => String, description: "\u7528\u6237ID" },
              roleID: { required: true, type: () => String, description: "\u89D2\u8272ID" },
            },
            DeleteUserRoleBodyDTO: { roleID: { required: true, type: () => String, description: "\u89D2\u8272ID" } },
          },
        ],
        [
          import("./modules/role/dtos/permission.dto"),
          {
            GetUserPermissionQueryDTO: {
              orderCreatedAt: {
                required: true,
                description: "\u521B\u5EFA\u65F6\u95F4 \u6392\u5E8F\u65B9\u5F0F",
                enum: t["./modules/role/enums/index"].CreatedAtEnum,
              },
              orderUpdatedAt: {
                required: true,
                description: "\u66F4\u65B0\u65F6\u95F4 \u6392\u5E8F\u65B9\u5F0F",
                enum: t["./modules/role/enums/index"].UpdatedAtEnum,
              },
              take: { required: false, type: () => Number, description: "\u6BCF\u9875\u6570\u91CF" },
              skip: { required: false, type: () => Number, description: "\u8DF3\u8FC7\u6570\u91CF" },
            },
            PostUserPermissionBodyDTO: {
              permissionName: { required: true, type: () => String, description: "\u6743\u9650\u540D\u79F0" },
              permissionDescription: { required: true, type: () => String, description: "\u6743\u9650\u63CF\u8FF0" },
              isPublic: { required: true, type: () => Boolean, description: "\u662F\u5426\u516C\u5F00" },
            },
            PutUserPermissionBodyDTO: { permissionID: { required: true, type: () => String, description: "\u6743\u9650ID" } },
          },
        ],
      ],
      controllers: [
        [
          import("./app.controller"),
          { AppController: { getHello: {}, getLogging: { summary: "\u5DF2\u767B\u5F55\u7528\u6237 \u68C0\u67E5\u6743\u9650", type: Object } } },
        ],
        [
          import("./modules/role/controllers/role.controller"),
          {
            RoleController: {
              getRoles: { summary: "\u83B7\u53D6\u5168\u90E8\u7684\u89D2\u8272\u5217\u8868" },
              createRole: { summary: "\u521B\u5EFA\u89D2\u8272" },
              updateRole: { summary: "\u66F4\u65B0\u89D2\u8272" },
              updateUserRole: { summary: "\u66F4\u65B0\u67D0\u7528\u6237\u7684\u89D2\u8272" },
              deleteRole: { summary: "\u5220\u9664\u89D2\u8272", type: Object },
            },
          },
        ],
      ],
    },
  };
};
