import * as classNames from 'classnames';
import * as dayjs from 'dayjs';
import * as React from 'react';
import { IDatePicker } from '../common/@types';
import CalendarBody from './CalendarBody';
import CalendarHead from './CalendarHead';
import { Props as DayViewProps } from './DayView';
import TodayPanel from './TodayPanel';
import { ifExistCall } from '../utils/FunctionUtil';
import { DatePickerDefaults } from '../common/Constant';
import { getToday } from '../utils/LocaleUtil';

interface CalendarContainerProps {
  /** Locale to use */
  locale?: IDatePicker.Locale;
  /** Calendar Show or Hide */
  show?: boolean;
  /** PrevIcon Show or Hide */
  prevIcon?: boolean;
  /** NextIcon Show or Hide */
  nextIcon?: boolean;
  /** Event for Calendar day click */
  onChange?: (date: dayjs.Dayjs) => void;
  /** TodayPanel show or hide */
  showToday?: boolean;
  allowedTime?: boolean;
  allowedDays?: boolean;
  todaydate?: any;
  maxPrevMonth?: number | undefined;
  maxPrevYear?: number | undefined;
  maxNextMonth?: number | undefined;
  maxNextYear?: number | undefined;
}

interface PrivateProps {
  /** CalendarContainer base prop */
  current: dayjs.Dayjs;
  /** Default Date parameter in calendar, which is the parent component */
  base: dayjs.Dayjs;
  /** Number of months to show at once */
  showMonthCnt: number;
  /** Set Calendar initial Date  */
  setBase: (base: dayjs.Dayjs) => void;
}

export interface State {
  viewMode: IDatePicker.ViewMode;
}

export type InheritProps = DayViewProps & CalendarContainerProps;
export type Props = CalendarContainerProps & DayViewProps & PrivateProps;

class CalendarContainer extends React.Component<Props, State> {
  public static defaultProps = {
    current: dayjs(),
    show: true,
    showMonthCnt: 1,
    showToday: false,
    locale: DatePickerDefaults.locale,
  };

  public state = {
    viewMode: IDatePicker.ViewMode.DAY,
  };

  constructor(props: Props) {
    super(props);
  }

  public getHeaderTitle = () => {
    const { current } = this.props;
    const year = dayjs(current).year();
    return {
      // [IDatePicker.ViewMode.YEAR]: `${year - 4} - ${year + 5}`,
      [IDatePicker.ViewMode.MONTH]: `${year}`,
      [IDatePicker.ViewMode.DAY]: dayjs(current).format('MMM  YYYY'),
    }[this.state.viewMode];
  };

  public handleTitleClick = () => {
    const { viewMode } = this.state;
    const { showMonthCnt } = this.props;
    let changedMode: IDatePicker.ViewMode = viewMode;

    if (viewMode === IDatePicker.ViewMode.MONTH) {
      // changedMode = IDatePicker.ViewMode.YEAR;
    } else if (viewMode === IDatePicker.ViewMode.DAY) {
      changedMode = IDatePicker.ViewMode.MONTH;
    }
    this.setState({
      viewMode: showMonthCnt > 2 ? IDatePicker.ViewMode.DAY : changedMode,
    });
  };

  public handleChange = (value: string) => {
    const { viewMode } = this.state;
    const { current, onChange, setBase, showMonthCnt, base } = this.props;
    if (!value.trim()) return;
    if (showMonthCnt > 2) {
      const date = dayjs(current)
        .date(parseInt(value, 10))
        .toDate();
      ifExistCall(onChange, date);
      return;
    }

    if (viewMode === IDatePicker.ViewMode.YEAR) {
      // setBase(dayjs(base).year(parseInt(value, 10)));
      // this.setState({
      //   viewMode: IDatePicker.ViewMode.MONTH,
      // });
    } else if (viewMode === IDatePicker.ViewMode.MONTH) {
      setBase(dayjs(base).month(parseInt(value, 10)));
      this.setState({
        viewMode: IDatePicker.ViewMode.DAY,
      });
    } else {
      const date = dayjs(current).date(parseInt(value, 10));
      ifExistCall(onChange, date);
    }
  };

  public handleBase = (method: string) => () => {
    const d = new Date();
    const yd = new Date();
    let spedate = null;
    let speyear = null;
    const { base, setBase, maxPrevMonth,  maxPrevYear, maxNextMonth, maxNextYear } = this.props;
    const { viewMode } = this.state;
    const date = dayjs(base);
    if (viewMode === IDatePicker.ViewMode.YEAR) {
      // setBase(date[method](10, 'year'));
    } else if (viewMode === IDatePicker.ViewMode.MONTH) {
      if(method === 'subtract' && maxPrevYear){
        yd.setFullYear(yd.getFullYear() - (maxPrevYear + 1));
        speyear = new Date(yd).toLocaleDateString('en-US', {year: 'numeric'});
      }else if(maxNextYear){
        yd.setFullYear(yd.getFullYear() + (maxNextYear+1));
        speyear = new Date(yd).toLocaleDateString('en-US', {year: 'numeric'});
      }
      if(String(date[method](1, 'year').format('YYYY')) !== speyear){
        setBase(date[method](1, 'year'));
      }
    } else {
      if(method === 'subtract' && maxPrevMonth){
        d.setMonth(d.getMonth() - (maxPrevMonth + 1));
        spedate = new Date(d).toLocaleDateString('en-US', {month: '2-digit',year: 'numeric'});
      }else if(maxNextMonth){
        d.setMonth(d.getMonth() + maxNextMonth);
        spedate = new Date(d).toLocaleDateString('en-US', {month: '2-digit',year: 'numeric'});
      }
      if(String(date[method](1, 'month').format('MM/YYYY')) !== spedate){
        setBase(date[method](1, 'month'));
      }
    }
  };

  public handleToday = () => {
    const { setBase } = this.props;
    setBase(dayjs());
  };

  public renderCalendarHead = () => {
    const { prevIcon, nextIcon } = this.props;
    return (
      <CalendarHead
        onPrev={this.handleBase('subtract')}
        onNext={this.handleBase('add')}
        prevIcon={prevIcon}
        nextIcon={nextIcon}
        onTitleClick={this.handleTitleClick}
        title={this.getHeaderTitle()}
      />
    );
  };

  public renderTodayPane = () => {
    const { showToday, locale = DatePickerDefaults.locale } = this.props;
    return <TodayPanel today={getToday(locale)} onClick={this.handleToday} show={showToday} />;
  };

  public renderCalendarBody = () => {
    const {
      customDayClass,
      customDayText,
      disableDay,
      selected,
      startDay,
      endDay,
      onMouseOver,
      current,
      todaydate, allowedTime, allowedDays,
      locale = DatePickerDefaults.locale,
    } = this.props;
    return (
      <CalendarBody
        viewMode={this.state.viewMode}
        current={current}
        selected={selected}
        startDay={startDay || todaydate}
        endDay={endDay}
        disableDay={disableDay}
        onClick={this.handleChange}
        onMouseOver={onMouseOver}
        customDayClass={customDayClass}
        customDayText={customDayText}
        locale={locale}
        allowedTime={allowedTime}
        allowedDays={allowedDays}
      />
    );
  };

  public render() {
    const { show, showToday } = this.props;
    const calendarClass = classNames('calendar__container', {
      'calendar--show': show,
    });

    return (
      <div className={calendarClass}>
        {this.renderCalendarHead()}
        {showToday && this.renderTodayPane()}
        {this.renderCalendarBody()}
      </div>
    );
  }
}

export default CalendarContainer;
