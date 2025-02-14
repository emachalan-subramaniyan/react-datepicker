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
var ArrayUtil_1 = require("../utils/ArrayUtil");
var dayjs = require("dayjs");
var React = require("react");
var CalendarContainer_1 = require("./CalendarContainer");
var Calendar = /** @class */ (function (_super) {
    __extends(Calendar, _super);
    function Calendar(props) {
        var _this = _super.call(this, props) || this;
        _this.setBase = function (base) {
            _this.setState({ base: base });
        };
        _this.state = {
            base: props.base,
        };
        return _this;
    }
    Calendar.prototype.render = function () {
        var _this = this;
        var _a = this.props, showMonthCnt = _a.showMonthCnt, todayDate = _a.todayDate, allowedTime = _a.allowedTime, allowedDays = _a.allowedDays, maxPrevMonth = _a.maxPrevMonth, maxPrevYear = _a.maxPrevYear, maxNextMonth = _a.maxNextMonth, maxNextYear = _a.maxNextYear;
        var base = this.state.base;
        return (React.createElement("div", { className: "calendar" },
            React.createElement("div", { className: "calendar__list" },
                ArrayUtil_1.range(showMonthCnt).map(function (idx) { return (React.createElement("div", { className: "calendar__item", key: idx },
                    idx === 0 && React.createElement("div", { className: "header-text" }, "Start Date"),
                    idx === 1 && React.createElement("div", { className: "header-text" }, "End Date"),
                    React.createElement(CalendarContainer_1.default, __assign({}, _this.props, { base: _this.state.base, current: dayjs(base).add(idx, 'month'), prevIcon: idx === 0, nextIcon: idx === showMonthCnt - 1, setBase: _this.setBase, todaydate: todayDate, allowedTime: allowedTime, allowedDays: allowedDays, maxPrevMonth: maxPrevMonth, maxPrevYear: maxPrevYear, maxNextMonth: maxNextMonth, maxNextYear: maxNextYear })))); }),
                this.props.includeRelativeDate && React.createElement("div", { className: "calendar__list calendar-week" },
                    React.createElement("div", { className: "calendar__item" },
                        React.createElement("div", { className: "calendar__body" },
                            React.createElement("div", { className: "custom-style" },
                                React.createElement("p", { className: "additional-text", onClick: this.props.ontodayClick }, "Today"),
                                React.createElement("p", { className: "additional-text", onClick: this.props.onyesterdayClick }, "Yesterday"),
                                React.createElement("p", { className: "additional-text", onClick: this.props.oncurweekClick }, "This Week"),
                                React.createElement("p", { className: "additional-text", onClick: this.props.onpastweekClick }, "Last Week"),
                                React.createElement("p", { className: "additional-text", onClick: this.props.onpastClick }, "Last 7 Days"),
                                React.createElement("p", { className: "additional-text", onClick: this.props.oncurrentmthClick }, "This Month"),
                                React.createElement("p", { className: "additional-text", onClick: this.props.onpastmthClick }, "Last Month"))))))));
    };
    Calendar.defaultProps = {
        base: dayjs(),
        showMonthCnt: 1,
        showToday: false,
    };
    return Calendar;
}(React.Component));
exports.default = Calendar;
//# sourceMappingURL=Calendar.js.map