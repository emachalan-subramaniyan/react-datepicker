"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lpad = void 0;
exports.lpad = function (val, length, char) {
    if (char === void 0) { char = '0'; }
    return val.length < length ? char.repeat(length - val.length) + val : val;
};
//# sourceMappingURL=StringUtil.js.map