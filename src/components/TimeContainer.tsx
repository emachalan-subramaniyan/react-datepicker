import * as React from 'react';
import TimeInput from './TimeInput';
import { ifExistCall } from '../utils/FunctionUtil';

interface Props {
  /** hour to display */
  hour?: number;
  /** minute to display */
  minute?: number;
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
}

class TimeContainer extends React.Component<Props, State> {
  public state = {
    starthour: new Date().getHours() % 12 || 12,
    startminute: this.props.minute || 0,
    startsessions: new Date().getHours() >= 12 ? 'PM' : 'AM',
    endhour: new Date().getHours() % 12 || 12,
    endminute: this.props.minute || 0,
    endsessions: new Date().getHours() >= 12 ? 'PM' : 'AM',
  };

  public handleChange = (item: string) => (e: React.FormEvent<HTMLInputElement>) => {
    const min = 0;
    const max = item === 'starthour' || 'endhour' ? 12 : 59;
    let value = parseInt(e.currentTarget.value, 10);

    if (isNaN(value)) {
      value = 0;
    }

    if (max < value) {
      value = max;
    }

    if (min > value) {
      value = min;
    }

    this.setState(
      {
        ...this.state,
        [item]: value,
      },
      () => this.invokeOnChange()
    );
  };

  public handleUp = (item: string) => () => {
    const max = item === 'starthour' || item === 'endhour' ? 12 : 59;
    const value = this.state[item];

    this.setState(
      {
        ...this.state,
        [item]: Math.min(value + 1, max),
      },
      () => this.invokeOnChange()
    );
  };

  public handleDown = (item: string) => () => {
    const min = 0;
    const value = this.state[item];
    this.setState(
      {
        ...this.state,
        [item]: Math.max(value - 1, min),
      },
      () => this.invokeOnChange()
    );
  };

  public handleSession = (data: string, item: string) => () => {
    this.setState(
      {
        ...this.state,
        [data]: item == 'AM' ? 'PM' : 'AM',
      },
      () => this.invokeOnChange()
    );
  };

  public handleBlur = () => {
    const { onBlur } = this.props;
    const { starthour, startminute } = this.state;
    ifExistCall(onBlur, starthour, startminute);
  };

  public invokeOnChange = () => {
    const { onChange } = this.props;
    const { starthour, startminute, startsessions, endhour, endminute, endsessions } = this.state;
    let starttime = `${starthour}:${startminute} ${startsessions}`;
    let endtime = `${endhour}:${endminute} ${endsessions}`;
    console.log('start time', starttime, endtime);
    ifExistCall(onChange, starttime, endtime);
  };

  public render() {
    const { starthour, startminute, startsessions, endhour, endminute, endsessions } = this.state;
    return (
      <div className="sample-check">
        <div className="time__container">
          <div>Start Time</div>
          <div className="container_flx">
            <div className="time-container">12:00 AM </div>
            <div className="time-container"> NOW</div>
          </div>
          <div className="time-style">
            <div>
              <div>Hours</div>
              <div className="ed-time">
                <TimeInput
                  onUp={this.handleUp('starthour')}
                  onDown={this.handleDown('starthour')}
                  onChange={this.handleChange('starthour')}
                  onBlur={this.handleBlur}
                  value={starthour}
                />
              </div>
            </div>
            <div className="time__container__div">:</div>
            <div>
              <div>Minutes</div>
              <div className="ed-time">
                <TimeInput
                  onUp={this.handleUp('startminute')}
                  onDown={this.handleDown('startminute')}
                  onChange={this.handleChange('startminute')}
                  onBlur={this.handleBlur}
                  value={startminute}
                />
              </div>
            </div>
            <div className="time__container__div colon">:</div>
            <div>
              <div>AM/PM</div>
              <div className="ed-time">
                <TimeInput
                  onUp={this.handleSession('startsessions', startsessions)}
                  onDown={this.handleSession('startsessions', startsessions)}
                  onBlur={this.handleBlur}
                  value={startsessions}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="time__container">
          <div>End Time</div>
          <div className="container_flx">
            <div className="time-container">12:00 AM </div>
            <div className="time-container"> NOW</div>
          </div>
          <div className="time-style">
            <div>
              <div>Hours</div>
              <div className="ed-time">
                <TimeInput
                  onUp={this.handleUp('endhour')}
                  onDown={this.handleDown('endhour')}
                  onChange={this.handleChange('endhour')}
                  onBlur={this.handleBlur}
                  value={endhour}
                />
              </div>
            </div>
            <div className="time__container__div">:</div>
            <div>
              <div>Minutes</div>
              <div className="ed-time">
                <TimeInput
                  onUp={this.handleUp('endminute')}
                  onDown={this.handleDown('endminute')}
                  onChange={this.handleChange('endminute')}
                  onBlur={this.handleBlur}
                  value={endminute}
                />
              </div>
            </div>
            <div className="time__container__div">:</div>
            <div>
              <div>AM/PM</div>
              <div className="ed-time">
                <TimeInput
                  onUp={this.handleSession('endsessions', endsessions)}
                  onDown={this.handleSession('endsessions', endsessions)}
                  onBlur={this.handleBlur}
                  value={endsessions}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TimeContainer;
