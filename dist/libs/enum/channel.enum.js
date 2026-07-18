"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelNameEnum = exports.ChannelCodeEnum = exports.ChannelEnum = void 0;
var ChannelEnum;
(function (ChannelEnum) {
    ChannelEnum[ChannelEnum["EMAIL"] = 1] = "EMAIL";
    ChannelEnum[ChannelEnum["SHORT_CODE"] = 2] = "SHORT_CODE";
    ChannelEnum[ChannelEnum["LONG_CODE"] = 3] = "LONG_CODE";
})(ChannelEnum || (exports.ChannelEnum = ChannelEnum = {}));
var ChannelCodeEnum;
(function (ChannelCodeEnum) {
    ChannelCodeEnum["EMAIL"] = "email";
    ChannelCodeEnum["SHORT_CODE"] = "short_code";
    ChannelCodeEnum["LONG_CODE"] = "long_code";
})(ChannelCodeEnum || (exports.ChannelCodeEnum = ChannelCodeEnum = {}));
var ChannelNameEnum;
(function (ChannelNameEnum) {
    ChannelNameEnum["EMAIL"] = "Email";
    ChannelNameEnum["SHORT_CODE"] = "SMS Short Code";
    ChannelNameEnum["LONG_CODE"] = "SMS Long Code";
})(ChannelNameEnum || (exports.ChannelNameEnum = ChannelNameEnum = {}));
//# sourceMappingURL=channel.enum.js.map