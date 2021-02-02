import * as React from 'react';
import * as dayjs from 'dayjs';
import { PickerProps, PickerAction } from './Picker';
import { FieldType, InputProps } from './RangePickerInput';
import { Props as ICalendarProps } from './Calendar';
import { Merge, Omit } from '../utils/TypeUtil';
export declare enum TabValue {
    DATE = 0,
    TIME = 1
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
declare type CalendarProps = Merge<Omit<ICalendarProps, 'base' | 'onChange' | 'selected'>, {
    showMonthCnt?: number;
}>;
export declare type Props = RangeDatePickerProps & CalendarProps & InputProps & PickerProps;
declare class RangeDatePicker extends React.Component<Props, State> {
    static defaultProps: {
        includeTime: boolean;
        dateFormat: string;
        portal: boolean;
        initialDate: dayjs.Dayjs;
        showMonthCnt: number;
        startText: string;
        endText: string;
    };
    constructor(props: Props);
    handleTimeChange: (hour: number, minute: number) => void;
    valueChanged: (startvalue: string | undefined | null, endvalue: string | undefined | null, starttime: number, endtime: number) => void;
    getDateFormat(): string;
    handleDateChange: (actions: PickerAction) => (date: dayjs.Dayjs) => void;
    handleInputChange: (fieldType: FieldType, value: string) => void;
    handleMouseOver: (date: dayjs.Dayjs) => void;
    handleInputBlur: (fieldType: FieldType, value: string) => void;
    handleCalendarText: (date: dayjs.Dayjs) => string;
    handleCalendarClass: (date: dayjs.Dayjs) => "" | "calendar__day--range";
    handleTab: (val: TabValue) => () => void;
    handleInputClear: (fieldType: FieldType) => void;
    timeClick: (data: string) => void;
    renderTime: () => JSX.Element | null;
    renderRangePickerInput: () => JSX.Element;
    renderContents: (actions: PickerAction) => JSX.Element;
    ontodayclick: () => void;
    yesterdayClick: () => void;
    currentWeekClick: () => void;
    pastWeekClick: () => void;
    currentMthClick: () => void;
    pastMthClick: () => void;
    pastClick: () => void;
    onallowedTimeClick: () => void;
    onallowedPrevClick: () => void;
    onallowedDaysClick: () => void;
    renderCalendar: (actions: PickerAction) => JSX.Element | null;
    render(): JSX.Element;
}
export default RangeDatePicker;
