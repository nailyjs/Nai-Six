/* eslint-disable */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {
        __proto__: null
    };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
const _default = async ()=>{
    const t = {};
    return {
        "@nestjs/swagger": {
            "models": [
                [
                    Promise.resolve().then(()=>/*#__PURE__*/ _interop_require_wildcard(require("./modules/subscribe/dtos/subscribe.dto"))),
                    {
                        "GetGPTSubscribeQueryDTO": {
                            orderCreatedAt: {
                                required: false,
                                type: ()=>Object,
                                description: "\u8BA2\u9605\u8BA2\u5355\u521B\u5EFA\u65F6\u95F4\u6392\u5E8F"
                            }
                        },
                        "PostGPTSubscribeBodyDTO": {
                            packageID: {
                                required: true,
                                type: ()=>String,
                                description: "\u5957\u9910ID"
                            }
                        },
                        "PostGPTSubscribeAdminBodyDTO": {
                            name: {
                                required: true,
                                type: ()=>String
                            },
                            description: {
                                required: true,
                                type: ()=>String
                            },
                            price: {
                                required: true,
                                type: ()=>Number
                            },
                            days: {
                                required: true,
                                type: ()=>Number
                            }
                        }
                    }
                ]
            ],
            "controllers": [
                [
                    Promise.resolve().then(()=>/*#__PURE__*/ _interop_require_wildcard(require("./app.controller"))),
                    {
                        "AppController": {
                            "getHello": {
                                type: Number
                            }
                        }
                    }
                ],
                [
                    Promise.resolve().then(()=>/*#__PURE__*/ _interop_require_wildcard(require("./modules/subscribe/controllers/subscribe.controller"))),
                    {
                        "SubscribeController": {
                            "getUserSubscribeStatus": {
                                summary: "\u83B7\u53D6\u7528\u6237GPT\u8BA2\u9605\u8BA2\u5355\u5217\u8868"
                            },
                            "getSubscribePackage": {
                                summary: "\u83B7\u53D6GPT\u8BA2\u9605\u5957\u9910\u5217\u8868"
                            },
                            "subscribe": {
                                summary: "\u8BA2\u9605GPT"
                            },
                            "getSubscribeStatus": {
                                summary: "\u83B7\u53D6\u7528\u6237GPT\u8BA2\u9605\u5929\u6570"
                            }
                        }
                    }
                ],
                [
                    Promise.resolve().then(()=>/*#__PURE__*/ _interop_require_wildcard(require("./modules/subscribe/controllers/admin.controller"))),
                    {
                        "AdminSubscribeController": {
                            "createSubscribePackage": {
                                summary: "\u521B\u5EFAGPT\u8BA2\u9605\u5957\u9910"
                            }
                        }
                    }
                ]
            ]
        }
    };
};
