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
}

export interface State {
  selected: dayjs.Dayjs[];
  date?: dayjs.Dayjs;
  tabValue: TabValue;
  start?: any;
  end?: any;
  hoverDate?: dayjs.Dayjs;
  startValue: string | undefined | null;
  endValue: string;
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
      startTime: "",
      endTime: "",
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
    const emptspace = ' ';
    this.setState({...this.state, startTime: emptspace + hour, endTime: emptspace + minute});
    // const { onChange } = this.props;
    // let date = this.state.date;
    // let selected = this.state.selected;

    // if (!date) {
    //   date = dayjs();
    //   selected = [date];
    // }

    // date = date.hour(hour).minute(minute);
    // const inputValue = date.format(this.getDateFormat());


    // ifExistCall(onChange, date, inputValue);

    // this.setState({
    //   ...this.state,
    //   date,
    //   selected,
    //   inputValue,
    // });
  };

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
      <TimeContainer hour={date.hour()} minute={date.minute()} onChange={this.handleTimeChange} allowedTime={this.props.restrictToDayTime} />
      );
    };
    
    public renderRangePickerInput = () => {
      const { startPlaceholder, endPlaceholder, readOnly, disabled, clear, onChange, includeTime } = this.props;
      const { startValue, endValue, startTime, endTime } = this.state;
      return (
        <RangePickerInput
        startPlaceholder={startPlaceholder}
        readOnly={readOnly}
        disabled={disabled}
        clear={clear}
        endPlaceholder={endPlaceholder}
        startValue={`${startValue}` + `${startTime}` }
        endValue={`${endValue}` + `${endTime}`}
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
    this.setState({
      currendate: new Date(),
      startValue : new Date().toLocaleDateString('en-CA'),
      endValue: new Date().toLocaleDateString('en-CA'),
      start: undefined,
      end: undefined
    });
  }

  public yesterdayClick = () => {
    const yesterday = new Date(Date.now() - 864e5);
    this.setState({
      currendate: yesterday,
      startValue : yesterday.toLocaleDateString('en-CA'),
      endValue: yesterday.toLocaleDateString('en-CA'),
      start: undefined,
      end: undefined
    });
  }

  public currentWeekClick = () => {
    const curr = new Date;
    const firstday = new Date(curr.setDate(curr.getDate() - curr.getDay()));
    const lastday = new Date(curr.setDate(curr.getDate() - curr.getDay()+6));
    this.setState({
      startValue : firstday.toLocaleDateString('en-CA'),
      endValue: lastday.toLocaleDateString('en-CA'),
      start: firstday,
      end: lastday
    });
  }

  public pastWeekClick = () => {
    const curr = new Date;
    const frdate = new Date(curr.setDate(curr.getDate() - curr.getDay() - 7));
    const lstday = new Date(frdate.setDate(frdate.getDate() - frdate.getDay()+6));
    this.setState({
      startValue : curr.toLocaleDateString('en-CA'),
      endValue: lstday.toLocaleDateString('en-CA'),
      start: curr,
      end: lstday
    });
  }

  public currentMthClick = () => {
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    this.setState({
      startValue : firstDay.toLocaleDateString('en-CA'),
      endValue: lastDay.toLocaleDateString('en-CA'),
      start: firstDay,
      end: lastDay
    });
  }

  public pastMthClick = () => {
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth() -1, 1);
    const lastDay = new Date(firstDay.getFullYear(), firstDay.getMonth() + 1, 0);
    this.setState({
      startValue : firstDay.toLocaleDateString('en-CA'),
      endValue: lastDay.toLocaleDateString('en-CA'),
      start: firstDay,
      end: lastDay
    });
  }

  public pastClick = () => {
    const firstDay = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const yesterday = new Date(Date.now() - 864e5);
    this.setState({
      startValue : firstDay.toLocaleDateString('en-CA'),
      endValue: yesterday.toLocaleDateString('en-CA'),
      start: firstDay,
      end: yesterday
    });
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
