import * as React from 'react';
import * as dayjs from 'dayjs';
import { isDayAfter, isDayBefore, isDayEqual, isDayRange, formatDate } from '../utils/DateUtil';
import { DatePickerDefaults } from '../common/Constant';
import Picker, { PickerProps, PickerAction } from './Picker';
import RangePickerInput, { FieldType, InputProps } from './RangePickerInput';
import Calendar, { Props as ICalendarProps } from './Calendar';
import { Merge, Omit } from '../utils/TypeUtil';
import { ifExistCall } from '../utils/FunctionUtil';
import * as CX from 'classnames';
import TimeContainer from './TimeContainer';
import SVGIcon from './SVGIcon';

export enum TabValue {
  DATE,
  TIME,
}

interface RangeDatePickerProps {
  /** To display input format (Day.js format) */
  dateFormat: string;
  restrictToDayTime?: boolean | undefined;
  /** Initial Calendar base date(if start date not set) */
  initialDate: dayjs.Dayjs;
  /** Initial Start Date */
  initialStartDate?: dayjs.Dayjs;
  showTimeOnly?: boolean;
  includeTime?: boolean;
  maxPrevMonths?: number | undefined;
  maxPrevYears?: number | undefined;
  maxNextMonths?: number | undefined;
  maxNextYears?: number | undefined;
  /** Initial End Date */
  initialEndDate?: dayjs.Dayjs;
  /** RangeDatePicker change event */
  onChange?: (start?: dayjs.Dayjs, end?: dayjs.Dayjs) => void;
  /** start day display this prop(optional) */
  startText: string;
  /** end day display this prop(optional) */
  endText: string;
  /** calendar wrapping element */
  wrapper?: (calendar: JSX.Element) => JSX.Element;
  onPropChange?: any;
}

export interface State {
  selected: dayjs.Dayjs[];
  date?: dayjs.Dayjs;
  tabValue: TabValue;
  start?: any;
  end?: any;
  hoverDate?: dayjs.Dayjs;
  startValue: string | undefined | null;
  endValue: string | undefined | null;
  startTime: any;
  endTime: any;
  mode?: FieldType;
  inputValue: string;
  currendate: any;
  clicked: boolean;
  isAllowedDays: boolean;
  isAllowedPrev?: boolean;
  isAllowedTime: boolean;
}

type CalendarProps = Merge<
  Omit<ICalendarProps, 'base' | 'onChange' | 'selected'>,
  {
    showMonthCnt?: number;
  }
>;

export type Props = RangeDatePickerProps & CalendarProps & InputProps & PickerProps;

class RangeDatePicker extends React.Component<Props, State> {
  public static defaultProps = {
    includeTime: false,
    dateFormat: DatePickerDefaults.dateFormat,
    portal: false,
    initialDate: dayjs(),
    showMonthCnt: 2,
    startText: '',
    endText: '',
  };

  public constructor(props: Props) {
    super(props);
    const { initialDate, dateFormat, initialStartDate, initialEndDate } = props;
    const start = initialStartDate;
    const end = initialEndDate;
    const selected = [];
    let date;

    if (initialDate) {
      date = initialDate;
      selected.push(date);
    }

    this.state = {
      start,
      date,
      selected,
      clicked: false,
      end: initialEndDate,
      startTime: null,
      endTime: null,
      isAllowedDays: false,
      isAllowedTime: false,
      isAllowedPrev: false,
      inputValue: formatDate(date, this.getDateFormat()),
      tabValue: TabValue.DATE,
      startValue: formatDate(start, dateFormat),
      endValue: formatDate(end, dateFormat),
      currendate: null,
    };
  }

  public handleTimeChange = (hour: number, minute: number) => {  
    const { startValue, endValue } = this.state;
    const emptspace = ' ';
    this.valueChanged(startValue, endValue, hour, minute);
    this.setState({...this.state, startTime: emptspace + hour, endTime: emptspace + minute});
  };

  public valueChanged = (
      startvalue: string | undefined | null,
      endvalue: string | undefined | null,
      starttime: number | string | null,
      endtime: number | string | null
      ) => {
    const { onPropChange } = this.props;
    const obj = {
      fromdate: startvalue,
      fromtime: starttime,
      todate: endvalue,
      totime: endtime
    };
    onPropChange && onPropChange(obj);
  }

  public getDateFormat() {
    const { dateFormat, includeTime, showTimeOnly } = this.props;

    if (!dateFormat) {
      if (includeTime) {
        return DatePickerDefaults.dateTimeFormat;
      }
      if (showTimeOnly) {
        return DatePickerDefaults.timeFormat;
      }
      return DatePickerDefaults.dateFormat;
    }
    return dateFormat;
  }


  public handleDateChange = (actions: PickerAction) => (date: dayjs.Dayjs) => {
    const { onChange, dateFormat } = this.props;
    const { start, end } = this.state;
    let startDate: dayjs.Dayjs | undefined;
    let endDate: dayjs.Dayjs | undefined;

    startDate = start;
    endDate = end;

    if (!start) {
      startDate = date;
    } else {
      if (end) {
        startDate = date;
        endDate = undefined;
      } else {
        if (!isDayBefore(date, start)) {
          endDate = date;
        } else {
          startDate = date;
        }
      }
    }

    ifExistCall(onChange, startDate, endDate);
    const { startTime, endTime } = this.state;
    this.valueChanged(formatDate(startDate, dateFormat),  formatDate(endDate, dateFormat), startTime, endTime);
    this.setState(
      {
        ...this.state,
        start: startDate,
        end: endDate,
        startValue: formatDate(startDate, dateFormat),
        endValue: formatDate(endDate, dateFormat),
      },
      () => {
        if (this.state.start && this.state.end) {
          actions.hide();
        }
      }
    );
  };

  public handleInputChange = (fieldType: FieldType, value: string) => {
    const key = fieldType === FieldType.START ? 'startValue' : 'endValue';
    this.setState({
      ...this.state,
      [key]: value,
    });
  };

  public handleMouseOver = (date: dayjs.Dayjs) => {
    this.setState({
      ...this.state,
      hoverDate: date,
    });
  };

  public handleInputBlur = (fieldType: FieldType, value: string) => {
    const { dateFormat } = this.props;
    const { start, end } = this.state;
    const parsedDate = dayjs(value, dateFormat);
    let startDate = start;
    let endDate = end;

    if (parsedDate.isValid() && dateFormat.length === value.length) {
      if (fieldType === FieldType.END) {
        endDate = parsedDate;
      } else if (fieldType === FieldType.START) {
        startDate = parsedDate;
      }
    }

    if (startDate && endDate) {
      if (isDayBefore(endDate, startDate) || isDayAfter(startDate, endDate)) {
        // Swapping Date
        let temp: dayjs.Dayjs;
        temp = startDate;
        startDate = endDate;
        endDate = temp;
      }
    }

    this.setState({
      ...this.state,
      start: startDate,
      end: endDate,
      startValue: formatDate(startDate, dateFormat),
      endValue: formatDate(endDate, dateFormat),
    });
  };

  public handleCalendarText = (date: dayjs.Dayjs) => {
    const { startText, endText, customDayText } = this.props;
    const { start, end } = this.state;
    if (isDayEqual(start, date)) return startText;
    if (isDayEqual(end, date)) return endText;
    ifExistCall(customDayText, date);
    return '';
  };

  public handleCalendarClass = (date: dayjs.Dayjs) => {
    const { customDayClass } = this.props;
    const { start, end, hoverDate } = this.state;
    if (start && !end && hoverDate) {
      if (isDayRange(date, start, hoverDate)) {
        return 'calendar__day--range';
      }
    }
    ifExistCall(customDayClass, date);
    return '';
  };

  public handleTab = (val: TabValue) => () => {
    this.setState({
      ...this.state,
      tabValue: val,
    });
  };

  public handleInputClear = (fieldType: FieldType) => {
    if (fieldType === FieldType.START) {
      this.setState({
        ...this.state,
        start: undefined,
        startValue: '',
      });
    } else if (fieldType === FieldType.END) {
      this.setState({
        ...this.state,
        end: undefined,
        endValue: '',
      });
    }
  };

  public timeClick = (data: string) => {
    this.setState({...this.state, tabValue: data ==='date' ? TabValue.DATE : TabValue.TIME});
  }

  public renderTime = (): JSX.Element | null => {
    const date = this.state.date || dayjs();

    return (
      <TimeContainer hour={date.hour()} minute={date.minute()} startdate={this.state.startValue} enddate={this.state.endValue} onChange={this.handleTimeChange} allowedTime={this.props.restrictToDayTime} />
      );
    };
    
    public renderRangePickerInput = () => {
      const { startPlaceholder, endPlaceholder, readOnly, disabled, clear, onChange, includeTime } = this.props;
      const { startValue, endValue, startTime, endTime } = this.state;
      const startdata = startTime != null ? startTime : '';
      const enddata = endTime != null ? endTime : '';
      return (
        <RangePickerInput
        startPlaceholder={startPlaceholder}
        readOnly={readOnly}
        disabled={disabled}
        clear={clear}
        endPlaceholder={endPlaceholder}
        startValue={`${startValue}` + `${startdata}` }
        endValue={`${endValue}` + `${enddata}`}
        onChange={this.handleInputChange}
        onBlur={this.handleInputBlur}
        onClear={this.handleInputClear}
        ontimeClick={this.timeClick}
        allowedTimes={includeTime}
      />
    );
  };

  public renderContents = (actions: PickerAction): JSX.Element => {
    const { includeTime } = this.props;
    const { tabValue } = this.state;
    let component: JSX.Element;

        component = <div className="picker__container__calonly">{this.renderCalendar(actions)}</div>;

    if (includeTime) {
      component = (
        <div className="picker__container__calonly">
          {tabValue === TabValue.DATE ? this.renderCalendar(actions) : this.renderTime()}
        </div>
      );
    }
    return component;
    };

  public ontodayclick = () => {
    const curr = new Date();
    const { allowedDays } = this.props;
    this.setState({
      currendate: new Date(),
      startValue : allowedDays && (curr.getDay() === 0 || curr.getDay() === 6) ? null : new Date().toLocaleDateString('en-CA'),
      endValue: allowedDays && (curr.getDay() === 0 || curr.getDay() === 6) ? null : new Date().toLocaleDateString('en-CA'),
      start: undefined,
      end: undefined,
      startTime: null,
      endTime: null,
    });
    this.valueChanged(
      allowedDays && (curr.getDay() === 0 || curr.getDay() === 6) ? null : new Date().toLocaleDateString('en-CA'),
      allowedDays && (curr.getDay() === 0 || curr.getDay() === 6) ? null : new Date().toLocaleDateString('en-CA'),
      null, null);
  }

  public yesterdayClick = () => {
    const { startTime, endTime } = this.state;
    const { allowedDays } = this.props;
    const yesterday = new Date(Date.now() - 864e5);
    this.setState({
      currendate: allowedDays && (yesterday.getDay() === 0 || yesterday.getDay() === 6) ? ' ' : yesterday,
      startValue : allowedDays && (yesterday.getDay() === 0 || yesterday.getDay() === 6) ? ' ' : yesterday.toLocaleDateString('en-CA'),
      endValue: allowedDays && (yesterday.getDay() === 0 || yesterday.getDay() === 6) ? ' ' : yesterday.toLocaleDateString('en-CA'),
      start: undefined,
      end: undefined,
      startTime: null,
      endTime: null,
    });
    this.valueChanged(
      allowedDays && (yesterday.getDay() === 0 || yesterday.getDay() === 6) ? ' ' : yesterday.toLocaleDateString('en-CA'),
      allowedDays && (yesterday.getDay() === 0 || yesterday.getDay() === 6) ? ' ' : yesterday.toLocaleDateString('en-CA'),
      null, null);
  }

  public currentWeekClick = () => {
    const curr = new Date();
    const { startTime, endTime } = this.state;
    const { allowedDays } = this.props;
    const firstday = new Date(curr.setDate(curr.getDate() - curr.getDay() + (allowedDays ? 1 : 0)));
    const lastday = new Date(curr.setDate(curr.getDate() - curr.getDay() + (allowedDays ? 5 : 6)));
    this.setState({
      startValue : firstday.toLocaleDateString('en-CA'),
      endValue: lastday.toLocaleDateString('en-CA'),
      start: firstday,
      end: lastday
    });
    this.valueChanged(
      firstday.toLocaleDateString('en-CA'),
      lastday.toLocaleDateString('en-CA'),
      startTime, endTime);
  }

  public pastWeekClick = () => {
    const curr = new Date();
    const { startTime, endTime } = this.state;
    const { allowedDays } = this.props;
    const frdate = new Date(curr.setDate(curr.getDate() - curr.getDay() - (allowedDays ? 6 : 7)));
    const lstday = new Date(frdate.setDate(frdate.getDate() - frdate.getDay()+(allowedDays ? 5 : 6)));
    this.setState({
      startValue : curr.toLocaleDateString('en-CA'),
      endValue: lstday.toLocaleDateString('en-CA'),
      start: curr,
      end: lstday
    });
    this.valueChanged(
      curr.toLocaleDateString('en-CA'),
      lstday.toLocaleDateString('en-CA'),
      startTime, endTime);
  }

  public currentMthClick = () => {
    const date = new Date();
    const { startTime, endTime } = this.state;
    const { allowedDays } = this.props;
    const fd = new Date(date.getFullYear(), date.getMonth(), 1);
    const ld = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const firstDay = (allowedDays && fd.getDay() === 0 || fd.getDay() === 6) ?
      new Date(fd.setDate(fd.getDate() + 1)) : fd ;
    const lastDay = (allowedDays && ld.getDay() === 0) ? new Date(ld.setDate(ld.getDate() - 2)) :
      (allowedDays && ld.getDay() === 6) ? new Date(ld.setDate(ld.getDate() - 1)) : ld ;
    this.setState({
      startValue : firstDay.toLocaleDateString('en-CA'),
      endValue: lastDay.toLocaleDateString('en-CA'),
      start: firstDay,
      end: lastDay
    });
    this.valueChanged(
      firstDay.toLocaleDateString('en-CA'),
      lastDay.toLocaleDateString('en-CA'),
      startTime, endTime);
  }

  public pastMthClick = () => {
    const date = new Date();
    const { startTime, endTime } = this.state;
    const { allowedDays } = this.props;
    const fd = new Date(date.getFullYear(), date.getMonth() -1, 1);
    const ld = new Date(fd.getFullYear(), fd.getMonth() + 1, 0);
    const firstDay = (allowedDays && fd.getDay() === 0) ? new Date(date.getFullYear(), date.getMonth() -1, 2) :
      (allowedDays && fd.getDay() === 6) ? new Date(date.getFullYear(), date.getMonth() -1, 3) : fd;
    const lastDay = (allowedDays && ld.getDay() === 0) ? new Date(firstDay.getFullYear(), firstDay.getMonth() + 1, - 2) :
      (allowedDays && ld.getDay() === 6) ? new Date(firstDay.getFullYear(), firstDay.getMonth() + 1, - 1): ld;
    this.setState({
      startValue : firstDay.toLocaleDateString('en-CA'),
      endValue: lastDay.toLocaleDateString('en-CA'),
      start: firstDay,
      end: lastDay
    });
    this.valueChanged(
      firstDay.toLocaleDateString('en-CA'),
      lastDay.toLocaleDateString('en-CA'),
      startTime, endTime);
  }

  public pastClick = () => {
    const { startTime, endTime } = this.state;
    const { allowedDays } = this.props;
    const fd = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const ld = new Date(Date.now() - 864e5);
    const firstDay = (allowedDays && fd.getDay() === 0) ? new Date(Date.now() - 6 * 24 * 60 * 60 * 1000) :
      (allowedDays && fd.getDay() === 6) ? new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) : fd;
    const yesterday = allowedDays && ld.getDay() === 0 ? new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) :
      (allowedDays && ld.getDay() === 6) ? new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) : ld;
    this.setState({
      startValue : firstDay.toLocaleDateString('en-CA'),
      endValue: yesterday.toLocaleDateString('en-CA'),
      start: firstDay,
      end: yesterday
    });
    this.valueChanged(
      firstDay.toLocaleDateString('en-CA'),
      yesterday.toLocaleDateString('en-CA'),
      startTime, endTime);
  }

  public onallowedTimeClick = () => {
    this.setState({ isAllowedTime: !this.state.isAllowedTime});
  }

  public onallowedPrevClick = () => {
    this.setState({ isAllowedPrev: !this.state.isAllowedPrev});
  }

  public onallowedDaysClick = () => {
    this.setState({ isAllowedDays: !this.state.isAllowedDays});
  }

  public renderCalendar = (actions: PickerAction): JSX.Element | null => {
    const { showMonthCnt, initialDate, wrapper, allowedDays, restrictToDayTime, maxPrevMonths, maxPrevYears, maxNextMonths, maxNextYears } = this.props;
    const { start, end } = this.state;
    let component: JSX.Element;
    
    const calendar = (
      <Calendar
        {...this.props}
        base={start || initialDate}
        startDay={start}
        endDay={end}
        showMonthCnt={showMonthCnt}
        onChange={this.handleDateChange(actions)}
        onMouseOver={this.handleMouseOver}
        customDayText={this.handleCalendarText}
        customDayClass={this.handleCalendarClass}
        todayDate={this.state.currendate}
        ontodayClick={this.ontodayclick}
        onyesterdayClick={this.yesterdayClick}
        oncurweekClick={this.currentWeekClick}
        onpastweekClick={this.pastWeekClick}
        oncurrentmthClick={this.currentMthClick}
        onpastmthClick={this.pastMthClick}
        onpastClick={this.pastClick}
        allowedTime={restrictToDayTime}
        allowedDays={allowedDays}
        maxPrevMonth={maxPrevMonths}
        maxPrevYear={maxPrevYears}
        maxNextMonth={maxNextMonths}
        maxNextYear={maxNextYears}

      />
    );

    component = calendar;

    if (wrapper) {
      component = wrapper(calendar);
    }

    return component;
  };

  public render() {
    const { includeTime, portal, direction, disabled, readOnly, allowedDays, restrictToDayTime } = this.props;

    return (
      <Picker
        portal={portal}
        direction={direction}
        readOnly={readOnly}
        disabled={disabled}
        allowedTime={restrictToDayTime}
        allowedDays={allowedDays}
        allowedPrev={this.state.isAllowedPrev}
        onallowedPrev={this.onallowedPrevClick}
        onallowedTime={this.onallowedTimeClick}
        onallowedDays={this.onallowedDaysClick}
        onTabPress={(data: any) => this.setState({...this.state,tabValue: data})}
        className={CX({ include__time: includeTime })}
        renderTrigger={() => this.renderRangePickerInput()}
        renderContents={({ actions }) => this.renderContents(actions)}
      />
    );
  }
}

export default RangeDatePicker;
