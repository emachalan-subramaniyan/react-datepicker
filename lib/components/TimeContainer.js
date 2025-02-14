"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var React = require("react");
var TimeInput_1 = require("./TimeInput");
var FunctionUtil_1 = require("../utils/FunctionUtil");
var TimeContainer = /** @class */ (function (_super) {
    __extends(TimeContainer, _super);
    function TimeContainer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            allowedTime: _this.props.allowedTime,
            starthour: _this.props.allowedTime ? 8 : new Date().getHours() % 12 || 12,
            startminute: _this.props.allowedTime ? 0 : _this.props.minute || 0,
            startsessions: _this.props.allowedTime ? "AM" : new Date().getHours() >= 12 ? 'PM' : 'AM',
            endhour: _this.props.allowedTime ? 4 : new Date().getHours() % 12 || 12,
            endminute: _this.props.allowedTime ? 59 : _this.props.minute || 0,
            endsessions: _this.props.allowedTime ? "PM" : new Date().getHours() >= 12 ? 'PM' : 'AM',
        };
        _this.handleChange = function (item) { return function (e) {
            var _a;
            var min = 0;
            var max = item === 'starthour' || item === 'endhour' ? 12 : 59;
            var value = parseInt(e.currentTarget.value, 10);
            if (isNaN(value)) {
                value = 0;
            }
            if (max < value) {
                value = max;
            }
            if (min > value) {
                value = min;
            }
            _this.setState(__assign(__assign({}, _this.state), (_a = {}, _a[item] = value, _a)), function () { return _this.invokeOnChange(); });
        }; };
        _this.handleUp = function (item, data) { return function () {
            var maxd = 12;
            if (_this.props.allowedTime === true && _this.state.startsessions === "AM" && data === "startsessions" && _this.state.starthour < 8) {
                _this.setState({ starthour: 8 }, function () { _this.upChangeFunction(item, maxd); });
            }
            else if (_this.props.allowedTime === true && _this.state.endsessions === "AM" && data === "endsessions" && _this.state.endhour < 8) {
                _this.setState({ endhour: 8 }, function () { _this.upChangeFunction(item, maxd); });
            }
            else {
                if (_this.props.allowedTime === true && _this.state.startsessions === "PM" && data === "startsessions") {
                    maxd = 4;
                }
                else if (_this.props.allowedTime === true && _this.state.endsessions === "PM" && data === "endsessions") {
                    maxd = 4;
                }
                _this.upChangeFunction(item, maxd);
            }
        }; };
        _this.upChangeFunction = function (item, maxd) {
            var _a;
            var max = item === 'starthour' || item === 'endhour' ? maxd : 59;
            var value = _this.state[item];
            var _b = _this.props, startdate = _b.startdate, enddate = _b.enddate;
            var starting = new Date(startdate);
            var ending = new Date(enddate);
            if (+starting === +ending && item === 'starthour') {
                _this.setState(__assign(__assign({}, _this.state), { starthour: Math.min(value + 1, max), endhour: Math.min(value + 1, max) }), function () { return _this.invokeOnChange(); });
            }
            else if (+starting === +ending && _this.state.starthour === _this.state.endhour && item === 'startminute') {
                _this.setState(__assign(__assign({}, _this.state), { startminute: Math.min(value + 1, max), endminute: Math.min(value + 1, max) }), function () { return _this.invokeOnChange(); });
            }
            else {
                _this.setState(__assign(__assign({}, _this.state), (_a = {}, _a[item] = Math.min(value + 1, max), _a)), function () { return _this.invokeOnChange(); });
            }
        };
        _this.handleDown = function (item, data) { return function () {
            var _a = _this.props, startdate = _a.startdate, enddate = _a.enddate;
            var starting = new Date(startdate);
            var ending = new Date(enddate);
            var value = _this.state[item];
            var min = 0;
            if (item === "endhour" && +starting === +ending && _this.state.starthour >= _this.state.endhour && _this.state.startsessions === _this.state.endsessions) {
                // console.log('happen', this.state.starthour, )
            }
            else if (item === "endminute" && +starting === +ending && _this.state.starthour === _this.state.endhour && _this.state.startsessions === _this.state.endsessions && _this.state.startminute >= _this.state.endminute) {
                // console.log('happen', this.state.startminute, )
            }
            else if (_this.props.allowedTime === true && _this.state.startsessions === "PM" && data === "startsessions" && _this.state.starthour > 4) {
                _this.setState(__assign(__assign({}, _this.state), { starthour: 4 }), function () { _this.downChangeFunction(item, min); });
            }
            else if (_this.props.allowedTime === true && _this.state.endsessions === "PM" && data === "endsessions" && _this.state.endhour > 4) {
                _this.setState({ endhour: 4 }, function () { _this.downChangeFunction(item, min); });
            }
            else if (_this.props.allowedTime === true && _this.state.endsessions === "PM" && data === "endsessions" && item === 'endhour') {
                _this.downChangeFunction(item, min);
            }
            else {
                if (_this.props.allowedTime === true && _this.state.startsessions === "AM" && data === "startsessions" && item === 'starthour') {
                    min = 8;
                }
                else if (_this.props.allowedTime === true && _this.state.endsessions === "AM" && data === "endsessions" && item === 'endhour') {
                    min = 8;
                }
                _this.downChangeFunction(item, min);
            }
        }; };
        _this.downChangeFunction = function (item, min) {
            var _a;
            var _b = _this.props, startdate = _b.startdate, enddate = _b.enddate;
            var starting = new Date(startdate);
            var ending = new Date(enddate);
            var value = _this.state[item];
            if (+starting === +ending && item === 'starthour') {
                _this.setState(__assign(__assign({}, _this.state), { starthour: Math.max(value - 1, min), endhour: Math.max(value - 1, min) }), function () { return _this.invokeOnChange(); });
            }
            else {
                _this.setState(__assign(__assign({}, _this.state), (_a = {}, _a[item] = Math.max(value - 1, min), _a)), function () { return _this.invokeOnChange(); });
            }
        };
        _this.handleSession = function (data, item) { return function () {
            var _a, _b;
            var _c = _this.state, starthour = _c.starthour, startminute = _c.startminute, startsessions = _c.startsessions, endhour = _c.endhour, endminute = _c.endminute, endsessions = _c.endsessions;
            if (data === 'startsessions' && starthour >= endhour && startminute >= endminute) {
                _this.setState(__assign(__assign({}, _this.state), { startsessions: startsessions === 'AM' ? 'PM' : 'AM', endsessions: startsessions === 'AM' ? 'PM' : 'AM', endhour: starthour, endminute: startminute }), function () { return _this.invokeOnChange(); });
            }
            else if (data === 'endsessions' && startsessions != 'PM') {
                _this.setState(__assign(__assign({}, _this.state), (_a = {}, _a[data] = item === 'AM' ? 'PM' : 'AM', _a)), function () { return _this.invokeOnChange(); });
            }
            else {
                _this.setState(__assign(__assign({}, _this.state), (_b = {}, _b[data] = item === 'AM' ? 'PM' : 'AM', _b)), function () { return _this.invokeOnChange(); });
            }
        }; };
        _this.handleBlur = function () {
            var onBlur = _this.props.onBlur;
            var _a = _this.state, starthour = _a.starthour, startminute = _a.startminute;
            FunctionUtil_1.ifExistCall(onBlur, starthour, startminute);
        };
        _this.invokeOnChange = function () {
            var onChange = _this.props.onChange;
            var _a = _this.state, starthour = _a.starthour, startminute = _a.startminute, startsessions = _a.startsessions, endhour = _a.endhour, endminute = _a.endminute, endsessions = _a.endsessions;
            var starttime = starthour + ":" + (startminute >= 10 ? startminute : 0 + String(startminute)) + " " + startsessions;
            var endtime = endhour + ":" + (endminute >= 10 ? endminute : 0 + String(endminute)) + " " + endsessions;
            FunctionUtil_1.ifExistCall(onChange, starttime, endtime);
        };
        _this.onNowPress = function (data) {
            if (data === "startsessions") {
                _this.setState(__assign(__assign({}, _this.state), { starthour: new Date().getHours() % 12 || 12, startminute: new Date().getMinutes() || 0, startsessions: new Date().getHours() >= 12 ? 'PM' : 'AM' }), function () { return _this.invokeOnChange(); });
            }
            else {
                _this.setState(__assign(__assign({}, _this.state), { endhour: new Date().getHours() % 12 || 12, endminute: new Date().getMinutes() || 0, endsessions: new Date().getHours() >= 12 ? 'PM' : 'AM' }), function () { return _this.invokeOnChange(); });
            }
        };
        _this.onTimePress = function (data) {
            if (data === "startsessions") {
                _this.setState(__assign(__assign({}, _this.state), { starthour: 12, startminute: 0, startsessions: 'AM' }), function () { return _this.invokeOnChange(); });
            }
            else {
                _this.setState(__assign(__assign({}, _this.state), { endhour: 12, endminute: 0, endsessions: 'AM' }), function () { return _this.invokeOnChange(); });
            }
        };
        return _this;
    }
    TimeContainer.prototype.render = function () {
        var _this = this;
        var d = new Date();
        var _a = this.state, starthour = _a.starthour, startminute = _a.startminute, startsessions = _a.startsessions, endhour = _a.endhour, endminute = _a.endminute, endsessions = _a.endsessions;
        return (React.createElement("div", { className: "sample-check" },
            React.createElement("div", { className: "time__container" },
                React.createElement("div", null, "Start Time"),
                (this.props.allowedTime && ((d.getHours() % 12) > 5)) ? null : React.createElement("div", { className: "container_flx" },
                    React.createElement("div", { className: "time-container mouse-over", onClick: function () { return _this.onTimePress("startsessions"); } }, "12:00 AM "),
                    React.createElement("div", { className: "time-container mouse-over", onClick: function () { return _this.onNowPress("startsessions"); } }, " NOW")),
                React.createElement("div", { className: "time-style" },
                    React.createElement("div", null,
                        React.createElement("div", null, "Hours"),
                        React.createElement("div", { className: "ed-time" },
                            React.createElement(TimeInput_1.default, { onUp: this.handleUp('starthour', "startsessions"), onDown: this.handleDown('starthour', "startsessions"), onChange: this.handleChange('starthour'), onBlur: this.handleBlur, value: starthour }))),
                    React.createElement("div", { className: "time__container__div" }, ":"),
                    React.createElement("div", null,
                        React.createElement("div", null, "Minutes"),
                        React.createElement("div", { className: "ed-time" },
                            React.createElement(TimeInput_1.default, { onUp: this.handleUp('startminute', "startsessions"), onDown: this.handleDown('startminute', "startsessions"), onChange: this.handleChange('startminute'), onBlur: this.handleBlur, value: startminute }))),
                    React.createElement("div", { className: "time__container__div colon" }, ":"),
                    React.createElement("div", null,
                        React.createElement("div", null, "AM/PM"),
                        React.createElement("div", { className: "ed-time" },
                            React.createElement(TimeInput_1.default, { onUp: this.handleSession('startsessions', startsessions), onDown: this.handleSession('startsessions', startsessions), onBlur: this.handleBlur, value: startsessions }))))),
            React.createElement("div", { className: "time__container" },
                React.createElement("div", null, "End Time"),
                (this.props.allowedTime && ((d.getHours() % 12) > 5)) ? null : React.createElement("div", { className: "container_flx" },
                    React.createElement("div", { className: "time-container mouse-over", onClick: function () { return _this.onTimePress("endsessions"); } }, "12:00 AM "),
                    React.createElement("div", { className: "time-container mouse-over", onClick: function () { return _this.onNowPress("endsessions"); } }, " NOW")),
                React.createElement("div", { className: "time-style" },
                    React.createElement("div", null,
                        React.createElement("div", null, "Hours"),
                        React.createElement("div", { className: "ed-time" },
                            React.createElement(TimeInput_1.default, { onUp: this.handleUp('endhour', "endsessions"), onDown: this.handleDown('endhour', "endsessions"), onChange: this.handleChange('endhour'), onBlur: this.handleBlur, value: endhour }))),
                    React.createElement("div", { className: "time__container__div" }, ":"),
                    React.createElement("div", null,
                        React.createElement("div", null, "Minutes"),
                        React.createElement("div", { className: "ed-time" },
                            React.createElement(TimeInput_1.default, { onUp: this.handleUp('endminute', "endsessions"), onDown: this.handleDown('endminute', "endsessions"), onChange: this.handleChange('endminute'), onBlur: this.handleBlur, value: endminute }))),
                    React.createElement("div", { className: "time__container__div" }, ":"),
                    React.createElement("div", null,
                        React.createElement("div", null, "AM/PM"),
                        React.createElement("div", { className: "ed-time" },
                            React.createElement(TimeInput_1.default, { onUp: this.handleSession('endsessions', endsessions), onDown: this.handleSession('endsessions', endsessions), onBlur: this.handleBlur, value: endsessions })))))));
    };
    return TimeContainer;
}(React.Component));
exports.default = TimeContainer;
//# sourceMappingURL=TimeContainer.js.map