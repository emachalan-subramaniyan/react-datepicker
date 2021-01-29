import * as React from 'react';
import { IDatePicker } from '../common/@types';
export declare enum TabValue {
    DATE = 0,
    TIME = 1
}
export interface PickerAction {
    show: () => void;
    hide: () => void;
}
export interface PickerRenderProps {
    actions: PickerAction;
}
export interface PickerProps {
    /** DatePicker portal version */
    portal?: boolean;
    /** DatePicker show direction (0 = TOP , 1 = BOTTOM) */
    direction?: IDatePicker.PickerDirection;
}
export interface Props {
    readOnly?: boolean;
    disabled?: boolean;
    className?: string;
    onallowedDays?: any;
    allowedTime?: boolean;
    allowedDays?: boolean;
    onallowedTime?: any;
    renderTrigger: (props: PickerRenderProps) => JSX.Element;
    renderContents: (props: PickerRenderProps) => JSX.Element;
    onTabPress?: any;
}
export interface State {
    show: boolean;
    tabValue: TabValue;
    position: IDatePicker.Position;
}
declare class Picker extends React.Component<Props & PickerProps, State> {
    state: {
        show: boolean;
        tabValue: TabValue;
        position: {
            left: string;
            top: string;
        };
    };
    private triggerRef;
    private contentsRef;
    constructor(props: Props);
    showContents: () => void;
    hideContents: () => void;
    setPosition: () => void;
    handleTab: (val: TabValue) => () => void;
    render(): JSX.Element;
}
export default Picker;
