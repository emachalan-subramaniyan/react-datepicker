import * as React from 'react';
interface Props {
    /** hour to display */
    hour?: number;
    /** minute to display */
    minute?: number;
    allowedTime?: boolean;
    /** hour, minute, type change event */
    onChange?: (hour: number, minute: number) => void;
    /** hour, minute blur event */
    onBlur?: (hour: number, minute: number) => void;
}
interface State {
    starthour: number;
    startminute: number;
    endhour: number;
    endminute: number;
    startsessions: string;
    endsessions: string;
    allowedTime?: boolean;
}
declare class TimeContainer extends React.Component<Props, State> {
    state: {
        allowedTime: boolean | undefined;
        starthour: number;
        startminute: number;
        startsessions: string;
        endhour: number;
        endminute: number;
        endsessions: string;
    };
    handleChange: (item: string) => (e: React.FormEvent<HTMLInputElement>) => void;
    handleUp: (item: string, data: string) => () => void;
    upChangeFunction: (item: string, maxd: number) => void;
    handleDown: (item: string, data: string) => () => void;
    downChangeFunction: (item: string, min: number) => void;
    handleSession: (data: string, item: string) => () => void;
    handleBlur: () => void;
    invokeOnChange: () => void;
    onNowPress: (data: string) => void;
    onTimePress: (data: string) => void;
    render(): JSX.Element;
}
export default TimeContainer;
