import * as React from 'react';
import * as CX from 'classnames';
import { IDatePicker } from '../common/@types';
import { getDivPosition, getDomHeight } from '../utils/DOMUtil';
import Backdrop from './Backdrop';
import SVGIcon from './SVGIcon';

export enum TabValue {
  DATE,
  TIME,
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
class Picker extends React.Component<Props & PickerProps, State> {
  public state = {
    show: false,
    tabValue: TabValue.DATE,
    position: {
      left: '',
      top: '',
    },
  };

  private triggerRef: React.RefObject<HTMLDivElement>;
  private contentsRef: React.RefObject<HTMLDivElement>;

  constructor(props: Props) {
    super(props);
    this.triggerRef = React.createRef();
    this.contentsRef = React.createRef();
  }

  public showContents = () => {
    const { portal, disabled, readOnly } = this.props;
    if (disabled || readOnly) return;

    this.setState(
      {
        show: true,
      },
      () => {
        if (!portal) {
          this.setPosition();
        }
      }
    );
  };

  public hideContents = () => {
    this.setState({
      show: false,
    });
  };

  public setPosition = () => {
    const { direction } = this.props;
    this.setState({
      position: getDivPosition(
        this.triggerRef.current,
        direction,
        getDomHeight(this.contentsRef.current)
      ),
    });
  };

  public handleTab = (val: TabValue) => () => {
    this.setState({
      ...this.state,
      tabValue: val,
    });
    this.props.onTabPress(val);
    this.showContents
  };

  public renderTabMenu = (): JSX.Element | null => {
    const { tabValue } = this.state;

    const renderButton = (type: TabValue, label: string, icon: string) => (
      <button
        className={CX({
          active: tabValue === type,
        })}
        onClick={this.handleTab(type)}
        type="button"
      >
        <SVGIcon id={icon} />
        {/* {label} */}
      </button>
    );
    return (
      <div className="picker__container__tab">
        {/* {renderButton(TabValue.DATE, 'DATE', 'calendar')}
        {renderButton(TabValue.TIME, 'TIME', 'time')} */}
      </div>
    );
  };

  public render() {
    const { portal, className, renderTrigger, renderContents, allowedTime, allowedDays } = this.props;
    const { show, position } = this.state;
    const actions = {
      show: this.showContents,
      hide: this.hideContents,
    };

    return (
      <div>
        <div>
          <label>Custom Options</label>
          <div>
            <label>
              <input type="checkbox"
                checked={allowedDays}
                onChange={() => this.props.onallowedDays()}
              />
              Allowed Days (ex: M-F)
            </label>
          </div>
          <div>
            <label>
              <input type="checkbox"
                checked={allowedTime}
                onChange={() => this.props.onallowedTime()}
              />
              Allowed Times (ex: 8a-5p)
            </label>
          </div>
        </div>
        <div className="picker">
          <div onClick={this.showContents}>
            {this.renderTabMenu()}
          </div>          
          <div className="picker__trigger" onClick={this.showContents} ref={this.triggerRef}>
            {renderTrigger({ actions })}
          </div>
          {show && (
            <div
              className={CX('picker__container', { portal, className })}
              role="dialog"
              aria-modal="true"
              style={position}
              ref={this.contentsRef}
            >
              {renderContents({ actions })}
            </div>
          )}
          <Backdrop show={show} invert={portal} onClick={this.hideContents} />
        </div>
      </div>
    );
  }
}

export default Picker;
