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
Object.defineProperty(exports, "__esModule", { value: true });
var classNames = require("classnames");
var dayjs = require("dayjs");
var React = require("react");
var _types_1 = require("../common/@types");
var CalendarBody_1 = require("./CalendarBody");
var CalendarHead_1 = require("./CalendarHead");
var TodayPanel_1 = require("./TodayPanel");
var FunctionUtil_1 = require("../utils/FunctionUtil");
var Constant_1 = require("../common/Constant");
var LocaleUtil_1 = require("../utils/LocaleUtil");
var CalendarContainer = /** @class */ (function (_super) {
    __extends(CalendarContainer, _super);
    function CalendarContainer(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            viewMode: _types_1.IDatePicker.ViewMode.DAY,
        };
        _this.getHeaderTitle = function () {
            var _a;
            var current = _this.props.current;
            var year = dayjs(current).year();
            return (_a = {},
                // [IDatePicker.ViewMode.YEAR]: `${year - 4} - ${year + 5}`,
                _a[_types_1.IDatePicker.ViewMode.MONTH] = "" + year,
                _a[_types_1.IDatePicker.ViewMode.DAY] = dayjs(current).format('MMM  YYYY'),
                _a)[_this.state.viewMode];
        };
        _this.handleTitleClick = function () {
            var viewMode = _this.state.viewMode;
            var showMonthCnt = _this.props.showMonthCnt;
            var changedMode = viewMode;
            if (viewMode === _types_1.IDatePicker.ViewMode.MONTH) {
                // changedMode = IDatePicker.ViewMode.YEAR;
            }
            else if (viewMode === _types_1.IDatePicker.ViewMode.DAY) {
                changedMode = _types_1.IDatePicker.ViewMode.MONTH;
            }
            _this.setState({
                viewMode: showMonthCnt > 2 ? _types_1.IDatePicker.ViewMode.DAY : changedMode,
            });
        };
        _this.handleChange = function (value) {
            var viewMode = _this.state.viewMode;
            var _a = _this.props, current = _a.current, onChange = _a.onChange, setBase = _a.setBase, showMonthCnt = _a.showMonthCnt, base = _a.base;
            if (!value.trim())
                return;
            if (showMonthCnt > 2) {
                var date = dayjs(current)
                    .date(parseInt(value, 10))
                    .toDate();
                FunctionUtil_1.ifExistCall(onChange, date);
                return;
            }
            if (viewMode === _types_1.IDatePicker.ViewMode.YEAR) {
                // setBase(dayjs(base).year(parseInt(value, 10)));
                // this.setState({
                //   viewMode: IDatePicker.ViewMode.MONTH,
                // });
            }
            else if (viewMode === _types_1.IDatePicker.ViewMode.MONTH) {
                setBase(dayjs(base).month(parseInt(value, 10)));
                _this.setState({
                    viewMode: _types_1.IDatePicker.ViewMode.DAY,
                });
            }
            else {
                var date = dayjs(current).date(parseInt(value, 10));
                FunctionUtil_1.ifExistCall(onChange, date);
            }
        };
        _this.handleBase = function (method) { return function () {
            var d = new Date();
            var yd = new Date();
            var spedate = null;
            var speyear = null;
            var _a = _this.props, base = _a.base, setBase = _a.setBase, maxPrevMonth = _a.maxPrevMonth, maxPrevYear = _a.maxPrevYear, maxNextMonth = _a.maxNextMonth, maxNextYear = _a.maxNextYear;
            var viewMode = _this.state.viewMode;
            var date = dayjs(base);
            if (viewMode === _types_1.IDatePicker.ViewMode.YEAR) {
                // setBase(date[method](10, 'year'));
            }
            else if (viewMode === _types_1.IDatePicker.ViewMode.MONTH) {
                if (method === 'subtract' && maxPrevYear) {
                    yd.setFullYear(yd.getFullYear() - (maxPrevYear + 1));
                    speyear = new Date(yd).toLocaleDateString('en-US', { year: 'numeric' });
                }
                else if (maxNextYear) {
                    yd.setFullYear(yd.getFullYear() + (maxNextYear + 1));
                    speyear = new Date(yd).toLocaleDateString('en-US', { year: 'numeric' });
                }
                if (String(date[method](1, 'year').format('YYYY')) !== speyear) {
                    setBase(date[method](1, 'year'));
                }
            }
            else {
                if (method === 'subtract' && maxPrevMonth) {
                    d.setMonth(d.getMonth() - (maxPrevMonth + 1));
                    spedate = new Date(d).toLocaleDateString('en-US', { month: '2-digit', year: 'numeric' });
                }
                else if (maxNextMonth) {
                    d.setMonth(d.getMonth() + maxNextMonth);
                    spedate = new Date(d).toLocaleDateString('en-US', { month: '2-digit', year: 'numeric' });
                }
                if (String(date[method](1, 'month').format('MM/YYYY')) !== spedate) {
                    setBase(date[method](1, 'month'));
                }
            }
        }; };
        _this.handleToday = function () {
            var setBase = _this.props.setBase;
            setBase(dayjs());
        };
        _this.renderCalendarHead = function () {
            var _a = _this.props, prevIcon = _a.prevIcon, nextIcon = _a.nextIcon;
            return (React.createElement(CalendarHead_1.default, { onPrev: _this.handleBase('subtract'), onNext: _this.handleBase('add'), prevIcon: prevIcon, nextIcon: nextIcon, onTitleClick: _this.handleTitleClick, title: _this.getHeaderTitle() }));
        };
        _this.renderTodayPane = function () {
            var _a = _this.props, showToday = _a.showToday, _b = _a.locale, locale = _b === void 0 ? Constant_1.DatePickerDefaults.locale : _b;
            return React.createElement(TodayPanel_1.default, { today: LocaleUtil_1.getToday(locale), onClick: _this.handleToday, show: showToday });
        };
        _this.renderCalendarBody = function () {
            var _a = _this.props, customDayClass = _a.customDayClass, customDayText = _a.customDayText, disableDay = _a.disableDay, selected = _a.selected, startDay = _a.startDay, endDay = _a.endDay, onMouseOver = _a.onMouseOver, current = _a.current, todaydate = _a.todaydate, allowedTime = _a.allowedTime, allowedDays = _a.allowedDays, _b = _a.locale, locale = _b === void 0 ? Constant_1.DatePickerDefaults.locale : _b;
            return (React.createElement(CalendarBody_1.default, { viewMode: _this.state.viewMode, current: current, selected: selected, startDay: startDay || todaydate, endDay: endDay, disableDay: disableDay, onClick: _this.handleChange, onMouseOver: onMouseOver, customDayClass: customDayClass, customDayText: customDayText, locale: locale, allowedTime: allowedTime, allowedDays: allowedDays }));
        };
        return _this;
    }
    CalendarContainer.prototype.render = function () {
        var _a = this.props, show = _a.show, showToday = _a.showToday;
        var calendarClass = classNames('calendar__container', {
            'calendar--show': show,
        });
        return (React.createElement("div", { className: calendarClass },
            this.renderCalendarHead(),
            showToday && this.renderTodayPane(),
            this.renderCalendarBody()));
    };
    CalendarContainer.defaultProps = {
        current: dayjs(),
        show: true,
        showMonthCnt: 1,
        showToday: false,
        locale: Constant_1.DatePickerDefaults.locale,
    };
    return CalendarContainer;
}(React.Component));
exports.default = CalendarContainer;
//# sourceMappingURL=CalendarContainer.js.map