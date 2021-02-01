"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDate = exports.isDayRange = exports.isDayBefore = exports.isDayAfter = exports.isDayEqual = exports.getYearMatrix = exports.getMonthMatrix = exports.getDayMatrix = void 0;
var ArrayUtil_1 = require("./ArrayUtil");
var dayjs = require("dayjs");
var LocaleUtil_1 = require("./LocaleUtil");
exports.getDayMatrix = function (year, month) {
    var date = dayjs()
        .year(year)
        .month(month);
    var startOfMonth = date.startOf('month').date();
    var endOfMonth = date.endOf('month').date();
    var startDay = date.startOf('month').day();
    var remain = (startDay + endOfMonth) % 7;
    return ArrayUtil_1.chunk(__spreadArrays(ArrayUtil_1.repeat(' ', startDay), ArrayUtil_1.range(startOfMonth, endOfMonth + 1).map(function (v) { return "" + v; }), (7 - remain === 7 ? [] : ArrayUtil_1.repeat(' ', 7 - remain))), 7);
};
exports.getMonthMatrix = function (locale) {
    return ArrayUtil_1.chunk(LocaleUtil_1.getMonthShort(locale), 3);
};
exports.getYearMatrix = function (year) {
    return ArrayUtil_1.chunk(ArrayUtil_1.range(year - 4, year + 5).map(function (v) { return "" + v; }), 3);
};
exports.isDayEqual = function (day1, day2) {
    if (!day1 || !day2)
        return false;
    return dayjs(day1).isSame(day2, 'date');
};
exports.isDayAfter = function (day1, day2) {
    return dayjs(day1).isAfter(day2, 'date');
};
exports.isDayBefore = function (day1, day2) {
    return dayjs(day1).isBefore(day2, 'date');
};
exports.isDayRange = function (date, start, end) {
    if (!start || !end)
        return false;
    return exports.isDayAfter(date, start) && exports.isDayBefore(date, end);
};
exports.formatDate = function (date, format) {
    if (date === undefined)
        return '';
    return dayjs(date).format(format);
};
//# sourceMappingURL=DateUtil.js.map