"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Down = exports.Up = exports.Time = exports.RightArrow = exports.LeftArrow = exports.Clear = exports.Calendar = void 0;
var React = require("react");
var IconBase_1 = require("./IconBase");
var Calendar = function (props) { return (React.createElement(IconBase_1.default, __assign({}, props),
    React.createElement("path", { fill: 'rgba(0, 0, 0, 0.54)', d: "M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z" }))); };
exports.Calendar = Calendar;
var Clear = function (props) { return (React.createElement(IconBase_1.default, __assign({}, props),
    React.createElement("path", { fill: "none", d: "M0 0h24v24H0V0z" }),
    React.createElement("path", { d: "M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z" }))); };
exports.Clear = Clear;
var LeftArrow = function (props) { return (React.createElement(IconBase_1.default, __assign({}, props),
    React.createElement("path", { fill: 'rgba(0, 0, 0, 0.54)', d: "M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" }))); };
exports.LeftArrow = LeftArrow;
var RightArrow = function (props) { return (React.createElement(IconBase_1.default, __assign({}, props),
    React.createElement("path", { fill: 'rgba(0, 0, 0, 0.54)', d: "M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" }))); };
exports.RightArrow = RightArrow;
var Time = function (props) { return (React.createElement(IconBase_1.default, __assign({}, props),
    React.createElement("path", { fill: 'rgba(0, 0, 0, 0.54)', d: "M7.88 3.39L6.6 1.86 2 5.71l1.29 1.53 4.59-3.85zM22 5.72l-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72zM12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7zm1-11h-2v3H8v2h3v3h2v-3h3v-2h-3V9z" }),
    React.createElement("path", { d: "M0 0h24v24H0z", fill: "none" }))); };
exports.Time = Time;
var Up = function (props) { return (React.createElement(IconBase_1.default, __assign({}, props),
    React.createElement("path", { d: "M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" }),
    React.createElement("path", { d: "M0 0h24v24H0z", fill: "none" }))); };
exports.Up = Up;
var Down = function (props) { return (React.createElement(IconBase_1.default, __assign({}, props),
    React.createElement("path", { d: "M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" }),
    React.createElement("path", { fill: "none", d: "M0 0h24v24H0V0z" }))); };
exports.Down = Down;
//# sourceMappingURL=Icons.js.map