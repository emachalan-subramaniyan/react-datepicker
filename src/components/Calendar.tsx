import { range } from '../utils/ArrayUtil';
import * as dayjs from 'dayjs';
import * as React from 'react';
import CalendarContainer, { InheritProps as ContainerProps } from './CalendarContainer';

export interface Props extends ContainerProps {
  /** Calendar Initial Date Parameters */
  base: dayjs.Dayjs;
  /** Number of months to show at once */
  todayDate?: any;
  ontodayClick?: any;
  onyesterdayClick?: any;
  oncurweekClick?: any;
  onpastweekClick?: any;
  oncurrentmthClick?: any;
  onpastmthClick?: any;
  onpastClick?: any;
  showMonthCnt: number;
  allowedTime?: boolean;
  maxPrevMonth?: number | undefined;
  maxPrevYear?: number | undefined;
  maxNextMonth?: number | undefined;
  maxNextYear?: number | undefined;
  allowedDays?: boolean;
  includeRelativeDate?: boolean;
}

export interface State {
  base: dayjs.Dayjs;
}

class Calendar extends React.Component<Props, State> {
  public static defaultProps = {
    base: dayjs(),
    showMonthCnt: 1,
    showToday: false,
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      base: props.base,
    };
  }

  public setBase = (base: dayjs.Dayjs) => {
    this.setState({ base });
  };

  public render() {
    const { showMonthCnt, todayDate,  allowedTime, allowedDays, maxPrevMonth,  maxPrevYear, maxNextMonth, maxNextYear } = this.props;
    const { base } = this.state;

    return (
      <div className="calendar">
        <div className="calendar__list">
          {range(showMonthCnt).map(idx => (
            <div className="calendar__item" key={idx}>
               {idx === 0 && <div className="header-text">Start Date</div> }
                {idx === 1 && <div className="header-text">End Date</div> }
              <CalendarContainer
                {...this.props}
                base={this.state.base}
                current={dayjs(base).add(idx, 'month')}
                prevIcon={idx === 0}
                nextIcon={idx === showMonthCnt! - 1}
                setBase={this.setBase}
                todaydate={todayDate}
                allowedTime={allowedTime}
                allowedDays={allowedDays}
                maxPrevMonth={maxPrevMonth}
                maxPrevYear={maxPrevYear}
                maxNextMonth={maxNextMonth}
                maxNextYear={maxNextYear}
              />
            </div>
          ))}
         {this.props.includeRelativeDate &&  <div className="calendar__list calendar-week">
              <div className="calendar__item">
                <div className="calendar__body">
                  <div className="custom-style">
                    <p className="additional-text" onClick={this.props.ontodayClick}>Today</p>
                    <p className="additional-text" onClick={this.props.onyesterdayClick}>Yesterday</p>
                    <p className="additional-text" onClick={this.props.oncurweekClick}>This Week</p>
                    <p className="additional-text" onClick={this.props.onpastweekClick}>Last Week</p>
                    <p className="additional-text" onClick={this.props.onpastClick}>Last 7 Days</p>
                    <p className="additional-text" onClick={this.props.oncurrentmthClick}>This Month</p>
                    <p className="additional-text" onClick={this.props.onpastmthClick}>Last Month</p>
                  </div>
                </div>
              </div>
          </div> }
        </div>
      </div>
    );
  }
}

export default Calendar;
