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
exports.TabValue = void 0;
var React = require("react");
var dayjs = require("dayjs");
var DateUtil_1 = require("../utils/DateUtil");
var Constant_1 = require("../common/Constant");
var Picker_1 = require("./Picker");
var RangePickerInput_1 = require("./RangePickerInput");
var Calendar_1 = require("./Calendar");
var FunctionUtil_1 = require("../utils/FunctionUtil");
var CX = require("classnames");
var TimeContainer_1 = require("./TimeContainer");
var TabValue;
(function (TabValue) {
    TabValue[TabValue["DATE"] = 0] = "DATE";
    TabValue[TabValue["TIME"] = 1] = "TIME";
})(TabValue = exports.TabValue || (exports.TabValue = {}));
var RangeDatePicker = /** @class */ (function (_super) {
    __extends(RangeDatePicker, _super);
    function RangeDatePicker(props) {
        var _this = _super.call(this, props) || this;
        _this.handleTimeChange = function (hour, minute) {
            var _a = _this.state, startValue = _a.startValue, endValue = _a.endValue;
            var emptspace = ' ';
            _this.valueChanged(startValue, endValue, hour, minute);
            _this.setState(__assign(__assign({}, _this.state), { startTime: emptspace + hour, endTime: emptspace + minute }));
        };
        _this.valueChanged = function (startvalue, endvalue, starttime, endtime) {
            var onPropChange = _this.props.onPropChange;
            var obj = {
                fromdate: startvalue,
                fromtime: starttime,
                todate: endvalue,
                totime: endtime
            };
            onPropChange && onPropChange(obj);
        };
        _this.handleDateChange = function (actions) { return function (date) {
            var _a = _this.props, onChange = _a.onChange, dateFormat = _a.dateFormat;
            var _b = _this.state, start = _b.start, end = _b.end;
            var startDate;
            var endDate;
            startDate = start;
            endDate = end;
            if (!start) {
                startDate = date;
            }
            else {
                if (end) {
                    startDate = date;
                    endDate = undefined;
                }
                else {
                    if (!DateUtil_1.isDayBefore(date, start)) {
                        endDate = date;
                    }
                    else {
                        startDate = date;
                    }
                }
            }
            FunctionUtil_1.ifExistCall(onChange, startDate, endDate);
            var _c = _this.state, startTime = _c.startTime, endTime = _c.endTime;
            _this.valueChanged(DateUtil_1.formatDate(startDate, dateFormat), DateUtil_1.formatDate(endDate, dateFormat), startTime, endTime);
            _this.setState(__assign(__assign({}, _this.state), { start: startDate, end: endDate, startValue: DateUtil_1.formatDate(startDate, dateFormat), endValue: DateUtil_1.formatDate(endDate, dateFormat) }), function () {
                if (_this.state.start && _this.state.end) {
                    actions.hide();
                }
            });
        }; };
        _this.handleInputChange = function (fieldType, value) {
            var _a;
            var key = fieldType === RangePickerInput_1.FieldType.START ? 'startValue' : 'endValue';
            _this.setState(__assign(__assign({}, _this.state), (_a = {}, _a[key] = value, _a)));
        };
        _this.handleMouseOver = function (date) {
            _this.setState(__assign(__assign({}, _this.state), { hoverDate: date }));
        };
        _this.handleInputBlur = function (fieldType, value) {
            var dateFormat = _this.props.dateFormat;
            var _a = _this.state, start = _a.start, end = _a.end;
            var parsedDate = dayjs(value, dateFormat);
            var startDate = start;
            var endDate = end;
            if (parsedDate.isValid() && dateFormat.length === value.length) {
                if (fieldType === RangePickerInput_1.FieldType.END) {
                    endDate = parsedDate;
                }
                else if (fieldType === RangePickerInput_1.FieldType.START) {
                    startDate = parsedDate;
                }
            }
            if (startDate && endDate) {
                if (DateUtil_1.isDayBefore(endDate, startDate) || DateUtil_1.isDayAfter(startDate, endDate)) {
                    // Swapping Date
                    var temp = void 0;
                    temp = startDate;
                    startDate = endDate;
                    endDate = temp;
                }
            }
            _this.setState(__assign(__assign({}, _this.state), { start: startDate, end: endDate, startValue: DateUtil_1.formatDate(startDate, dateFormat), endValue: DateUtil_1.formatDate(endDate, dateFormat) }));
        };
        _this.handleCalendarText = function (date) {
            var _a = _this.props, startText = _a.startText, endText = _a.endText, customDayText = _a.customDayText;
            var _b = _this.state, start = _b.start, end = _b.end;
            if (DateUtil_1.isDayEqual(start, date))
                return startText;
            if (DateUtil_1.isDayEqual(end, date))
                return endText;
            FunctionUtil_1.ifExistCall(customDayText, date);
            return '';
        };
        _this.handleCalendarClass = function (date) {
            var customDayClass = _this.props.customDayClass;
            var _a = _this.state, start = _a.start, end = _a.end, hoverDate = _a.hoverDate;
            if (start && !end && hoverDate) {
                if (DateUtil_1.isDayRange(date, start, hoverDate)) {
                    return 'calendar__day--range';
                }
            }
            FunctionUtil_1.ifExistCall(customDayClass, date);
            return '';
        };
        _this.handleTab = function (val) { return function () {
            _this.setState(__assign(__assign({}, _this.state), { tabValue: val }));
        }; };
        _this.handleInputClear = function (fieldType) {
            if (fieldType === RangePickerInput_1.FieldType.START) {
                _this.setState(__assign(__assign({}, _this.state), { start: undefined, startValue: '' }));
            }
            else if (fieldType === RangePickerInput_1.FieldType.END) {
                _this.setState(__assign(__assign({}, _this.state), { end: undefined, endValue: '' }));
            }
        };
        _this.timeClick = function (data) {
            _this.setState(__assign(__assign({}, _this.state), { tabValue: data === 'date' ? TabValue.DATE : TabValue.TIME }));
        };
        _this.renderTime = function () {
            var date = _this.state.date || dayjs();
            return (React.createElement(TimeContainer_1.default, { hour: date.hour(), minute: date.minute(), startdate: _this.state.startValue, enddate: _this.state.endValue, onChange: _this.handleTimeChange, allowedTime: _this.props.restrictToDayTime }));
        };
        _this.renderRangePickerInput = function () {
            var _a = _this.props, startPlaceholder = _a.startPlaceholder, endPlaceholder = _a.endPlaceholder, readOnly = _a.readOnly, disabled = _a.disabled, clear = _a.clear, onChange = _a.onChange, includeTime = _a.includeTime;
            var _b = _this.state, startValue = _b.startValue, endValue = _b.endValue, startTime = _b.startTime, endTime = _b.endTime;
            var startdata = startTime != null ? startTime : '';
            var enddata = endTime != null ? endTime : '';
            return (React.createElement(RangePickerInput_1.default, { startPlaceholder: startPlaceholder, readOnly: readOnly, disabled: disabled, clear: clear, endPlaceholder: endPlaceholder, startValue: "" + startValue + ("" + startdata), endValue: "" + endValue + ("" + enddata), onChange: _this.handleInputChange, onBlur: _this.handleInputBlur, onClear: _this.handleInputClear, ontimeClick: _this.timeClick, allowedTimes: includeTime }));
        };
        _this.renderContents = function (actions) {
            var includeTime = _this.props.includeTime;
            var tabValue = _this.state.tabValue;
            var component;
            component = React.createElement("div", { className: "picker__container__calonly" }, _this.renderCalendar(actions));
            if (includeTime) {
                component = (React.createElement("div", { className: "picker__container__calonly" }, tabValue === TabValue.DATE ? _this.renderCalendar(actions) : _this.renderTime()));
            }
            return component;
        };
        _this.ontodayclick = function () {
            var curr = new Date();
            var allowedDays = _this.props.allowedDays;
            _this.setState({
                currendate: new Date(),
                startValue: allowedDays && (curr.getDay() === 0 || curr.getDay() === 6) ? null : new Date().toLocaleDateString('en-CA'),
                endValue: allowedDays && (curr.getDay() === 0 || curr.getDay() === 6) ? null : new Date().toLocaleDateString('en-CA'),
                start: undefined,
                end: undefined,
                startTime: null,
                endTime: null,
            });
            _this.valueChanged(allowedDays && (curr.getDay() === 0 || curr.getDay() === 6) ? null : new Date().toLocaleDateString('en-CA'), allowedDays && (curr.getDay() === 0 || curr.getDay() === 6) ? null : new Date().toLocaleDateString('en-CA'), null, null);
        };
        _this.yesterdayClick = function () {
            var _a = _this.state, startTime = _a.startTime, endTime = _a.endTime;
            var allowedDays = _this.props.allowedDays;
            var yesterday = new Date(Date.now() - 864e5);
            _this.setState({
                currendate: allowedDays && (yesterday.getDay() === 0 || yesterday.getDay() === 6) ? ' ' : yesterday,
                startValue: allowedDays && (yesterday.getDay() === 0 || yesterday.getDay() === 6) ? ' ' : yesterday.toLocaleDateString('en-CA'),
                endValue: allowedDays && (yesterday.getDay() === 0 || yesterday.getDay() === 6) ? ' ' : yesterday.toLocaleDateString('en-CA'),
                start: undefined,
                end: undefined,
                startTime: null,
                endTime: null,
            });
            _this.valueChanged(allowedDays && (yesterday.getDay() === 0 || yesterday.getDay() === 6) ? ' ' : yesterday.toLocaleDateString('en-CA'), allowedDays && (yesterday.getDay() === 0 || yesterday.getDay() === 6) ? ' ' : yesterday.toLocaleDateString('en-CA'), null, null);
        };
        _this.currentWeekClick = function () {
            var curr = new Date();
            var _a = _this.state, startTime = _a.startTime, endTime = _a.endTime;
            var allowedDays = _this.props.allowedDays;
            var firstday = new Date(curr.setDate(curr.getDate() - curr.getDay() + (allowedDays ? 1 : 0)));
            var lastday = new Date(curr.setDate(curr.getDate() - curr.getDay() + (allowedDays ? 5 : 6)));
            _this.setState({
                startValue: firstday.toLocaleDateString('en-CA'),
                endValue: lastday.toLocaleDateString('en-CA'),
                start: firstday,
                end: lastday
            });
            _this.valueChanged(firstday.toLocaleDateString('en-CA'), lastday.toLocaleDateString('en-CA'), startTime, endTime);
        };
        _this.pastWeekClick = function () {
            var curr = new Date();
            var _a = _this.state, startTime = _a.startTime, endTime = _a.endTime;
            var allowedDays = _this.props.allowedDays;
            var frdate = new Date(curr.setDate(curr.getDate() - curr.getDay() - (allowedDays ? 6 : 7)));
            var lstday = new Date(frdate.setDate(frdate.getDate() - frdate.getDay() + (allowedDays ? 5 : 6)));
            _this.setState({
                startValue: curr.toLocaleDateString('en-CA'),
                endValue: lstday.toLocaleDateString('en-CA'),
                start: curr,
                end: lstday
            });
            _this.valueChanged(curr.toLocaleDateString('en-CA'), lstday.toLocaleDateString('en-CA'), startTime, endTime);
        };
        _this.currentMthClick = function () {
            var date = new Date();
            var _a = _this.state, startTime = _a.startTime, endTime = _a.endTime;
            var allowedDays = _this.props.allowedDays;
            var fd = new Date(date.getFullYear(), date.getMonth(), 1);
            var ld = new Date(date.getFullYear(), date.getMonth() + 1, 0);
            var firstDay = (allowedDays && fd.getDay() === 0 || fd.getDay() === 6) ?
                new Date(fd.setDate(fd.getDate() + 1)) : fd;
            var lastDay = (allowedDays && ld.getDay() === 0) ? new Date(ld.setDate(ld.getDate() - 2)) :
                (allowedDays && ld.getDay() === 6) ? new Date(ld.setDate(ld.getDate() - 1)) : ld;
            _this.setState({
                startValue: firstDay.toLocaleDateString('en-CA'),
                endValue: lastDay.toLocaleDateString('en-CA'),
                start: firstDay,
                end: lastDay
            });
            _this.valueChanged(firstDay.toLocaleDateString('en-CA'), lastDay.toLocaleDateString('en-CA'), startTime, endTime);
        };
        _this.pastMthClick = function () {
            var date = new Date();
            var _a = _this.state, startTime = _a.startTime, endTime = _a.endTime;
            var allowedDays = _this.props.allowedDays;
            var fd = new Date(date.getFullYear(), date.getMonth() - 1, 1);
            var ld = new Date(fd.getFullYear(), fd.getMonth() + 1, 0);
            var firstDay = (allowedDays && fd.getDay() === 0) ? new Date(date.getFullYear(), date.getMonth() - 1, 2) :
                (allowedDays && fd.getDay() === 6) ? new Date(date.getFullYear(), date.getMonth() - 1, 3) : fd;
            var lastDay = (allowedDays && ld.getDay() === 0) ? new Date(firstDay.getFullYear(), firstDay.getMonth() + 1, -2) :
                (allowedDays && ld.getDay() === 6) ? new Date(firstDay.getFullYear(), firstDay.getMonth() + 1, -1) : ld;
            _this.setState({
                startValue: firstDay.toLocaleDateString('en-CA'),
                endValue: lastDay.toLocaleDateString('en-CA'),
                start: firstDay,
                end: lastDay
            });
            _this.valueChanged(firstDay.toLocaleDateString('en-CA'), lastDay.toLocaleDateString('en-CA'), startTime, endTime);
        };
        _this.pastClick = function () {
            var _a = _this.state, startTime = _a.startTime, endTime = _a.endTime;
            var allowedDays = _this.props.allowedDays;
            var fd = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
            var ld = new Date(Date.now() - 864e5);
            var firstDay = (allowedDays && fd.getDay() === 0) ? new Date(Date.now() - 6 * 24 * 60 * 60 * 1000) :
                (allowedDays && fd.getDay() === 6) ? new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) : fd;
            var yesterday = allowedDays && ld.getDay() === 0 ? new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) :
                (allowedDays && ld.getDay() === 6) ? new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) : ld;
            _this.setState({
                startValue: firstDay.toLocaleDateString('en-CA'),
                endValue: yesterday.toLocaleDateString('en-CA'),
                start: firstDay,
                end: yesterday
            });
            _this.valueChanged(firstDay.toLocaleDateString('en-CA'), yesterday.toLocaleDateString('en-CA'), startTime, endTime);
        };
        _this.onallowedTimeClick = function () {
            _this.setState({ isAllowedTime: !_this.state.isAllowedTime });
        };
        _this.onallowedPrevClick = function () {
            _this.setState({ isAllowedPrev: !_this.state.isAllowedPrev });
        };
        _this.onallowedDaysClick = function () {
            _this.setState({ isAllowedDays: !_this.state.isAllowedDays });
        };
        _this.renderCalendar = function (actions) {
            var _a = _this.props, showMonthCnt = _a.showMonthCnt, initialDate = _a.initialDate, wrapper = _a.wrapper, allowedDays = _a.allowedDays, restrictToDayTime = _a.restrictToDayTime, maxPrevMonths = _a.maxPrevMonths, maxPrevYears = _a.maxPrevYears, maxNextMonths = _a.maxNextMonths, maxNextYears = _a.maxNextYears;
            var _b = _this.state, start = _b.start, end = _b.end;
            var component;
            var calendar = (React.createElement(Calendar_1.default, __assign({}, _this.props, { base: start || initialDate, startDay: start, endDay: end, showMonthCnt: showMonthCnt, onChange: _this.handleDateChange(actions), onMouseOver: _this.handleMouseOver, customDayText: _this.handleCalendarText, customDayClass: _this.handleCalendarClass, todayDate: _this.state.currendate, ontodayClick: _this.ontodayclick, onyesterdayClick: _this.yesterdayClick, oncurweekClick: _this.currentWeekClick, onpastweekClick: _this.pastWeekClick, oncurrentmthClick: _this.currentMthClick, onpastmthClick: _this.pastMthClick, onpastClick: _this.pastClick, allowedTime: restrictToDayTime, allowedDays: allowedDays, maxPrevMonth: maxPrevMonths, maxPrevYear: maxPrevYears, maxNextMonth: maxNextMonths, maxNextYear: maxNextYears })));
            component = calendar;
            if (wrapper) {
                component = wrapper(calendar);
            }
            return component;
        };
        var initialDate = props.initialDate, dateFormat = props.dateFormat, initialStartDate = props.initialStartDate, initialEndDate = props.initialEndDate;
        var start = initialStartDate;
        var end = initialEndDate;
        var selected = [];
        var date;
        if (initialDate) {
            date = initialDate;
            selected.push(date);
        }
        _this.state = {
            start: start,
            date: date,
            selected: selected,
            clicked: false,
            end: initialEndDate,
            startTime: null,
            endTime: null,
            isAllowedDays: false,
            isAllowedTime: false,
            isAllowedPrev: false,
            inputValue: DateUtil_1.formatDate(date, _this.getDateFormat()),
            tabValue: TabValue.DATE,
            startValue: DateUtil_1.formatDate(start, dateFormat),
            endValue: DateUtil_1.formatDate(end, dateFormat),
            currendate: null,
        };
        return _this;
    }
    RangeDatePicker.prototype.getDateFormat = function () {
        var _a = this.props, dateFormat = _a.dateFormat, includeTime = _a.includeTime, showTimeOnly = _a.showTimeOnly;
        if (!dateFormat) {
            if (includeTime) {
                return Constant_1.DatePickerDefaults.dateTimeFormat;
            }
            if (showTimeOnly) {
                return Constant_1.DatePickerDefaults.timeFormat;
            }
            return Constant_1.DatePickerDefaults.dateFormat;
        }
        return dateFormat;
    };
    RangeDatePicker.prototype.render = function () {
        var _this = this;
        var _a = this.props, includeTime = _a.includeTime, portal = _a.portal, direction = _a.direction, disabled = _a.disabled, readOnly = _a.readOnly, allowedDays = _a.allowedDays, restrictToDayTime = _a.restrictToDayTime;
        return (React.createElement(Picker_1.default, { portal: portal, direction: direction, readOnly: readOnly, disabled: disabled, allowedTime: restrictToDayTime, allowedDays: allowedDays, allowedPrev: this.state.isAllowedPrev, onallowedPrev: this.onallowedPrevClick, onallowedTime: this.onallowedTimeClick, onallowedDays: this.onallowedDaysClick, onTabPress: function (data) { return _this.setState(__assign(__assign({}, _this.state), { tabValue: data })); }, className: CX({ include__time: includeTime }), renderTrigger: function () { return _this.renderRangePickerInput(); }, renderContents: function (_a) {
                var actions = _a.actions;
                return _this.renderContents(actions);
            } }));
    };
    RangeDatePicker.defaultProps = {
        includeTime: false,
        dateFormat: Constant_1.DatePickerDefaults.dateFormat,
        portal: false,
        initialDate: dayjs(),
        showMonthCnt: 2,
        startText: '',
        endText: '',
    };
    return RangeDatePicker;
}(React.Component));
exports.default = RangeDatePicker;
//# sourceMappingURL=RangeDatePicker.js.map