import * as dayjs from 'dayjs';
import * as React from 'react';
import { InheritProps as ContainerProps } from './CalendarContainer';
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
    allowedDays?: boolean;
}
export interface State {
    base: dayjs.Dayjs;
}
declare class Calendar extends React.Component<Props, State> {
    static defaultProps: {
        base: dayjs.Dayjs;
        showMonthCnt: number;
        showToday: boolean;
    };
    constructor(props: Props);
    setBase: (base: dayjs.Dayjs) => void;
    render(): JSX.Element;
}
export default Calendar;
