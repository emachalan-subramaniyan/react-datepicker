import * as React from 'react';
import PickerInput, { Props as IPickerInputProps } from './PickerInput';
import { Merge, Omit } from '../utils/TypeUtil';
import { ifExistCall } from '../utils/FunctionUtil';
import SVGIcon from './SVGIcon';

export enum FieldType {
  START,
  END,
}

interface RangePickerInputProps {
  /** start input value */
  startValue?: any;
  /** end input value */
  endValue?: any;
  /** RangePickerInput change event field type is start or end */
  onChange?: (fieldType: FieldType, value: string) => void;
  /** RangePickerInput Blur event field type is start or end */
  onBlur?: (fieldType: FieldType, value: string) => void;
  /** RangePickerInput click event field type is start or end */
  onClick?: (fieldTyp: FieldType) => void;
  /** RangePickerInput clear event */
  onClear?: (fieldType: FieldType) => void;

  ontimeClick?: any;
}

export type InputProps = Merge<
  Omit<IPickerInputProps, 'onBlur' | 'onClear' | 'onChange' | 'onClick' | 'placeholder'>,
  {
    /** start input placeholder */
    startPlaceholder?: string;
    /** end input placeholder */
    endPlaceholder?: string;
  }
>;

type Props = RangePickerInputProps & InputProps;

class RangePickerInput extends React.Component<Props> {
  public handleChange = (fieldType: FieldType) => (e: React.FormEvent<HTMLInputElement>) =>
    ifExistCall(this.props.onChange, fieldType, e.currentTarget.value);
  public handleBlur = (fieldType: FieldType) => (e: React.FormEvent<HTMLInputElement>) =>
    ifExistCall(this.props.onBlur, fieldType, e.currentTarget.value);
  public handleClick = (fieldType: FieldType) => () => ifExistCall(this.props.onClick, fieldType);
  public handleClear = (fieldType: FieldType) => () => ifExistCall(this.props.onClear, fieldType);

  public renderStartInput = () => {
    const { startValue, startPlaceholder } = this.props;
    return this.renderPickerInput(FieldType.START, startValue, startPlaceholder);
  };

  public renderEndInput = () => {
    const { endValue, endPlaceholder } = this.props;
    return this.renderPickerInput(FieldType.END, endValue, endPlaceholder);
  };

  public renderPickerInput = (fieldType: FieldType, value?: string, placeholder?: string) => {
    const { readOnly, disabled, clear } = this.props;
    return (
      <PickerInput
        value={value}
        readOnly={readOnly}
        disabled={disabled}
        clear={clear}
        className="range"
        onClear={this.handleClear(fieldType)}
        onClick={this.handleClick(fieldType)}
        onChange={this.handleChange(fieldType)}
        onBlur={this.handleBlur(fieldType)}
        placeholder={placeholder}
      />
    );
  };

  public render() {
    const {ontimeClick} = this.props;
    return (
      <div className="range-picker-input custom-tab">
        <span className="range-picker-input__start">{this.renderStartInput()}</span>
        <div className="custom-icon">
          <span onClick={() => ontimeClick('date')}><SVGIcon id="calendar" /></span>
          <span onClick={() => ontimeClick('time')}><SVGIcon id="time" /></span>
        </div>
        <span className="range-picker-input__icon">
	        <SVGIcon id="right-arrow"/>
        </span>
        <span className="range-picker-input__end">{this.renderEndInput()}</span>
        <div className="custom-icon">
          <span onClick={() => ontimeClick('date')}><SVGIcon id="calendar" /></span>
          <span onClick={() => ontimeClick('time')}><SVGIcon id="time" /></span>
        </div>
      </div>
    );
  }
}

export default RangePickerInput;
